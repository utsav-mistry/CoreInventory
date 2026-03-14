'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Package, ArrowDownToLine, ArrowUpFromLine,
  ArrowLeftRight, ClipboardEdit, BookOpen, Warehouse, Settings,
  LogOut, User, Bell, ChevronDown, Boxes, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [operationsOpen, setOperationsOpen] = useState(true);

  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Products', href: '/products', icon: Package },
    {
      label: 'Operations', icon: Boxes, children: [
        { label: 'Receipts', href: '/receipts', icon: ArrowDownToLine },
        { label: 'Deliveries', href: '/deliveries', icon: ArrowUpFromLine },
        { label: 'Transfers', href: '/transfers', icon: ArrowLeftRight },
        { label: 'Adjustments', href: '/adjustments', icon: ClipboardEdit },
      ]
    },
    { label: 'Stock Ledger', href: '/ledger', icon: BookOpen },
    { label: 'Warehouses', href: '/warehouses', icon: Warehouse },
  ];

  // Admin specific navigation
  if (user?.role === 'admin') {
    navItems.push({ label: 'User Management', href: '/users', icon: ShieldCheck });
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-50 border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Boxes className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">CoreInventory</span>
            <p className="text-xs text-gray-500">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => setOperationsOpen(!operationsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', operationsOpen && 'rotate-180')} />
                </button>
                {operationsOpen && (
                  <div className="ml-4 pl-3 border-l border-white/5 mt-0.5 space-y-0.5">
                    {item.children.map((child) => {
                      const isActive = pathname === child.href || pathname.startsWith(child.href + '/');
                      return (
                        <Link key={child.href} href={child.href} className={cn('nav-link', isActive && 'active')}>
                          <child.icon className="w-4 h-4" />
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          const isActive = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} className={cn('nav-link', isActive && 'active')}>
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
        <Link href="/profile" className="nav-link">
          <User className="w-4 h-4" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate font-mono uppercase tracking-tighter">{user?.role}</p>
          </div>
        </Link>
        <button onClick={logout} className="nav-link w-full text-red-500 hover:text-red-300 hover:bg-red-500/5">
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
