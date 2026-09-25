import React, { useState } from 'react';
import { LOGO_HEADER_URL } from '../data/productData';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAbout: () => void;
  language: 'LT' | 'EN';
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAbout,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-border-hairline/40">
      <div className="h-20 max-w-[1360px] mx-auto px-margin-sm lg:px-margin-lg flex items-center justify-between gap-gutter">
        {/* Brand Zone */}
        <div className="flex items-center gap-space-md">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-space-xs cursor-pointer focus:outline-none transition-opacity hover:opacity-90"
            aria-label="Campfire Lietuva pradžia"
          >
            <img
              src={LOGO_HEADER_URL}
              alt="Campfire Lietuva"
              className="h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden xl:flex items-center gap-space-xs p-space-xs bg-surface-container-low rounded-full border border-border-hairline/40"
          aria-label="Pagrindinė navigacija"
        >
          <button
            onClick={onOpenAbout}
            className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            {language === 'LT' ? 'Apie viryklę' : 'About the Stove'}
          </button>
          <button
            onClick={() => scrollToSection('techniniai-duomenys')}
            className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            {language === 'LT' ? 'Techniniai duomenys' : 'Technical Specs'}
          </button>
          <button
            onClick={() => scrollToSection('duk')}
            className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            {language === 'LT' ? 'DUK' : 'FAQ'}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer font-label-sm text-label-sm px-2.5 py-1.5 rounded-lg border border-border-hairline/60 bg-surface-container-low/60 hover:bg-surface-container transition-colors"
            title={language === 'LT' ? 'Perjungti į anglų k.' : 'Switch to Lithuanian'}
          >
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span className="font-semibold">{language}</span>
          </button>

          <div className="h-5 w-px bg-border-hairline hidden"></div>

          {/* Cart Button (Hidden as requested, preserved for functionality) */}
          <button
            onClick={onOpenCart}
            className="hidden items-center gap-2 bg-primary text-on-primary hover:bg-forest-light px-3.5 sm:px-space-md py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer font-label-md text-label-md group active:scale-95"
            aria-label="Atidaryti prekių krepšelį"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
              shopping_bag
            </span>
            <span className="hidden sm:inline">
              {language === 'LT' ? `Krepšelis (${cartCount})` : `Cart (${cartCount})`}
            </span>
            <span className="sm:hidden font-semibold">({cartCount})</span>
            <span className="text-flame-core font-semibold tabular-nums ml-0.5">
              {cartTotal.toFixed(2)} €
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            aria-label="Atidaryti meniu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-low border-b border-border-hairline px-margin-sm py-4 flex flex-col gap-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          <button
            onClick={onOpenAbout}
            className="w-full text-left px-4 py-2.5 rounded-lg text-on-surface font-label-md hover:bg-surface-container transition-colors"
          >
            {language === 'LT' ? 'Apie viryklę' : 'About the Stove'}
          </button>
          <button
            onClick={() => scrollToSection('techniniai-duomenys')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-on-surface font-label-md hover:bg-surface-container transition-colors"
          >
            {language === 'LT' ? 'Techniniai duomenys' : 'Technical Specs'}
          </button>
          <button
            onClick={() => scrollToSection('duk')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-on-surface font-label-md hover:bg-surface-container transition-colors"
          >
            {language === 'LT' ? 'Dažniausiai užduodami klausimai (DUK)' : 'FAQ'}
          </button>
        </div>
      )}
    </header>
  );
};
