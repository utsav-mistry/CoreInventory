'use client';
import Sidebar from './Sidebar';
import Header from './Header';

export default function PageWrapper({ title, action, children }) {
  return (
    <div className="flex h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[260px] overflow-hidden">
        <Header title={title} action={action} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
