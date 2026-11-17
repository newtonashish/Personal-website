import { Languages } from 'lucide-react';
import { TRANSLATIONS, type Language } from '../data/translations';

interface LanguageSwitcherProps {
  language: Language;
  onChangeLanguage: (next: Language) => void;
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({
  language,
  onChangeLanguage,
  variant = 'light',
}: LanguageSwitcherProps) {
  const copy = TRANSLATIONS[language].languageSwitch;
  const isDark = variant === 'dark';

  return (
    <div className="inline-flex items-center gap-2.5">
      <Languages
        className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#c7d7d1]' : 'text-[#287873]'}`}
        aria-hidden="true"
      />
      <div
        role="group"
        aria-label={copy.label}
        className={`inline-flex items-center gap-1 p-1 rounded-lg border ${
          isDark
            ? 'bg-[#123f43] border-white/15'
            : 'bg-white/90 border-[#d6e3dc]'
        }`}
      >
        <button
          type="button"
          onClick={() => onChangeLanguage('ne')}
          aria-pressed={language === 'ne'}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873] ${
            language === 'ne'
              ? isDark
                ? 'bg-white text-[#123f43] shadow-xs'
                : 'bg-[#123f43] text-white shadow-xs'
              : isDark
                ? 'text-[#d7e5e0] hover:text-white'
                : 'text-[#4e6462] hover:text-[#123f43]'
          }`}
        >
          {copy.nepali}
        </button>

        <button
          type="button"
          onClick={() => onChangeLanguage('en')}
          aria-pressed={language === 'en'}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873] ${
            language === 'en'
              ? isDark
                ? 'bg-white text-[#123f43] shadow-xs'
                : 'bg-[#123f43] text-white shadow-xs'
              : isDark
                ? 'text-[#d7e5e0] hover:text-white'
                : 'text-[#4e6462] hover:text-[#123f43]'
          }`}
        >
          {copy.english}
        </button>
      </div>
    </div>
  );
}
