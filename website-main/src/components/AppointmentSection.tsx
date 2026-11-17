import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  CalendarPlus,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  Copy,
  Settings2,
} from 'lucide-react';
import {
  CLINIC_TIME_SLOTS,
  REASON_ESTIMATED_MINUTES,
  buildWhatsAppUrl,
  formatAppointmentMessage,
  generateBookingReference,
  getSlotLabel,
  isValidClinicWhatsApp,
  sanitizePhoneDigits,
  type BookingRecord,
  type BookingStatus,
  type VisitTypeKey,
} from '../data/practiceData';
import {
  APPOINTMENT_REASON_KEYS,
  TRANSLATIONS,
  type AppointmentReasonKey,
  type Language,
} from '../data/translations';
import { BookingManagerPanel } from './BookingManagerPanel';
import { DatePicker } from './DatePicker';

export type BookingTab = 'book' | 'manage';

interface AppointmentSectionProps {
  language: Language;
  selectedReasonKey: AppointmentReasonKey | '';
  activeTab: BookingTab;
  onChangeTab: (nextTab: BookingTab) => void;
  clinicWhatsApp: string;
  onUpdateClinicWhatsApp: (nextNumber: string) => void;
  bookings: BookingRecord[];
  onCreateBooking: (record: BookingRecord) => void;
  onUpdateBookingStatus: (id: string, status: BookingStatus) => void;
  onRescheduleBooking: (id: string, nextDate: string, nextSlotId: string) => void;
  onDeleteBooking: (id: string) => void;
  onBookingPrepared?: (referenceCode: string) => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  reason?: string;
  date?: string;
  slot?: string;
}

export function AppointmentSection({
  language,
  selectedReasonKey,
  activeTab,
  onChangeTab,
  clinicWhatsApp,
  onUpdateClinicWhatsApp,
  bookings,
  onCreateBooking,
  onUpdateBookingStatus,
  onRescheduleBooking,
  onDeleteBooking,
  onBookingPrepared,
}: AppointmentSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const copy = TRANSLATIONS[language].appointment;
  const sys = copy.bookingSystem;

  const minDate = useMemo(() => {
    const today = new Date();
    return new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reasonKey, setReasonKey] = useState<AppointmentReasonKey | ''>(
    selectedReasonKey || 'checkup'
  );
  const [visitType, setVisitType] = useState<VisitTypeKey>('new-patient');
  const [date, setDate] = useState(minDate);
  const [slotId, setSlotId] = useState('09:30');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [latestPass, setLatestPass] = useState<{
    referenceCode: string;
    formattedMessage: string;
  } | null>(null);
  const [submissionKey, setSubmissionKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const [showNumberConfig, setShowNumberConfig] = useState(false);
  const [numberDraft, setNumberDraft] = useState(
    isValidClinicWhatsApp(clinicWhatsApp) ? clinicWhatsApp : ''
  );
  const [numberError, setNumberError] = useState('');

  useEffect(() => {
    if (selectedReasonKey) {
      setReasonKey(selectedReasonKey);
      setErrors((prev) => ({ ...prev, reason: undefined }));
    }
  }, [selectedReasonKey]);

  // Slots reserved on the currently chosen date
  const reservedSlotIds = useMemo(() => {
    if (!date) return new Set<string>();
    return new Set(
      bookings
        .filter((b) => b.date === date && b.status !== 'cancelled')
        .map((b) => b.slotId)
    );
  }, [bookings, date]);

  // Automatically shift slot selection to first available slot if chosen slot becomes occupied on date change
  useEffect(() => {
    if (slotId && reservedSlotIds.has(slotId)) {
      const firstOpen = CLINIC_TIME_SLOTS.find((s) => !reservedSlotIds.has(s.id));
      setSlotId(firstOpen ? firstOpen.id : '');
    }
  }, [date, reservedSlotIds, slotId]);

  const activeBookingsCount = useMemo(
    () => bookings.filter((b) => b.status === 'confirmed' || b.status === 'checked-in').length,
    [bookings]
  );

  const hasValidClinicNumber = isValidClinicWhatsApp(clinicWhatsApp);
  const whatsappLaunchUrl = latestPass
    ? buildWhatsAppUrl(clinicWhatsApp, latestPass.formattedMessage)
    : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = copy.form.nameError;
    }
    const phoneDigits = sanitizePhoneDigits(phone);
    if (!phone.trim() || phoneDigits.length < 7) {
      nextErrors.phone = copy.form.phoneError;
    }
    if (!reasonKey) {
      nextErrors.reason = copy.form.reasonError;
    }
    if (!date) {
      nextErrors.date = sys.dateRequiredError;
    }
    if (!slotId || reservedSlotIds.has(slotId)) {
      nextErrors.slot = sys.slotError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const referenceCode = generateBookingReference();
    const resolvedReason = reasonKey as AppointmentReasonKey;
    const newRecord: BookingRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      referenceCode,
      patientName: name.trim(),
      phone: phone.trim(),
      reasonKey: resolvedReason,
      visitType,
      date,
      slotId,
      message: message.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    const formatted = formatAppointmentMessage(
      {
        referenceCode,
        name,
        phone,
        reasonLabel: copy.form.reasons[resolvedReason],
        visitTypeLabel: sys.visitTypes[visitType],
        date,
        timeLabel: getSlotLabel(slotId, language),
        message,
      },
      language
    );

    onCreateBooking(newRecord);
    setLatestPass({ referenceCode, formattedMessage: formatted });
    setSubmissionKey((prev) => prev + 1);
    setCopied(false);
    onBookingPrepared?.(referenceCode);
  }

  async function handleCopyMessage() {
    if (!latestPass) return;
    try {
      await navigator.clipboard.writeText(latestPass.formattedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  function handleSaveClinicNumber(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleaned = sanitizePhoneDigits(numberDraft);
    if (!/^\d{10,15}$/.test(cleaned)) {
      setNumberError(copy.config.error);
      return;
    }
    setNumberError('');
    onUpdateClinicWhatsApp(cleaned);
    setShowNumberConfig(false);
  }

  return (
    <section id="appointment" className="py-16 md:py-24 bg-[#edf5f1]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left guidance & clinic schedule column */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
              {copy.title}
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-[#516866]">{copy.subtitle}</p>

            <dl className="mt-8 space-y-5 border-t border-[#d6e2dc] pt-6 text-sm">
              <div>
                <dt className="font-semibold text-[#123f43]">{copy.details.whatsappTitle}</dt>
                <dd className="mt-1 text-[#516866]">{copy.details.whatsappDesc}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#123f43]">{copy.details.availabilityTitle}</dt>
                <dd className="mt-1 text-[#516866]">{copy.details.availabilityDesc}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#123f43]">{copy.details.locationTitle}</dt>
                <dd className="mt-1 text-[#516866]">{copy.details.locationDesc}</dd>
              </div>
            </dl>

            {/* Discreet clinic WhatsApp configuration control */}
            <div className="mt-8 pt-6 border-t border-[#d6e2dc]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#607774]">
                  {hasValidClinicNumber
                    ? `${copy.config.activePrefix} (+${sanitizePhoneDigits(clinicWhatsApp)})`
                    : copy.config.notConfigured}
                </span>
                <button
                  type="button"
                  onClick={() => setShowNumberConfig((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 text-xs font-medium text-[#123f43] hover:text-[#287873] underline-offset-4 hover:underline cursor-pointer"
                >
                  <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{showNumberConfig ? copy.config.close : copy.config.configure}</span>
                </button>
              </div>

              {showNumberConfig && (
                <form
                  onSubmit={handleSaveClinicNumber}
                  className="mt-3 p-4 bg-white border border-[#d6e2dc] rounded-md space-y-3"
                >
                  <label
                    htmlFor="clinic-whatsapp-input"
                    className="block text-xs font-semibold text-[#123f43]"
                  >
                    {copy.config.inputLabel}
                  </label>
                  <input
                    id="clinic-whatsapp-input"
                    type="tel"
                    inputMode="numeric"
                    value={numberDraft}
                    onChange={(e) => setNumberDraft(e.target.value)}
                    placeholder="97798XXXXXXXX"
                    className="w-full px-3 py-2 text-sm border border-[#d2dfd9] rounded-md bg-[#fcfdfb] text-[#123f43] focus:outline-2 focus:outline-[#287873]"
                  />
                  {numberError && (
                    <p className="flex items-center gap-1.5 text-xs text-[#9b2c2c]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{numberError}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-medium bg-[#123f43] text-white rounded-md hover:bg-[#0d3135] transition-colors cursor-pointer"
                    >
                      {copy.config.save}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNumberConfig(false)}
                      className="px-3 py-2 text-xs font-medium text-[#516866] hover:text-[#123f43] cursor-pointer"
                    >
                      {copy.config.cancel}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Interactive Booking & Management System */}
          <div className="lg:col-span-7 bg-white border border-[#dce6e0] rounded-lg p-6 sm:p-8 shadow-xs">
            {/* Segmented Mode Switcher: Reserve a Slot | Manage Bookings */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e8efeb]">
              <h3 className="font-serif text-2xl font-medium text-[#123f43]">
                {activeTab === 'book' ? copy.form.heading : sys.tabs.manage}
              </h3>

              <div
                role="tablist"
                aria-label={copy.form.heading}
                className="inline-flex items-center gap-1 p-1 bg-[#f2f7f4] rounded-lg border border-[#d6e2dc] self-start sm:self-auto"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'book'}
                  onClick={() => onChangeTab('book')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === 'book'
                      ? 'bg-[#123f43] text-white shadow-xs'
                      : 'text-[#516866] hover:text-[#123f43]'
                  }`}
                >
                  <CalendarPlus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{sys.tabs.book}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'manage'}
                  onClick={() => onChangeTab('manage')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === 'manage'
                      ? 'bg-[#123f43] text-white shadow-xs'
                      : 'text-[#516866] hover:text-[#123f43]'
                  }`}
                >
                  <ClipboardList className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{sys.tabs.manage}</span>
                  {activeBookingsCount > 0 && (
                    <span className="font-mono tabular-nums text-[11px] opacity-85">
                      ({activeBookingsCount})
                    </span>
                  )}
                </button>
              </div>
            </div>

            {activeTab === 'manage' ? (
              <div className="mt-6">
                <BookingManagerPanel
                  language={language}
                  bookings={bookings}
                  clinicWhatsApp={clinicWhatsApp}
                  minDate={minDate}
                  onUpdateStatus={onUpdateBookingStatus}
                  onReschedule={onRescheduleBooking}
                  onDeleteBooking={onDeleteBooking}
                  onSwitchToBook={() => onChangeTab('book')}
                />
              </div>
            ) : (
              <div className="mt-6">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Visit type toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                    <span className="text-xs font-semibold text-[#263f40]">
                      {sys.visitTypeLabel}
                    </span>
                    <div
                      role="group"
                      aria-label={sys.visitTypeLabel}
                      className="inline-flex items-center gap-1 p-1 bg-[#f5f9f6] rounded-md border border-[#dce6e0] self-start sm:self-auto"
                    >
                      {(['new-patient', 'follow-up'] as const).map((typeKey) => {
                        const active = visitType === typeKey;
                        return (
                          <button
                            key={typeKey}
                            type="button"
                            onClick={() => setVisitType(typeKey)}
                            aria-pressed={active}
                            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              active
                                ? 'bg-white text-[#123f43] shadow-xs'
                                : 'text-[#516866] hover:text-[#123f43]'
                            }`}
                          >
                            {sys.visitTypes[typeKey]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Treatment Reason */}
                  <div>
                    <label
                      htmlFor="visit-reason"
                      className="block text-xs font-semibold text-[#263f40] mb-1.5"
                    >
                      {copy.form.reasonLabel}
                    </label>
                    <select
                      id="visit-reason"
                      name="reason"
                      required
                      value={reasonKey}
                      onChange={(e) => {
                        setReasonKey(e.target.value as AppointmentReasonKey | '');
                        if (errors.reason) setErrors((prev) => ({ ...prev, reason: undefined }));
                      }}
                      aria-invalid={Boolean(errors.reason)}
                      className="w-full px-3.5 py-3 text-sm border border-[#d5e0db] rounded-md bg-[#fcfdfb] text-[#123f43] focus:outline-2 focus:outline-[#287873]"
                    >
                      <option value="">{copy.form.reasonPlaceholder}</option>
                      {APPOINTMENT_REASON_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {copy.form.reasons[key]} ({REASON_ESTIMATED_MINUTES[key]} min)
                        </option>
                      ))}
                    </select>
                    {errors.reason && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9b2c2c]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.reason}</span>
                      </p>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label
                      htmlFor="preferred-date"
                      className="block text-xs font-semibold text-[#263f40] mb-1.5"
                    >
                      {copy.form.dateLabel} *
                    </label>
                    <DatePicker
                      id="preferred-date"
                      value={date}
                      minDate={minDate}
                      onChange={(nextDate) => {
                        setDate(nextDate);
                        if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
                      }}
                      language={language}
                      copy={copy.form.datePicker}
                    />
                    {errors.date && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9b2c2c]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.date}</span>
                      </p>
                    )}
                  </div>

                  {/* Live Available OPD Time Slots Grid */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#263f40]">
                        {sys.slotLabel}
                      </span>
                      <span className="text-[11px] text-[#607774]">
                        {sys.slotAvailableNote}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CLINIC_TIME_SLOTS.map((slot) => {
                        const isReserved = reservedSlotIds.has(slot.id);
                        const isSelected = slotId === slot.id && !isReserved;
                        const label = language === 'ne' ? slot.labelNe : slot.labelEn;

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            disabled={isReserved}
                            onClick={() => {
                              setSlotId(slot.id);
                              if (errors.slot) setErrors((prev) => ({ ...prev, slot: undefined }));
                            }}
                            aria-pressed={isSelected}
                            className={`min-h-[42px] px-2.5 py-2 rounded-md border text-xs font-medium tabular-nums transition-colors flex flex-col items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#287873] ${
                              isReserved
                                ? 'bg-[#f4f6f5] text-[#9eb0aa] border-[#e4ece8] cursor-not-allowed'
                                : isSelected
                                  ? 'bg-[#123f43] text-white border-[#123f43]'
                                  : 'bg-[#fcfdfb] text-[#123f43] border-[#d5e0db] hover:bg-[#edf5f1]'
                            }`}
                          >
                            <span className="inline-flex items-center gap-1 whitespace-nowrap">
                              <Clock className="w-3 h-3 opacity-75" aria-hidden="true" />
                              <span>{label}</span>
                            </span>
                            {isReserved && (
                              <span className="text-[10px] font-normal mt-0.5">
                                {sys.slotBookedTag}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {errors.slot && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9b2c2c]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.slot}</span>
                      </p>
                    )}
                  </div>

                  {/* Patient Identity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="patient-name"
                        className="block text-xs font-semibold text-[#263f40] mb-1.5"
                      >
                        {copy.form.nameLabel}
                      </label>
                      <input
                        id="patient-name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder={copy.form.namePlaceholder}
                        aria-invalid={Boolean(errors.name)}
                        className="w-full px-3.5 py-3 text-sm border border-[#d5e0db] rounded-md bg-[#fcfdfb] text-[#123f43] placeholder:text-[#869793] focus:outline-2 focus:outline-[#287873]"
                      />
                      {errors.name && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9b2c2c]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="patient-phone"
                        className="block text-xs font-semibold text-[#263f40] mb-1.5"
                      >
                        {copy.form.phoneLabel}
                      </label>
                      <input
                        id="patient-phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder={copy.form.phonePlaceholder}
                        aria-invalid={Boolean(errors.phone)}
                        className="w-full px-3.5 py-3 text-sm border border-[#d5e0db] rounded-md bg-[#fcfdfb] text-[#123f43] placeholder:text-[#869793] focus:outline-2 focus:outline-[#287873]"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9b2c2c]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label
                      htmlFor="additional-message"
                      className="block text-xs font-semibold text-[#263f40] mb-1.5"
                    >
                      {copy.form.messageLabel}
                    </label>
                    <textarea
                      id="additional-message"
                      name="message"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={copy.form.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 text-sm border border-[#d5e0db] rounded-md bg-[#fcfdfb] text-[#123f43] placeholder:text-[#869793] focus:outline-2 focus:outline-[#287873]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[46px] bg-[#123f43] hover:bg-[#0d3135] text-white text-sm font-medium px-6 py-3 rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
                  >
                    {copy.form.submitButton}
                  </button>

                  <p className="text-xs leading-[1.6] text-[#6d7f7c]">{copy.form.privacyNotice}</p>
                </form>

                {/* Digital Appointment Pass Confirmation */}
                <AnimatePresence mode="wait">
                  {latestPass && (
                    <motion.div
                      key={submissionKey}
                      aria-live="polite"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-6 p-5 bg-[#f3f8f5] border border-[#cfe0d7] rounded-md space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2
                            className="w-5 h-5 text-[#168b57] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <p className="text-sm font-semibold text-[#123f43]">
                              {copy.confirmation.title}
                            </p>
                            <p className="text-xs text-[#516866] mt-0.5">
                              {whatsappLaunchUrl
                                ? copy.confirmation.descWithNumber
                                : copy.confirmation.descWithoutNumber}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] font-medium text-[#607774]">
                            {sys.referenceLabel}
                          </span>
                          <p className="font-mono text-sm font-semibold text-[#123f43] tabular-nums">
                            {latestPass.referenceCode}
                          </p>
                        </div>
                      </div>

                      <pre className="p-3.5 bg-white border border-[#dce6e0] rounded-md text-xs leading-[1.6] text-[#263f40] whitespace-pre-wrap font-sans">
                        {latestPass.formattedMessage}
                      </pre>

                      <div className="flex flex-wrap items-center gap-2.5">
                        {whatsappLaunchUrl ? (
                          <a
                            href={whatsappLaunchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 min-h-[42px] bg-[#168b57] hover:bg-[#127347] text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
                          >
                            <span>{copy.confirmation.sendWhatsApp}</span>
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowNumberConfig(true)}
                            className="inline-flex items-center justify-center gap-2 min-h-[42px] bg-[#123f43] hover:bg-[#0d3135] text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <Settings2 className="w-4 h-4" aria-hidden="true" />
                            <span>{copy.confirmation.setNumber}</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleCopyMessage}
                          className="inline-flex items-center justify-center gap-2 min-h-[42px] bg-white hover:bg-[#edf5f1] text-[#123f43] border border-[#cad8d1] text-sm font-medium px-4 py-2.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-[#168b57]" aria-hidden="true" />
                              <span>{copy.confirmation.copied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" aria-hidden="true" />
                              <span>{copy.confirmation.copyText}</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => onChangeTab('manage')}
                          className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 py-2 text-xs font-semibold text-[#123f43] hover:text-[#287873] underline-offset-4 hover:underline transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <ClipboardList className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{sys.actions.viewInManager}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
