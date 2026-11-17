import { ArrowRight } from 'lucide-react';
import { PRACTICE_IMAGES, REASON_ESTIMATED_MINUTES } from '../data/practiceData';
import { TRANSLATIONS, type AppointmentReasonKey, type Language } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  language: Language;
  onSelectService: (reasonKey: AppointmentReasonKey) => void;
}

export function ServicesSection({ language, onSelectService }: ServicesSectionProps) {
  const copy = TRANSLATIONS[language].services;
  const featuredService = copy.items[0];
  const secondaryServices = copy.items.slice(1);

  return (
    <section id="services" className="py-16 md:py-24 bg-[#edf5f1] border-y border-[#dce7e1]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
            {copy.title}
          </h2>
          <p className="mt-3 text-base text-[#516866]">{copy.subtitle}</p>
        </div>

        {/* Asymmetric editorial grid with warm patient-attracting treatment photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Spotlight card spanning 2 columns on desktop */}
          <article className="group md:col-span-2 bg-white border border-[#dce6e0] rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-12 transition-transform duration-200 hover:-translate-y-0.5">
            <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#287873] tabular-nums">
                  {featuredService.number}. {copy.featuredTag} ·{' '}
                  {REASON_ESTIMATED_MINUTES[featuredService.reasonKey]} {copy.durationSuffix}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium text-[#123f43]">
                  {featuredService.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[#516866]">
                  {featuredService.summary}
                </p>
                <p className="mt-2 text-xs leading-[1.6] text-[#6d807d]">
                  {featuredService.clinicalNote}
                </p>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => onSelectService(featuredService.reasonKey)}
                  className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-md bg-[#123f43] hover:bg-[#0d3135] text-white text-sm font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
                >
                  <span>{copy.featuredCta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="sm:col-span-5 min-h-[230px] sm:min-h-full overflow-hidden bg-[#e5eee9] border-t sm:border-t-0 sm:border-l border-[#e3ebe6]">
              <ResilientImage
                src={PRACTICE_IMAGES[featuredService.imageKey]}
                alt={featuredService.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fallbackTitle={featuredService.title}
                fallbackSubtitle={copy.featuredTag}
              />
            </div>
          </article>

          {/* Remaining 5 clinical service cards — each with patient-focused treatment visual */}
          {secondaryServices.map((service) => (
            <article
              key={service.id}
              className="group bg-white border border-[#dce6e0] rounded-lg overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#e5eee9] border-b border-[#e3ebe6]">
                  <ResilientImage
                    src={PRACTICE_IMAGES[service.imageKey]}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    fallbackTitle={service.title}
                    fallbackSubtitle={copy.cardTag}
                  />
                </div>

                <div className="p-6 sm:p-7 pb-0">
                  <p className="text-xs font-medium text-[#287873] tabular-nums">
                    {service.number}. {copy.cardTag} · {REASON_ESTIMATED_MINUTES[service.reasonKey]}{' '}
                    {copy.durationSuffix}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-medium text-[#123f43]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.7] text-[#516866]">
                    {service.summary}
                  </p>
                  <p className="mt-2 text-xs leading-[1.6] text-[#6d807d]">
                    {service.clinicalNote}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6 pt-5 mt-5 border-t border-[#edf3ef]">
                <button
                  type="button"
                  onClick={() => onSelectService(service.reasonKey)}
                  className="inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-[#123f43] hover:text-[#287873] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
                >
                  <span>{copy.cardCta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-[#647875]">{copy.notice}</p>
      </div>
    </section>
  );
}
