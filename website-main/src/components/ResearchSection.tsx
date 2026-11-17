import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ORCID_URL, type ResearchCategory } from '../data/practiceData';
import { TRANSLATIONS, type Language } from '../data/translations';

interface ResearchSectionProps {
  language: Language;
}

export function ResearchSection({ language }: ResearchSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ResearchCategory>('all');
  const copy = TRANSLATIONS[language].research;

  const filterOptions: { id: ResearchCategory; label: string }[] = [
    { id: 'all', label: copy.filters.all },
    { id: 'clinical', label: copy.filters.clinical },
    { id: 'patient-tech', label: copy.filters.patientTech },
  ];

  const visibleInterests =
    activeCategory === 'all'
      ? copy.items
      : copy.items.filter((item) => item.category === activeCategory);

  return (
    <section id="research" className="py-16 md:py-24 bg-white border-b border-[#e3ebe6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
              {copy.title}
            </h2>
          </div>

          {/* Interactive segmented filter */}
          <div
            role="group"
            aria-label={copy.title}
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#edf5f1] rounded-lg border border-[#dce6e0] self-start md:self-auto"
          >
            {filterOptions.map((option) => {
              const isActive = activeCategory === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveCategory(option.id)}
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

        {/* Clean hairline-bordered index without thick left accent bars */}
        <div className="border border-[#dce6e0] rounded-lg bg-[#fbfaf7] divide-y divide-[#e3ebe6]">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e3ebe6]">
            {visibleInterests.map((item, idx) => (
              <div
                key={item.id}
                className={`p-6 sm:p-7 ${idx >= 2 ? 'md:border-t md:border-[#e3ebe6]' : ''}`}
              >
                <div className="flex items-center gap-2 text-xs text-[#607774] tabular-nums">
                  <span>{item.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.categoryLabel}</span>
                </div>
                <h3 className="mt-2 font-serif text-xl font-medium text-[#123f43]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.7] text-[#516866]">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 sm:px-7 bg-white rounded-b-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-[#516866]">{copy.orcidNote}</p>
            <a
              href={ORCID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-[#123f43] hover:text-[#287873] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
            >
              <span>{copy.orcidLink}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
