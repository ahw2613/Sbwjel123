import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { clientReviews } from '../data/reviews';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const ClientReviewsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].reviewsSection;

  const [activeFilter, setActiveFilter] = useState<'all' | 'buy' | 'sell' | 'rent'>('all');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredReviews = clientReviews.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.transactionType === activeFilter;
  });

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate index
    const cardWidth = el.querySelector('.review-card')?.clientWidth || clientWidth;
    const index = Math.round(scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(index, 0), filteredReviews.length - 1));
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);
    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [filteredReviews.length]);

  const handleFilterChange = (filter: 'all' | 'buy' | 'sell' | 'rent') => {
    setActiveFilter(filter);
    setActiveIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector('.review-card') as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 24 : 420; // 24px gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="reviews-section" className="bg-stone-50/80 py-20 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header with Natural Word Wrapping */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
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

          {/* Action Bar: Category Filters & Left/Right Slider Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold tracking-wider uppercase">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-neutral-950 text-white border-neutral-950'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
                }`}
              >
                {t.allTab}
              </button>
              <button
                onClick={() => handleFilterChange('buy')}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                  activeFilter === 'buy'
                    ? 'bg-neutral-950 text-white border-neutral-950'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
                }`}
              >
                {t.buyTab}
              </button>
              <button
                onClick={() => handleFilterChange('sell')}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                  activeFilter === 'sell'
                    ? 'bg-neutral-950 text-white border-neutral-950'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
                }`}
              >
                {t.sellTab}
              </button>
              <button
                onClick={() => handleFilterChange('rent')}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                  activeFilter === 'rent'
                    ? 'bg-neutral-950 text-white border-neutral-950'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
                }`}
              >
                {t.rentTab}
              </button>
            </div>

            {/* Slider Next/Prev Arrows */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400 mr-1 hidden sm:inline">
                {String(activeIndex + 1).padStart(2, '0')} / {String(filteredReviews.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous Review"
                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'bg-white text-neutral-900 border-neutral-300 hover:border-neutral-950 hover:bg-neutral-50'
                    : 'bg-neutral-100 text-neutral-300 border-neutral-200 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next Review"
                className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollRight
                    ? 'bg-white text-neutral-900 border-neutral-300 hover:border-neutral-950 hover:bg-neutral-50'
                    : 'bg-neutral-100 text-neutral-300 border-neutral-200 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Single Row Horizontal Slide Container */}
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap overflow-x-auto gap-6 pb-4 pt-2 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="review-card flex-shrink-0 w-[85vw] sm:w-[460px] lg:w-[480px] snap-start bg-white p-7 sm:p-8 border border-neutral-200 flex flex-col justify-between transition-all duration-300 hover:border-neutral-900 shadow-xs"
            >
              <div className="space-y-5">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-neutral-900 text-neutral-900" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 bg-stone-50 px-2 py-0.5 border border-stone-200">
                    <ShieldCheck size={12} className="text-neutral-700" />
                    <span>{t.verified}</span>
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote size={24} className="text-neutral-200 absolute -top-3 -left-1 -z-0 opacity-70" />
                  <p className="relative z-10 text-xs sm:text-sm text-neutral-800 font-normal italic leading-relaxed">
                    "{language === 'ko' ? rev.quoteKo : rev.quoteEn}"
                  </p>
                </div>

                {/* Detailed Story */}
                <p className="text-xs text-neutral-600 leading-relaxed font-light line-clamp-3">
                  {language === 'ko' ? rev.storyKo : rev.storyEn}
                </p>

                {/* Client Transaction Type Tag */}
                <div className="pt-1">
                  <span className="text-[11px] font-medium text-neutral-700 bg-stone-100 px-2.5 py-1 tracking-tight">
                    {language === 'ko' ? rev.clientTypeKo : rev.clientTypeEn}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-neutral-950">
                    {language === 'ko' ? rev.clientNameKo : rev.clientName}
                  </div>
                  <div className="text-neutral-500 text-[11px] mt-0.5">
                    {rev.location} · {rev.date}
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-neutral-200 text-neutral-600">
                  {rev.transactionType.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicator Bar */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {filteredReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const el = scrollContainerRef.current;
                if (!el) return;
                const card = el.querySelector('.review-card') as HTMLElement;
                const cardWidth = card ? card.offsetWidth + 24 : 420;
                el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-8 bg-neutral-900' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
