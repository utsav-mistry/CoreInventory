'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Spinner from '@/components/ui/Spinner';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Spinner className="border-white/20 border-t-white" />
          </div>
          <p className="text-sm text-gray-500">Loading CoreInventory...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
  return children;
}
