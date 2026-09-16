import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { clientReviews } from '../data/reviews';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const ClientReviewsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].reviewsSection;

  const [activeFilter, setActiveFilter] = useState<'all' | 'buy' | 'sell' | 'rent'>('all');

  const filteredReviews = clientReviews.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.transactionType === activeFilter;
  });

  return (
    <section className="bg-stone-50/80 py-20 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-2">
              {t.tag}
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950">
              {t.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-light leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold tracking-wider uppercase">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 border transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
              }`}
            >
              {t.allTab}
            </button>
            <button
              onClick={() => setActiveFilter('buy')}
              className={`px-3.5 py-2 border transition-colors cursor-pointer ${
                activeFilter === 'buy'
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
              }`}
            >
              {t.buyTab}
            </button>
            <button
              onClick={() => setActiveFilter('sell')}
              className={`px-3.5 py-2 border transition-colors cursor-pointer ${
                activeFilter === 'sell'
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
              }`}
            >
              {t.sellTab}
            </button>
            <button
              onClick={() => setActiveFilter('rent')}
              className={`px-3.5 py-2 border transition-colors cursor-pointer ${
                activeFilter === 'rent'
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
              }`}
            >
              {t.rentTab}
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-7 border border-neutral-200 flex flex-col justify-between transition-all duration-300 hover:border-neutral-400 shadow-xs"
            >
              <div className="space-y-4">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-neutral-900 text-neutral-900" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500">
                    <ShieldCheck size={13} className="text-neutral-700" />
                    <span>{t.verified}</span>
                  </div>
                </div>

                {/* Main Pull Quote */}
                <h3 className="text-base font-semibold text-neutral-900 tracking-tight leading-snug">
                  "{language === 'ko' ? rev.quoteKo : rev.quoteEn}"
                </h3>

                {/* Detailed Client Story */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  {language === 'ko' ? rev.storyKo : rev.storyEn}
                </p>
              </div>

              {/* Author Details Footer */}
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-neutral-900">
                    {language === 'ko' ? rev.clientNameKo : rev.clientName}
                  </div>
                  <div className="text-neutral-500 text-[11px] mt-0.5">
                    {language === 'ko' ? rev.clientTypeKo : rev.clientTypeEn}
                  </div>
                </div>
                <div className="text-neutral-400 font-mono text-[11px]">
                  {rev.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
