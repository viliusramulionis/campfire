import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
  language: 'LT' | 'EN';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  language,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+370 6');
  const [email, setEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'omniva' | 'dpd' | 'courier'>('omniva');
  const [selectedLocker, setSelectedLocker] = useState('Vilniaus Akropolis paštomatas (Ozo g. 25)');
  const [paymentMethod, setPaymentMethod] = useState<'paysera' | 'banklink' | 'card' | 'applepay'>('paysera');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal >= 40.0 ? 0 : 3.99;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrder = `CAMP-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setStep('success');
      onOrderSuccess();
    }, 900);
  };

  const handleFinish = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-timber-dark/70 backdrop-blur-xs transition-opacity"
        onClick={step === 'success' ? handleFinish : onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl overflow-hidden border border-border-hairline z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-space-md bg-surface-container-low border-b border-border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-forest-deep text-[22px]">
              {step === 'success' ? 'verified' : 'shopping_bag'}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {step === 'success'
                ? language === 'LT'
                  ? 'Užsakymas patvirtintas!'
                  : 'Order Confirmed!'
                : language === 'LT'
                ? 'Saugus užsakymo apmokėjimas'
                : 'Secure Checkout'}
            </h3>
          </div>

          <button
            onClick={step === 'success' ? handleFinish : onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Uždaryti"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-space-md sm:p-space-lg overflow-y-auto flex-1">
          {step === 'details' ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
              {/* Items summary */}
              <div className="bg-surface-container-low/60 rounded-xl p-3 border border-border-hairline/60">
                <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold block mb-1.5">
                  {language === 'LT' ? 'Užsakymo krepšelis' : 'Order Summary'}
                </span>
                <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto text-xs text-on-surface-variant">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center py-0.5">
                      <span className="truncate pr-2">
                        {it.name} × {it.quantity}
                      </span>
                      <span className="font-tech-spec font-semibold text-primary shrink-0 tabular-nums">
                        {(it.price * it.quantity).toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-border-hairline flex justify-between items-center font-bold text-sm text-primary">
                  <span>{language === 'LT' ? 'Mokėtina suma:' : 'Total due:'}</span>
                  <span className="text-secondary font-headline-sm tabular-nums">
                    {grandTotal.toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Delivery method */}
              <div>
                <label className="font-label-md text-label-md text-primary font-semibold block mb-2">
                  {language === 'LT' ? 'Pristatymo būdas' : 'Delivery Method'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('omniva')}
                    className={`p-2.5 rounded-xl border text-center font-label-sm text-xs transition-all cursor-pointer ${
                      deliveryMethod === 'omniva'
                        ? 'border-secondary bg-secondary/5 font-bold text-secondary'
                        : 'border-border-hairline bg-surface hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="block font-bold">Omniva</span>
                    <span className="text-[11px] text-forest-deep">Nemokamai</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('dpd')}
                    className={`p-2.5 rounded-xl border text-center font-label-sm text-xs transition-all cursor-pointer ${
                      deliveryMethod === 'dpd'
                        ? 'border-secondary bg-secondary/5 font-bold text-secondary'
                        : 'border-border-hairline bg-surface hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="block font-bold">DPD Paštomatas</span>
                    <span className="text-[11px] text-forest-deep">Nemokamai</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('courier')}
                    className={`p-2.5 rounded-xl border text-center font-label-sm text-xs transition-all cursor-pointer ${
                      deliveryMethod === 'courier'
                        ? 'border-secondary bg-secondary/5 font-bold text-secondary'
                        : 'border-border-hairline bg-surface hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="block font-bold">Kurjeris</span>
                    <span className="text-[11px] text-on-surface-variant">Iki durų</span>
                  </button>
                </div>
              </div>

              {/* Locker selection or address */}
              {deliveryMethod !== 'courier' ? (
                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1">
                    {language === 'LT' ? 'Pasirinkite paštomatą:' : 'Select Parcel Locker:'}
                  </label>
                  <select
                    value={selectedLocker}
                    onChange={(e) => setSelectedLocker(e.target.value)}
                    className="w-full bg-surface border border-border-hairline rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-forest-deep"
                  >
                    <option>Vilniaus Akropolis paštomatas (Ozo g. 25)</option>
                    <option>Vilniaus Panorama paštomatas (Saltoniškių g. 9)</option>
                    <option>Vilniaus Gedimino pr. 9 paštomatas</option>
                    <option>Kauno Mega paštomatas (Islandijos pl. 32)</option>
                    <option>Kauno Akropolis paštomatas (Karaliaus Mindaugo pr. 49)</option>
                    <option>Klaipėdos Akropolis paštomatas (Taikos pr. 61)</option>
                    <option>Šiaulių Saulės miestas paštomatas (Tilžės g. 109)</option>
                    <option>Panevėžio RYO paštomatas (Vakarinė g. 61)</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1">
                    {language === 'LT' ? 'Tikslus adresas kurjeriui:' : 'Full delivery address:'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Gatvė, namo nr., butas, miestas, pašto kodas"
                    className="w-full bg-surface border border-border-hairline rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-forest-deep"
                  />
                </div>
              )}

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1">
                    {language === 'LT' ? 'Vardas ir Pavardė *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Vardas Pavardė"
                    className="w-full bg-surface border border-border-hairline rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-forest-deep"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-xs text-on-surface-variant block mb-1">
                    {language === 'LT' ? 'Telefono numeris *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface border border-border-hairline rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-forest-deep tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-xs text-on-surface-variant block mb-1">
                  {language === 'LT' ? 'El. pašto adresas *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vardas@pavyzdys.lt"
                  className="w-full bg-surface border border-border-hairline rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-forest-deep"
                />
              </div>

              {/* Payment selector */}
              <div>
                <label className="font-label-md text-label-md text-primary font-semibold block mb-2">
                  {language === 'LT' ? 'Apmokėjimo būdas' : 'Payment Method'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paysera')}
                    className={`p-2 rounded-xl border text-center font-label-sm text-xs transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'paysera'
                        ? 'border-forest-deep bg-primary-container/10 font-bold text-forest-deep'
                        : 'border-border-hairline bg-surface hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    <span>Paysera</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('banklink')}
                    className={`p-2 rounded-xl border text-center font-label-sm text-xs transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'banklink'
                        ? 'border-forest-deep bg-primary-container/10 font-bold text-forest-deep'
                        : 'border-border-hairline bg-surface hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">savings</span>
                    <span>El. Bankininkystė</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 rounded-xl border text-center font-label-sm text-xs transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'border-forest-deep bg-primary-container/10 font-bold text-forest-deep'
                        : 'border-border-hairline bg-surface hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                    <span>Kortelė</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-2 rounded-xl border text-center font-label-sm text-xs transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'applepay'
                        ? 'border-forest-deep bg-primary-container/10 font-bold text-forest-deep'
                        : 'border-border-hairline bg-surface hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">contactless</span>
                    <span>Apple / Google Pay</span>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-flame-ember hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{language === 'LT' ? 'Apdorojama...' : 'Processing...'}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {language === 'LT'
                        ? `Apmokėti užsakymą — ${grandTotal.toFixed(2)} €`
                        : `Complete Payment — ${grandTotal.toFixed(2)} €`}
                    </span>
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Order Success Receipt View */
            <div className="flex flex-col items-center text-center py-4 gap-space-sm animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[36px] text-flame-core">
                  check_circle
                </span>
              </div>

              <h4 className="font-headline-lg text-primary font-bold">
                {language === 'LT' ? 'Ačiū už užsakymą!' : 'Thank you for your order!'}
              </h4>

              <p className="font-body-md text-on-surface-variant max-w-md">
                {language === 'LT'
                  ? 'Jūsų užsakymas sėkmingai gautas ir perduotas sandėlio komandai paruošimui.'
                  : 'Your order has been received and routed to our fulfillment hub in Vilnius.'}
              </p>

              {/* Receipt card */}
              <div className="w-full bg-surface-container-low p-4 rounded-xl border border-border-hairline text-left my-2 text-sm flex flex-col gap-2">
                <div className="flex justify-between items-center pb-2 border-b border-border-hairline">
                  <span className="font-label-caps text-on-surface-variant uppercase text-xs">
                    {language === 'LT' ? 'Užsakymo numeris' : 'Order Reference'}
                  </span>
                  <span className="font-tech-spec font-bold text-primary">{orderNumber}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">
                    {language === 'LT' ? 'Pristatymo vieta:' : 'Delivery destination:'}
                  </span>
                  <span className="font-semibold text-primary truncate max-w-[200px]">
                    {deliveryMethod === 'courier' ? 'Kurjeriu į namus' : selectedLocker}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">
                    {language === 'LT' ? 'Numatomas pristatymas:' : 'Estimated delivery:'}
                  </span>
                  <span className="font-semibold text-forest-deep">
                    1–2 d.d. (Omniva / DPD)
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-border-hairline font-bold text-sm text-primary">
                  <span>{language === 'LT' ? 'Iš viso apmokėta:' : 'Total paid:'}</span>
                  <span className="tabular-nums text-secondary font-headline-sm">
                    {grandTotal.toFixed(2)} €
                  </span>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant">
                {language === 'LT'
                  ? `Patvirtinimo laiškas su siuntos sekimo kodu išsiųstas adresu: ${email || 'jūsų el. paštu'}`
                  : `A confirmation email with package tracking will be sent to: ${email || 'your email'}`}
              </p>

              <button
                onClick={handleFinish}
                className="mt-3 bg-primary hover:bg-forest-light text-on-primary font-label-md px-8 py-3 rounded-xl transition-colors cursor-pointer"
              >
                {language === 'LT' ? 'Grįžti į parduotuvę' : 'Back to Shop'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
