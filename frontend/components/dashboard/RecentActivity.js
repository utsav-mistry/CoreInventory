import { timeAgo, getMovementColor } from '@/lib/utils';
import { ArrowDown, ArrowUp, ArrowLeftRight, Edit } from 'lucide-react';

const iconMap = {
  IN: { icon: ArrowDown, color: 'text-green-400 bg-green-500/10' },
  OUT: { icon: ArrowUp, color: 'text-red-400 bg-red-500/10' },
  TRANSFER_IN: { icon: ArrowLeftRight, color: 'text-blue-400 bg-blue-500/10' },
  TRANSFER_OUT: { icon: ArrowLeftRight, color: 'text-orange-400 bg-orange-500/10' },
  ADJUSTMENT: { icon: Edit, color: 'text-purple-400 bg-purple-500/10' },
};

export default function RecentActivity({ activities = [] }) {
  return (
    <div className="glass-card">
      <div className="px-5 py-4 border-b border-white/5">
        <h3 className="font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="divide-y divide-white/5">
        {activities.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-gray-500">No recent activity</div>
        )}
        {activities.map((entry) => {
          const mt = iconMap[entry.movementType] || iconMap.ADJUSTMENT;
          const Icon = mt.icon;
          const sign = ['IN', 'TRANSFER_IN'].includes(entry.movementType) ? '+' : entry.movementType === 'ADJUSTMENT' ? '±' : '-';
          const qtyColor = getMovementColor(entry.movementType);
          return (
            <div key={entry._id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
              <div className={`p-1.5 rounded-lg ${mt.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{entry.product?.name}</p>
                <p className="text-xs text-gray-500">{entry.referenceNumber} · {entry.warehouse?.name} · {entry.performedBy?.name}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold tabular-nums ${qtyColor}`}>{sign}{Math.abs(entry.quantityChanged)}</p>
                <p className="text-xs text-gray-600">{timeAgo(entry.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
