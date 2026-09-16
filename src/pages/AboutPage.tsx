import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { agents } from '../data/properties';
import { MapPin, Phone, Mail, Clock, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-28 text-neutral-900">
      {/* Editorial Header */}
      <div className="border-b border-neutral-200 pb-16 mb-16 text-center sm:text-left">
        <div className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-3">
          {t.pageTitle}
        </div>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-950 max-w-3xl leading-tight">
          {t.headline}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl font-light leading-relaxed">
          {t.subheadline}
        </p>
      </div>

      {/* Large Brand Visual Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-100 mb-16">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
          alt="THE ADDRESS North Jersey Brokerage"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-neutral-200">
        <div className="md:col-span-4">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
            {language === 'ko' ? '설립 철학' : 'The Mission'}
          </h2>
          <div className="mt-2 text-2xl font-normal text-neutral-950 tracking-tight">
            THE ADDRESS
          </div>
        </div>
        <div className="md:col-span-8 space-y-6 text-base text-neutral-700 font-normal leading-relaxed">
          <p>{t.storyP1}</p>
          <p>{t.storyP2}</p>
        </div>
      </div>

      {/* 3 Core Principles */}
      <div className="py-16 border-b border-neutral-200">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-12">
          {t.pillarsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-neutral-950 tracking-tight">
              {t.pillar1Title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {t.pillar1Desc}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-neutral-950 tracking-tight">
              {t.pillar2Title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {t.pillar2Desc}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-neutral-950 tracking-tight">
              {t.pillar3Title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {t.pillar3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Team / Advisors */}
      <div className="py-16 border-b border-neutral-200">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-10">
          {language === 'ko' ? '공인 중개사 팀' : 'Leadership & Advisory Team'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="space-y-4">
              <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="text-base font-semibold text-neutral-950">
                  {language === 'ko' ? agent.nameKo : agent.name}
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  {language === 'ko' ? agent.titleKo : agent.title}
                </div>
                <div className="text-xs font-mono text-neutral-400 pt-0.5">
                  {agent.license}
                </div>
                <div className="text-xs text-neutral-600 pt-1">
                  {agent.languages.join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Office & Licensing */}
      <div className="pt-16">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-6">
          {t.officeTitle}
        </h2>
        <div className="bg-stone-50 border border-stone-200 p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div className="space-y-3">
            <div className="font-semibold text-neutral-900 uppercase tracking-wider text-xs">
              {language === 'ko' ? '본사 오피스' : 'Principal Brokerage Office'}
            </div>
            <div className="text-neutral-700">{t.officeAddress}</div>
            <div className="text-neutral-700">{t.officePhone} · {t.officeEmail}</div>
            <div className="text-xs text-neutral-500">{t.officeHours}</div>
          </div>
          <div className="space-y-3 border-t md:border-t-0 md:border-l border-neutral-200 pt-6 md:pt-0 md:pl-8">
            <div className="font-semibold text-neutral-900 uppercase tracking-wider text-xs">
              {language === 'ko' ? '라이선스 및 협회 준수' : 'Professional Accreditations'}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t.credentials}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
