import { cn } from '@/lib/utils';

export default function Spinner({ size = 'md', className }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };
  return (
    <div className={cn('animate-spin rounded-full border-2 border-brand-500/20 border-t-brand-500', sizes[size], className)} />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-3" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
