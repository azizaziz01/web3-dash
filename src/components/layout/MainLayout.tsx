'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { Ticker } from './Ticker';
import styles from './MainLayout.module.css';
import { Sidebar } from './Sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className={styles.main}>
        {children}
      </main>
      <Ticker />
    </div>
  );
}

