'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Swap.module.css';
import { Settings, ArrowDown, ChevronDown, Info, RefreshCw } from 'lucide-react';

export default function SwapPage() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  return (
    <MainLayout>
      <div className={styles.swapContainer}>
        <div className={`card ${styles.swapCard}`}>
          <div className={styles.swapHeader}>
            <h2 className="outfit">Swap</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="iconBtn"><RefreshCw size={18} /></button>
              <button className="iconBtn"><Settings size={18} /></button>
            </div>
          </div>

          <div className={styles.tokenInput}>
            <div className={styles.inputRow}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>You pay</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Balance: 1.24 ETH</span>
            </div>
            <div className={styles.inputRow}>
              <input 
                type="text" 
                className={styles.amountInput} 
                placeholder="0.0" 
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              />
              <button className={styles.tokenSelect}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#627EEA', display: 'flex', alignItems: 'center', justifyItems: 'center', fontSize: 12 }}>E</div>
                ETH
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <button className={styles.switchBtn}>
            <ArrowDown size={20} />
          </button>

          <div className={styles.tokenInput}>
            <div className={styles.inputRow}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>You receive</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Balance: 0.00</span>
            </div>
            <div className={styles.inputRow}>
              <input 
                type="text" 
                className={styles.amountInput} 
                placeholder="0.0" 
                value={toAmount}
                readOnly
              />
              <button className={styles.tokenSelect}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#F7931A', display: 'flex', alignItems: 'center', justifyItems: 'center', fontSize: 12 }}>B</div>
                WBTC
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span>Exchange Rate</span>
              <span style={{ color: 'var(--foreground)' }}>1 ETH = 0.052 WBTC</span>
            </div>
            <div className={styles.detailRow}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                Price Impact <Info size={12} />
              </span>
              <span style={{ color: 'var(--success)' }}>&lt; 0.01%</span>
            </div>
            <div className={styles.detailRow}>
              <span>Web3 dashboard Fee</span>
              <span style={{ color: 'var(--foreground)' }}>~$4.20</span>
            </div>
          </div>

          <button className={`btn-primary ${styles.swapBtn}`}>
            Swap Assets
          </button>
        </div>

        <div style={{ marginTop: 32, width: 480 }}>
          <div className={`card`} style={{ padding: 20 }}>
            <h4 className="outfit" style={{ marginBottom: 16 }}>Recent Swaps</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2].map(i => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ padding: 8, background: 'var(--secondary)', borderRadius: 8 }}>
                      <RefreshCw size={14} color="var(--primary)" />
                    </div>
                    <div>
                      <div>ETH to WBTC</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>2 hours ago</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600 }}>0.5 ETH</div>
                    <div style={{ fontSize: 12, color: 'var(--success)' }}>Completed</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
