import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ORCID_URL } from '../data/practiceData';
import { TRANSLATIONS, type Language } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

interface ContactFooterProps {
  language: Language;
  onChangeLanguage: (next: Language) => void;
  onOpenWhatsAppDrawer: () => void;
}

export function ContactFooter({
  language,
  onChangeLanguage,
  onOpenWhatsAppDrawer,
}: ContactFooterProps) {
  const currentYear = new Date().getFullYear();
  const copy = TRANSLATIONS[language].contactFooter;

  return (
    <>
      <section id="contact" className="bg-[#123f43] text-white py-16 md:py-20">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 text-center">
          <p className="text-sm font-medium text-[#d7b983]">{copy.kicker}</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-[42px] font-medium text-white [text-wrap:balance]">
            {copy.title}
          </h2>
          <p className="mt-4 text-base text-[#cfe0da] max-w-md mx-auto leading-[1.7]">
            {copy.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenWhatsAppDrawer}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-white hover:bg-[#edf5f1] text-[#123f43] text-sm font-semibold px-6 py-3 rounded-md transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{copy.cta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#0c3033] text-[#c7d7d1] py-8 px-5 sm:px-8 border-t border-white/10">
        <div className="max-w-[1180px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-center lg:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-white">{copy.brandLine}</p>
            <p className="text-[#b0c5be]">{copy.disclaimer}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 shrink-0">
            <LanguageSwitcher
              language={language}
              onChangeLanguage={onChangeLanguage}
              variant="dark"
            />
            <a
              href={ORCID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#d7e5e0] hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              <span>{copy.orcidLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <span className="tabular-nums text-[#a6bbb4]">
              © {currentYear} {copy.rightsReserved}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
