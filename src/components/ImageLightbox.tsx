import React from 'react';

interface ImageLightboxProps {
  imageSrc: string | null;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-timber-dark/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-surface-timber-dark/80 text-surface hover:bg-surface-timber-dark transition-colors cursor-pointer border border-border-hairline/40 z-10"
        aria-label="Uždaryti peržiūrą"
      >
        <span className="material-symbols-outlined text-[24px]">close</span>
      </button>

      <div
        className="relative max-w-5xl max-h-[90vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-border-hairline/30 bg-surface-timber-dark/60 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt="Padidinta nuotrauka"
          className="max-h-[86vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
