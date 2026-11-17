import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TRANSLATIONS, type AppointmentReasonKey, type Language } from '../data/translations';

type TestimonialFilter = 'all' | 'endodontics' | 'family-trauma';

interface TestimonialsSectionProps {
  language: Language;
  onSelectReason: (reasonKey: AppointmentReasonKey) => void;
}

export function TestimonialsSection({ language, onSelectReason }: TestimonialsSectionProps) {
  const [filter, setFilter] = useState<TestimonialFilter>('all');
  const copy = TRANSLATIONS[language].testimonials;

  const filterOptions: { id: TestimonialFilter; label: string }[] = [
    { id: 'all', label: copy.filters.all },
    { id: 'endodontics', label: copy.filters.endodontics },
    { id: 'family-trauma', label: copy.filters.familyTrauma },
  ];

  const visibleItems =
    filter === 'all' ? copy.items : copy.items.filter((item) => item.category === filter);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#fbfaf7] border-b border-[#e3ebe6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
              {copy.title}
            </h2>
            <p className="mt-3 text-base text-[#516866]">{copy.subtitle}</p>
          </div>

          <div
            role="group"
            aria-label={copy.title}
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#edf5f1] rounded-lg border border-[#dce6e0] self-start md:self-auto"
          >
            {filterOptions.map((option) => {
              const isActive = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873] ${
                    isActive
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleItems.map((review) => (
            <article
              key={review.id}
              className="bg-white border border-[#dce6e0] rounded-lg p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#607774] tabular-nums">
                  <span>{review.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{review.serviceLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{review.outcomeLabel}</span>
                </div>

                <blockquote className="mt-4 font-serif text-lg sm:text-[19px] leading-[1.65] text-[#123f43]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-5 border-t border-[#edf3ef] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#123f43]">{review.patientName}</p>
                  <p className="text-xs text-[#607774] mt-0.5">{review.patientContext}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectReason(review.reasonKey)}
                  className="inline-flex items-center gap-1.5 min-h-[38px] text-xs sm:text-sm font-semibold text-[#123f43] hover:text-[#287873] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
                >
                  <span>{copy.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#647875]">{copy.note}</p>
      </div>
    </section>
  );
}
