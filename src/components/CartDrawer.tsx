import React from 'react';
import { CartItem, Accessory } from '../types';
import { ACCESSORIES } from '../data/productData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onAddAccessory: (accessory: Accessory) => void;
  onProceedToCheckout: () => void;
  language: 'LT' | 'EN';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddAccessory,
  onProceedToCheckout,
  language,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 40.0;
  const isFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-timber-dark/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-space-md border-b border-border-hairline flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              shopping_bag
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {language === 'LT' ? 'Tavo krepšelis' : 'Your Shopping Bag'}
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Uždaryti krepšelį"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="px-space-md py-2.5 bg-primary-container/10 border-b border-primary-container/20 flex items-center gap-2 text-xs font-label-sm text-forest-deep">
          <span className="material-symbols-outlined text-[16px] text-forest-deep">
            local_shipping
          </span>
          {isFreeShipping ? (
            <span>
              {language === 'LT'
                ? 'Jums taikomas nemokamas Omniva / DPD pristatymas!'
                : 'You have unlocked free Omniva / DPD shipping!'}
            </span>
          ) : (
            <span>
              {language === 'LT'
                ? `Pridėkite dar ${(freeShippingThreshold - subtotal).toFixed(2)} € iki nemokamo pristatymo`
                : `Add ${(freeShippingThreshold - subtotal).toFixed(2)} € more for free delivery`}
            </span>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] text-border-hairline mb-2">
                remove_shopping_cart
              </span>
              <p className="font-headline-sm font-semibold text-primary">
                {language === 'LT' ? 'Krepšelis tuščias' : 'Your cart is empty'}
              </p>
              <p className="font-body-sm text-body-sm mt-1">
                {language === 'LT'
                  ? 'Pasirinkite prekę ir pridėkite ją į krepšelį.'
                  : 'Add Campfire Pro to your cart to proceed.'}
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-border-hairline"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-surface-stone shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-headline-sm text-[15px] font-bold text-primary truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant truncate">{item.subtitle}</p>
                  <p className="font-tech-spec text-sm font-bold text-primary mt-1 tabular-nums">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-on-surface-variant hover:text-error transition-colors p-1"
                    title={language === 'LT' ? 'Pašalinti' : 'Remove'}
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>

                  <div className="flex items-center border border-border-hairline rounded-lg bg-surface">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-xs hover:bg-surface-container rounded-l cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-xs hover:bg-surface-container rounded-r cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Quick Add Accessories */}
          <div className="mt-4 pt-3 border-t border-border-hairline">
            <span className="font-label-caps text-label-caps text-secondary uppercase font-bold block mb-2">
              {language === 'LT' ? 'Rekomenduojami priedai' : 'Recommended Add-ons'}
            </span>

            <div className="flex flex-col gap-2">
              {ACCESSORIES.map((acc) => {
                const isAlreadyInCart = items.some((i) => i.id === acc.id);
                return (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-border-hairline/70"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={acc.image}
                        alt={acc.name}
                        className="w-10 h-10 rounded object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-primary truncate">{acc.name}</p>
                        <p className="text-[11px] text-on-surface-variant truncate">
                          +{acc.price.toFixed(2)} €
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddAccessory(acc)}
                      disabled={isAlreadyInCart}
                      className={`text-xs px-2.5 py-1.5 rounded-md font-semibold shrink-0 transition-colors ${
                        isAlreadyInCart
                          ? 'bg-surface-container text-on-surface-variant cursor-default'
                          : 'bg-primary text-on-primary hover:bg-forest-light cursor-pointer'
                      }`}
                    >
                      {isAlreadyInCart
                        ? language === 'LT'
                          ? 'Pridėta'
                          : 'Added'
                        : language === 'LT'
                        ? '+ Pridėti'
                        : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer / Checkout Button */}
        {items.length > 0 && (
          <div className="p-space-md border-t border-border-hairline bg-surface-container-low flex flex-col gap-3">
            <div className="flex items-center justify-between font-label-md">
              <span className="text-on-surface-variant">
                {language === 'LT' ? 'Tarpinė suma:' : 'Subtotal:'}
              </span>
              <span className="font-headline-sm font-bold text-primary tabular-nums">
                {subtotal.toFixed(2)} €
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span>{language === 'LT' ? 'Pristatymas (Omniva/DPD):' : 'Shipping (Omniva/DPD):'}</span>
              <span className="font-semibold text-forest-deep">
                {isFreeShipping ? (language === 'LT' ? 'NEMOKAMAS' : 'FREE') : '3.99 €'}
              </span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full bg-flame-ember hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold py-3.5 rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <span>{language === 'LT' ? 'Pereiti prie apmokėjimo' : 'Proceed to Checkout'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
