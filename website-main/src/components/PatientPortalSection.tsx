import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckSquare,
  Copy,
  Square,
} from 'lucide-react';
import { TRANSLATIONS, type AppointmentReasonKey, type Language } from '../data/translations';

type CareStageFilter = 'all' | 'pre' | 'post';

interface PatientPortalSectionProps {
  language: Language;
  onSelectReason: (reasonKey: AppointmentReasonKey) => void;
  onOpenWhatsAppDrawer: () => void;
}

export function PatientPortalSection({
  language,
  onSelectReason,
  onOpenWhatsAppDrawer,
}: PatientPortalSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const copy = TRANSLATIONS[language].patientPortal;

  const [selectedId, setSelectedId] = useState<string>(copy.treatments[0]?.id ?? 'portal-rct');
  const [stageFilter, setStageFilter] = useState<CareStageFilter>('all');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeTreatment =
    copy.treatments.find((item) => item.id === selectedId) ?? copy.treatments[0];

  const completedPreSteps = activeTreatment.preCare.filter(
    (_, idx) => checkedSteps[`${activeTreatment.id}-${idx}`]
  ).length;

  function togglePreStep(stepIdx: number) {
    const key = `${activeTreatment.id}-${stepIdx}`;
    setCheckedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleCopyGuide() {
    const text = [
      `${activeTreatment.title} — ${copy.title}`,
      '',
      `${copy.preCareHeading}:`,
      ...activeTreatment.preCare.map((line, i) => `${i + 1}. ${line}`),
      '',
      `${copy.postCareHeading}:`,
      ...activeTreatment.postCare.map((line, i) => `${i + 1}. ${line}`),
      '',
      `${copy.warningHeading}: ${activeTreatment.whenToContact}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(activeTreatment.id);
      window.setTimeout(() => setCopiedId(null), 2500);
    } catch {
      setCopiedId(null);
    }
  }

  const stageOptions: { id: CareStageFilter; label: string }[] = [
    { id: 'all', label: copy.stages.all },
    { id: 'pre', label: copy.stages.pre },
    { id: 'post', label: copy.stages.post },
  ];

  const showPre = stageFilter === 'all' || stageFilter === 'pre';
  const showPost = stageFilter === 'all' || stageFilter === 'post';

  return (
    <section
      id="patient-portal"
      className="py-16 md:py-24 bg-[#edf5f1] border-b border-[#dce7e1]"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
            {copy.title}
          </h2>
          <p className="mt-3 text-base text-[#516866]">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Treatment Selector */}
          <div
            role="tablist"
            aria-label={copy.title}
            className="lg:col-span-4 bg-white border border-[#dce6e0] rounded-lg divide-y divide-[#e8efe9] overflow-hidden"
          >
            {copy.treatments.map((treatment) => {
              const isSelected = treatment.id === activeTreatment.id;
              return (
                <button
                  key={treatment.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(treatment.id)}
                  className={`w-full text-left px-5 py-4 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#287873] ${
                    isSelected
                      ? 'bg-[#123f43] text-white'
                      : 'bg-white text-[#123f43] hover:bg-[#f5f9f6]'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs tabular-nums ${
                      isSelected ? 'text-[#c9ddd6]' : 'text-[#607774]'
                    }`}
                  >
                    <span>{treatment.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{treatment.categoryLabel}</span>
                  </div>
                  <p className="mt-1 font-serif text-lg font-medium leading-snug">
                    {treatment.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Treatment Instructions Panel */}
          <div
            role="tabpanel"
            aria-label={activeTreatment.title}
            className="lg:col-span-8 bg-white border border-[#dce6e0] rounded-lg p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTreatment.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#e5ede8]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#607774] tabular-nums">
                      <span>{activeTreatment.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeTreatment.categoryLabel}</span>
                    </div>
                    <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-medium text-[#123f43]">
                      {activeTreatment.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#516866] leading-[1.65] max-w-[60ch]">
                      {activeTreatment.overview}
                    </p>
                  </div>

                  {/* Stage filter */}
                  <div
                    role="group"
                    aria-label={copy.title}
                    className="inline-flex items-center gap-1 p-1 bg-[#edf5f1] rounded-lg border border-[#dce6e0] self-start shrink-0"
                  >
                    {stageOptions.map((option) => {
                      const active = stageFilter === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setStageFilter(option.id)}
                          aria-pressed={active}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? 'bg-white text-[#123f43] shadow-xs'
                              : 'text-[#4e6462] hover:text-[#123f43]'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Instructions Body */}
                <div
                  className={`mt-6 grid grid-cols-1 ${
                    showPre && showPost ? 'md:grid-cols-2 gap-8' : 'gap-6'
                  }`}
                >
                  {showPre && (
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h4 className="text-sm font-semibold text-[#123f43]">
                          {copy.preCareHeading}
                        </h4>
                        <span className="text-xs text-[#607774] tabular-nums">
                          {completedPreSteps}/{activeTreatment.preCare.length}{' '}
                          {copy.checklistProgressLabel}
                        </span>
                      </div>

                      <ul className="space-y-2.5">
                        {activeTreatment.preCare.map((step, idx) => {
                          const isChecked = Boolean(
                            checkedSteps[`${activeTreatment.id}-${idx}`]
                          );
                          return (
                            <li key={idx}>
                              <button
                                type="button"
                                onClick={() => togglePreStep(idx)}
                                aria-pressed={isChecked}
                                className={`w-full text-left p-3 rounded-md border flex items-start gap-3 transition-colors cursor-pointer ${
                                  isChecked
                                    ? 'bg-[#f4f9f6] border-[#c8dcd1] text-[#263f40]'
                                    : 'bg-[#fbfaf7] border-[#e5ede8] text-[#4e6462] hover:border-[#cddad3]'
                                }`}
                              >
                                {isChecked ? (
                                  <CheckSquare
                                    className="w-4 h-4 text-[#168b57] shrink-0 mt-0.5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Square
                                    className="w-4 h-4 text-[#758985] shrink-0 mt-0.5"
                                    aria-hidden="true"
                                  />
                                )}
                                <span
                                  className={`text-sm leading-[1.6] ${
                                    isChecked ? 'line-through text-[#6d807d]' : ''
                                  }`}
                                >
                                  {step}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {showPost && (
                    <div>
                      <h4 className="text-sm font-semibold text-[#123f43] mb-3">
                        {copy.postCareHeading}
                      </h4>
                      <ol className="space-y-3">
                        {activeTreatment.postCare.map((step, idx) => (
                          <li
                            key={idx}
                            className="p-3 rounded-md bg-[#fbfaf7] border border-[#e5ede8] flex items-start gap-3 text-sm leading-[1.6] text-[#4e6462]"
                          >
                            <span className="text-xs font-semibold text-[#287873] tabular-nums mt-0.5 shrink-0">
                              0{idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* Clinical Safety Notice */}
                <div className="mt-6 p-4 rounded-md bg-[#fbfaf7] border border-[#dce6e0] flex items-start gap-3">
                  <AlertCircle
                    className="w-4 h-4 text-[#287873] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#123f43]">
                      {copy.warningHeading}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm leading-[1.6] text-[#516866]">
                      {activeTreatment.whenToContact}
                    </p>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-6 pt-5 border-t border-[#e5ede8] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectReason(activeTreatment.reasonKey)}
                      className="inline-flex items-center justify-center gap-2 min-h-[40px] bg-[#123f43] hover:bg-[#0d3135] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>{copy.bookLabel}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={onOpenWhatsAppDrawer}
                      className="inline-flex items-center justify-center min-h-[40px] px-3 text-xs sm:text-sm font-semibold text-[#123f43] hover:text-[#287873] underline-offset-4 hover:underline transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copy.whatsappLabel}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyGuide}
                    className="inline-flex items-center justify-center gap-2 min-h-[40px] bg-white hover:bg-[#edf5f1] text-[#123f43] border border-[#cad8d1] text-xs sm:text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedId === activeTreatment.id ? (
                      <>
                        <Check className="w-4 h-4 text-[#168b57]" aria-hidden="true" />
                        <span>{copy.copiedLabel}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>{copy.copyGuideLabel}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
