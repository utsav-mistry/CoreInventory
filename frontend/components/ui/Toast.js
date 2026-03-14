'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  const icons = {
    success: <CheckCircle className="w-4 h-4 text-green-400" />,
    error: <XCircle className="w-4 h-4 text-red-400" />,
    warning: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
    info: <Info className="w-4 h-4 text-blue-400" />,
  };

  return (
    <div className="flex items-center gap-3 bg-surface-50 border border-white/10 rounded-xl px-4 py-3 shadow-2xl animate-slide-in-right">
      {icons[type]}
      <p className="text-sm text-gray-200 flex-1">{message}</p>
      <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
