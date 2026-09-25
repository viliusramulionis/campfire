import React from 'react';

export type InfoModalType =
  | 'about'
  | 'contact'
  | 'shipping'
  | 'privacy'
  | 'terms'
  | null;

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
  language: 'LT' | 'EN';
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose, language }) => {
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'about':
        return {
          title: language === 'LT' ? 'Apie Campfire viryklę' : 'About the Campfire Stove',
          subtitle: language === 'LT' ? 'Istorija ir inžinerija' : 'Story & Engineering',
          content: (
            <div className="flex flex-col gap-4 text-sm text-on-surface-variant leading-relaxed">
              <p>
                {language === 'LT'
                  ? '„Campfire Lietuva“ gimė iš meilės atšiauriai Baltijos gamtai, naktiniams žygiams Labanoro girioje ir poreikio turėti nepriekaištingai patikimą ugnies šaltinį be nereikalingo papildomo svorio kuprinėje.'
                  : 'Campfire Lietuva was born out of deep respect for Baltic wilderness, nocturnal treks through dense pine forests, and the uncompromising need for reliable fire without pack weight.'}
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl border border-border-hairline">
                <h5 className="font-bold text-primary mb-1">
                  {language === 'LT' ? 'Kodėl pasirinkome kryžminę konstrukciją?' : 'Why the cross-interlock design?'}
                </h5>
                <p>
                  {language === 'LT'
                    ? 'Lauke paprastumas reiškia ilgaamžiškumą. Mes atsisakėme visų judančių lankstų, varžtelių ir vielučių. Dvi 3 mm storio grūdinto AISI 304 nerūdijančio plieno plokštės tiesiog susijungia į 90 laipsnių kampo tvirtą kryžmę per 3 sekundes.'
                    : 'In the wild, simplicity equals durability. We eliminated hinges, screws, and thin wires. Two 3mm hardened AISI 304 stainless steel plates interlock into a rock-solid 90-degree cross in just 3 seconds.'}
                </p>
              </div>
              <p>
                {language === 'LT'
                  ? 'Plienas yra pjaunamas pramoniniu lazeriu Lietuvoje, o kiekviena briauna kruopščiai nušlifuojama, kad neteisingai paėmus viryklę nesusižeistumėte rankų. Pridedamas apsauginis dėklas su karabinu užtikrina, kad jūsų kuprinė išliks švari nuo suodžių.'
                  : 'All steel is laser-cut with sub-millimeter precision in the Baltics, with each edge deburred for safety. The included protective sleeve and carabiner keep soot isolated from your gear.'}
              </p>
            </div>
          ),
        };
      case 'contact':
        return {
          title: language === 'LT' ? 'Kontaktai' : 'Contact Us',
          subtitle: language === 'LT' ? 'Klientų aptarnavimas ir dirbtuvės' : 'Customer Service & Workshop',
          content: (
            <div className="flex flex-col gap-4 text-sm text-on-surface-variant leading-relaxed">
              <p>
                {language === 'LT'
                  ? 'Turite klausimų apie užsakymą, didmeninę prekybą ar viryklės priežiūrą? Mūsų komanda visada pasiruošusi padėti.'
                  : 'Have questions regarding orders, wholesale partnerships, or stove care? Our team is glad to assist.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-surface-container-low rounded-xl border border-border-hairline">
                  <div className="flex items-center gap-2 text-forest-deep font-bold mb-1">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span>El. paštas</span>
                  </div>
                  <a href="mailto:info@campfire.lt" className="text-primary hover:underline font-semibold">
                    info@campfire.lt
                  </a>
                  <p className="text-xs text-on-surface-variant mt-1">Atsakome per 1–2 val. d.d.</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-border-hairline">
                  <div className="flex items-center gap-2 text-forest-deep font-bold mb-1">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span>Telefonas</span>
                  </div>
                  <a href="tel:+37060012345" className="text-primary hover:underline font-semibold">
                    +370 600 12345
                  </a>
                  <p className="text-xs text-on-surface-variant mt-1">I–V 09:00 – 18:00</p>
                </div>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl border border-border-hairline">
                <div className="flex items-center gap-2 text-forest-deep font-bold mb-1">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Dirbtuvės ir atsiėmimo punktas</span>
                </div>
                <p className="font-semibold text-primary">Gedimino pr. 45, LT-01110 Vilnius, Lietuva</p>
              </div>
            </div>
          ),
        };
      case 'shipping':
        return {
          title: language === 'LT' ? 'Pristatymas ir grąžinimas' : 'Shipping & 14-Day Returns',
          subtitle: language === 'LT' ? 'Sąlygos ir terminai' : 'Terms & Timelines',
          content: (
            <div className="flex flex-col gap-4 text-sm text-on-surface-variant leading-relaxed">
              <div className="p-3 bg-surface-container-low rounded-xl border border-border-hairline">
                <h5 className="font-bold text-primary mb-1">
                  {language === 'LT' ? 'Nemokamas siuntimas Lietuvoje' : 'Free Shipping in Lithuania'}
                </h5>
                <p>
                  {language === 'LT'
                    ? 'Užsakymai, viršijantys 40.00 €, siunčiami nemokamai į bet kurį Omniva arba DPD paštomatą. Užsakymai, pateikti darbo dienomis iki 15:00 val., išsiunčiami tą pačią dieną ir pristatomi per 1–2 darbo dienas.'
                    : 'All orders over 40.00 € qualify for free shipping to any Omniva or DPD locker. Orders placed by 15:00 on business days are dispatched same day.'}
                </p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl border border-border-hairline">
                <h5 className="font-bold text-primary mb-1">
                  {language === 'LT' ? '14 dienų pinigų grąžinimo garantija' : '14-Day Money Back Guarantee'}
                </h5>
                <p>
                  {language === 'LT'
                    ? 'Jeigu prekė neatitiko jūsų lūkesčių, galite ją grąžinti per 14 kalendorinių dienų nuo gavimo dienos. Grąžinama prekė turi būti nenaudota originalioje pakuotėje su apsauginiu dėklu ir karabinu.'
                    : 'If the item does not meet your expectations, return it within 14 calendar days of receipt in unused original condition with the protective sleeve and carabiner.'}
                </p>
              </div>
            </div>
          ),
        };
      case 'privacy':
        return {
          title: language === 'LT' ? 'Privatumo politika' : 'Privacy Policy',
          subtitle: language === 'LT' ? 'BDAR atitiktis ir duomenų saugumas' : 'GDPR & Security',
          content: (
            <div className="flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed">
              <p>
                {language === 'LT'
                  ? 'Mes gerbiame jūsų privatumą ir renkame tik tuos asmens duomenis, kurie yra būtini užsakymo įvykdymui (vardas, el. paštas, telefonas ir pasirinktas paštomatas pristatymui).'
                  : 'We value your privacy and collect only details strictly necessary for order fulfillment.'}
              </p>
              <p>
                {language === 'LT'
                  ? 'Jūsų mokėjimo duomenys yra apdorojami tiesiogiai licencijuotų mokėjimų tarpininkų (Paysera, Banklink, Stripe/Apple Pay) šifruotais SSL kanalais. Mes niekada nesaugome jūsų banko kortelių duomenų.'
                  : 'All transactions are encrypted through licensed EU payment processors. We never store credit card numbers.'}
              </p>
            </div>
          ),
        };
      case 'terms':
        return {
          title: language === 'LT' ? 'Taisyklės ir sąlygos' : 'Terms & Conditions',
          subtitle: language === 'LT' ? 'Pirkimo-pardavimo sutarties sąlygos' : 'Purchase Agreement',
          content: (
            <div className="flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed">
              <p>
                {language === 'LT'
                  ? 'Pirkėjas, pateikdamas užsakymą Campfire Lietuva internetinėje parduotuvėje, patvirtina, kad susipažino su pirkimo taisyklėmis ir sutinka su prekių pristatymo bei apmokėjimo tvarka.'
                  : 'By placing an order on Campfire Lietuva, the customer agrees to the purchase terms, shipping policies, and 5-year warranty provisions.'}
              </p>
              <p>
                {language === 'LT'
                  ? 'Visiems metalo lakštams suteikiama 5 metų gamintojo garantija nuo konstrukcinio lūžimo ar terminio deformavimosi įprasto eksploatavimo sąlygomis.'
                  : 'All steel components are backed by a 5-year warranty against structural failure or thermal warping.'}
              </p>
            </div>
          ),
        };
      default:
        return { title: '', subtitle: '', content: null };
    }
  };

  const { title, subtitle, content } = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-surface-timber-dark/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-surface rounded-2xl shadow-2xl overflow-hidden border border-border-hairline z-10 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="p-space-md bg-surface-container-low border-b border-border-hairline flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps text-secondary uppercase font-semibold">
              {subtitle}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Uždaryti"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-md sm:p-space-lg overflow-y-auto flex-1">{content}</div>

        <div className="p-space-md bg-surface-container-low border-t border-border-hairline flex justify-end">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-forest-light text-on-primary font-label-md px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            {language === 'LT' ? 'Supratau' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
