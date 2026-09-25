import React, { useState } from 'react';
import { FAQ_LIST } from '../data/productData';

interface FaqSectionProps {
  language: 'LT' | 'EN';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-surface-container-low py-space-2xl border-b border-border-hairline/40" id="duk">
      <div className="max-w-[860px] mx-auto px-margin-sm lg:px-margin-lg">
        <div className="text-center mb-space-xl">
          <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
            {language === 'LT' ? 'Atsakymai į klausimus' : 'Answers & Questions'}
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
            {language === 'LT' ? 'Dažniausiai užduodami klausimai' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="flex flex-col gap-space-sm" id="faq-container">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-surface shadow-sm overflow-hidden border border-border-hairline/60 transition-colors"
              >
                <button
                  type="button"
                  className="w-full p-space-md flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-headline-sm text-headline-sm text-primary font-semibold group-hover:text-forest-deep transition-colors pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-forest-deep transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-content px-space-md pb-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed animate-in fade-in duration-200 border-t border-border-hairline/30 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
