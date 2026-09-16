import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'buy', label: t.buy },
    { id: 'rent', label: t.rent },
    { id: 'sell', label: t.sell },
    { id: 'properties', label: t.properties },
    { id: 'communities', label: t.communities },
    { id: 'about', label: t.about },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="header-brand-logo"
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <div className="text-xl md:text-2xl font-semibold tracking-[0.18em] text-neutral-950 uppercase font-sans">
            THE ADDRESS
          </div>
          <div className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase font-medium mt-0.5">
            New Jersey Real Estate
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'properties' && currentPage === 'property-detail') ||
              (item.id === 'communities' && currentPage === 'community-detail');

            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors cursor-pointer py-1 ${
                  isActive
                    ? 'text-neutral-950 font-semibold border-b border-neutral-950'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Language Switcher & Mobile Toggle */}
        <div className="flex items-center space-x-6">
          {/* Dual Language Switcher */}
          <div className="flex items-center text-xs tracking-wider font-medium text-neutral-500">
            <button
              id="lang-toggle-ko"
              onClick={() => setLanguage('ko')}
              className={`cursor-pointer transition-colors px-1 py-0.5 ${
                language === 'ko' ? 'text-neutral-950 font-bold' : 'hover:text-neutral-950'
              }`}
            >
              한국어
            </button>
            <span className="text-neutral-300 mx-1">|</span>
            <button
              id="lang-toggle-en"
              onClick={() => setLanguage('en')}
              className={`cursor-pointer transition-colors px-1 py-0.5 ${
                language === 'en' ? 'text-neutral-950 font-bold' : 'hover:text-neutral-950'
              }`}
            >
              English
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-800 hover:text-neutral-950 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-2.5 text-base font-medium tracking-wide transition-colors ${
                  isActive ? 'text-neutral-950 font-semibold pl-2 border-l-2 border-neutral-950' : 'text-neutral-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
