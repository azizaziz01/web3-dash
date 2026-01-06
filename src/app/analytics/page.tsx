'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Analytics.module.css';
import dynamic from 'next/dynamic';

const VolumeChart = dynamic(() => import('@/components/analytics/VolumeChart'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading...</div>
});

const GrowthChart = dynamic(() => import('@/components/analytics/GrowthChart'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading...</div>
});

const volumeData = [
  { name: 'Mon', volume: 4000, users: 2400 },
  { name: 'Tue', volume: 3000, users: 1398 },
  { name: 'Wed', volume: 2000, users: 9800 },
  { name: 'Thu', volume: 2780, users: 3908 },
  { name: 'Fri', volume: 1890, users: 4800 },
  { name: 'Sat', volume: 2390, users: 3800 },
  { name: 'Sun', volume: 3490, users: 4300 },
];

const topTokens = [
  { name: 'Ethereum', symbol: 'ETH', volume: '$1.2B', change: '+2.4%' },
  { name: 'Solana', symbol: 'SOL', volume: '$850M', change: '+12.1%' },
  { name: 'Arbitrum', symbol: 'ARB', volume: '$420M', change: '-3.2%' },
  { name: 'Optimism', symbol: 'OP', volume: '$310M', change: '+5.7%' },
];

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <div className={styles.analytics}>
        <div className={styles.header}>
          <h1 className="outfit">Market Analytics</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time on-chain data and market trends.</p>
        </div>

        <div className={styles.grid}>
          <div className={`card ${styles.largeCard}`}>
            <h3 className="outfit">Global Trading Volume</h3>
            <div className={styles.chartContainer}>
              <VolumeChart data={volumeData} />
            </div>
          </div>

          <div className={`card`}>
            <h3 className="outfit">Web3 dashboard Health</h3>
            <div style={{ marginTop: 24 }} className={styles.list}>
              <div className={styles.metricItem}>
                <div className={styles.metricLabel}>Total Value Locked</div>
                <div className={styles.metricValue}>$52.4B</div>
                <div style={{ color: 'var(--success)', fontSize: 12 }}>+1.2% (24h)</div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricLabel}>Active Wallets</div>
                <div className={styles.metricValue}>1.2M</div>
                <div style={{ color: 'var(--success)', fontSize: 12 }}>+8.4% (24h)</div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricLabel}>Avg. Gas Price</div>
                <div className={styles.metricValue}>12 Gwei</div>
                <div style={{ color: 'var(--danger)', fontSize: 12 }}>+2.1% (24h)</div>
              </div>
            </div>
          </div>

          <div className={`card`}>
            <h3 className="outfit">Top by Volume</h3>
            <div style={{ marginTop: 24 }} className={styles.list}>
              {topTokens.map((token) => (
                <div key={token.symbol} className={styles.listItem}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                      {token.symbol[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{token.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{token.symbol}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600 }}>{token.volume}</div>
                    <div style={{ fontSize: 12, color: token.change.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>
                      {token.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`card ${styles.largeCard}`}>
            <h3 className="outfit">User Growth Trend</h3>
            <div className={styles.chartContainer}>
              <GrowthChart data={volumeData} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
