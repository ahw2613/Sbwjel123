import React, { useState } from 'react';
import { Property } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { X, CheckCircle2 } from 'lucide-react';

interface ScheduleModalProps {
  property: Property;
  mode: 'showing' | 'inquiry';
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  property,
  mode,
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();
  const t = translations[language].modal;

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(t.timeMorning);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const propertyTitle = language === 'ko' ? property.titleKo : property.titleEn;
  const isShowing = mode === 'showing';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 shadow-2xl text-left border border-neutral-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors p-1"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-xl font-semibold tracking-tight text-neutral-950">
              {isShowing ? t.scheduleTitle : t.contactTitle}
            </div>
            <p className="mt-1 text-sm text-neutral-600">
              {isShowing
                ? t.scheduleSubtitle.replace('{property}', property.address + ', ' + property.city)
                : t.contactSubtitle.replace('{property}', property.address + ', ' + property.city)}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
              {isShowing && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      {t.preferredDate}
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      {t.preferredTime}
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 text-neutral-900 bg-white focus:outline-none focus:border-neutral-950"
                    >
                      <option value={t.timeMorning}>{t.timeMorning}</option>
                      <option value={t.timeAfternoon}>{t.timeAfternoon}</option>
                      <option value={t.timeEvening}>{t.timeEvening}</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'ko' ? '홍길동' : 'John Doe'}
                  className="w-full px-3 py-2 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (201) 000-0000"
                    className="w-full px-3 py-2 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 uppercase tracking-wide mb-1">
                  {t.notes}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    language === 'ko'
                      ? '희망하시는 세부 사항이나 질문을 남겨주세요.'
                      : 'Share any questions or specific timing preferences...'
                  }
                  className="w-full px-3 py-2 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-950 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-950 text-white font-medium hover:bg-neutral-800 transition-colors uppercase tracking-wider text-xs"
                >
                  {isShowing ? t.submitShowing : t.submitInquiry}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 size={44} className="mx-auto text-neutral-900" />
            <div className="text-xl font-semibold tracking-tight text-neutral-950">
              {t.sentTitle}
            </div>
            <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
              {t.sentDesc}
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-medium tracking-wider uppercase hover:bg-neutral-800 transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
