import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ title, value, icon: Icon, color, subtitle, trend }) {
  const colorMap = {
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };

  return (
    <div className="glass-card p-5 hover:border-white/10 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-2.5 rounded-lg border', colorMap[color] || colorMap.blue)}>
          <Icon className="w-4 h-4" />
        </div>
        {trend !== undefined && (
          <div className={cn('flex items-center gap-1 text-xs', trend >= 0 ? 'text-green-400' : 'text-red-400')}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-white tabular-nums">{value?.toLocaleString() ?? '—'}</p>
        <p className="text-sm font-medium text-gray-400 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
