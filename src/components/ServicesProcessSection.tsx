import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { realEstateServices } from '../data/services';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface ServicesProcessSectionProps {
  onNavigate: (page: string, param?: string) => void;
}

export const ServicesProcessSection: React.FC<ServicesProcessSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = translations[language].servicesSection;

  const [activeServiceId, setActiveServiceId] = useState<'sell' | 'buy' | 'rent'>('sell');

  const currentService = realEstateServices.find((s) => s.id === activeServiceId) || realEstateServices[0];

  return (
    <section id="services-process-section" className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      {/* Section Header */}
      <div className="border-b border-neutral-200 pb-8 mb-12">
        <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-2">
          {t.tag}
        </div>
        <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950">
          {t.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl font-light leading-relaxed">
          {t.subtitle}
        </p>

        {/* 3 Main Service Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-8">
          {realEstateServices.map((service) => {
            const isActive = activeServiceId === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`px-5 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                    : 'bg-stone-50 text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:text-neutral-950'
                }`}
              >
                {language === 'ko' ? service.titleKo : service.titleEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Service Overview Banner */}
      <div className="bg-stone-50 border border-stone-200 p-6 sm:p-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {language === 'ko' ? currentService.titleKo : currentService.titleEn}
            </div>
            <h3 className="text-xl sm:text-2xl font-normal text-neutral-950 tracking-tight">
              {language === 'ko' ? currentService.taglineKo : currentService.taglineEn}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {language === 'ko' ? currentService.summaryKo : currentService.summaryEn}
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={() => onNavigate(currentService.targetPage)}
              className="w-full sm:w-auto px-6 py-3.5 bg-neutral-950 text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{language === 'ko' ? currentService.ctaKo : currentService.ctaEn}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Step-by-Step Process Milestones */}
      <div className="space-y-6">
        <div className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-4">
          {t.processTitle} ({currentService.steps.length} {language === 'ko' ? '단계' : 'Steps'})
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentService.steps.map((s, idx) => (
            <div
              key={s.step}
              className="p-6 bg-white border border-neutral-200 transition-all hover:border-neutral-900 group"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-2xl font-light font-mono text-neutral-400 group-hover:text-neutral-950 transition-colors">
                  {s.step}
                </span>
                {(s.keyHighlightKo || s.keyHighlightEn) && (
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-neutral-100 text-neutral-700 tracking-tight">
                    {language === 'ko' ? s.keyHighlightKo : s.keyHighlightEn}
                  </span>
                )}
              </div>

              <h4 className="text-base font-semibold text-neutral-950 mt-4 tracking-tight">
                {language === 'ko' ? s.titleKo : s.titleEn}
              </h4>

              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                {language === 'ko' ? s.descKo : s.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
