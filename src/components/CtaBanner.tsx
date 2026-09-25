import React from 'react';

interface CtaBannerProps {
  onBuyNow: () => void;
  price: number;
  language: 'LT' | 'EN';
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onBuyNow,
  price,
  language,
}) => {
  return (
    <section className="max-w-[1360px] mx-auto px-margin-sm lg:px-margin-lg py-space-2xl w-full">
      <div className="rounded-2xl bg-surface-timber-dark text-surface p-space-xl lg:p-space-2xl relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-xl">
        {/* Glows */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-flame-ember/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-forest-light/30 blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-space-xs z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 font-label-caps text-label-caps text-flame-core uppercase font-semibold">
            <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
            {language === 'LT' ? 'Pasiruoškite naujam lauko sezonui' : 'Ready for the Wilderness Season'}
          </span>
          <h2 className="font-headline-xl text-headline-xl text-surface font-extrabold tracking-tight">
            {language === 'LT'
              ? 'Pradėkite gaminti ant gyvos ugnies bet kur'
              : 'Cook over genuine open flame anywhere'}
          </h2>
          <p className="font-body-md text-body-md text-surface/80">
            {language === 'LT'
              ? `Užsisakykite originalią „Campfire Pro“ kryžmę jau šiandien už specialią ${price.toFixed(2)} € kainą su greitu pristatymu į Omniva ir DPD paštomatus.`
              : `Order the authentic Campfire Pro stove today for only ${price.toFixed(2)} € with fast delivery to Omniva and DPD lockers.`}
          </p>
          <div className="flex items-center gap-4 text-surface/70 font-label-sm text-label-sm pt-2">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-flame-core">done</span>
              {language === 'LT' ? 'Siuntimas tik 3.99 €' : 'Shipping only 3.99 €'}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-flame-core">done</span>
              {language === 'LT' ? 'Nerūdijantis plienas' : 'AISI 304 Steel'}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-flame-core">done</span>
              {language === 'LT' ? '14 d. grąžinimas' : '14-Day Return'}
            </span>
          </div>
        </div>

        <div className="z-10 flex flex-col sm:flex-row items-center gap-space-sm w-full md:w-auto">
          <button
            onClick={onBuyNow}
            className="w-full sm:w-auto bg-flame-ember hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold px-8 py-4 rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {language === 'LT'
                ? `Pirkti dabar — ${price.toFixed(2)} €`
                : `Order Now — ${price.toFixed(2)} €`}
            </span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
