import React, { useRef, useEffect, useState } from 'react';
import { HERO_IMAGE_URL } from '../data/productData';

interface HeroSectionProps {
  onBuyNow: () => void;
  onExplore: () => void;
  price: number;
  language: 'LT' | 'EN';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBuyNow,
  onExplore,
  price,
  language,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [customVideoSrc, setCustomVideoSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Load cached custom video from IndexedDB if present
  useEffect(() => {
    try {
      const req = indexedDB.open('CampfireMediaDB', 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains('videos')) {
          req.result.createObjectStore('videos');
        }
      };
      req.onsuccess = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('videos')) return;
        const tx = db.transaction('videos', 'readonly');
        const getReq = tx.objectStore('videos').get('hero_video');
        getReq.onsuccess = () => {
          if (getReq.result instanceof Blob) {
            const url = URL.createObjectURL(getReq.result);
            setCustomVideoSrc(url);
          }
        };
      };
    } catch {
      // IndexedDB fallback
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted until user interaction
      });
    }
  }, [customVideoSrc]);

  const handleVideoFile = async (file: File) => {
    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|mov|mkv)$/i)) {
      return;
    }
    const url = URL.createObjectURL(file);
    setCustomVideoSrc(url);
    setUploadStatus(language === 'LT' ? 'Įkeliama...' : 'Uploading...');

    // Persist to IndexedDB
    try {
      const req = indexedDB.open('CampfireMediaDB', 1);
      req.onsuccess = () => {
        const db = req.result;
        const tx = db.transaction('videos', 'readwrite');
        tx.objectStore('videos').put(file, 'hero_video');
      };
    } catch {
      // Ignore storage errors
    }

    // Persist to server public/hero-video.mp4 via Vite middleware
    try {
      const res = await fetch('/api/upload-hero-video', {
        method: 'POST',
        body: file,
      });
      if (res.ok) {
        setUploadStatus(language === 'LT' ? 'Video atnaujintas!' : 'Video updated!');
        setTimeout(() => setUploadStatus(null), 3000);
      }
    } catch {
      setUploadStatus(null);
    }
  };

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
          handleVideoFile(e.dataTransfer.files[0]);
        }
      }}
      className={`relative w-full overflow-hidden bg-surface-timber-dark min-h-[580px] md:min-h-[660px] flex items-center justify-center transition-all ${
        isDragging ? 'ring-4 ring-flame-core ring-inset' : ''
      }`}
    >
      {/* Background video on a loop with layered lighting and fallback poster */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          key={customVideoSrc || 'default'}
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_IMAGE_URL}
          className="w-full h-full object-cover"
        >
          {customVideoSrc && <source src={customVideoSrc} type="video/mp4" />}
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/campfire.mp4" type="video/mp4" />
          <img
            src={HERO_IMAGE_URL}
            alt="Campfire Pro lauko bandymas su liepsna miške nakties metu"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-timber-dark via-surface-timber-dark/75 to-surface-timber-dark/35" />
        <div className="absolute inset-0 bg-surface-timber-dark/25 backdrop-blur-[1px]" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-flame-ember/20 blur-3xl pointer-events-none" />
      </div>

      {/* Video replace/upload trigger badge */}
      <label className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-timber-dark/70 hover:bg-surface-timber-dark/90 text-surface/80 hover:text-surface text-[12px] font-medium backdrop-blur-md border border-border-hairline/20 cursor-pointer shadow-md transition-all active:scale-95">
        <span className="material-symbols-outlined text-[16px] text-flame-core">video_file</span>
        <span>{uploadStatus || (language === 'LT' ? 'Įkelti video' : 'Upload video')}</span>
        <input
          type="file"
          accept="video/*,.mp4,.webm,.mov"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleVideoFile(e.target.files[0]);
            }
          }}
        />
      </label>

      <div className="relative z-10 max-w-[1360px] mx-auto px-margin-sm lg:px-margin-lg py-space-2xl w-full flex flex-col items-center text-center">
        <div className="max-w-3xl flex flex-col items-center gap-space-sm">
          {/* Header Metadata */}
          <div className="inline-flex items-center gap-2 text-surface/90 font-label-caps text-label-caps uppercase tracking-wider bg-transparent">
            <span className="material-symbols-outlined text-[14px] text-flame-core">
              local_fire_department
            </span>
            <span className="bg-transparent">{language === 'LT' ? 'Tikra laukinė ugnis' : 'Real Wild Fire'}</span>
            <span className="text-surface/40">·</span>
            <span className="text-surface/80">Campfire Pro</span>
          </div>

          {/* Heading */}
          <h1 className="text-[48px] max-sm:text-[32px] text-surface font-extrabold tracking-tight mt-2 leading-[56px] max-sm:leading-[40px] bg-transparent">
            {language === 'LT'
              ? 'Tikra laukinė ugnis. Preciziška inžinerija tavo kuprinėje.'
              : 'Real Wild Fire. Precision Engineering in Your Backpack.'}
          </h1>

          {/* Subtitle */}
          <p className="font-body-lg text-body-lg text-surface/90 max-w-2xl mt-2">
            {language === 'LT'
              ? 'Atraskite sulankstomą laužo viryklę, sukurtą išgyventi pačiomis atšiauriausiomis gamtos sąlygomis. Vos 200 gramų, surinkimas per 3 sekundes ir maksimalus karštis be didelių laužaviečių.'
              : 'Discover the folding bushcraft stove engineered for extreme conditions. Only 200 grams, 3-second assembly, and maximum concentrated heat with minimal footprint.'}
          </p>
        </div>

        {/* Action Buttons & Quick Badges */}
        <div className="w-full max-w-[1100px] mt-space-xl flex flex-col items-center gap-space-md">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-sm w-full sm:w-auto">
            <button
              onClick={onBuyNow}
              className="w-full sm:w-auto bg-flame-ember hover:bg-secondary text-on-secondary font-label-md text-label-md font-bold px-8 py-4 rounded-lg shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>
                {language === 'LT'
                  ? `Pirkti dabar — ${price.toFixed(2)} €`
                  : `Order Now — ${price.toFixed(2)} €`}
              </span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto bg-surface-timber-dark/80 backdrop-blur-md hover:bg-surface-timber-dark text-surface font-label-md text-label-md font-semibold px-6 py-4 rounded-lg transition-colors border border-border-hairline/40 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-flame-core">
                tune
              </span>
              <span>{language === 'LT' ? 'Atrasti visas savybes' : 'Explore All Features'}</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-space-md text-surface font-label-sm text-label-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-timber-dark/80 backdrop-blur-md border border-border-hairline/20 shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-flame-core">scale</span>
              <span className="font-medium text-surface">
                {language === 'LT' ? '200g nerūdijantis plienas' : '200g Stainless Steel'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-timber-dark/80 backdrop-blur-md border border-border-hairline/20 shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-flame-core">bolt</span>
              <span className="font-medium text-surface">
                {language === 'LT' ? 'Surinkimas per 3 sekundes' : '3-Second Assembly'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-timber-dark/80 backdrop-blur-md border border-border-hairline/20 shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-flame-core">local_shipping</span>
              <span className="font-medium text-surface">
                {language === 'LT' ? 'Pristatymas Omniva / DPD paštomatuose' : 'Omniva / DPD Parcel Locker Delivery'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
