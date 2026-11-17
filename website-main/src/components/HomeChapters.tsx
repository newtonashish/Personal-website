import { ArrowRight } from 'lucide-react';
import { TRANSLATIONS, type Language, type SitePage } from '../data/translations';

interface HomeChaptersProps {
  language: Language;
  onNavigate: (page: SitePage) => void;
}

export function HomeChapters({ language, onNavigate }: HomeChaptersProps) {
  const copy = TRANSLATIONS[language].homeChapters;

  return (
    <section className="py-16 md:py-20 bg-[#fbfaf7] border-b border-[#e3ebe6]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="max-w-xl mb-10">
          <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
            {copy.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.items.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => onNavigate(item.page)}
              className="group text-left bg-white hover:bg-[#f4f9f6] border border-[#dce7e1] hover:border-[#287873]/40 rounded-lg p-7 flex flex-col justify-between transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#5d7370]">
                  <span className="font-mono tabular-nums">{item.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.label}</span>
                </div>

                <h3 className="mt-3 font-serif text-xl sm:text-2xl font-medium text-[#123f43] group-hover:text-[#287873] transition-colors [text-wrap:balance]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-[1.7] text-[#516866]">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e8efeb] inline-flex items-center gap-1.5 text-sm font-semibold text-[#123f43] group-hover:text-[#287873] transition-colors">
                <span>{item.cta}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
