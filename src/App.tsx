import React, { useState } from 'react';
import { CartItem, Accessory } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductPurchaseSection } from './components/ProductPurchaseSection';
import { EngineeringPillars } from './components/EngineeringPillars';
import { FieldGallery } from './components/FieldGallery';
import { TechSpecs } from './components/TechSpecs';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderContactModal } from './components/OrderContactModal';
import { InfoModal, InfoModalType } from './components/InfoModal';
import { ImageLightbox } from './components/ImageLightbox';
import { Toast } from './components/Toast';
import { PRODUCT_IMAGES } from './data/productData';

export default function App() {
  const [language, setLanguage] = useState<'LT' | 'EN'>('LT');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalQuantity, setOrderModalQuantity] = useState(1);
  const [activeInfoModal, setActiveInfoModal] = useState<InfoModalType>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Initial cart with 1 Campfire Pro matching the user's HTML design: Krepšelis (1) 49.00 €
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'campfire-pro',
      name: 'Campfire Pro Laužo Viryklė',
      subtitle: 'AISI 304 nerūdijantis plienas + dėklas ir karabinas',
      price: 19.99,
      quantity: 1,
      image: PRODUCT_IMAGES[0].src,
    },
  ]);

  const basePrice = 19.99;
  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartTotal = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3800);
  };

  const handleAddToCart = (quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === 'campfire-pro');
      if (existing) {
        return prev.map((it) =>
          it.id === 'campfire-pro' ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [
        ...prev,
        {
          id: 'campfire-pro',
          name: 'Campfire Pro Laužo Viryklė',
          subtitle: 'AISI 304 nerūdijantis plienas + dėklas ir karabinas',
          price: basePrice,
          quantity,
          image: PRODUCT_IMAGES[0].src,
        },
      ];
    });
    triggerToast(
      language === 'LT'
        ? `Pridėta į krepšelį: Campfire Pro (${quantity} vnt.)`
        : `Added to cart: Campfire Pro (${quantity} pcs)`
    );
  };

  const handleInstantBuy = (quantity: number) => {
    setOrderModalQuantity(quantity);
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleAddAccessory = (acc: Accessory) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === acc.id);
      if (exists) {
        return prev.map((i) => (i.id === acc.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: acc.id,
          name: acc.name,
          subtitle: acc.description,
          price: acc.price,
          quantity: 1,
          image: acc.image,
        },
      ];
    });
    triggerToast(
      language === 'LT'
        ? `Pridėtas priedas: ${acc.name}`
        : `Added accessory: ${acc.name}`
    );
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'LT' ? 'EN' : 'LT'));
  };

  const scrollToSpecs = () => {
    const el = document.getElementById('techniniai-duomenys');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPurchase = () => {
    const el = document.getElementById('apie-virykle');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased flex flex-col">
      {/* Fixed Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAbout={() => setActiveInfoModal('about')}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20 flex-1">
        {/* 1. Hero Showcase */}
        <HeroSection
          onBuyNow={scrollToPurchase}
          onExplore={scrollToSpecs}
          price={basePrice}
          language={language}
        />

        {/* 2. Interactive Product View & Purchase Module */}
        <ProductPurchaseSection
          onAddToCart={handleAddToCart}
          onInstantBuy={handleInstantBuy}
          basePrice={basePrice}
          language={language}
          onOpenImageModal={(src) => setLightboxImage(src)}
        />

        {/* 3. Engineering & Value Pillars (4 Cards) */}
        <EngineeringPillars
          language={language}
          onOpenImageModal={(src) => setLightboxImage(src)}
        />

        {/* 4. Immersive Field Gallery & Mosaic */}
        <FieldGallery
          language={language}
          onOpenImageModal={(src) => setLightboxImage(src)}
        />

        {/* 5. Technical Specifications Matrix */}
        <TechSpecs language={language} />

        {/* 6. FAQ Accordion */}
        <FaqSection language={language} />

        {/* 7. Bottom Call To Action Banner */}
        <CtaBanner
          onBuyNow={scrollToPurchase}
          price={basePrice}
          language={language}
        />
      </main>

      {/* Footer */}
      <Footer onOpenInfo={(type) => setActiveInfoModal(type)} language={language} />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddAccessory={handleAddAccessory}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setOrderModalQuantity(cartCount > 0 ? cartCount : 1);
          setIsOrderModalOpen(true);
        }}
        language={language}
      />

      {/* Contact Order Modal via StaticForms */}
      <OrderContactModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        quantity={orderModalQuantity}
        onUpdateQuantity={(newQty) => setOrderModalQuantity(newQty)}
        basePrice={basePrice}
        language={language}
        onSuccessToast={(msg) => triggerToast(msg)}
      />

      {/* Informational Policy & Story Modals */}
      <InfoModal
        type={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
        language={language}
      />

      {/* Image Lightbox View */}
      <ImageLightbox
        imageSrc={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      {/* Notification Toast */}
      <Toast
        show={showToast}
        message={toastMessage}
        onOpenCart={() => setIsCartOpen(true)}
        language={language}
      />
    </div>
  );
}
