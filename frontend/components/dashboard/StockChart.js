'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function StockChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: '#1e2130', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#e2e8f0' }} />
        <Legend wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }} />
        <Area type="monotone" dataKey="IN" stroke="#22c55e" fill="url(#gIn)" strokeWidth={2} name="Received" />
        <Area type="monotone" dataKey="OUT" stroke="#ef4444" fill="url(#gOut)" strokeWidth={2} name="Dispatched" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
