import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata = {
  title: 'CoreInventory — Inventory Management System',
  description: 'Production-grade inventory management for modern warehouses',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.variable}>
        <AuthProvider>
          <ToastProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: { background: '#1e2130', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '14px' },
                success: { iconTheme: { primary: '#22c55e', secondary: '#1e2130' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#1e2130' } },
              }}
            />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
