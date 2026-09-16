import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { socialPosts } from '../data/social';
import { SocialPost } from '../types';
import { Play, Instagram, Youtube, ExternalLink, ChevronDown, ChevronUp, Eye, Heart } from 'lucide-react';

export const SocialNewsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].socialSection;

  const [filter, setFilter] = useState<'all' | 'youtube' | 'instagram'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [activeVideoPost, setActiveVideoPost] = useState<SocialPost | null>(null);

  const filteredPosts = socialPosts.filter((p) => {
    if (filter === 'all') return true;
    return p.platform === filter;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredPosts.length;

  const handlePostClick = (post: SocialPost) => {
    if (post.platform === 'youtube' && post.videoEmbedUrl) {
      setActiveVideoPost(post);
    } else {
      window.open(post.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="social-news-section" className="max-w-7xl mx-auto px-6 md:px-10 py-20">
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

        {/* Platform Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold tracking-wider uppercase">
          <button
            onClick={() => {
              setFilter('all');
              setVisibleCount(4);
            }}
            className={`px-3.5 py-2 border transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-neutral-950 text-white border-neutral-950'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
            }`}
          >
            {t.tabAll}
          </button>
          <button
            onClick={() => {
              setFilter('youtube');
              setVisibleCount(4);
            }}
            className={`px-3.5 py-2 border transition-colors cursor-pointer flex items-center gap-1.5 ${
              filter === 'youtube'
                ? 'bg-neutral-950 text-white border-neutral-950'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
            }`}
          >
            <Youtube size={14} className="text-red-600" />
            <span>{t.tabYoutube}</span>
          </button>
          <button
            onClick={() => {
              setFilter('instagram');
              setVisibleCount(4);
            }}
            className={`px-3.5 py-2 border transition-colors cursor-pointer flex items-center gap-1.5 ${
              filter === 'instagram'
                ? 'bg-neutral-950 text-white border-neutral-950'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
            }`}
          >
            <Instagram size={14} className="text-neutral-700" />
            <span>{t.tabInstagram}</span>
          </button>
        </div>
      </div>

      {/* Grid of Social Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedPosts.map((post) => {
          const isYt = post.platform === 'youtube';
          const title = language === 'ko' ? post.titleKo : post.titleEn;
          const caption = language === 'ko' ? post.captionKo : post.captionEn;

          return (
            <article
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="group cursor-pointer bg-white border border-neutral-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-neutral-900 shadow-xs"
            >
              <div>
                {/* Thumbnail with overlay icon */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={post.thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />

                  {/* Channel / Platform Badge */}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide px-2 py-0.5 flex items-center gap-1.5">
                    {isYt ? (
                      <>
                        <Youtube size={12} className="text-red-500" />
                        <span>YouTube</span>
                      </>
                    ) : (
                      <>
                        <Instagram size={12} className="text-neutral-200" />
                        <span>Instagram</span>
                      </>
                    )}
                  </div>

                  {/* Video Duration or Likes */}
                  {isYt && post.videoDuration && (
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5">
                      {post.videoDuration}
                    </div>
                  )}

                  {/* Center Play Icon for YouTube */}
                  {isYt && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={16} className="ml-0.5 fill-neutral-950" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      {isYt ? <Eye size={11} /> : <Heart size={11} />}
                      {post.metric}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-neutral-950 line-clamp-2 leading-snug group-hover:text-neutral-700 transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-2 font-light leading-relaxed">
                    {caption}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="p-4 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-medium text-neutral-600 group-hover:text-neutral-950">
                <span>{isYt ? t.watchVideo : t.viewPost}</span>
                <ExternalLink size={12} />
              </div>
            </article>
          );
        })}
      </div>

      {/* "더 보기" (Load More Updates) Button */}
      <div className="mt-10 text-center">
        {canLoadMore ? (
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-8 py-3.5 border border-neutral-300 text-neutral-900 text-xs font-semibold uppercase tracking-wider hover:border-neutral-950 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{t.loadMore}</span>
            <ChevronDown size={14} />
          </button>
        ) : (
          visibleCount > 4 && (
            <button
              onClick={() => setVisibleCount(4)}
              className="px-6 py-2 text-neutral-500 text-xs uppercase tracking-wider hover:text-neutral-950 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{t.showLess}</span>
              <ChevronUp size={14} />
            </button>
          )
        )}
      </div>

      {/* Channel Follow Banner */}
      <div className="mt-12 p-6 bg-stone-100/70 border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="text-neutral-600 text-center sm:text-left">
          {t.subscribeCta}
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-neutral-950 text-white font-medium hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5"
          >
            <Youtube size={13} className="text-red-500" />
            <span>THE ADDRESS TV</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white border border-neutral-300 text-neutral-900 font-medium hover:border-neutral-950 transition-colors inline-flex items-center gap-1.5"
          >
            <Instagram size={13} />
            <span>@theaddress.nj</span>
          </a>
        </div>
      </div>

      {/* Video Modal Preview */}
      {activeVideoPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl bg-black overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideoPost(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-neutral-300 p-2 bg-black/60 rounded-full"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={activeVideoPost.videoEmbedUrl}
                title={activeVideoPost.titleEn}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <div className="p-4 bg-neutral-900 text-white">
              <div className="text-sm font-semibold">
                {language === 'ko' ? activeVideoPost.titleKo : activeVideoPost.titleEn}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {activeVideoPost.channelName} · {activeVideoPost.date} · {activeVideoPost.metric}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
