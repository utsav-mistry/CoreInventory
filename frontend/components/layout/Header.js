'use client';
import { Bell, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { productAPI } from '@/lib/api';

export default function Header({ title, action }) {
  const { user } = useAuth();
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    productAPI.getLowStock().then(({ data }) => {
      setAlertCount(data.data.products.length);
    }).catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="page-title">{title}</h1>
        <div className="flex items-center gap-3">
          {alertCount > 0 && (
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-1.5">
              <Bell className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-medium">{alertCount} low stock</span>
            </div>
          )}
          {action && (
            <button onClick={action.onClick} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {action.label}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
