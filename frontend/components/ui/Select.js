import { cn } from '@/lib/utils';

export default function Select({ label, options, error, className, ...props }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-sm font-medium text-gray-400">{label}</label>}
      <select
        {...props}
        className={cn('input-field appearance-none cursor-pointer', error && 'border-red-500/50 focus:border-red-500/50')}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
