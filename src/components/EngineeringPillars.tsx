import React from 'react';
import { ENGINEERING_PILLARS } from '../data/productData';

interface EngineeringPillarsProps {
  language: 'LT' | 'EN';
  onOpenImageModal: (src: string) => void;
}

export const EngineeringPillars: React.FC<EngineeringPillarsProps> = ({
  language,
  onOpenImageModal,
}) => {
  return (
    <section className="w-full bg-surface-container-low py-space-2xl border-b border-border-hairline/40">
      <div className="max-w-[1360px] mx-auto px-margin-sm lg:px-margin-lg">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
              {language === 'LT' ? 'Inžinerinis meistriškumas' : 'Engineering Excellence'}
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-1">
              {language === 'LT'
                ? 'Kodėl Campfire kryžmė neturi analogų?'
                : 'Why Campfire Cross Stove Has No Rivals?'}
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            {language === 'LT'
              ? 'Atsisakėme judančių dalių, plonų vielučių ir trapumo. Kiekviena detalė skirta tarnauti atšiauriausiomis gamtos sąlygomis.'
              : 'We eliminated moving hinges, fragile wire supports, and weak joints. Every element is crafted to survive the most demanding wilderness conditions.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {ENGINEERING_PILLARS.map((card) => (
            <div
              key={card.id}
              className="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-border-hairline/60 group"
            >
              <div
                className="h-48 overflow-hidden bg-surface-stone relative cursor-pointer"
                onClick={() => onOpenImageModal(card.image)}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface-timber-dark/80 text-surface font-label-caps text-[10px] uppercase backdrop-blur-xs">
                  {card.badge}
                </div>
              </div>

              <div className="p-space-md flex flex-col gap-2 flex-grow">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  {card.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
