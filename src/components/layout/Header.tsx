'use client';

import React from 'react';
import { Bell, HelpCircle, Globe, ChevronDown, Hexagon, Menu } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const navItems = [
  { label: 'Trade', href: '/trade', hasDropdown: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Wallet', href: '/dashboard' },
  { label: 'Affiliate', href: '/affiliate' },
  { label: 'More', href: '/more', hasDropdown: true },
];

import { motion } from 'framer-motion';

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={styles.menuBtn} 
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </motion.button>

        <Link href="/dashboard" className={styles.logo}>
          <Hexagon size={24} fill="var(--primary)" />
          <span className="outfit">Web3 dashboard</span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown size={14} />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn}>
          <Bell size={18} />
        </button>
        <button className={styles.iconBtn}>
          <HelpCircle size={18} />
        </button>
        <button className={styles.iconBtn}>
          <Globe size={18} />
        </button>
        
        <ConnectButton 
          accountStatus="address"
          showBalance={false}
          chainStatus="icon"
        />
      </div>
    </header>
  );
}
