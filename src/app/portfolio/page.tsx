'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Portfolio.module.css';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal, Search } from 'lucide-react';

const AllocationChart = dynamic(() => import('@/components/dashboard/AllocationChart'), { 
  ssr: false,
  loading: () => <div style={{ height: '280px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading Chart...</div>
});

const assets = [
  { name: 'Bitcoin', symbol: 'BTC', balance: '1.24', value: '$52,384.32', price: '$42,245.45', change: '+2.4%', color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', balance: '15.5', value: '$34,804.47', price: '$2,245.45', change: '+5.1%', color: '#627EEA' },
  { name: 'Solana', symbol: 'SOL', balance: '120.0', value: '$11,424.00', price: '$95.20', change: '+12.4%', color: '#14F195' },
  { name: 'Polygon', symbol: 'MATIC', balance: '5000.0', value: '$4,250.00', price: '$0.85', change: '-1.2%', color: '#8247E5' },
  { name: 'Chainlink', symbol: 'LINK', balance: '250.0', value: '$3,850.00', price: '$15.40', change: '+3.8%', color: '#2A5ADA' },
];

const stats = [
  { label: 'Total Net Worth', value: '$106,712.79', change: '+$8,245.12 (8.4%)', trend: 'up' },
  { label: '24h Profit/Loss', value: '+$2,145.20', change: 'Across all assets', trend: 'up', color: 'var(--success)' },
  { label: 'Best Performer', value: 'Solana', change: '+12.4% today', trend: 'up' },
  { label: 'Active Chains', value: '5 Networks', change: 'ETH, BSC, POL, ARB, OP', trend: 'neutral' },
];

export default function PortfolioPage() {
  return (
    <MainLayout>
      <div className={styles.portfolio}>
        <div className={styles.header}>
          <div>
            <h1 className="outfit">Portfolio</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage and track your digital assets across multiple chains.</p>
          </div>
          <div className={styles.headerActions}>
            <button className={`btn-secondary ${styles.actionBtn}`}>
              <Download size={18} />
              <span className={styles.btnLabel} style={{ marginLeft: 8 }}>Export</span>
            </button>
            <button className={`btn-primary ${styles.actionBtn}`}>
              <Filter size={18} />
              <span className={styles.btnLabel} style={{ marginLeft: 8 }}>Filter</span>
            </button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`card ${styles.statCard}`}
            >
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue} style={{ color: stat.color }}>{stat.value}</span>
              <span style={{ 
                color: stat.trend === 'up' ? 'var(--success)' : stat.trend === 'down' ? 'var(--danger)' : 'var(--text-muted)', 
                fontSize: 12,
                fontWeight: 600
              }}>
                {stat.change}
              </span>
            </motion.div>
          ))}
        </div>

        <div className={styles.mainContent}>
          <div className={`card ${styles.assetsCard}`}>
            <div className={styles.cardHeader}>
              <h3 className="outfit">Assets</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search size={14} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search assets..." 
                    style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid var(--card-border)',
                      borderRadius: 8,
                      padding: '8px 12px 8px 32px',
                      fontSize: 13,
                      color: 'var(--foreground)',
                      width: 200
                    }}
                  />
                </div>
                <button className="iconBtn"><MoreHorizontal size={18} /></button>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--card-border)] hover:bg-transparent">
                    <TableHead className="text-[var(--text-muted)] font-bold h-12 px-6">Asset</TableHead>
                    <TableHead className="text-[var(--text-muted)] font-bold h-12">Price</TableHead>
                    <TableHead className="text-[var(--text-muted)] font-bold h-12">Balance</TableHead>
                    <TableHead className="text-[var(--text-muted)] font-bold h-12">Value</TableHead>
                    <TableHead className="text-[var(--text-muted)] font-bold h-12 text-right px-6">24h Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset, i) => (
                    <TableRow key={asset.symbol} className="border-b border-[var(--card-border)] hover:bg-[var(--glass)] transition-colors">
                      <TableCell className="py-5 px-6">
                        <div className={styles.assetName}>
                          <div className={styles.assetIcon} style={{ background: asset.color }}>
                            {asset.symbol[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 15 }}>{asset.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{asset.symbol}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5 font-medium">{asset.price}</TableCell>
                      <TableCell className="py-5 font-medium">{asset.balance} {asset.symbol}</TableCell>
                      <TableCell className="py-5 font-bold text-[15px]">{asset.value}</TableCell>
                      <TableCell className={`py-5 text-right px-6 ${asset.change.startsWith('+') ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', fontWeight: 700 }}>
                          {asset.change.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          {asset.change}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className={`card ${styles.allocationCard}`}>
            <h3 className="outfit" style={{ fontSize: 18 }}>Asset Allocation</h3>
            <div className={styles.chartContainer}>
              <AllocationChart data={{
                labels: assets.map(a => a.symbol),
                values: assets.map(a => parseFloat(a.value.replace('$', '').replace(',', ''))),
                colors: assets.map(a => a.color)
              }} />
            </div>
            <div className={styles.allocationList}>
              {assets.map((asset) => (
                <div key={asset.symbol} className={styles.allocationItem}>
                  <div className={styles.allocationLabel}>
                    <div className={styles.dot} style={{ background: asset.color }} />
                    <span>{asset.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>
                    {((parseFloat(asset.value.replace('$', '').replace(',', '')) / 106712.79) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

