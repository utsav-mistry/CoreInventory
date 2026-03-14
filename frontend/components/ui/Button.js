import { cn } from '@/lib/utils';

export default function Button({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };
  return (
    <button className={cn(variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
