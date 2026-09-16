import React from 'react';
import { Community, Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { ArrowLeft, Navigation, GraduationCap, Home, Clock } from 'lucide-react';

interface CommunityDetailPageProps {
  community: Community;
  properties: Property[];
  onBack: () => void;
  onSelectProperty: (id: string) => void;
  onExploreProperties: (city: string) => void;
}

export const CommunityDetailPage: React.FC<CommunityDetailPageProps> = ({
  community,
  properties,
  onBack,
  onSelectProperty,
  onExploreProperties,
}) => {
  const { language } = useLanguage();
  const t = translations[language].communities;

  // Filter properties matching this community
  const communityProperties = properties.filter(
    (p) => p.city.toLowerCase() === community.name.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-6 pb-28 text-neutral-900">
      {/* Back Button */}
      <div className="py-4 border-b border-neutral-200 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          <span>{t.allCommunities}</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-900 mb-12">
        <img
          src={community.heroImage}
          alt={community.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-white">
          <div className="text-xs font-semibold tracking-[0.25em] text-neutral-300 uppercase">
            {community.county} · ZIP {community.zipCodes.join(', ')}
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight mt-1">
            {community.name}, NJ
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-200 font-light max-w-2xl">
            {language === 'ko' ? community.taglineKo : community.taglineEn}
          </p>
        </div>
      </div>

      {/* Quick Overview & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-200">
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
            {language === 'ko' ? '지역 개요' : 'Overview'}
          </h2>
          <p className="text-base text-neutral-700 leading-relaxed font-normal">
            {language === 'ko' ? community.overviewKo : community.overviewEn}
          </p>
        </div>

        <div className="md:col-span-4 p-6 bg-stone-100/70 border border-stone-200 space-y-4">
          <div className="text-xs font-semibold tracking-wider uppercase text-neutral-900">
            {language === 'ko' ? '부동산 시세 지표' : 'Market Metrics'}
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-neutral-500 block text-xs uppercase">{t.medianBuyLabel}</span>
              <span className="text-xl font-semibold text-neutral-900">{community.medianPriceBuy}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase">{t.medianRentLabel}</span>
              <span className="text-xl font-semibold text-neutral-900">{community.medianRent}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase">{language === 'ko' ? '우편번호' : 'Postal Codes'}</span>
              <span className="font-mono text-neutral-800">{community.zipCodes.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars: Commute, Schools, Housing */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-neutral-200">
        {/* Transit */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-neutral-900 font-semibold text-sm uppercase tracking-wider">
            <Clock size={16} className="text-neutral-700" />
            <span>{t.transitLabel}</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {language === 'ko' ? community.transitToNycKo : community.transitToNycEn}
          </p>
        </div>

        {/* Schools */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-neutral-900 font-semibold text-sm uppercase tracking-wider">
            <GraduationCap size={16} className="text-neutral-700" />
            <span>{t.schoolsLabel}</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {language === 'ko' ? community.schoolsKo : community.schoolsEn}
          </p>
        </div>

        {/* Housing Stock */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-neutral-900 font-semibold text-sm uppercase tracking-wider">
            <Home size={16} className="text-neutral-700" />
            <span>{t.housingLabel}</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {language === 'ko' ? community.housingStyleKo : community.housingStyleEn}
          </p>
        </div>
      </div>

      {/* Location Map */}
      <div className="py-16 border-b border-neutral-200">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-4">
          {language === 'ko' ? `${community.name} 위치 및 주변 환경` : `Geographic Location`}
        </h2>
        <div className="h-[380px] w-full border border-neutral-200">
          <PropertyMap
            properties={communityProperties.length > 0 ? communityProperties : properties}
            center={[community.latitude, community.longitude]}
            zoomLevel={13}
            onSelectProperty={onSelectProperty}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Active Properties in this Community */}
      <div className="pt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              {language === 'ko' ? '현재 등록 매물' : 'Active Inventory'}
            </h2>
            <p className="text-2xl font-normal text-neutral-950 mt-1">
              {language === 'ko' ? `${community.name} 매물 리스트` : `Properties in ${community.name}`}
            </p>
          </div>
          <button
            onClick={() => onExploreProperties(community.name)}
            className="text-xs font-semibold uppercase tracking-wider text-neutral-950 hover:underline cursor-pointer"
          >
            {t.viewCommunityProperties.replace('{city}', community.name)} →
          </button>
        </div>

        {communityProperties.length === 0 ? (
          <div className="p-12 text-center bg-stone-50 border border-stone-200">
            <p className="text-sm text-neutral-600">
              {language === 'ko'
                ? `현재 ${community.name}에 공개 등록된 매물 준비 중입니다. 비공개 오프마켓 매물은 문의해 주시기 바랍니다.`
                : `Active public listings in ${community.name} are currently updating. Inquire for private off-market opportunities.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
