import React from 'react';
import { GALLERY_CARDS } from '../data/productData';

interface FieldGalleryProps {
  language: 'LT' | 'EN';
  onOpenImageModal: (src: string) => void;
}

export const FieldGallery: React.FC<FieldGalleryProps> = ({
  language,
  onOpenImageModal,
}) => {
  return (
    <section className="max-w-[1360px] mx-auto px-margin-sm lg:px-margin-lg py-space-2xl w-full">
      <div className="text-center mx-auto mb-space-xl max-w-3xl">
        <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
          {language === 'LT' ? 'Išbandyta Lietuvos miškuose' : 'Field Tested in Baltic Forests'}
        </span>
        <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
          {language === 'LT'
            ? 'Sukurta tiems, kurie vertina tikrą ugnį'
            : 'Crafted for Those Who Value Real Fire'}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          {language === 'LT'
            ? 'Nuo trumpo kavos užvirimo ežero pakrantėje iki rimto bushcraft vakarienės ruošimo gilioje girioje.'
            : 'From a quick morning coffee by the lake shore to an elaborate wilderness feast deep in the woodlands.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-stretch">
        {/* Large Feature Card (7 cols) */}
        <div
          onClick={() => onOpenImageModal(GALLERY_CARDS.hero.image)}
          className="md:col-span-7 rounded-2xl overflow-hidden shadow-md relative min-h-[380px] group cursor-pointer"
        >
          <img
            src={GALLERY_CARDS.hero.image}
            alt={GALLERY_CARDS.hero.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-timber-dark/85 via-surface-timber-dark/20 to-transparent flex flex-col justify-end p-space-lg text-surface">
            <span className="font-label-caps text-label-caps text-flame-core uppercase font-semibold">
              {GALLERY_CARDS.hero.subtitle}
            </span>
            <h3 className="font-headline-lg text-headline-lg font-bold">
              {GALLERY_CARDS.hero.title}
            </h3>
            <p className="font-body-sm text-body-sm text-surface/90 max-w-lg mt-1">
              {GALLERY_CARDS.hero.description}
            </p>
          </div>
        </div>

        {/* Stacked Cards (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-space-md">
          <div
            onClick={() => onOpenImageModal(GALLERY_CARDS.item1.image)}
            className="rounded-2xl overflow-hidden shadow-md relative min-h-[200px] flex-1 group cursor-pointer"
          >
            <img
              src={GALLERY_CARDS.item1.image}
              alt={GALLERY_CARDS.item1.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-timber-dark/80 via-transparent to-transparent flex flex-col justify-end p-space-md text-surface">
              <span className="font-headline-sm text-headline-sm font-bold">
                {GALLERY_CARDS.item1.title}
              </span>
              <p className="font-body-sm text-body-sm text-surface/80">
                {GALLERY_CARDS.item1.description}
              </p>
            </div>
          </div>

          <div
            onClick={() => onOpenImageModal(GALLERY_CARDS.item2.image)}
            className="rounded-2xl overflow-hidden shadow-md relative min-h-[200px] flex-1 group cursor-pointer"
          >
            <img
              src={GALLERY_CARDS.item2.image}
              alt={GALLERY_CARDS.item2.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-timber-dark/80 via-transparent to-transparent flex flex-col justify-end p-space-md text-surface">
              <span className="font-headline-sm text-headline-sm font-bold">
                {GALLERY_CARDS.item2.title}
              </span>
              <p className="font-body-sm text-body-sm text-surface/80">
                {GALLERY_CARDS.item2.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
