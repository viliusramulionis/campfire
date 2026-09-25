import React from 'react';
import { SPECS_LEFT, SPECS_RIGHT } from '../data/productData';

interface TechSpecsProps {
  language: 'LT' | 'EN';
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ language }) => {
  return (
    <section className="w-full bg-surface-container-low py-space-2xl border-b border-border-hairline/40" id="techniniai-duomenys">
      <div className="max-w-[1000px] mx-auto px-margin-sm lg:px-margin-lg">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-space-xl">
          <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
            {language === 'LT' ? 'Grynoji inžinerija' : 'Pure Engineering'}
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
            {language === 'LT' ? 'Techninės specifikacijos' : 'Technical Specifications'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-2">
            {language === 'LT'
              ? 'Pagaminta naudojant sertifikuotą pramoninį plieną pagal griežtus Baltijos šalių kokybės standartus.'
              : 'Manufactured with certified industrial-grade steel adhering to rigorous Baltic quality standards.'}
          </p>
        </div>

        {/* Matrix Table */}
        <div className="rounded-xl overflow-hidden shadow-sm bg-surface border border-border-hairline">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-hairline">
            {/* Left Col */}
            <div className="flex flex-col divide-y divide-border-hairline">
              {SPECS_LEFT.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-space-md flex items-center justify-between ${
                    idx % 2 === 0 ? 'bg-surface-stone/40' : 'bg-surface'
                  }`}
                >
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    {item.label}
                  </span>
                  <span
                    className={`font-tech-spec text-tech-spec font-bold tabular-nums ${
                      item.highlight ? 'text-forest-deep' : 'text-primary'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Col */}
            <div className="flex flex-col divide-y divide-border-hairline">
              {SPECS_RIGHT.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-space-md flex items-center justify-between ${
                    idx % 2 === 0 ? 'bg-surface-stone/40' : 'bg-surface'
                  }`}
                >
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    {item.label}
                  </span>
                  <span
                    className={`font-tech-spec text-tech-spec font-bold tabular-nums ${
                      item.highlight ? 'text-forest-deep' : 'text-primary'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Included In Box */}
        <div className="mt-space-md p-space-md rounded-xl bg-surface flex flex-col sm:flex-row items-center justify-between gap-space-sm shadow-sm border border-border-hairline">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-forest-deep shrink-0">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                {language === 'LT' ? 'Kas įeina į komplektą?' : 'What is included in the box?'}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {language === 'LT'
                  ? '2 vnt. nerūdijančio plieno plokštės, atsparus dilimui apsauginis dėklas ir karabinas.'
                  : '2x stainless steel interlocking plates, protective pouch, and carabiner.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 px-4 py-2 bg-primary-container text-on-primary font-label-caps text-label-caps uppercase rounded tracking-wider font-semibold">
            {language === 'LT' ? 'Pilnas komplektas' : 'Full Package'}
          </div>
        </div>
      </div>
    </section>
  );
};
