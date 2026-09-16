import React from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface PropertyCardProps {
  property: Property;
  onSelect: (propertyId: string) => void;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect, className = '' }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const title = language === 'ko' ? property.titleKo : property.titleEn;
  const formattedPrice = property.isRental
    ? `$${property.price.toLocaleString()} / mo`
    : `$${property.price.toLocaleString()}`;

  return (
    <article
      id={`property-card-${property.id}`}
      onClick={() => onSelect(property.id)}
      className={`group cursor-pointer block transition-all duration-300 ${className}`}
    >
      {/* Large Featured Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <img
          src={property.images[0]}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {property.isRental && (
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[11px] font-medium tracking-wider px-2.5 py-1 uppercase">
            {language === 'ko' ? '렌트' : 'FOR RENT'}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="pt-4 pb-2">
        <div className="text-xl font-semibold tracking-tight text-neutral-900">
          {formattedPrice}
        </div>

        <h3 className="mt-1 text-base font-medium text-neutral-800 line-clamp-1 group-hover:text-neutral-600 transition-colors">
          {title}
        </h3>

        <div className="mt-1 text-sm text-neutral-500 tracking-normal">
          {property.address}, {property.city}, {property.state} {property.zip}
        </div>

        <div className="mt-2 text-sm text-neutral-600 font-normal">
          {property.beds} {t.properties.bedsLabel} · {property.baths} {t.properties.bathsLabel} · {property.sqft.toLocaleString()} {t.properties.sqftLabel}
        </div>
      </div>
    </article>
  );
};
