'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Wallet, 
  LineChart, 
  Settings, 
  HelpCircle,
  Hexagon,
  X,
  Users,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.css';

const navItems = [
  { icon: LineChart, label: 'Trade', href: '/trade' },
  { icon: Wallet, label: 'Portfolio', href: '/portfolio' },
  { icon: LayoutDashboard, label: 'Wallet', href: '/' },
  { icon: Users, label: 'Affiliate', href: '/affiliate' },
  { icon: MoreHorizontal, label: 'More', href: '/more' },
];


const bottomItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Support', href: '/support' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} 
        onClick={onClose}
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <Hexagon size={28} fill="var(--primary)" />
            <span className="outfit">BlockTrade</span>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className={styles.closeBtn} 
            onClick={onClose}
          >
            <X size={20} />
          </motion.button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={onClose}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.bottom}>
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={styles.navItem}
                onClick={onClose}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
