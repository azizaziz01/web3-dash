'use client';

import React from 'react';
import styles from './Ticker.module.css';

const prices = [
  { symbol: 'BTC-USD', price: '42,245.45', change: '-2.16%' },
  { symbol: 'ETC-USD', price: '2,245.45', change: '+5.71%' },
  { symbol: 'ETH-USD', price: '2,245.45', change: '-1.16%' },
  { symbol: 'DPI-USD', price: '7.10', change: '-7.10%' },
  { symbol: 'ETC-USD', price: '2,245.45', change: '+2.09%' },
];

export function Ticker() {
  return (
    <div className={styles.ticker}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 48, fontSize: 12, color: 'var(--success)', whiteSpace: 'nowrap' }}>
        Connection: Stable (23ms)
      </div>
      <div className={styles.tickerContent}>
        {[...prices, ...prices].map((item, index) => (
          <div key={index} className={styles.tickerItem}>
            <span className={styles.tickerSymbol}>{item.symbol}</span>
            <span className={styles.tickerChange} style={{ 
              color: item.change.startsWith('+') ? 'var(--success)' : 'var(--danger)' 
            }}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>
        © 2023 Block Trade
      </div>
    </div>
  );
}
