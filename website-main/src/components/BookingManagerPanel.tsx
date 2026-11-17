import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  RotateCcw,
  Search,
  Trash2,
  UserCheck,
  XCircle,
} from 'lucide-react';
import {
  CLINIC_TIME_SLOTS,
  buildWhatsAppUrl,
  formatAppointmentMessage,
  getSlotLabel,
  type BookingRecord,
  type BookingStatus,
} from '../data/practiceData';
import { TRANSLATIONS, type Language } from '../data/translations';
import { DatePicker } from './DatePicker';

type FilterTab = 'all' | 'upcoming' | 'completed' | 'cancelled';

interface BookingManagerPanelProps {
  language: Language;
  bookings: BookingRecord[];
  clinicWhatsApp: string;
  minDate: string;
  onUpdateStatus: (id: string, status: BookingStatus) => void;
  onReschedule: (id: string, nextDate: string, nextSlotId: string) => void;
  onDeleteBooking: (id: string) => void;
  onSwitchToBook: () => void;
}

export function BookingManagerPanel({
  language,
  bookings,
  clinicWhatsApp,
  minDate,
  onUpdateStatus,
  onReschedule,
  onDeleteBooking,
  onSwitchToBook,
}: BookingManagerPanelProps) {
  const copy = TRANSLATIONS[language].appointment;
  const sys = copy.bookingSystem;

  const [filter, setFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const upcoming = bookings.filter(
      (b) => b.status === 'confirmed' || b.status === 'checked-in'
    ).length;
    const completed = bookings.filter((b) => b.status === 'completed').length;
    return {
      total: bookings.length,
      upcoming,
      completed,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return bookings.filter((item) => {
      if (filter === 'upcoming' && item.status !== 'confirmed' && item.status !== 'checked-in') {
        return false;
      }
      if (filter === 'completed' && item.status !== 'completed') {
        return false;
      }
      if (filter === 'cancelled' && item.status !== 'cancelled') {
        return false;
      }
      if (!q) return true;
      return (
        item.referenceCode.toLowerCase().includes(q) ||
        item.patientName.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q)
      );
    });
  }, [bookings, filter, searchQuery]);

  function openReschedule(record: BookingRecord) {
    setRescheduleId(record.id);
    setRescheduleDate(record.date || minDate);
    setRescheduleSlot(record.slotId);
  }

  function handleSaveReschedule(id: string) {
    if (!rescheduleDate || !rescheduleSlot) return;
    onReschedule(id, rescheduleDate, rescheduleSlot);
    setRescheduleId(null);
  }

  function buildRecordPass(record: BookingRecord): string {
    return formatAppointmentMessage(
      {
        referenceCode: record.referenceCode,
        name: record.patientName,
        phone: record.phone,
        reasonLabel: copy.form.reasons[record.reasonKey],
        visitTypeLabel: sys.visitTypes[record.visitType],
        date: record.date,
        timeLabel: getSlotLabel(record.slotId, language),
        message: record.message,
      },
      language
    );
  }

  async function handleCopyPass(record: BookingRecord) {
    try {
      await navigator.clipboard.writeText(buildRecordPass(record));
      setCopiedId(record.id);
      window.setTimeout(() => setCopiedId(null), 2200);
    } catch {
      setCopiedId(null);
    }
  }

  function renderStatusIndicator(status: BookingStatus) {
    const label = sys.statuses[status];
    if (status === 'checked-in') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1d5b86]">
          <UserCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </span>
      );
    }
    if (status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#168b57]">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </span>
      );
    }
    if (status === 'cancelled') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9b2c2c]">
          <XCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#287873]">
        <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Booking Counters */}
      <div className="grid grid-cols-3 gap-3 border border-[#e3ece7] rounded-md bg-[#fbfdfb] p-4">
        <div>
          <p className="text-[11px] font-medium text-[#607774]">{sys.stats.total}</p>
          <p className="mt-1 font-serif text-2xl font-medium text-[#123f43] tabular-nums">
            {stats.total}
          </p>
        </div>
        <div className="border-l border-[#e3ece7] pl-4">
          <p className="text-[11px] font-medium text-[#607774]">{sys.stats.upcoming}</p>
          <p className="mt-1 font-serif text-2xl font-medium text-[#287873] tabular-nums">
            {stats.upcoming}
          </p>
        </div>
        <div className="border-l border-[#e3ece7] pl-4">
          <p className="text-[11px] font-medium text-[#607774]">{sys.stats.completed}</p>
          <p className="mt-1 font-serif text-2xl font-medium text-[#168b57] tabular-nums">
            {stats.completed}
          </p>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search
            className="w-4 h-4 text-[#6d807d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={sys.searchPlaceholder}
            aria-label={sys.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-[#d5e0db] rounded-md bg-[#fcfdfb] text-[#123f43] placeholder:text-[#869793] focus:outline-2 focus:outline-[#287873]"
          />
        </div>

        <div
          role="group"
          aria-label={sys.tabs.manage}
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#f2f7f4] rounded-md border border-[#dce6e0]"
        >
          {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((tabKey) => {
            const active = filter === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setFilter(tabKey)}
                aria-pressed={active}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#123f43] shadow-xs'
                    : 'text-[#516866] hover:text-[#123f43]'
                }`}
              >
                {sys.filterTabs[tabKey]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking Queue List or Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="py-10 px-6 text-center border border-dashed border-[#cddbd4] rounded-md bg-[#fbfdfb]">
          <CalendarClock className="w-7 h-7 text-[#287873] mx-auto mb-3" aria-hidden="true" />
          <p className="font-serif text-lg font-medium text-[#123f43]">{sys.emptyTitle}</p>
          <p className="mt-1.5 text-xs sm:text-sm text-[#516866] max-w-md mx-auto leading-relaxed">
            {bookings.length === 0 ? sys.emptyDesc : sys.emptyFilteredDesc}
          </p>
          <button
            type="button"
            onClick={onSwitchToBook}
            className="mt-5 inline-flex items-center justify-center min-h-[40px] px-5 py-2 rounded-md bg-[#123f43] hover:bg-[#0d3135] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            {sys.emptyCta}
          </button>
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredBookings.map((record) => {
            const isRescheduling = rescheduleId === record.id;
            const passText = buildRecordPass(record);
            const whatsappHref = buildWhatsAppUrl(clinicWhatsApp, passText);
            const isCopied = copiedId === record.id;

            // Slots already booked on rescheduleDate by other non-cancelled records
            const occupiedSlotIds = new Set(
              bookings
                .filter(
                  (b) =>
                    b.id !== record.id &&
                    b.date === rescheduleDate &&
                    b.status !== 'cancelled'
                )
                .map((b) => b.slotId)
            );

            return (
              <li
                key={record.id}
                className="border border-[#dce6e0] rounded-md bg-[#fbfdfb] p-4 sm:p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#607774]">
                      <span className="font-mono font-semibold text-[#123f43] tabular-nums">
                        {record.referenceCode}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{sys.visitTypes[record.visitType]}</span>
                      <span aria-hidden="true">·</span>
                      {renderStatusIndicator(record.status)}
                    </div>

                    <h4 className="mt-1.5 font-serif text-lg font-medium text-[#123f43]">
                      {record.patientName}
                    </h4>

                    <p className="mt-1 text-xs sm:text-sm text-[#516866] tabular-nums">
                      {copy.form.reasons[record.reasonKey]} · {record.date} ·{' '}
                      {getSlotLabel(record.slotId, language)} · {record.phone}
                    </p>

                    {record.message && (
                      <p className="mt-2 text-xs text-[#607774] italic">“{record.message}”</p>
                    )}
                  </div>
                </div>

                {/* Inline Reschedule Panel */}
                {isRescheduling && (
                  <div className="p-4 bg-white border border-[#cddbd4] rounded-md space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`reschedule-date-${record.id}`}
                          className="block text-xs font-semibold text-[#263f40] mb-1.5"
                        >
                          {copy.form.dateLabel}
                        </label>
                        <DatePicker
                          id={`reschedule-date-${record.id}`}
                          value={rescheduleDate}
                          minDate={minDate}
                          onChange={setRescheduleDate}
                          language={language}
                          copy={copy.form.datePicker}
                        />
                      </div>

                      <div>
                        <span className="block text-xs font-semibold text-[#263f40] mb-1.5">
                          {sys.slotLabel}
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {CLINIC_TIME_SLOTS.map((slot) => {
                            const taken = occupiedSlotIds.has(slot.id);
                            const selected = rescheduleSlot === slot.id;
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                disabled={taken}
                                onClick={() => setRescheduleSlot(slot.id)}
                                className={`px-2 py-1.5 text-xs font-medium rounded-sm border tabular-nums transition-colors cursor-pointer ${
                                  taken
                                    ? 'bg-[#f4f6f5] text-[#aab8b3] border-[#e6ece9] cursor-not-allowed line-through'
                                    : selected
                                      ? 'bg-[#123f43] text-white border-[#123f43]'
                                      : 'bg-[#fcfdfb] text-[#123f43] border-[#d5e0db] hover:bg-[#edf5f1]'
                                }`}
                              >
                                {language === 'ne' ? slot.labelNe : slot.labelEn}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveReschedule(record.id)}
                        className="px-4 py-2 text-xs font-medium bg-[#123f43] hover:bg-[#0d3135] text-white rounded-md transition-colors cursor-pointer"
                      >
                        {sys.actions.saveSlot}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRescheduleId(null)}
                        className="px-3 py-2 text-xs font-medium text-[#516866] hover:text-[#123f43] cursor-pointer"
                      >
                        {sys.actions.cancelReschedule}
                      </button>
                    </div>
                  </div>
                )}

                {/* Management & Patient Actions Bar */}
                <div className="pt-3 border-t border-[#e8efeb] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {record.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(record.id, 'checked-in')}
                        className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#cfe0d7] bg-white text-[#123f43] hover:bg-[#edf5f1] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {sys.actions.checkIn}
                      </button>
                    )}

                    {(record.status === 'confirmed' || record.status === 'checked-in') && (
                      <>
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(record.id, 'completed')}
                          className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#cfe0d7] bg-white text-[#168b57] hover:bg-[#edf5f1] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {sys.actions.complete}
                        </button>
                        <button
                          type="button"
                          onClick={() => openReschedule(record)}
                          className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#d5e0db] bg-white text-[#123f43] hover:bg-[#edf5f1] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {sys.actions.reschedule}
                        </button>
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(record.id, 'cancelled')}
                          className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#ead4d4] bg-white text-[#9b2c2c] hover:bg-[#fdf4f4] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {sys.actions.cancelBooking}
                        </button>
                      </>
                    )}

                    {record.status === 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(record.id, 'confirmed')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-[#d5e0db] bg-white text-[#123f43] hover:bg-[#edf5f1] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <RotateCcw className="w-3 h-3" aria-hidden="true" />
                        <span>{sys.actions.restoreBooking}</span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-[#168b57] hover:bg-[#127347] text-white transition-colors whitespace-nowrap"
                      >
                        <span>{sys.actions.sendWhatsApp}</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCopyPass(record)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-[#d5e0db] bg-white text-[#123f43] hover:bg-[#edf5f1] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-[#168b57]" aria-hidden="true" />
                          <span>{sys.actions.copiedPass}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" aria-hidden="true" />
                          <span>{sys.actions.copyPass}</span>
                        </>
                      )}
                    </button>

                    {(record.status === 'cancelled' || record.status === 'completed') && (
                      <button
                        type="button"
                        onClick={() => onDeleteBooking(record.id)}
                        aria-label={sys.actions.deleteBooking}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[#859794] hover:text-[#9b2c2c] hover:bg-[#fdf4f4] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
