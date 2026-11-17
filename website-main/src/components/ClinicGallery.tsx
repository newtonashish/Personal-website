import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { PRACTICE_IMAGES } from '../data/practiceData';
import { TRANSLATIONS, type Language } from '../data/translations';
import { ResilientImage } from './ResilientImage';

type GalleryFilter = 'all' | 'rooms' | 'equipment';

interface ClinicGalleryProps {
  language: Language;
}

export function ClinicGallery({ language }: ClinicGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const copy = TRANSLATIONS[language].clinicGallery;

  const filterOptions: { id: GalleryFilter; label: string }[] = [
    { id: 'all', label: copy.filters.all },
    { id: 'rooms', label: copy.filters.rooms },
    { id: 'equipment', label: copy.filters.equipment },
  ];

  const visibleItems =
    filter === 'all' ? copy.items : copy.items.filter((item) => item.category === filter);

  const activeItem = activeIndex !== null ? visibleItems[activeIndex] ?? null : null;

  useEffect(() => {
    setActiveIndex(null);
  }, [filter]);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, visibleItems.length]);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#edf5f1] border-b border-[#dce7e1]">
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
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white/80 rounded-lg border border-[#d6e2dc] self-start md:self-auto"
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
                      ? 'bg-[#123f43] text-white shadow-xs'
                      : 'text-[#4e6462] hover:text-[#123f43]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric editorial photo bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((item, idx) => {
            const isWide =
              filter === 'all' && (idx === 0 || idx === 3);

            return (
              <figure
                key={item.id}
                className={`bg-white border border-[#dce6e0] rounded-lg overflow-hidden flex flex-col justify-between ${
                  isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`${item.title} — ${copy.viewPhotoLabel}`}
                  className="group relative block w-full h-[240px] sm:h-[280px] overflow-hidden bg-[#e5eee9] cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#287873]"
                >
                  <ResilientImage
                    src={PRACTICE_IMAGES[item.imageKey]}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    fallbackTitle={item.title}
                    fallbackSubtitle={item.categoryLabel}
                  />
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0c3033]/80 text-white text-xs font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{copy.viewPhotoLabel}</span>
                  </span>
                </button>

                <figcaption className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-[#607774] tabular-nums">
                    <span>{item.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.categoryLabel}</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl font-medium text-[#123f43]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.65] text-[#516866]">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 bg-[#092326]/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl border border-[#dce6e0]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-[#0c3033] h-[280px] sm:h-[460px]">
                <ResilientImage
                  src={PRACTICE_IMAGES[activeItem.imageKey]}
                  alt={activeItem.alt}
                  className="w-full h-full object-cover"
                  fallbackTitle={activeItem.title}
                  fallbackSubtitle={activeItem.categoryLabel}
                />

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label={copy.closeLightboxLabel}
                  className="absolute top-3 right-3 w-10 h-10 inline-flex items-center justify-center rounded-md bg-[#0c3033]/85 hover:bg-[#0c3033] text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>

                {visibleItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex(
                          (activeIndex - 1 + visibleItems.length) % visibleItems.length
                        )
                      }
                      aria-label={copy.prevLabel}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center rounded-md bg-[#0c3033]/80 hover:bg-[#0c3033] text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((activeIndex + 1) % visibleItems.length)
                      }
                      aria-label={copy.nextLabel}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center rounded-md bg-[#0c3033]/80 hover:bg-[#0c3033] text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#607774] tabular-nums">
                    <span>{activeItem.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeItem.categoryLabel}</span>
                  </div>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-[#123f43]">
                    {activeItem.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#516866]">{activeItem.caption}</p>
                </div>

                <p className="text-xs font-medium text-[#607774] tabular-nums shrink-0">
                  {activeIndex + 1} / {visibleItems.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
