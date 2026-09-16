import React, { useState } from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { communities } from '../data/communities';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { ServicesProcessSection } from '../components/ServicesProcessSection';
import { ClientReviewsSection } from '../components/ClientReviewsSection';
import { SocialNewsSection } from '../components/SocialNewsSection';
import { Search, ChevronRight, ArrowDown } from 'lucide-react';

interface HomePageProps {
  properties: Property[];
  onNavigate: (page: string, param?: string) => void;
  onSearch: (params: { intent: 'buy' | 'rent'; keyword: string; propertyType: string; maxPrice: number }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ properties, onNavigate, onSearch }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [intent, setIntent] = useState<'buy' | 'rent'>('buy');
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  const featuredListings = properties
    .filter((p) => p.featured || p.id === 'prop-1' || p.id === 'prop-2' || p.id === 'prop-3' || p.id === 'prop-4')
    .slice(0, 4);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ intent, keyword, propertyType, maxPrice });
    onNavigate(intent === 'buy' ? 'buy' : 'rent');
  };

  const handleQuickCity = (cityName: string) => {
    setKeyword(cityName);
    onSearch({ intent, keyword: cityName, propertyType, maxPrice });
    onNavigate(intent === 'buy' ? 'buy' : 'rent');
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-process-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION: IMAGE-ONLY ARCHITECTURAL VISUAL */}
      <section className="relative min-h-[640px] lg:min-h-[760px] flex items-center justify-center text-white overflow-hidden">
        {/* Architectural Image Background Layer */}
        <div className="absolute inset-0 -z-10 bg-neutral-950 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
            alt="THE ADDRESS North Jersey Luxury Real Estate"
            className="w-full h-full object-cover object-center brightness-90 animate-in fade-in duration-700"
          />
          {/* Subtle multi-stop architectural gradients for crystal-clear legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
        </div>

        {/* Hero Central Content with Natural Line Wrapping */}
        <div className="w-full max-w-5xl mx-auto px-6 py-20 text-center relative z-10">
          <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-neutral-300 mb-3">
            {t.hero.tagline}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none text-white break-keep">
            {t.hero.headline}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-200 max-w-2xl mx-auto font-light leading-relaxed break-keep">
            {language === 'ko' ? (
              <>
                버겐 &amp; 허드슨 카운티 전역의 주택 매매, 프리미엄 렌트,<br className="hidden sm:inline" />
                신뢰할 수 있는 현지 전문 부동산 자문을 제공합니다.
              </>
            ) : (
              t.hero.subheadline
            )}
          </p>

          {/* Search Bar Interface */}
          <div className="mt-10 max-w-3xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl p-4 sm:p-5 text-neutral-900 border border-white/20 text-left">
            {/* BUY / RENT Tabs */}
            <div className="flex border-b border-neutral-200 pb-3 mb-4 space-x-6 text-sm font-semibold tracking-wider">
              <button
                type="button"
                onClick={() => setIntent('buy')}
                className={`pb-1 cursor-pointer transition-colors relative ${
                  intent === 'buy'
                    ? 'text-neutral-950 font-bold border-b-2 border-neutral-950'
                    : 'text-neutral-400 hover:text-neutral-800'
                }`}
              >
                {t.hero.tabBuy}
              </button>
              <button
                type="button"
                onClick={() => setIntent('rent')}
                className={`pb-1 cursor-pointer transition-colors relative ${
                  intent === 'rent'
                    ? 'text-neutral-950 font-bold border-b-2 border-neutral-950'
                    : 'text-neutral-400 hover:text-neutral-800'
                }`}
              >
                {t.hero.tabRent}
              </button>
            </div>

            {/* Input & Action */}
            <form onSubmit={handleHeroSearch} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3.5 top-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={t.hero.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 text-neutral-900 placeholder-neutral-400 text-sm border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.hero.searchButton}
                </button>
              </div>

              {/* Quick Filters Toggle Bar */}
              <div className="flex flex-wrap items-center justify-between pt-2 text-xs text-neutral-500 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">{language === 'ko' ? '추천 지역:' : 'Popular:'}</span>
                  {['Fort Lee', 'Palisades Park', 'Edgewater', 'Tenafly', 'Closter'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleQuickCity(city)}
                      className="hover:text-neutral-950 hover:underline cursor-pointer"
                    >
                      {city}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-neutral-700 font-medium underline hover:text-neutral-950 cursor-pointer"
                >
                  {showFilters
                    ? language === 'ko' ? '간단히' : 'Less filters'
                    : language === 'ko' ? '상세 필터' : 'More filters'}
                </button>
              </div>

              {/* Expanded Quick Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-200">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
                      {t.hero.allPropertyTypes}
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full p-2 border border-neutral-300 text-xs bg-white text-neutral-800 focus:outline-none focus:border-neutral-950"
                    >
                      <option value="All">{t.hero.allPropertyTypes}</option>
                      <option value="Single Family">Single Family</option>
                      <option value="Condominium">Condominium</option>
                      <option value="Townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1 uppercase tracking-wide">
                      {t.hero.maxPrice}
                    </label>
                    <select
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full p-2 border border-neutral-300 text-xs bg-white text-neutral-800 focus:outline-none focus:border-neutral-950"
                    >
                      <option value={0}>{t.hero.any}</option>
                      {intent === 'buy' ? (
                        <>
                          <option value={800000}>$800,000</option>
                          <option value={1200000}>$1,200,000</option>
                          <option value={1500000}>$1,500,000</option>
                          <option value={2000000}>$2,000,000+</option>
                        </>
                      ) : (
                        <>
                          <option value={3000}>$3,000 / mo</option>
                          <option value={4000}>$4,000 / mo</option>
                          <option value={5000}>$5,000 / mo</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Quick jump anchor to Services */}
          <div className="mt-8 text-center">
            <button
              onClick={scrollToServices}
              className="text-xs text-neutral-300 hover:text-white inline-flex items-center gap-1.5 uppercase tracking-wider font-medium cursor-pointer transition-colors"
            >
              <span>{language === 'ko' ? '주요 부동산 서비스 & 프로세스 바로보기' : 'Explore Services & Process'}</span>
              <ArrowDown size={14} className="animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CURATED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-neutral-200 pb-6">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase mb-2">
              {t.home.featuredTitle}
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight break-keep">
              {language === 'ko' ? '노스저지 엄선 추천 매물' : 'Curated North Jersey Residences'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-light leading-relaxed break-keep">
              {language === 'ko' ? (
                <>
                  입지, 학군, 건축 완성도를 엄격하게 검증하여 선별한<br className="hidden sm:inline" />
                  노스저지 대표 추천 매물입니다.
                </>
              ) : (
                t.home.featuredSubtitle
              )}
            </p>
          </div>
          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center text-xs font-semibold tracking-wider text-neutral-950 uppercase hover:text-neutral-600 transition-colors cursor-pointer group flex-shrink-0"
          >
            <span>{t.home.viewAllProperties}</span>
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Large Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {featuredListings.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelect={(id) => onNavigate('property-detail', id)}
            />
          ))}
        </div>
      </section>

      {/* 3. HOME PROCESS & SERVICES SECTION (Concise, consistent with other sections) */}
      <ServicesProcessSection onNavigate={onNavigate} />

      {/* 4. EXPLORE NORTH JERSEY COMMUNITIES */}
      <section className="bg-stone-100/70 py-20 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 border-b border-stone-300/80 pb-6">
            <div>
              <div className="text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase mb-2">
                {t.home.exploreNorthJersey}
              </div>
              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight break-keep">
                {language === 'ko' ? '버겐 & 허드슨 카운티 주요 타운' : 'Premier Commuting Communities'}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-light leading-relaxed break-keep">
                {language === 'ko' ? (
                  <>
                    맨해튼 출퇴근 동선, 우수 학군, 주거 환경에 맞춘<br className="hidden sm:inline" />
                    노스저지 핵심 타운 심층 가이드입니다.
                  </>
                ) : (
                  t.home.exploreSubtitle
                )}
              </p>
            </div>
            <button
              onClick={() => onNavigate('communities')}
              className="inline-flex items-center text-xs font-semibold tracking-wider text-neutral-950 uppercase hover:text-neutral-600 transition-colors cursor-pointer group flex-shrink-0"
            >
              <span>{language === 'ko' ? '전체 지역 가이드' : 'All Communities'}</span>
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.slice(0, 6).map((comm) => (
              <div
                key={comm.id}
                onClick={() => onNavigate('community-detail', comm.slug)}
                className="group cursor-pointer bg-white overflow-hidden transition-all duration-300 border border-neutral-200 hover:border-neutral-900"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={comm.heroImage}
                    alt={comm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xl font-semibold tracking-tight">
                      {comm.name}, NJ
                    </div>
                    <div className="text-xs text-neutral-300 font-light mt-0.5">
                      {language === 'ko' ? comm.koreanName : `ZIP: ${comm.zipCodes.join(', ')}`}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed break-keep">
                    {language === 'ko' ? comm.taglineKo : comm.taglineEn}
                  </p>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
                    <span>{comm.medianPriceBuy} {language === 'ko' ? '중간가' : 'median'}</span>
                    <span className="text-neutral-950 group-hover:underline">
                      {language === 'ko' ? '타운 둘러보기' : 'Explore'} →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROPERTY DISCOVERY INTERACTIVE MAP */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-6 border-b border-neutral-200 pb-4">
          <div className="text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase mb-2">
            {t.home.mapSectionTitle}
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950 leading-tight break-keep">
            {language === 'ko' ? '노스저지 부동산 인터랙티브 지도' : 'Interactive Geographic Discovery'}
          </h2>
          <p className="mt-1 text-sm text-neutral-600 max-w-2xl font-light leading-relaxed break-keep">
            {t.home.mapSectionSubtitle}
          </p>
        </div>

        <div className="h-[480px] w-full border border-neutral-200 shadow-xs">
          <PropertyMap
            properties={properties}
            className="w-full h-full"
            onSelectProperty={(id) => onNavigate('property-detail', id)}
          />
        </div>
      </section>

      {/* 6. CLIENT REVIEWS & VERIFIED STORIES (Horizontal Single-Row Slider) */}
      <ClientReviewsSection />

      {/* 7. SNS & MEDIA SECTION (YouTube, Instagram, Load More) */}
      <SocialNewsSection />

      {/* 8. SELLER ADVISORY TEASER */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-neutral-950 text-white p-10 sm:p-16 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase">
              {language === 'ko' ? '주택 매도 자문' : 'Seller Advisory'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white leading-tight break-keep">
              {t.home.sellTeaserTitle}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed break-keep">
              {language === 'ko' ? (
                <>
                  최근 실거래 데이터 기반의 정밀 가치 평가부터 맞춤 스테이징,<br className="hidden sm:inline" />
                  현지 바이어 네트워크를 통해 최고 가치의 매도를 실현합니다.
                </>
              ) : (
                t.home.sellTeaserDesc
              )}
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('sell')}
                className="px-8 py-3.5 bg-white text-neutral-950 text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                {t.home.sellTeaserCta}
              </button>
              <button
                onClick={() => onNavigate('process')}
                className="px-8 py-3.5 border border-neutral-600 text-white text-xs font-semibold tracking-wider uppercase hover:border-white transition-colors cursor-pointer"
              >
                {language === 'ko' ? '매도 프로세스 상세 보기' : 'View Seller Process'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
