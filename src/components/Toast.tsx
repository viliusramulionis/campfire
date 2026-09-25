import React from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  onOpenCart: () => void;
  language: 'LT' | 'EN';
}

export const Toast: React.FC<ToastProps> = ({ show, message, onOpenCart, language }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-surface-timber-dark text-surface px-4 py-3 rounded-xl shadow-2xl border border-border-hairline/30 animate-in slide-in-from-bottom-5 duration-300">
      <span className="material-symbols-outlined text-flame-core text-[20px]">
        check_circle
      </span>
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onOpenCart}
        className="ml-2 bg-flame-ember hover:bg-secondary text-on-secondary text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        {language === 'LT' ? 'Krepšelis' : 'View Cart'}
      </button>
    </div>
  );
};
