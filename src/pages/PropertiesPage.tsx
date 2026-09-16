import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { Search, SlidersHorizontal, MapPin, Grid, Map as MapIcon, X } from 'lucide-react';

interface PropertiesPageProps {
  mode?: 'all' | 'buy' | 'rent';
  properties: Property[];
  onNavigate: (page: string, param?: string) => void;
  initialFilters?: {
    keyword?: string;
    city?: string;
    propertyType?: string;
    maxPrice?: number;
  };
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  mode = 'all',
  properties,
  onNavigate,
  initialFilters,
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Filter States
  const [keyword, setKeyword] = useState(initialFilters?.keyword || '');
  const [selectedCity, setSelectedCity] = useState(initialFilters?.city || 'All');
  const [selectedType, setSelectedType] = useState(initialFilters?.propertyType || 'All');
  const [minBeds, setMinBeds] = useState<number>(0);
  const [minBaths, setMinBaths] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters?.maxPrice || 0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest' | 'sqft-desc'>('featured');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // View state (split vs map vs list on mobile)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [desktopLayout, setDesktopLayout] = useState<'split' | 'grid'>('split');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Unique cities from North Jersey data
  const cities = useMemo(() => {
    const set = new Set(properties.map((p) => p.city));
    return Array.from(set).sort();
  }, [properties]);

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Mode filter
        if (mode === 'buy' && p.isRental) return false;
        if (mode === 'rent' && !p.isRental) return false;

        // Keyword filter
        if (keyword.trim()) {
          const q = keyword.toLowerCase();
          const matchTitle = (p.titleEn + ' ' + p.titleKo).toLowerCase().includes(q);
          const matchCity = p.city.toLowerCase().includes(q);
          const matchZip = p.zip.includes(q);
          const matchAddr = p.address.toLowerCase().includes(q);
          if (!matchTitle && !matchCity && !matchZip && !matchAddr) return false;
        }

        // City filter
        if (selectedCity !== 'All' && p.city !== selectedCity) return false;

        // Property Type filter
        if (selectedType !== 'All' && p.propertyType !== selectedType) return false;

        // Beds filter
        if (minBeds > 0 && p.beds < minBeds) return false;

        // Baths filter
        if (minBaths > 0 && p.baths < minBaths) return false;

        // Max price filter
        if (maxPrice > 0 && p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
        if (sortBy === 'sqft-desc') return b.sqft - a.sqft;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [properties, mode, keyword, selectedCity, selectedType, minBeds, minBaths, maxPrice, sortBy]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedCity('All');
    setSelectedType('All');
    setMinBeds(0);
    setMinBaths(0);
    setMaxPrice(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    keyword !== '' ||
    selectedCity !== 'All' ||
    selectedType !== 'All' ||
    minBeds > 0 ||
    minBaths > 0 ||
    maxPrice > 0;

  const pageHeading =
    mode === 'buy'
      ? t.properties.buyTitle
      : mode === 'rent'
      ? t.properties.rentTitle
      : t.properties.pageTitle;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-20">
      {/* Page Header */}
      <div className="border-b border-stone-200/80 pb-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-normal text-neutral-950 tracking-tight">
              {pageHeading}
            </h1>
            <p className="mt-1.5 text-sm text-neutral-500">
              {t.properties.resultsCount.replace('{count}', filteredProperties.length.toString())}
            </p>
          </div>

          {/* Desktop Layout Switcher */}
          <div className="hidden lg:flex items-center space-x-2 text-xs font-medium text-neutral-600">
            <button
              onClick={() => setDesktopLayout('split')}
              className={`px-3 py-1.5 border transition-colors cursor-pointer flex items-center gap-1.5 ${
                desktopLayout === 'split'
                  ? 'border-neutral-950 bg-neutral-950 text-white'
                  : 'border-neutral-300 hover:border-neutral-950 text-neutral-800'
              }`}
            >
              <MapIcon size={14} />
              <span>{t.properties.viewSplit}</span>
            </button>
            <button
              onClick={() => setDesktopLayout('grid')}
              className={`px-3 py-1.5 border transition-colors cursor-pointer flex items-center gap-1.5 ${
                desktopLayout === 'grid'
                  ? 'border-neutral-950 bg-neutral-950 text-white'
                  : 'border-neutral-300 hover:border-neutral-950 text-neutral-800'
              }`}
            >
              <Grid size={14} />
              <span>{t.properties.viewList}</span>
            </button>
          </div>

          {/* Mobile View Toggle */}
          <div className="flex lg:hidden w-full sm:w-auto border border-neutral-300 p-0.5 text-xs font-medium">
            <button
              onClick={() => setMobileView('list')}
              className={`flex-1 py-1.5 px-4 text-center cursor-pointer transition-colors ${
                mobileView === 'list' ? 'bg-neutral-950 text-white' : 'text-neutral-700'
              }`}
            >
              {t.properties.viewList}
            </button>
            <button
              onClick={() => setMobileView('map')}
              className={`flex-1 py-1.5 px-4 text-center cursor-pointer transition-colors ${
                mobileView === 'map' ? 'bg-neutral-950 text-white' : 'text-neutral-700'
              }`}
            >
              {t.properties.viewMap}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Keyword Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search size={16} className="absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-950"
            />
          </div>

          {/* City Selector */}
          <div className="w-40">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-950"
            >
              <option value="All">{t.hero.allCities}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type Selector */}
          <div className="w-40">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-950"
            >
              <option value="All">{t.hero.allPropertyTypes}</option>
              <option value="Single Family">Single Family</option>
              <option value="Condominium">Condominium</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>

          {/* Max Price Selector */}
          <div className="w-36">
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-950"
            >
              <option value={0}>{t.hero.maxPrice}: {t.hero.any}</option>
              {mode === 'rent' ? (
                <>
                  <option value={3000}>$3,000 / mo</option>
                  <option value={4000}>$4,000 / mo</option>
                  <option value={5000}>$5,000 / mo</option>
                  <option value={6000}>$6,000 / mo</option>
                </>
              ) : (
                <>
                  <option value={800000}>$800,000</option>
                  <option value={1000000}>$1,000,000</option>
                  <option value={1500000}>$1,500,000</option>
                  <option value={2000000}>$2,000,000</option>
                  <option value={3000000}>$3,000,000</option>
                </>
              )}
            </select>
          </div>

          {/* Bedrooms Selector */}
          <div className="w-32">
            <select
              value={minBeds}
              onChange={(e) => setMinBeds(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-950"
            >
              <option value={0}>{t.hero.beds}: {t.hero.any}</option>
              <option value={1}>1+ Beds</option>
              <option value={2}>2+ Beds</option>
              <option value={3}>3+ Beds</option>
              <option value={4}>4+ Beds</option>
              <option value={5}>5+ Beds</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="w-36 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-950"
            >
              <option value="featured">{t.properties.sortFeatured}</option>
              <option value="price-asc">{t.properties.sortPriceAsc}</option>
              <option value="price-desc">{t.properties.sortPriceDesc}</option>
              <option value="newest">{t.properties.sortNewest}</option>
              <option value="sqft-desc">{t.properties.sortSqftDesc}</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-neutral-500 hover:text-neutral-950 underline px-2 py-1 cursor-pointer flex items-center gap-1"
            >
              <X size={12} />
              <span>{t.properties.resetFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <div className="text-lg font-medium text-neutral-800">
            {t.properties.noResults}
          </div>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            {t.properties.resetFilters}
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Split View (List + Sticky Map) */}
          {desktopLayout === 'split' ? (
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Property Cards List */}
              <div className="lg:col-span-7 space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredProperties.map((prop) => (
                    <div
                      key={prop.id}
                      onMouseEnter={() => setSelectedPropertyId(prop.id)}
                    >
                      <PropertyCard
                        property={prop}
                        onSelect={(id) => onNavigate('property-detail', id)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Sticky Interactive Map */}
              <div className="lg:col-span-5 sticky top-28 h-[calc(100vh-140px)] min-h-[500px]">
                <PropertyMap
                  properties={filteredProperties}
                  selectedPropertyId={selectedPropertyId}
                  onSelectProperty={(id) => onNavigate('property-detail', id)}
                  className="w-full h-full shadow-xs"
                />
              </div>
            </div>
          ) : (
            /* Desktop Full Grid View */
            <div className="hidden lg:grid grid-cols-3 gap-10">
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onSelect={(id) => onNavigate('property-detail', id)}
                />
              ))}
            </div>
          )}

          {/* Mobile View: Toggleable List or Map */}
          <div className="lg:hidden">
            {mobileView === 'list' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={(id) => onNavigate('property-detail', id)}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[520px] w-full border border-neutral-300">
                <PropertyMap
                  properties={filteredProperties}
                  selectedPropertyId={selectedPropertyId}
                  onSelectProperty={(id) => onNavigate('property-detail', id)}
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
