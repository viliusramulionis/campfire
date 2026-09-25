import React, { useState } from 'react';
import { PRODUCT_IMAGES } from '../data/productData';

interface ProductPurchaseSectionProps {
  onAddToCart?: (quantity: number) => void;
  onInstantBuy: (quantity: number) => void;
  basePrice: number;
  language: 'LT' | 'EN';
  onOpenImageModal: (src: string) => void;
}

export const ProductPurchaseSection: React.FC<ProductPurchaseSectionProps> = ({
  onAddToCart,
  onInstantBuy,
  basePrice,
  language,
  onOpenImageModal,
}) => {
  const [selectedImage, setSelectedImage] = useState(PRODUCT_IMAGES[0].src);
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const totalPrice = quantity * basePrice;

  return (
    <section id="apie-virykle" className="w-full bg-surface py-space-2xl border-b border-border-hairline/40">
      <div className="max-w-[1360px] mx-auto px-margin-sm lg:px-margin-lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-space-xl">
          <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
            {language === 'LT' ? 'Kompaktiška lauko virtuvė' : 'Compact Outdoor Kitchen'}
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
            {language === 'LT' ? 'Campfire Pro laužo viryklė' : 'Campfire Pro Bushcraft Stove'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-2">
            {language === 'LT'
              ? 'Pramoninis 3 mm AISI 304 plienas, 2 plokštės, dėklas ir karabinas komplekte.'
              : 'Industrial 3mm AISI 304 stainless steel, 2 plates, protective pouch and carabiner included.'}
          </p>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left: Gallery & Zoom */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="relative rounded-2xl overflow-hidden bg-surface-stone border border-border-hairline shadow-sm group">
              <img
                src={selectedImage}
                alt="Campfire Pro produkto nuotrauka"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                referrerPolicy="no-referrer"
                onClick={() => onOpenImageModal(selectedImage)}
              />
              <button
                onClick={() => onOpenImageModal(selectedImage)}
                className="absolute bottom-4 right-4 bg-surface-timber-dark/80 hover:bg-surface-timber-dark text-surface text-label-sm font-label-sm px-3 py-1.5 rounded-lg backdrop-blur-md border border-border-hairline/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                title={language === 'LT' ? 'Padidinti nuotrauką' : 'Zoom image'}
              >
                <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                <span>{language === 'LT' ? 'Priartinti' : 'Zoom'}</span>
              </button>

              <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-caps text-label-caps px-3 py-1 rounded shadow-sm">
                AISI 304 NERŪDIJANTIS PLIENAS
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {PRODUCT_IMAGES.map((img, idx) => {
                const isActive = selectedImage === img.src;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img.src)}
                    className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all p-0.5 cursor-pointer ${
                      isActive
                        ? 'border-secondary ring-2 ring-secondary/30 scale-102 opacity-100'
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-border-hairline'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-surface-timber-dark/80 backdrop-blur-xs text-[10px] text-surface font-label-caps text-center py-0.5 rounded truncate px-1">
                      {img.tag}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-surface-container-low/70 border border-border-hairline rounded-2xl p-space-lg sm:p-space-xl flex flex-col gap-space-md shadow-sm">
            {/* Price & Stock */}
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">
                  {language === 'LT' ? 'Oficialus gamintojas' : 'Official Manufacturer'}
                </span>
                <h3 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                  Campfire Pro
                </h3>
              </div>
              <div className="text-right">
                <span className="font-headline-xl text-headline-xl font-extrabold text-primary tabular-nums block">
                  {totalPrice.toFixed(2)} €
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-on-surface-variant tabular-nums">
                    ({basePrice.toFixed(2)} € / vnt.)
                  </span>
                )}
              </div>
            </div>

            {/* In stock badge */}
            <div className="flex items-center gap-2 p-3 bg-primary-container/10 border border-primary-container/20 rounded-xl text-forest-deep font-label-sm text-label-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-forest-light animate-ping" />
              <span className="font-semibold">
                {language === 'LT' ? 'Turime sandėlyje Lietuvoje' : 'In stock in Lithuania'}
              </span>
              <span className="text-on-surface-variant ml-auto">
                {language === 'LT' ? 'Išsiuntimas per 24 val.' : 'Ships in 24h'}
              </span>
            </div>

            {/* Highlights bullets */}
            <ul className="flex flex-col gap-2.5 py-2 border-y border-border-hairline/60 font-body-sm text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <span>
                  {language === 'LT'
                    ? '2x nerūdijančio plieno plokštės (3 mm storis)'
                    : '2x stainless steel plates (3mm thickness)'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <span>
                  {language === 'LT'
                    ? 'Apsauginis dėklas ir karabinas komplekte'
                    : 'Protective pouch and carabiner included'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <span>
                  {language === 'LT'
                    ? 'Nemokamas pristatymas į visus Omniva ir DPD paštomatus'
                    : 'Free delivery to all Omniva and DPD parcel lockers'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <span>
                  {language === 'LT'
                    ? '5 metų gamintojo garantija plieno deformacijoms'
                    : '5-year manufacturer warranty against steel warping'}
                </span>
              </li>
            </ul>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <label className="font-label-md text-label-md text-primary font-semibold">
                {language === 'LT' ? 'Kiekis:' : 'Quantity:'}
              </label>
              <div className="flex items-center border border-border-hairline bg-surface rounded-xl p-1 shadow-xs">
                <button
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  aria-label="Sumažinti kiekį"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="w-12 text-center font-headline-sm font-bold text-primary tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-colors cursor-pointer"
                  aria-label="Padidinti kiekį"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>

            {/* CTA: Buy Now */}
            <div className="pt-2">
              <button
                onClick={() => onInstantBuy(quantity)}
                className="w-full bg-flame-ember hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {language === 'LT'
                    ? `Užsakyti dabar — ${totalPrice.toFixed(2)} €`
                    : `Order Now — ${totalPrice.toFixed(2)} €`}
                </span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Guarantees small row */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] font-label-sm text-on-surface-variant border-t border-border-hairline/60">
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-forest-deep text-[18px] mb-0.5">
                  local_shipping
                </span>
                <span>{language === 'LT' ? 'Siuntimas tik 3.99 €' : 'Shipping only 3.99 €'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-forest-deep text-[18px] mb-0.5">
                  replay
                </span>
                <span>{language === 'LT' ? '14 d. grąžinimas' : '14-Day Returns'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-forest-deep text-[18px] mb-0.5">
                  verified_user
                </span>
                <span>{language === 'LT' ? '5 m. garantija' : '5-Yr Warranty'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
