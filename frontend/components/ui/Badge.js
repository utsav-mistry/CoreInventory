import { cn, getStatusColor } from '@/lib/utils';

export function StatusBadge({ status }) {
  return (
    <span className={cn('status-badge border', getStatusColor(status))}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}

export function StockBadge({ status, quantity, reorderPoint }) {
  const map = {
    out_of_stock: 'bg-red-500/15 text-red-400 border-red-500/20',
    low_stock: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    in_stock: 'bg-green-500/15 text-green-400 border-green-500/20',
  };
  const labels = { out_of_stock: 'Out of Stock', low_stock: 'Low Stock', in_stock: 'In Stock' };
  return (
    <span className={cn('status-badge border', map[status] || map.in_stock)}>
      {labels[status] || 'In Stock'}
    </span>
  );
}
