import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { communities } from '../data/communities';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xl font-semibold tracking-[0.2em] text-white uppercase">
              THE ADDRESS
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <div>{t.footer.address}</div>
              <div>{t.footer.phone} · {t.footer.email}</div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold tracking-wider text-white uppercase">
              {t.footer.navigation}
            </div>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('buy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.buy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rent')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.rent}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sell')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.sell}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.properties}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Communities */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold tracking-wider text-white uppercase">
              {t.footer.communities}
            </div>
            <ul className="space-y-2 text-sm text-neutral-400">
              {communities.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate('community-detail', c.slug)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {c.name}, NJ ({language === 'ko' ? c.koreanName : c.zipCodes[0]})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Credentials */}
          <div className="md:col-span-2 space-y-3 text-xs text-neutral-500 leading-relaxed">
            <div className="font-semibold text-neutral-300 uppercase tracking-wider">
              {language === 'ko' ? '협회 인증' : 'Affiliations'}
            </div>
            <p>National Association of REALTORS®</p>
            <p>New Jersey REALTORS®</p>
            <p>Greater Bergen REALTORS®</p>
            <p>New Jersey Multiple Listing Service (NJMLS)</p>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 text-xs text-neutral-500 leading-relaxed space-y-3">
          <p>{t.footer.disclaimer}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-neutral-900 text-neutral-600">
            <div>{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</div>
            <div className="flex items-center gap-4">
              <span>Equal Housing Opportunity</span>
              <span>·</span>
              <span>Fort Lee, New Jersey</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
