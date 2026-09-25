import React, { useState, useEffect } from 'react';

interface OrderContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  onUpdateQuantity?: (newQty: number) => void;
  basePrice: number;
  language: 'LT' | 'EN';
  onSuccessToast?: (msg: string) => void;
}

export const OrderContactModal: React.FC<OrderContactModalProps> = ({
  isOpen,
  onClose,
  quantity: initialQuantity,
  onUpdateQuantity,
  basePrice,
  language,
  onSuccessToast,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+370 ');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync quantity if opened with new value
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity, isOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const shippingCost = 3.99;
  const itemsTotal = quantity * basePrice;
  const grandTotal = itemsTotal + shippingCost;

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      const next = quantity - 1;
      setQuantity(next);
      onUpdateQuantity?.(next);
    }
  };

  const handleIncreaseQty = () => {
    const next = quantity + 1;
    setQuantity(next);
    onUpdateQuantity?.(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Honeypot check (bot prevention)
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage(
        language === 'LT'
          ? 'Prašome užpildyti visus privalomus laukelius.'
          : 'Please fill in all required fields.'
      );
      return;
    }

    setIsSubmitting(true);

    const messageBody = [
      `NAUJAS UŽSAKYMAS:`,
      `-----------------------------------------`,
      `Vardas, Pavardė: ${firstName.trim()} ${lastName.trim()}`,
      `El. paštas: ${email.trim()}`,
      `Telefono numeris: ${phone.trim()}`,
      `-----------------------------------------`,
      `Prekė: Campfire Pro Laužo Viryklė`,
      `Kiekis: ${quantity} vnt.`,
      `Prekės kaina: ${itemsTotal.toFixed(2)} € (${basePrice.toFixed(2)} € / vnt.)`,
      `Siuntimas: ${shippingCost.toFixed(2)} € (Omniva / DPD paštomatuose)`,
      `Bendra užsakymo suma: ${grandTotal.toFixed(2)} €`,
      `-----------------------------------------`,
      `KOMENTARAS / PAŠTOMATO ADRESAS:`,
      comment.trim() ? comment.trim() : '(Nenurodytas)',
      `-----------------------------------------`,
    ].join('\n');

    const payload = {
      apiKey: 'sf_63057bb3184f24dbc755b3c3',
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      subject: 'Užsakymas gautas!',
      message: messageBody,
      replyTo: email.trim(),
      honeypot: honeypot,
    };

    try {
      const response = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        if (onSuccessToast) {
          onSuccessToast(
            language === 'LT'
              ? 'Užsakymas sėkmingai išsiųstas!'
              : 'Order successfully sent!'
          );
        }
      } else {
        setErrorMessage(
          data.message ||
            (language === 'LT'
              ? 'Nepavyko išsiųsti formos. Bandykite dar kartą.'
              : 'Failed to submit form. Please try again.')
        );
      }
    } catch (err) {
      console.error('StaticForms error:', err);
      setErrorMessage(
        language === 'LT'
          ? 'Tinklo klaida. Patikrinkite ryšį ir bandykite vėl.'
          : 'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-timber-dark/75 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl border border-border-hairline overflow-hidden z-10 my-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border-hairline bg-surface-container/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flame-ember/15 flex items-center justify-center text-flame-ember">
              <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
            </div>
            <div>
              <h3 className="font-headline-sm font-bold text-primary text-base sm:text-lg">
                {language === 'LT' ? 'Užsakymo forma' : 'Order Form'}
              </h3>
              <p className="font-label-sm text-[12px] text-on-surface-variant">
                {language === 'LT'
                  ? 'Campfire Pro — paruošimas ir išsiuntimas per 24 val.'
                  : 'Campfire Pro — prepared & shipped within 24 hours'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container active:scale-95 transition-colors cursor-pointer"
            aria-label="Uždaryti"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-forest-moss/20 text-forest-deep flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h4 className="font-headline-sm font-bold text-primary text-xl mb-2">
              {language === 'LT' ? 'Užsakymas sėkmingai gautas!' : 'Order Received!'}
            </h4>
            <p className="font-body-md text-on-surface-variant max-w-md mb-6 text-sm sm:text-base leading-relaxed">
              {language === 'LT' ? (
                <>
                  Dėkojame, <strong>{firstName}</strong>! Jūsų užklausa dėl{' '}
                  <strong>{quantity} vnt.</strong> Campfire Pro gauta. Netrukus susisieksime su
                  jumis nurodytu el. paštu arba telefonu dėl pristatymo patvirtinimo.
                </>
              ) : (
                <>
                  Thank you, <strong>{firstName}</strong>! Your order request for{' '}
                  <strong>{quantity} pcs</strong> Campfire Pro has been received. We will contact
                  you shortly to confirm delivery.
                </>
              )}
            </p>

            {/* Summary card */}
            <div className="w-full bg-surface-container/70 rounded-xl p-4 text-left border border-border-hairline mb-6 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-border-hairline/60">
                <span className="text-on-surface-variant">
                  {language === 'LT' ? 'Klientas:' : 'Customer:'}
                </span>
                <span className="font-semibold text-primary">
                  {firstName} {lastName}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-hairline/60">
                <span className="text-on-surface-variant">
                  {language === 'LT' ? 'El. paštas:' : 'Email:'}
                </span>
                <span className="font-medium text-primary">{email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-hairline/60">
                <span className="text-on-surface-variant">
                  {language === 'LT' ? 'Telefonas:' : 'Phone:'}
                </span>
                <span className="font-medium text-primary">{phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-hairline/60">
                <span className="text-on-surface-variant">
                  {language === 'LT' ? 'Kiekis ir suma:' : 'Quantity & total:'}
                </span>
                <span className="font-bold text-flame-ember">
                  {quantity} vnt. — {grandTotal.toFixed(2)} € (su siuntimu)
                </span>
              </div>
              {comment.trim() && (
                <div className="py-1 pt-2">
                  <span className="text-on-surface-variant block mb-0.5">
                    {language === 'LT' ? 'Komentaras:' : 'Comment:'}
                  </span>
                  <span className="font-normal text-on-surface italic">{comment}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleClose}
              className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-forest-light text-on-primary font-label-md font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              {language === 'LT' ? 'Supratau / Uždaryti' : 'Done / Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Quantity and Price Highlight Card */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container/60 rounded-xl border border-border-hairline">
              <div className="flex items-center gap-3">
                <img
                  src="/images/pagrindine_surinkta.jpg"
                  alt="Campfire Pro"
                  className="w-12 h-12 rounded-lg object-cover border border-border-hairline"
                />
                <div>
                  <div className="font-semibold text-primary text-sm">Campfire Pro</div>
                  <div className="text-xs text-on-surface-variant">
                    {basePrice.toFixed(2)} € / vnt. + {shippingCost.toFixed(2)} € siuntimas
                  </div>
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-border-hairline rounded-lg bg-surface">
                  <button
                    type="button"
                    onClick={handleDecreaseQty}
                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-colors cursor-pointer"
                    aria-label="Sumažinti kiekį"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="w-8 text-center font-bold text-primary text-sm tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncreaseQty}
                    className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container active:scale-95 transition-colors cursor-pointer"
                    aria-label="Padidinti kiekį"
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

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-xs sm:text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Honeypot field (hidden from real users) */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Name Fields: Vardas and Pavardė */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  {language === 'LT' ? 'Vardas *' : 'First Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'LT' ? 'Jonas' : 'John'}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  {language === 'LT' ? 'Pavardė *' : 'Last Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'LT' ? 'Jonaitis' : 'Doe'}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  {language === 'LT' ? 'El. Paštas *' : 'Email *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="vardas@pavyzdys.lt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">
                  {language === 'LT' ? 'Telefono numeris *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+370 600 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors"
                />
              </div>
            </div>

            {/* Comment / Locker note */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-1 flex items-center justify-between">
                <span>{language === 'LT' ? 'Komentaras / Pastabos' : 'Comment / Notes'}</span>
                <span className="text-[11px] font-normal text-on-surface-variant">
                  {language === 'LT' ? '(Omniva / DPD paštomatas ar klausimai)' : '(Locker or questions)'}
                </span>
              </label>
              <textarea
                rows={3}
                placeholder={
                  language === 'LT'
                    ? 'Pvz.: Nurodykite pageidaujamą Omniva arba DPD paštomatą, arba papildomus klausimus...'
                    : 'E.g. specify preferred Omniva/DPD locker or additional inquiries...'
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-hairline bg-surface text-on-surface text-sm focus:outline-hidden focus:border-flame-ember focus:ring-1 focus:ring-flame-ember transition-colors resize-none"
              />
            </div>

            {/* Submit CTA */}
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
                    <span>{language === 'LT' ? 'Siunčiama...' : 'Submitting...'}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {language === 'LT'
                        ? `Pateikti užsakymą (${grandTotal.toFixed(2)} €)`
                        : `Submit Order (${grandTotal.toFixed(2)} €)`}
                    </span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-center text-[11px] text-on-surface-variant mt-2.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-forest-deep text-[15px]">
                    lock
                  </span>
                  {language === 'LT' ? 'Saugus duomenų perdavimas' : 'Secure Data Transfer'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-forest-deep text-[15px]">
                    schedule
                  </span>
                  {language === 'LT' ? 'Atsakymas per 1 val.' : 'Response within 1 hr'}
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
