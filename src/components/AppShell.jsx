import { useState } from 'react';
import Sidebar from './Sidebar';

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content">
        <div className="mobile-topbar">
          <button onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">☰</button>
        </div>
        {children}
      </div>
    </div>
  );
}
