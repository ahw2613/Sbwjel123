import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string | null;
  onSelectProperty: (propertyId: string) => void;
  className?: string;
  zoomLevel?: number;
  center?: [number, number];
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  className = 'w-full h-[500px]',
  zoomLevel = 12,
  center = [40.875, -73.985], // Bergen County, NJ (Fort Lee / Palisades Park / Edgewater / Tenafly)
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const { language } = useLanguage();

  const formatPriceShort = (price: number, isRental: boolean) => {
    if (isRental) {
      return `$${(price / 1000).toFixed(1)}k/m`;
    }
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 2)}M`;
    }
    return `$${Math.round(price / 1000)}k`;
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [center[0], center[1]],
        zoom: zoomLevel,
        zoomControl: true,
        attributionControl: false,
      });

      // Refined light basemap (CartoDB Positron for clean architectural look)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Attribution
      L.control
        .attribution({
          position: 'bottomright',
          prefix: '<span class="text-[10px] text-gray-400">OpenStreetMap & CartoDB</span>',
        })
        .addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Invalidate size in case container rendered while hidden/resizing
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      // Keep map instance or cleanup if component completely unmounts
    };
  }, []);

  // Update center when prop changes
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView([center[0], center[1]], zoomLevel);
    }
  }, [center, zoomLevel]);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    (Object.values(markersRef.current) as L.Marker[]).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (properties.length === 0) return;

    const bounds = L.latLngBounds([]);

    properties.forEach((prop) => {
      const isSelected = selectedPropertyId === prop.id;
      const priceText = formatPriceShort(prop.price, prop.isRental);

      // Custom HTML Marker Pill
      const customIcon = L.divIcon({
        className: 'custom-property-marker-wrapper',
        html: `
          <div class="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 ${
            isSelected ? 'z-50 scale-110' : 'z-10'
          }">
            <div class="${
              isSelected
                ? 'bg-[#111111] text-white shadow-xl ring-2 ring-white'
                : 'bg-white text-[#111111] shadow-md hover:bg-[#111111] hover:text-white border border-gray-200'
            } px-2.5 py-1 text-xs font-semibold tracking-tight whitespace-nowrap rounded-full transition-colors flex items-center gap-1">
              <span>${priceText}</span>
            </div>
          </div>
        `,
        iconSize: [60, 26],
        iconAnchor: [30, 13],
      });

      const marker = L.marker([prop.latitude, prop.longitude], {
        icon: customIcon,
      }).addTo(map);

      // Popup content
      const title = language === 'ko' ? prop.titleKo : prop.titleEn;
      const priceFull = prop.isRental
        ? `$${prop.price.toLocaleString()} / mo`
        : `$${prop.price.toLocaleString()}`;

      const popupHtml = `
        <div class="w-56 p-0 overflow-hidden font-sans text-left">
          <div class="h-28 w-full bg-gray-100 overflow-hidden">
            <img src="${prop.images[0]}" alt="${title}" class="w-full h-full object-cover" />
          </div>
          <div class="p-3">
            <div class="text-sm font-bold text-gray-900">${priceFull}</div>
            <div class="text-xs font-medium text-gray-700 truncate mt-0.5">${title}</div>
            <div class="text-[11px] text-gray-500 mt-0.5">${prop.address}, ${prop.city}</div>
            <div class="text-[11px] text-gray-600 mt-1.5 flex gap-2 font-medium">
              <span>${prop.beds} Beds</span>
              <span>•</span>
              <span>${prop.baths} Baths</span>
              <span>•</span>
              <span>${prop.sqft.toLocaleString()} Sq Ft</span>
            </div>
            <button id="map-popup-btn-${prop.id}" class="mt-2.5 w-full text-center py-1 text-[11px] font-medium bg-[#111111] text-white rounded hover:bg-gray-800 transition-colors">
              ${language === 'ko' ? '매물 상세 보기' : 'View Property'}
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 240,
        className: 'the-address-leaflet-popup',
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`map-popup-btn-${prop.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectProperty(prop.id);
          };
        }
      });

      marker.on('click', () => {
        onSelectProperty(prop.id);
      });

      markersRef.current[prop.id] = marker;
      bounds.extend([prop.latitude, prop.longitude]);
    });

    // If specific property selected, pan to it
    if (selectedPropertyId && markersRef.current[selectedPropertyId]) {
      const selectedMarker = markersRef.current[selectedPropertyId];
      const latLng = selectedMarker.getLatLng();
      map.panTo(latLng, { animate: true });
      selectedMarker.openPopup();
    }
  }, [properties, selectedPropertyId, language]);

  return (
    <div className={`relative ${className} rounded-none border border-gray-200 overflow-hidden z-0`}>
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
