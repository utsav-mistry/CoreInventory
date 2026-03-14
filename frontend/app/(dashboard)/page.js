'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import KPICard from '@/components/dashboard/KPICard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import StockChart from '@/components/dashboard/StockChart';
import { dashboardAPI } from '@/lib/api';
import { PageLoader } from '@/components/ui/Spinner';
import { Package, TrendingDown, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI.getStats()
      .then(({ data }) => setStats(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Process chart data
  const chartData = (() => {
    if (!stats?.stockTrend) return [];
    const map = {};
    stats.stockTrend.forEach(({ _id, totalQuantity }) => {
      if (!map[_id.date]) map[_id.date] = { date: _id.date, IN: 0, OUT: 0, ADJUSTMENT: 0 };
      if (_id.movementType === 'IN') map[_id.date].IN = totalQuantity;
      else if (_id.movementType === 'OUT') map[_id.date].OUT = totalQuantity;
      else if (_id.movementType === 'ADJUSTMENT') map[_id.date].ADJUSTMENT = totalQuantity;
    });
    return Object.values(map).map(d => ({ ...d, date: format(new Date(d.date), 'MMM dd') }));
  })();

  if (loading) return <PageWrapper title="Dashboard"><PageLoader /></PageWrapper>;

  const kpis = stats?.kpis;

  return (
    <PageWrapper title="Dashboard">
      <div className="space-y-6">
        {/* Alert Banner */}
        {(kpis?.lowStockProducts > 0 || kpis?.outOfStockProducts > 0) && (
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300">
                <strong>{kpis.outOfStockProducts}</strong> products out of stock &amp;{' '}
                <strong>{kpis.lowStockProducts}</strong> running low
              </span>
            </div>
            <Link href="/products?status=low_stock" className="text-xs text-yellow-400 hover:text-yellow-300 underline underline-offset-2">
              View all →
            </Link>
          </div>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard title="Total Products" value={kpis?.totalProducts} icon={Package} color="blue" />
          <KPICard title="Low Stock" value={kpis?.lowStockProducts} icon={AlertTriangle} color="yellow" />
          <KPICard title="Out of Stock" value={kpis?.outOfStockProducts} icon={TrendingDown} color="red" />
          <KPICard title="Pending Receipts" value={kpis?.pendingReceipts} icon={ArrowDownToLine} color="green" />
          <KPICard title="Pending Deliveries" value={kpis?.pendingDeliveries} icon={ArrowUpFromLine} color="orange" />
          <KPICard title="Transfers" value={kpis?.scheduledTransfers} icon={ArrowLeftRight} color="purple" />
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white">Stock Movement — Last 7 Days</h3>
              <BarChart3 className="w-4 h-4 text-gray-500" />
            </div>
            {chartData.length > 0 ? (
              <StockChart data={chartData} />
            ) : (
              <div className="h-[220px] flex items-center justify-center text-gray-600 text-sm">No movement data yet</div>
            )}
          </div>
          <RecentActivity activities={stats?.recentActivity || []} />
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/receipts/new', label: 'New Receipt', icon: ArrowDownToLine, color: 'brand-400' },
              { href: '/deliveries/new', label: 'New Delivery', icon: ArrowUpFromLine, color: 'orange-400' },
              { href: '/transfers/new', label: 'New Transfer', icon: ArrowLeftRight, color: 'blue-400' },
              { href: '/adjustments/new', label: 'Adjustment', icon: Package, color: 'purple-400' },
            ].map(({ href, label, icon: Icon, color }) => (
              <Link key={href} href={href} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/5 hover:border-white/10 transition-all duration-200 group">
                <Icon className={`w-5 h-5 text-${color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors text-center">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
