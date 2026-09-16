import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { realEstateServices } from '../data/services';
import { ArrowRight, ChevronRight, FileText } from 'lucide-react';

interface ServicesProcessSectionProps {
  onNavigate: (page: string, param?: string) => void;
}

export const ServicesProcessSection: React.FC<ServicesProcessSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = translations[language].servicesSection;

  const [activeServiceId, setActiveServiceId] = useState<'sell' | 'buy' | 'rent'>('sell');

  const currentService = realEstateServices.find((s) => s.id === activeServiceId) || realEstateServices[0];

  // For the Home page summary, display the key first 4 milestone steps concisely
  const summarySteps = currentService.steps.slice(0, 4);

  return (
    <section id="services-process-section" className="max-w-7xl mx-auto px-6 md:px-10">
      {/* Section Header with Natural Word Breaks */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-neutral-200 pb-8">
        <div>
          <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-2">
            {t.tag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-light leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* View Full Process Page Navigation Button */}
        <button
          onClick={() => onNavigate('process')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-950 uppercase hover:text-neutral-600 transition-colors cursor-pointer group flex-shrink-0"
        >
          <span>{t.viewFullProcess}</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3 Main Service Track Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
        {realEstateServices.map((service) => {
          const isActive = activeServiceId === service.id;
          return (
            <button
              key={service.id}
              onClick={() => setActiveServiceId(service.id)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:text-neutral-950'
              }`}
            >
              {language === 'ko' ? service.titleKo : service.titleEn}
            </button>
          );
        })}
      </div>

      {/* Overview Banner for Selected Service */}
      <div className="bg-stone-50 border border-stone-200 p-6 sm:p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              {language === 'ko' ? currentService.titleKo : currentService.titleEn}
            </div>
            <h3 className="text-xl sm:text-2xl font-normal text-neutral-950 tracking-tight leading-snug">
              {language === 'ko' ? currentService.taglineKo : currentService.taglineEn}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              {language === 'ko' ? currentService.summaryKo : currentService.summaryEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigate('process')}
              className="px-5 py-3 bg-white border border-neutral-300 text-neutral-900 text-xs font-semibold tracking-wider uppercase hover:border-neutral-950 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FileText size={13} />
              <span>{t.viewFullProcess}</span>
            </button>
            <button
              onClick={() => onNavigate(currentService.targetPage)}
              className="px-6 py-3 bg-neutral-950 text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{language === 'ko' ? currentService.ctaKo : currentService.ctaEn}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Concise 4-Step Milestone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summarySteps.map((s) => (
          <div
            key={s.step}
            className="p-6 bg-white border border-neutral-200 transition-all hover:border-neutral-900 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xl font-light font-mono text-neutral-400 group-hover:text-neutral-950 transition-colors">
                  {s.step}
                </span>
                {(s.keyHighlightKo || s.keyHighlightEn) && (
                  <span className="text-[10px] font-medium px-2 py-0.5 bg-neutral-100 text-neutral-700 tracking-tight">
                    {language === 'ko' ? s.keyHighlightKo : s.keyHighlightEn}
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-neutral-950 mt-4 tracking-tight leading-snug">
                {language === 'ko' ? s.titleKo : s.titleEn}
              </h4>

              <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-light line-clamp-3">
                {language === 'ko' ? s.descKo : s.descEn}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors flex items-center justify-between">
              <span>{language === 'ko' ? '세부 단계 확인' : 'View Step'}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
