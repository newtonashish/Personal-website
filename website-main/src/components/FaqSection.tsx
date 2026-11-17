import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { TRANSLATIONS, type AppointmentReasonKey, type Language } from '../data/translations';

interface FaqSectionProps {
  language: Language;
  onSelectReason: (reasonKey: AppointmentReasonKey) => void;
  onOpenWhatsAppDrawer: () => void;
}

export function FaqSection({
  language,
  onSelectReason,
  onOpenWhatsAppDrawer,
}: FaqSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const copy = TRANSLATIONS[language].faq;
  const reasonLabels = TRANSLATIONS[language].appointment.form.reasons;
  const [openId, setOpenId] = useState<string | null>(copy.items[0]?.id ?? null);

  function toggleItem(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#fbfaf7] border-b border-[#e3ebe6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left editorial intro */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
              {copy.title}
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-[#516866]">{copy.subtitle}</p>

            <div className="mt-6 pt-6 border-t border-[#e3ebe6]">
              <p className="text-sm text-[#607774]">{copy.askPrompt}</p>
              <button
                type="button"
                onClick={onOpenWhatsAppDrawer}
                className="mt-2 inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-[#123f43] hover:text-[#287873] underline-offset-4 hover:underline transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
              >
                <span>{copy.askAction}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right accordion list */}
          <div className="lg:col-span-8 bg-white border border-[#dce6e0] rounded-lg divide-y divide-[#e3ebe6]">
            {copy.items.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const triggerId = `faq-trigger-${item.id}`;

              return (
                <div key={item.id}>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left px-6 py-5 sm:px-7 sm:py-6 flex items-start justify-between gap-4 hover:bg-[#f7faf8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#287873]"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[#607774] tabular-nums">
                        <span>{item.number}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.topic}</span>
                      </div>
                      <h3 className="mt-1.5 font-serif text-lg sm:text-xl font-medium text-[#123f43] leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-[#287873] shrink-0 mt-1 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="px-6 pb-6 sm:px-7 sm:pb-7"
                      >
                        <p className="text-sm sm:text-[15px] leading-[1.75] text-[#4e6462] max-w-[65ch]">
                          {item.answer}
                        </p>

                        {item.relatedReasonKey && (
                          <div className="mt-4 pt-3 border-t border-[#edf3ef]">
                            <button
                              type="button"
                              onClick={() => onSelectReason(item.relatedReasonKey!)}
                              className="inline-flex items-center gap-1.5 min-h-[38px] text-xs sm:text-sm font-semibold text-[#123f43] hover:text-[#287873] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
                            >
                              <span>
                                {copy.requestPrefix}{' '}
                                {language === 'en'
                                  ? reasonLabels[item.relatedReasonKey].toLowerCase()
                                  : reasonLabels[item.relatedReasonKey]}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
