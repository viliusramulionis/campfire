import React, { useEffect, useState } from 'react';

interface OrderContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  onUpdateQuantity?: (newQty: number) => void;
  basePrice: number;
  language: 'LT' | 'EN';
}

interface CheckoutResponse {
  paymentUrl?: string;
  error?: string;
}

export const OrderContactModal: React.FC<OrderContactModalProps> = ({
  isOpen,
  onClose,
  quantity: initialQuantity,
  onUpdateQuantity,
  basePrice,
  language,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+370 ');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity, isOpen]);

  useEffect(() => {
    if (isOpen) setErrorMessage(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const shippingCost = 3.99;
  const grandTotal = quantity * basePrice + shippingCost;

  const handleQuantityChange = (nextQuantity: number) => {
    setQuantity(nextQuantity);
    onUpdateQuantity?.(nextQuantity);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/paysera/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          comment: comment.trim(),
          language,
        }),
      });

      const result = (await response.json()) as CheckoutResponse;
      if (!response.ok || !result.paymentUrl) {
        throw new Error(result.error || 'Paysera checkout request failed.');
      }

      window.location.assign(result.paymentUrl);
    } catch (error) {
      console.error('Paysera checkout error:', error);
      setErrorMessage(
        language === 'LT'
          ? 'Nepavyko pradėti Paysera apmokėjimo. Patikrinkite ryšį ir bandykite dar kartą.'
          : 'Could not start Paysera checkout. Check your connection and try again.'
      );
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-surface-timber-dark/75 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl border border-border-hairline overflow-hidden z-10 my-auto animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-hairline bg-surface-container/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flame-ember/15 flex items-center justify-center text-flame-ember">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            </div>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base sm:text-lg">
                {language === 'LT' ? 'Užsakymas ir apmokėjimas' : 'Order and payment'}
              </h3>
              <p className="font-label-sm text-[12px] text-on-surface-variant">
                {language === 'LT'
                  ? 'Saugus apmokėjimas per Paysera'
                  : 'Secure payment powered by Paysera'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container active:scale-95 transition-colors cursor-pointer"
            aria-label={language === 'LT' ? 'Uždaryti' : 'Close'}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between p-3.5 bg-surface-container/60 rounded-xl border border-border-hairline">
            <div>
              <div className="font-semibold text-primary text-sm">Campfire Pro</div>
              <div className="text-xs text-on-surface-variant">
                {basePrice.toFixed(2)} € / {language === 'LT' ? 'vnt.' : 'item'} +{' '}
                {shippingCost.toFixed(2)} € {language === 'LT' ? 'pristatymas' : 'shipping'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-border-hairline rounded-lg bg-surface">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-colors cursor-pointer"
                  aria-label={language === 'LT' ? 'Sumažinti kiekį' : 'Decrease quantity'}
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="w-8 text-center font-bold text-primary text-sm tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-colors cursor-pointer"
                  aria-label={language === 'LT' ? 'Padidinti kiekį' : 'Increase quantity'}
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
              <div className="text-right pl-2">
                <div className="text-xs text-on-surface-variant">
                  {language === 'LT' ? 'Iš viso:' : 'Total:'}
                </div>
                <div className="font-bold text-flame-ember text-sm sm:text-base tabular-nums">
                  {grandTotal.toFixed(2)} €
                </div>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-xs sm:text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                {language === 'LT' ? 'Vardas *' : 'First name *'}
              </label>
              <input
                type="text"
                required
                maxLength={100}
                autoComplete="given-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                {language === 'LT' ? 'Pavardė *' : 'Last name *'}
              </label>
              <input
                type="text"
                required
                maxLength={100}
                autoComplete="family-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                {language === 'LT' ? 'El. paštas *' : 'Email *'}
              </label>
              <input
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="vardas@pavyzdys.lt"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                {language === 'LT' ? 'Telefono numeris *' : 'Phone number *'}
              </label>
              <input
                type="tel"
                required
                maxLength={40}
                autoComplete="tel"
                placeholder="+370 600 00000"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">
              {language === 'LT' ? 'Paštomatas / pristatymo pastabos' : 'Parcel locker / delivery notes'}
            </label>
            <textarea
              rows={3}
              maxLength={500}
              placeholder={
                language === 'LT'
                  ? 'Nurodykite pageidaujamą Omniva arba DPD paštomatą...'
                  : 'Specify your preferred parcel locker or delivery notes...'
              }
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-flame-ember hover:bg-secondary disabled:opacity-60 text-on-secondary font-label-md text-label-md font-bold py-3.5 rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">
                    progress_activity
                  </span>
                  <span>{language === 'LT' ? 'Jungiama prie Paysera...' : 'Connecting to Paysera...'}</span>
                </>
              ) : (
                <>
                  <span>
                    {language === 'LT'
                      ? `Apmokėti per Paysera (${grandTotal.toFixed(2)} €)`
                      : `Pay with Paysera (${grandTotal.toFixed(2)} €)`}
                  </span>
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 text-center text-[11px] text-on-surface-variant mt-2.5">
              <span className="material-symbols-outlined text-forest-deep text-[15px]">verified_user</span>
              {language === 'LT'
                ? 'Apmokėjimas bus atliekamas saugioje Paysera aplinkoje.'
                : 'Payment is completed securely on Paysera.'}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
