import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { properties } from './data/properties';
import { communities } from './data/communities';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { CommunityDetailPage } from './pages/CommunityDetailPage';
import { SellPage } from './pages/SellPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);
  const [searchParams, setSearchParams] = useState<{
    intent?: 'buy' | 'rent';
    keyword?: string;
    propertyType?: string;
    maxPrice?: number;
    city?: string;
  }>({});

  // Sync hash routing on mount and hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash || hash === '') {
        setCurrentPage('home');
        setPageParam(undefined);
      } else if (hash.startsWith('property/')) {
        const id = hash.replace('property/', '');
        setCurrentPage('property-detail');
        setPageParam(id);
      } else if (hash.startsWith('community/')) {
        const slug = hash.replace('community/', '');
        setCurrentPage('community-detail');
        setPageParam(slug);
      } else {
        const [page, param] = hash.split('/');
        setCurrentPage(page);
        setPageParam(param);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);

    if (page === 'home') {
      window.location.hash = '/';
    } else if (page === 'property-detail' && param) {
      window.location.hash = `/property/${param}`;
    } else if (page === 'community-detail' && param) {
      window.location.hash = `/community/${param}`;
    } else if (param) {
      window.location.hash = `/${page}/${param}`;
    } else {
      window.location.hash = `/${page}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (params: {
    intent: 'buy' | 'rent';
    keyword: string;
    propertyType: string;
    maxPrice: number;
  }) => {
    setSearchParams(params);
    navigateTo(params.intent);
  };

  // Selected property for detail view
  const currentProperty = properties.find((p) => p.id === pageParam) || properties[0];

  // Selected community for detail view
  const currentCommunity = communities.find((c) => c.slug === pageParam) || communities[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col selection:bg-neutral-900 selection:text-white">
      {/* Universal Minimal Header */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            properties={properties}
            onNavigate={navigateTo}
            onSearch={handleHeroSearch}
          />
        )}

        {currentPage === 'buy' && (
          <PropertiesPage
            key="buy"
            mode="buy"
            properties={properties}
            onNavigate={navigateTo}
            initialFilters={{
              keyword: searchParams.keyword,
              propertyType: searchParams.propertyType,
              maxPrice: searchParams.maxPrice,
            }}
          />
        )}

        {currentPage === 'rent' && (
          <PropertiesPage
            key="rent"
            mode="rent"
            properties={properties}
            onNavigate={navigateTo}
            initialFilters={{
              keyword: searchParams.keyword,
              propertyType: searchParams.propertyType,
              maxPrice: searchParams.maxPrice,
            }}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesPage
            key="properties"
            mode="all"
            properties={properties}
            onNavigate={navigateTo}
            initialFilters={{
              keyword: searchParams.keyword,
              city: searchParams.city,
              propertyType: searchParams.propertyType,
              maxPrice: searchParams.maxPrice,
            }}
          />
        )}

        {currentPage === 'property-detail' && (
          <PropertyDetailPage
            property={currentProperty}
            onBack={() => navigateTo('properties')}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'communities' && (
          <CommunitiesPage
            properties={properties}
            onSelectCommunity={(slug) => navigateTo('community-detail', slug)}
          />
        )}

        {currentPage === 'community-detail' && (
          <CommunityDetailPage
            community={currentCommunity}
            properties={properties}
            onBack={() => navigateTo('communities')}
            onSelectProperty={(id) => navigateTo('property-detail', id)}
            onExploreProperties={(city) => {
              setSearchParams({ city });
              navigateTo('properties');
            }}
          />
        )}

        {currentPage === 'sell' && <SellPage />}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Universal Brokerage Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
