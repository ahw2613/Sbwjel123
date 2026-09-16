import React from 'react';
import { Community, Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { communities } from '../data/communities';
import { ChevronRight } from 'lucide-react';

interface CommunitiesPageProps {
  onSelectCommunity: (slug: string) => void;
  properties: Property[];
}

export const CommunitiesPage: React.FC<CommunitiesPageProps> = ({ onSelectCommunity, properties }) => {
  const { language } = useLanguage();
  const t = translations[language].communities;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-28 text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 mb-16">
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-950">
          {t.pageTitle}
        </h1>
        <p className="mt-3 text-base text-neutral-600 max-w-3xl font-light leading-relaxed">
          {t.pageDesc}
        </p>
      </div>

      {/* Large Visual Community Showcases */}
      <div className="space-y-20">
        {communities.map((comm, index) => {
          const matchingPropertiesCount = properties.filter((p) => p.city.toLowerCase() === comm.name.toLowerCase()).length;
          const isEven = index % 2 === 1;

          return (
            <article
              key={comm.id}
              onClick={() => onSelectCommunity(comm.slug)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Image Col */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={comm.heroImage}
                    alt={comm.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>

              {/* Text / Info Col */}
              <div className={`lg:col-span-5 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="space-y-1">
                  <div className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                    {comm.county} · {comm.zipCodes.join(', ')}
                  </div>
                  <h2 className="text-3xl font-normal tracking-tight text-neutral-950">
                    {comm.name}, NJ
                  </h2>
                  <div className="text-sm font-medium text-neutral-600">
                    {language === 'ko' ? comm.koreanName : ''}
                  </div>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                  {language === 'ko' ? comm.overviewKo : comm.overviewEn}
                </p>

                {/* Key stats pills */}
                <div className="pt-2 grid grid-cols-2 gap-4 text-xs border-t border-neutral-200">
                  <div>
                    <span className="text-neutral-400 block font-medium uppercase">{t.medianBuyLabel}</span>
                    <span className="text-sm font-semibold text-neutral-900">{comm.medianPriceBuy}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-medium uppercase">{t.medianRentLabel}</span>
                    <span className="text-sm font-semibold text-neutral-900">{comm.medianRent}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-neutral-950 group-hover:text-neutral-600 transition-colors">
                    <span>{t.exploreTown}</span>
                    <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
