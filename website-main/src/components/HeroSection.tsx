import { ArrowRight, CalendarCheck2, Check, ChevronRight } from 'lucide-react';
import { PRACTICE_IMAGES } from '../data/practiceData';
import {
  TRANSLATIONS,
  type AppointmentReasonKey,
  type Language,
} from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  language: Language;
  onChangeLanguage: (next: Language) => void;
  onQuickBook: (reasonKey: AppointmentReasonKey) => void;
  onOpenManageBookings: () => void;
  onScrollToServices: () => void;
}

export function HeroSection({
  language,
  onChangeLanguage,
  onQuickBook,
  onOpenManageBookings,
  onScrollToServices,
}: HeroSectionProps) {
  const copy = TRANSLATIONS[language].hero;

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#f6f9f6] via-[#fbfaf7] to-[#eaf2ed] border-b border-[#dfe8e3]"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 pt-6 pb-12 md:pt-10 md:pb-16">
        {/* Clean single-line utility row inside Hero */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#dde7e1]">
          <p className="text-xs sm:text-sm font-medium text-[#287873] tracking-wide">
            {copy.kicker}
          </p>
          <LanguageSwitcher language={language} onChangeLanguage={onChangeLanguage} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Patient-attracting headline & booking CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center py-1">
            <h1 className="font-serif text-[clamp(2.45rem,4.6vw,4rem)] font-medium leading-[1.12] text-[#123f43] [text-wrap:balance] max-w-xl">
              {copy.headlineLine1}{' '}
              <span className="italic text-[#287873] block sm:inline">
                {copy.headlineLine2}
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-[17px] leading-[1.75] text-[#516866] max-w-[52ch]">
              {copy.lead}
            </p>

            {/* Unboxed comfort promises */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-[#123f43]">
              {copy.comfortPromises.map((promise) => (
                <li key={promise} className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#168b57] shrink-0" aria-hidden="true" />
                  <span>{promise}</span>
                </li>
              ))}
            </ul>

            {/* Clear action hierarchy */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onQuickBook('checkup')}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] bg-[#123f43] hover:bg-[#0d3135] text-white text-sm font-medium px-6 py-3 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
              >
                <span>{copy.primaryCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenManageBookings}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] bg-white hover:bg-[#edf5f1] text-[#123f43] border border-[#cad8d1] text-sm font-medium px-5 py-3 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
              >
                <CalendarCheck2 className="w-4 h-4 text-[#287873]" aria-hidden="true" />
                <span>{copy.manageBookingsCta}</span>
              </button>

              <button
                type="button"
                onClick={onScrollToServices}
                className="inline-flex items-center gap-1 min-h-[44px] px-1 text-sm font-semibold text-[#123f43] hover:text-[#287873] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
              >
                <span>{copy.secondaryCta}</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right column: Calm portrait showcase */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[390px] lg:max-w-none h-[400px] sm:h-[440px] lg:h-[460px] rounded-t-[200px] rounded-b-lg overflow-hidden border border-[#d6e3dc] bg-[#e5eee9] shadow-sm">
              <ResilientImage
                src={PRACTICE_IMAGES.portrait}
                alt={copy.portraitAlt}
                className="w-full h-full object-cover object-top"
                fallbackTitle={copy.portraitFallbackTitle}
                fallbackSubtitle={copy.portraitFallbackSubtitle}
              />
            </div>
          </div>
        </div>

        {/* Interactive Quick-Book Treatment Strip */}
        <div className="mt-10 bg-white border border-[#dce6e0] rounded-lg p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#edf3ef]">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-medium text-[#123f43]">
                {copy.quickBookTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#516866] mt-0.5">
                {copy.quickBookSubtitle}
              </p>
            </div>
            <p className="text-xs font-medium text-[#287873] whitespace-nowrap">
              {copy.stripQualificationValue} · {copy.stripFocusValue}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {copy.quickBookOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => onQuickBook(opt.reasonKey)}
                className="group text-left p-4 rounded-md border border-[#dde7e1] bg-[#fbfdfb] hover:bg-[#edf5f1] hover:border-[#287873]/40 transition-colors flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#123f43] group-hover:text-[#0d3135] truncate">
                    {opt.label}
                  </p>
                  <p className="mt-1 text-xs text-[#607774] tabular-nums">{opt.duration}</p>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-[#287873] shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
