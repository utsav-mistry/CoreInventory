import { cn } from '@/lib/utils';

export default function Input({ label, error, icon: Icon, className, ...props }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-sm font-medium text-gray-400">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <input
          {...props}
          className={cn('input-field', Icon && 'pl-9', error && 'border-red-500/50 focus:border-red-500/50')}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
