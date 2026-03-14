'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative w-full bg-surface-50 border border-white/10 rounded-2xl shadow-2xl animate-slide-up', sizes[size])}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}
