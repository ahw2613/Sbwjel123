import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { ValuationRequest } from '../types';
import { CheckCircle2 } from 'lucide-react';

export const SellPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].sell;

  const [formData, setFormData] = useState<ValuationRequest>({
    propertyAddress: '',
    city: 'Fort Lee',
    propertyType: 'Single Family',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: '',
    timeline: t.timeline1to3,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
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

  const steps = [
    { num: '01', title: t.step1Title, desc: t.step1Desc },
    { num: '02', title: t.step2Title, desc: t.step2Desc },
    { num: '03', title: t.step3Title, desc: t.step3Desc },
    { num: '04', title: t.step4Title, desc: t.step4Desc },
    { num: '05', title: t.step5Title, desc: t.step5Desc },
    { num: '06', title: t.step6Title, desc: t.step6Desc },
    { num: '07', title: t.step7Title, desc: t.step7Desc },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-28 text-neutral-900">
      {/* Editorial Hero Header */}
      <div className="border-b border-neutral-200 pb-16 mb-20 text-center sm:text-left">
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

      {/* 7-Step Advisory Process (Typography & Whitespace, NOT decorative cards) */}
      <section className="mb-24">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-12">
          {t.processTitle}
        </h2>

        <div className="space-y-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 pb-10 border-b border-neutral-200"
            >
              <div className="sm:col-span-2 text-2xl sm:text-3xl font-light text-neutral-400 font-mono">
                {step.num}
              </div>
              <div className="sm:col-span-10 space-y-2">
                <h3 className="text-xl font-normal text-neutral-950 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Valuation Request Form */}
      <section id="valuation-form-section" className="bg-stone-50 border border-stone-200 p-8 sm:p-14">
        {!isSubmitted ? (
          <div>
            <div className="max-w-2xl mb-10">
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
                {t.formTitle}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 font-light leading-relaxed">
                {t.formDesc}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
              {/* Property Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.propertyAddress} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    placeholder="e.g. 120 Anderson Avenue"
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.city} *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  >
                    <option value="Fort Lee">Fort Lee, NJ (07024)</option>
                    <option value="Palisades Park">Palisades Park, NJ (07650)</option>
                    <option value="Edgewater">Edgewater, NJ (07020)</option>
                    <option value="Tenafly">Tenafly, NJ (07670)</option>
                    <option value="Closter">Closter, NJ (07624)</option>
                    <option value="Cresskill">Cresskill, NJ (07626)</option>
                    <option value="Leonia">Leonia, NJ (07605)</option>
                    <option value="Ridgefield">Ridgefield, NJ (07657)</option>
                    <option value="Englewood">Englewood, NJ (07631)</option>
                    <option value="Paramus">Paramus, NJ (07652)</option>
                    <option value="Other North Jersey">Other North Jersey</option>
                  </select>
                </div>
              </div>

              {/* Specs & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.propertyType}
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  >
                    <option value="Single Family">Single Family Home</option>
                    <option value="Condominium">Condominium</option>
                    <option value="Townhouse">Townhouse / Duplex</option>
                    <option value="Multi-Family">Multi-Family Property</option>
                    <option value="Co-op">Co-op Residence</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.bedrooms} / {t.bathrooms}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                    />
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.timeline}
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  >
                    <option value={t.timelineImmediate}>{t.timelineImmediate}</option>
                    <option value={t.timeline1to3}>{t.timeline1to3}</option>
                    <option value={t.timeline3to6}>{t.timeline3to6}</option>
                    <option value={t.timelineCurious}>{t.timelineCurious}</option>
                  </select>
                </div>
              </div>

              {/* Owner Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.firstName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.lastName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (201) 000-0000"
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                  {t.notes}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={
                    language === 'ko'
                      ? '최근 주방 리모델링, 지붕 교체, 지하실 피니시 등 주택의 개선 사항을 입력해 주시면 더욱 정확한 감정이 가능합니다.'
                      : 'Note any recent updates such as new kitchen, roof replacement, finished basement...'
                  }
                  className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950 resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-neutral-950 text-white font-medium text-xs tracking-wider uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {isSubmitting ? t.submitting : t.submitValuation}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-12 text-center space-y-4 max-w-md mx-auto">
            <CheckCircle2 size={48} className="mx-auto text-neutral-900" />
            <h3 className="text-2xl font-normal text-neutral-950 tracking-tight">
              {t.successTitle}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              {t.successDesc}
            </p>
            <div className="pt-6">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 border border-neutral-300 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:border-neutral-950 transition-colors"
              >
                {language === 'ko' ? '추가 신청서 작성' : 'Submit Another Property'}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
