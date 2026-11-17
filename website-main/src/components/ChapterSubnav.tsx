import { ArrowLeft } from 'lucide-react';
import { TRANSLATIONS, type Language, type SitePage } from '../data/translations';

interface ChapterSubnavProps {
  language: Language;
  page: Exclude<SitePage, 'home'>;
  onNavigateHome: () => void;
  onJumpAnchor: (anchor: string) => void;
}

export function ChapterSubnav({
  language,
  page,
  onNavigateHome,
  onJumpAnchor,
}: ChapterSubnavProps) {
  const copy = TRANSLATIONS[language];
  const chapter = copy.chapterSubnav[page];

  return (
    <div className="md:sticky md:top-12 z-20 bg-[#fbfaf7]/90 backdrop-blur-md border-b border-[#e3ebe6]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 min-h-[36px] text-xs font-medium text-[#516866] hover:text-[#123f43] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873] rounded-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.nav.backToHome}</span>
          </button>

          <span className="text-[#c5d5ce]" aria-hidden="true">/</span>

          <h1 className="font-serif text-base sm:text-lg font-medium text-[#123f43] truncate">
            {chapter.title}
          </h1>
        </div>

        {chapter.links.length > 1 && (
          <nav
            aria-label={chapter.title}
            className="flex items-center gap-5 overflow-x-auto"
          >
            {chapter.links.map((item) => (
              <button
                key={item.anchor}
                type="button"
                onClick={() => onJumpAnchor(item.anchor)}
                className="min-h-[36px] text-xs font-medium text-[#4e6462] hover:text-[#123f43] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873] rounded-xs"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
