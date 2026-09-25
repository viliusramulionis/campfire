import { Accessory, FaqItem, SpecItem } from '../types';
import realiLiepsnaImg from '../assets/images/reali_liepsna_exact.jpg';
import konstrukcijaImg from '../assets/images/konstrukcija_exact.jpg';
import naudojimasImg from '../assets/images/naudojimas_exact.jpg';
import transportasImg from '../assets/images/transportas_exact.jpg';

export const LOGO_HEADER_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1UrZ6Q5Ot3XokyqEQcTkvIyaoSGq5LtJGyqazrzeAQQh47LwwNy0F9CMPby6mvHg9JgawVDW0JWg7roy7vUS6x_eyN9nLbS3t6bjejccL9pxfhRIBdS0nq5uLv4WpNntVSLHfF2o5hTKvGA17E8ayK-ey02JqRa2MNOWOjA3uT7DLvRVgVRL5NK4jjRnzyxFTarqrig2KbeNpoj_Xe8FM5McvdF_xlxNSkziaI-EuUj5hdp-aKgy-G8tg';

export const LOGO_FOOTER_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VRKXPvpAdyGeiHfHfWb7_xHWor6S9AX4s5aVooKF9XunAj7f6gpGO6sCMMFu40ksH0rRepRifG2o52k7Gwmb_VnRMPjAXFyLXsLfr9z2zLLXd4FywvZ9iFXAyM_M46ojavTcz1aWEeMrvbCEUzKWv54ecKZwWTVun6-pqPL_IEJt9KegwcB5EJQwfCqA76aNPXIpxaLRF_Cc00MySBoo1WmZRKF8ZAKKBKLNGHcmEXIR1tGqVHsLXkVw';

export const HERO_IMAGE_URL = realiLiepsnaImg;

export const PRODUCT_IMAGES = [
  {
    src: realiLiepsnaImg,
    label: 'Ugnies liepsna miške',
    tag: 'Reali liepsna'
  },
  {
    src: konstrukcijaImg,
    label: 'Kryžminis 90° sujungimas',
    tag: 'Konstrukcija'
  },
  {
    src: naudojimasImg,
    label: 'Neslystantis profilis ir liepsna',
    tag: 'Naudojimas'
  },
  {
    src: transportasImg,
    label: 'Kompaktiškos plokštės',
    tag: 'Transportas'
  }
];

export const ENGINEERING_PILLARS = [
  {
    id: 'transport',
    badge: 'Transportas',
    icon: 'layers',
    title: 'Plokščia ir kompaktiška',
    description:
      'Dvi plokštės susiglaudžia į 6 mm storio paketą. Nulis vargo kuprinėje, nereikia didelių dujų balionų ar griozdiškų dėžių.',
    image: transportasImg
  },
  {
    id: 'strength',
    badge: 'Tvirtumas',
    icon: 'fitness_center',
    title: 'Stabili 90° kryžmė',
    description:
      'Centrinis suleidimo griovelis fiksuoja plokštes tvirtai. Atlaiko iki 80 kg ketaus keptuvių ar sunkių vandens katilų svorį.',
    image: konstrukcijaImg
  },
  {
    id: 'safety',
    badge: 'Saugumas',
    icon: 'texture',
    title: 'Neslystantys dantukai',
    description:
      'Lazeriu frezuotas mikro-dantytas profilis patikimai įsirėžia į bet kokį metalinį indą, neleisdamas jam nuvirsti net ant nelygaus paviršiaus.',
    image: naudojimasImg
  },
  {
    id: 'efficiency',
    badge: 'Efektyvumas',
    icon: 'air',
    title: 'Maksimali oro trauka',
    description:
      'Platus apatinis lankas garantuoja nuolatinį deguonies srautą ugniai. Liepsna lieka stabili ir koncentruota tiesiai į indo dugną.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBcSBj5RUC_ZFROSClnkNp4H42EF4O4fgGOkRppaulzL5PCSOOmL_qFrktM8UHtuP8IVfYTft-Z_36LOLFBtFz6qWTGpJ-r4fIo2B8IzlBGzq3Oz3p7KBtio09P3nTRIESMymCoFWYmGEO3UD3IDEPl5iqRWK0_PArFGfZnOc1bRYj9BzsURjf-BfNCIBLyjZj50yeUins5YLsu4vcL6fc8Y9Fy3BsaoNITV9zlVUur2PywmTYCSiRlaPbkGF8geQwLcg'
  }
];

export const GALLERY_CARDS = {
  hero: {
    title: 'Tolygus karštis keptuvėms ir katilams',
    subtitle: 'Tikra lauko virtuvė',
    description:
      'Platus pagrindas tolygiai paskirsto liepsną, todėl maistas nesvyla viename taške, o kepsniai ir troškiniai iškepa tobulai.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiStieVPSWytbnUSa2HSWxhOdHJlD22UfL7tcItr3D1KWaM9dHqyJit8J7lMhaFS1e5Gupr6KkJYN1hutHpCwul0CaOdW4-yTp_ro8jQX1_4lTJiTZ4TmzyCl0yxLppUOM__4u9cF4dcQXbzwqKhrCUzrtA4NS3dEHai6e7OA43YWAuoUrWE3Ww8DqZMV30Uc4wE4rr0fjnipP0ElOxJs2RpysT0DydIsqdVF5gQlADTC2fWbfxvhQG-IlkDL3-mxMyA'
  },
  item1: {
    title: 'Minimalus pėdsakas gamtoje',
    description: 'Kompaktiškas laužavietės plotas apsaugo miško paklotę.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5zzgXosH8kN6CdDHp-ySPEfmaTKakOTz47ijH_jblkHnbMIdTDUNWUfjVnYLDWtenZI4sRU2PdKxzhd95fivx1NTpNIY4Nz6GySjKumaX7PeM7oL5kunU9JekYRAIFjefROfdIurjonbsKM9tKp-T2LGJRLLvMqr3kJx4pIpUXvPv37uAlZJ4CxU1XvJM8y0UbcQFwrBB5QozPllmWzlx4WridZDQPk8ypA4XJCrjX65DKHppmrM5VFhaMuxsVxDu5Q'
  },
  item2: {
    title: 'Lazeriu išpjauta geometrija',
    description: 'Tobulas briaunų šlifavimas — jokio aštrių kraštų pavojaus rankoms.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBrUa3Ox65PI3KbdDpXfCL4UAUXPxqxjOKTTGBlEOOFDR0RgpLfU89ij60XmD-u076DjsO41vxNe8Vb818no3W0hOikZjOOjddYSSdZFBKbDwQjUA2oTT3FXIXrZLyQefqwWNu5ju8dyvjU_dWtqV1XCG2dRZAsg76QHHYiG6cXQKaCurfQ62_6JgAuJNJ8qTa3-1KurzMQqu0sw5iZLNnz9D522NAyBk7wUpbLTthVfIuqUKzI2LTxb0CyYxJKRCG9g'
  }
};

export const SPECS_LEFT: SpecItem[] = [
  { label: 'Plienas', value: 'AISI 304 (Austenitinis nerūdijantis)' },
  { label: 'Plieno storis', value: '3 mm precizinis lakštas', highlight: true },
  { label: 'Bendras svoris', value: '200 g (±5 g)', highlight: true },
  { label: 'Surinktas dydis', value: '180 mm × 180 mm × 180 mm' }
];

export const SPECS_RIGHT: SpecItem[] = [
  { label: 'Išardytas dydis', value: '180 mm × 180 mm × 6 mm' },
  { label: 'Maksimali apkrova', value: 'Iki 80 kg tolygaus svorio', highlight: true },
  { label: 'Rekomenduojami indai', value: 'Skersmuo nuo 8 cm iki 30 cm' },
  { label: 'Pakuotės sudėtis', value: '2x plokštės, Dėklas ir karabinas' }
];

export const FAQ_LIST: FaqItem[] = [
  {
    question: 'Ar plienas nesikraipo nuo tiesioginės ugnies ir didelio karščio?',
    answer:
      'Ne. Mes naudojame 3 mm storio sertifikuotą nerūdijantį plieną AISI 304. Šis metalas pasižymi puikiomis atsparumo deformacijai savybėmis net esant aukštesnei nei 900°C temperatūrai. Dėl simetriškos kryžminės geometrijos šiluminis plėtimasis pasiskirsto tolygiai.'
  },
  {
    question: 'Kaip greitai po naudojimo viryklė atvėsta?',
    answer:
      'Dėl atviros plokščių konstrukcijos ir vėjo cirkuliacijos nukėlus puodą ir išėmus degias medžiagas, plienas iki saugios liesti temperatūros atvėsta vos per 3–5 minutes. Galite greitai supakuoti į pridedamą apsauginį dėklą ir keliauti toliau.'
  },
  {
    question: 'Kokie indai yra suderinami su šia virykle?',
    answer:
      'Tinka beveik bet kokie lauko virtuvės indai: nuo siaurų 500 ml titano puodelių (dėl patogaus viršutinio įlenkimo) iki 28 cm skersmens stovyklavimo keptuvių ar net didelių katilėlių sriubai. Dantytas profilis užtikrina puikų sukibimą.'
  },
  {
    question: 'Koks yra pristatymo laikas Lietuvoje?',
    answer:
      'Prekes siunčiame per Omniva ir DPD paštomatus. Užsakymai, pateikti iki 15:00 val., išsiunčiami tą pačią dieną ir dažniausiai pasiekia gavėją jau kitą darbo dieną. Pristatymas nemokamas, jei krepšelio suma viršija 40€.'
  }
];

export const ACCESSORIES: Accessory[] = [
  {
    id: 'deklas_extra',
    name: 'Atsarginis apsauginis dėklas',
    description: 'Papildomas atsparus techninio audinio dėklas su sagtimi ir karabinu',
    price: 8.0,
    image: transportasImg
  },
  {
    id: 'firesteel',
    name: 'Magnio Ugnies Skiltuvas',
    description: 'Generuoja 3000°C žiežirbas bet kokiomis oro sąlygomis',
    price: 9.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcSBj5RUC_ZFROSClnkNp4H42EF4O4fgGOkRppaulzL5PCSOOmL_qFrktM8UHtuP8IVfYTft-Z_36LOLFBtFz6qWTGpJ-r4fIo2B8IzlBGzq3Oz3p7KBtio09P3nTRIESMymCoFWYmGEO3UD3IDEPl5iqRWK0_PArFGfZnOc1bRYj9BzsURjf-BfNCIBLyjZj50yeUins5YLsu4vcL6fc8Y9Fy3BsaoNITV9zlVUur2PywmTYCSiRlaPbkGF8geQwLcg'
  }
];
