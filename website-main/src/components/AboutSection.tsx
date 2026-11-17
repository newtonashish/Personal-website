import { ArrowUpRight } from 'lucide-react';
import { ORCID_URL, PRACTICE_IMAGES } from '../data/practiceData';
import { TRANSLATIONS, type Language } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  language: Language;
}

export function AboutSection({ language }: AboutSectionProps) {
  const copy = TRANSLATIONS[language].about;

  return (
    <section id="about" className="py-16 md:py-24 bg-[#fbfaf7]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          <div className="lg:col-span-5">
            <div className="h-[360px] sm:h-[420px] lg:h-full min-h-[380px] rounded-lg overflow-hidden border border-[#dce6e0] bg-white">
              <ResilientImage
                src={PRACTICE_IMAGES.clinicalPortrait}
                alt={copy.imageAlt}
                className="w-full h-full object-cover object-top"
                fallbackTitle={copy.imageFallbackTitle}
                fallbackSubtitle={copy.imageFallbackSubtitle}
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center py-2">
            <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>

            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
              {copy.titlePrefix}{' '}
              <span className="italic text-[#287873]">{copy.titleSuffix}</span>
            </h2>

            <div className="mt-6 space-y-4 text-base leading-[1.75] text-[#4e6462] max-w-[65ch]">
              <p>{copy.bio1}</p>
              <p>{copy.bio2}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e3ebe6] flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-[#607774]">
                <span>{copy.metaClinical}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{copy.metaAcademic}</span>
              </div>

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
      </div>
    </section>
  );
}
