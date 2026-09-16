import React, { useState } from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { PropertyMap } from '../components/PropertyMap';
import { ScheduleModal } from '../components/ScheduleModal';
import { ArrowLeft, Phone, Mail, Share2, Check, Calendar, MessageSquare } from 'lucide-react';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onNavigate: (page: string, param?: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onNavigate,
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalMode, setModalMode] = useState<'showing' | 'inquiry'>('showing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const title = language === 'ko' ? property.titleKo : property.titleEn;
  const description = language === 'ko' ? property.descriptionKo : property.descriptionEn;
  const features = language === 'ko' ? property.featuresKo : property.featuresEn;
  const parkingInfo = language === 'ko' ? property.parkingKo : property.parking;

  const formattedPrice = property.isRental
    ? `$${property.price.toLocaleString()} / mo`
    : `$${property.price.toLocaleString()}`;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-6 pb-24 text-neutral-900">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          <span>{t.detail.backToListings}</span>
        </button>

        <div className="flex items-center space-x-4">
          <div className="text-xs text-neutral-400 font-mono">
            {t.detail.mlsLabel} {property.mlsNumber}
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
            title={t.detail.shareProperty}
          >
            {copied ? (
              <span className="text-neutral-900 flex items-center gap-1">
                <Check size={14} /> {t.detail.copied}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Share2 size={14} /> {t.detail.shareProperty}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 1. IMAGE GALLERY */}
      <div className="space-y-4">
        {/* Main Hero Photo */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
          <img
            src={property.images[activeImageIndex]}
            alt={title}
            className="w-full h-full object-cover"
          />
          {property.isRental && (
            <div className="absolute top-6 left-6 bg-black/85 backdrop-blur-sm text-white text-xs font-medium tracking-widest px-3 py-1.5 uppercase">
              {language === 'ko' ? '렌트' : 'FOR RENT'}
            </div>
          )}
        </div>

        {/* Thumbnail Row */}
        {property.images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] overflow-hidden cursor-pointer transition-opacity ${
                  activeImageIndex === idx ? 'ring-2 ring-neutral-950 opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. PROPERTY NAME, LOCATION, PRICE */}
      <div className="mt-12 flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-neutral-200">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            {property.city}, {property.state} · {property.county}
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950">
            {title}
          </h1>
          <div className="text-base text-neutral-500 font-light">
            {property.address}, {property.city}, {property.state} {property.zip}
          </div>
        </div>

        {/* Price & Primary CTAs */}
        <div className="md:text-right space-y-4">
          <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950">
            {formattedPrice}
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            <button
              onClick={() => {
                setModalMode('showing');
                setIsModalOpen(true);
              }}
              className="px-6 py-3 bg-neutral-950 text-white text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Calendar size={14} />
              <span>{t.detail.scheduleShowing}</span>
            </button>
            <button
              onClick={() => {
                setModalMode('inquiry');
                setIsModalOpen(true);
              }}
              className="px-6 py-3 border border-neutral-300 text-neutral-900 text-xs font-semibold tracking-wider uppercase hover:border-neutral-950 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>{t.detail.contactAgent}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. KEY SPECIFICATIONS STRIP (AREA, BED, BATH, PARKING) */}
      <div className="py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-neutral-200">
        <div>
          <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            {t.detail.beds}
          </div>
          <div className="mt-1 text-2xl font-normal text-neutral-950">
            {property.beds}
          </div>
        </div>
        <div>
          <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            {t.detail.baths}
          </div>
          <div className="mt-1 text-2xl font-normal text-neutral-950">
            {property.baths} {property.halfBaths ? `+ ${property.halfBaths} Half` : ''}
          </div>
        </div>
        <div>
          <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            {t.detail.livingArea}
          </div>
          <div className="mt-1 text-2xl font-normal text-neutral-950">
            {property.sqft.toLocaleString()} <span className="text-sm font-light text-neutral-500">Sq Ft</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            {t.detail.yearBuilt}
          </div>
          <div className="mt-1 text-2xl font-normal text-neutral-950">
            {property.yearBuilt}
          </div>
        </div>
      </div>

      {/* 4. DESCRIPTION */}
      <div className="py-12 border-b border-neutral-200">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase mb-4">
          {t.detail.descriptionTitle}
        </h2>
        <div className="text-base text-neutral-700 leading-relaxed font-normal whitespace-pre-line max-w-4xl">
          {description}
        </div>
      </div>

      {/* 5. PROPERTY DETAILS TABLE / SPECS */}
      <div className="py-12 border-b border-neutral-200">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase mb-6">
          {t.detail.keyFacts}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-10 text-sm">
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">{t.detail.propertyType}</span>
            <span className="font-medium text-neutral-900">{property.propertyType}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">{t.detail.county}</span>
            <span className="font-medium text-neutral-900">{property.county}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">{t.detail.lotSize}</span>
            <span className="font-medium text-neutral-900">{property.lotSize}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">{t.detail.parking}</span>
            <span className="font-medium text-neutral-900 text-right">{parkingInfo}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">{t.detail.heating}</span>
            <span className="font-medium text-neutral-900 text-right">{property.heating}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">{t.detail.cooling}</span>
            <span className="font-medium text-neutral-900 text-right">{property.cooling}</span>
          </div>
          {!property.isRental && (
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500">{t.detail.annualTax}</span>
              <span className="font-medium text-neutral-900">${property.annualTax.toLocaleString()} / yr</span>
            </div>
          )}
          {property.hoaFee !== undefined && property.hoaFee > 0 && (
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500">{t.detail.hoaFee}</span>
              <span className="font-medium text-neutral-900">${property.hoaFee.toLocaleString()} / mo</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-b border-neutral-100">
            <span className="text-neutral-500">{t.detail.mlsStatus}</span>
            <span className="font-medium text-neutral-900">{property.status}</span>
          </div>
        </div>
      </div>

      {/* 6. FEATURES (CLEAN TEXT-BASED LIST) */}
      <div className="py-12 border-b border-neutral-200">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase mb-6">
          {t.detail.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start text-sm text-neutral-700">
              <span className="mr-3 text-neutral-400 font-mono">—</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. LOCATION & MAP */}
      <div className="py-12 border-b border-neutral-200">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase mb-2">
          {t.detail.locationTitle}
        </h2>
        <p className="text-sm text-neutral-500 mb-6">
          {property.address}, {property.city}, NJ {property.zip}
        </p>
        <div className="h-[400px] w-full border border-neutral-200">
          <PropertyMap
            properties={[property]}
            selectedPropertyId={property.id}
            onSelectProperty={() => {}}
            center={[property.latitude, property.longitude]}
            zoomLevel={14}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 8. AGENT & CONTACT */}
      <div className="py-12">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase mb-8">
          {t.detail.agentTitle}
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8 bg-neutral-50 border border-neutral-200">
          <div className="flex items-center space-x-5">
            <img
              src={property.agent.image}
              alt={property.agent.name}
              className="w-20 h-20 rounded-none object-cover border border-neutral-300"
            />
            <div className="space-y-1">
              <div className="text-lg font-semibold text-neutral-950">
                {language === 'ko' ? property.agent.nameKo : property.agent.name}
              </div>
              <div className="text-xs text-neutral-500">
                {language === 'ko' ? property.agent.titleKo : property.agent.title}
              </div>
              <div className="text-xs font-mono text-neutral-400">
                {property.agent.license}
              </div>
              <div className="text-xs text-neutral-600 pt-1">
                {property.agent.languages.join(' · ')}
              </div>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={`tel:${property.agent.phone}`}
              className="px-5 py-2.5 border border-neutral-300 text-neutral-900 text-xs font-semibold uppercase tracking-wider hover:border-neutral-950 transition-colors text-center inline-flex items-center justify-center gap-1.5"
            >
              <Phone size={14} />
              <span>{property.agent.phone}</span>
            </a>
            <button
              onClick={() => {
                setModalMode('inquiry');
                setIsModalOpen(true);
              }}
              className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <Mail size={14} />
              <span>{t.detail.emailAgent}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Showing / Inquiry Modal */}
      <ScheduleModal
        property={property}
        mode={modalMode}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
