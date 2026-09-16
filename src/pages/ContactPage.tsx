import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { ContactSubmission } from '../types';
import { CheckCircle2, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const tAbout = translations[language].about;

  const [formData, setFormData] = useState<ContactSubmission>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: 'Buying',
    preferredLocation: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 pb-28 text-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-14 mb-16">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Contact Form Col */}
        <div className="lg:col-span-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1.5">
                    {t.firstName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1.5">
                    {t.lastName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1.5">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1.5">
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (201) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {/* Interest Type */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1.5">
                  {t.interest} *
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                >
                  <option value="Buying">{t.interestBuy}</option>
                  <option value="Renting">{t.interestRent}</option>
                  <option value="Selling">{t.interestSell}</option>
                  <option value="Relocation">{t.interestRelocation}</option>
                  <option value="General">{t.interestGeneral}</option>
                </select>
              </div>

              {/* Preferred Location & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1.5">
                    {t.preferredLocation}
                  </label>
                  <input
                    type="text"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    placeholder="e.g. Fort Lee, Tenafly, Edgewater"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1.5">
                    {t.budget}
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. $1,000,000 - $1,500,000 or $3,500/mo"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1.5">
                  {t.message}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    language === 'ko'
                      ? '원하시는 주택 스타일, 입주 희망 시점, 학군 및 출퇴근 조건 등을 자유롭게 남겨주세요.'
                      : 'Tell us about your target timeline, preferred school district, commute needs...'
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950 resize-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-neutral-950 text-white font-medium text-xs tracking-wider uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {isSubmitting ? t.submitting : t.submit}
                </button>
              </div>
            </form>
          ) : (
            <div className="py-12 p-8 bg-stone-50 border border-stone-200 text-center space-y-4">
              <CheckCircle2 size={48} className="mx-auto text-neutral-900" />
              <h2 className="text-2xl font-normal text-neutral-950 tracking-tight">
                {t.successTitle}
              </h2>
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                {t.successDesc}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 border border-neutral-300 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:border-neutral-950 transition-colors"
                >
                  {language === 'ko' ? '새 문의 작성' : 'Send Another Inquiry'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Office Contact Info Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-stone-100/70 border border-stone-200 space-y-6 text-sm">
            <div className="text-xs font-semibold tracking-wider uppercase text-neutral-900">
              {language === 'ko' ? '오피스 방문 및 상담' : 'Brokerage Office'}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-neutral-500 mt-0.5 shrink-0" />
                <div className="text-neutral-700">
                  <div className="font-medium text-neutral-900">THE ADDRESS</div>
                  <div>2050 Center Avenue, Suite 410</div>
                  <div>Fort Lee, NJ 07024</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-neutral-500 shrink-0" />
                <a href="tel:+12015858890" className="text-neutral-800 hover:underline">
                  +1 (201) 585-8890
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-neutral-500 shrink-0" />
                <a href="mailto:inquiry@theaddressnj.com" className="text-neutral-800 hover:underline">
                  inquiry@theaddressnj.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-neutral-500 mt-0.5 shrink-0" />
                <div className="text-xs text-neutral-600">
                  <div>Mon – Sat: 9:00 AM – 6:30 PM EST</div>
                  <div>Sunday: By Appointment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Relocation note */}
          <div className="p-6 border border-neutral-200 space-y-2 text-xs leading-relaxed text-neutral-600">
            <div className="font-semibold text-neutral-900 uppercase tracking-wider">
              {language === 'ko' ? '한국 이주 및 주재원 상담' : 'Corporate Relocation'}
            </div>
            <p>
              {language === 'ko'
                ? '한국에서 뉴저지로 주재원 파견, 유학, 이민을 준비하시는 고객을 위해 미국 도착 전 사전 렌트 계약 및 주택 매매, 학교 등록 절차까지 원스톱으로 지원해 드립니다.'
                : 'Full relocation assistance for corporate transferees, international arrivals, and families moving to New Jersey, including school district orientation and pre-arrival leasing.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
