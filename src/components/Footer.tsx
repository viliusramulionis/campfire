import React from 'react';
import { LOGO_FOOTER_URL } from '../data/productData';
import { InfoModalType } from './InfoModal';

interface FooterProps {
  onOpenInfo: (type: InfoModalType) => void;
  language: 'LT' | 'EN';
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfo, language }) => {
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-1px_0_rgba(222,216,206,0.6)] pt-space-2xl pb-space-xl border-t border-border-hairline">
      <div className="max-w-[1360px] mx-auto px-margin-sm lg:px-margin-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-xl">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
              >
                <img
                  src={LOGO_FOOTER_URL}
                  alt="Campfire Lietuva"
                  className="h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              {language === 'LT'
                ? 'Aukštos kokybės, Lietuvoje suprojektuota minimalistinė kempingo ir bushcraft įranga. Sukurta tarnauti ekstremaliomis lauko sąlygomis ir suartinti su laukine gamta.'
                : 'High-grade minimalist camping & bushcraft gear designed in the Baltics. Engineered for rigorous wilderness use and connecting with raw nature.'}
            </p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded font-label-caps text-label-caps text-forest-deep border border-border-hairline/60">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                {language === 'LT' ? 'PAGAMINTA BALTIJOS ŠALYSE' : 'MADE IN BALTICS'}
              </div>
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded font-label-caps text-label-caps text-forest-deep border border-border-hairline/60">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                {language === 'LT' ? '5 METŲ GARANTIJA' : '5 YEAR WARRANTY'}
              </div>
            </div>
          </div>

          {/* Customer Links */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <span className="font-label-caps text-label-caps text-on-surface uppercase font-bold">
              {language === 'LT' ? 'Informacija pirkėjui' : 'Customer Info'}
            </span>
            <nav className="flex flex-col gap-space-xs">
              <button
                onClick={() => onOpenInfo('contact')}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors text-left cursor-pointer py-1"
              >
                {language === 'LT' ? 'Kontaktai' : 'Contact'}
              </button>
              <button
                onClick={() => onOpenInfo('shipping')}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors text-left cursor-pointer py-1"
              >
                {language === 'LT' ? 'Pristatymas ir grąžinimas' : 'Shipping & Returns'}
              </button>
              <button
                onClick={() => onOpenInfo('privacy')}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors text-left cursor-pointer py-1"
              >
                {language === 'LT' ? 'Privatumo politika' : 'Privacy Policy'}
              </button>
              <button
                onClick={() => onOpenInfo('terms')}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors text-left cursor-pointer py-1"
              >
                {language === 'LT' ? 'Taisyklės ir sąlygos' : 'Terms & Conditions'}
              </button>
            </nav>
          </div>

          {/* Payment Badges */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <span className="font-label-caps text-label-caps text-on-surface uppercase font-bold">
              {language === 'LT' ? 'Saugūs atsiskaitymai' : 'Secure Payments'}
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {language === 'LT'
                ? 'Atsiskaitykite patikimais ir sertifikuotais būdais tiesiogiai internetu.'
                : 'Pay with trusted European banking and instant encrypted checkout options.'}
            </p>
            <div className="flex flex-wrap items-center gap-space-xs">
              <div className="px-space-sm py-space-xs bg-surface-container rounded text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 border border-border-hairline/60">
                <span className="material-symbols-outlined text-[15px] text-forest-deep">
                  account_balance
                </span>
                Paysera
              </div>
              <div className="px-space-sm py-space-xs bg-surface-container rounded text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 border border-border-hairline/60">
                <span className="material-symbols-outlined text-[15px] text-forest-deep">
                  savings
                </span>
                Banklink
              </div>
              <div className="px-space-sm py-space-xs bg-surface-container rounded text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 border border-border-hairline/60">
                <span className="material-symbols-outlined text-[15px] text-forest-deep">
                  credit_card
                </span>
                Kortelės
              </div>
              <div className="px-space-sm py-space-xs bg-surface-container rounded text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 border border-border-hairline/60">
                <span className="material-symbols-outlined text-[15px] text-forest-deep">
                  contactless
                </span>
                Apple Pay
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-border-hairline/60">
          <div className="font-label-sm text-label-sm text-on-surface-variant">
            © 2025 Campfire Lietuva. Visos teisės saugomos.
          </div>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">eco</span>
              {language === 'LT' ? 'Tvarus plienas' : 'Sustainable Steel'}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">
                local_fire_department
              </span>
              {language === 'LT' ? 'Ugnies galia' : 'Wild Fire Power'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
