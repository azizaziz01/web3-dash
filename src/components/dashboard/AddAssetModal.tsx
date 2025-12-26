'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from '@/styles/Dashboard.module.css';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asset: any) => void;
}

const COLORS = ['#F7931A', '#627EEA', '#26A17B', '#23292F', '#E84142', '#00C087', '#5865F2'];

export function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');
  const [usdValue, setUsdValue] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !symbol || !balance) return;

    onAdd({
      name,
      symbol: symbol.toUpperCase(),
      balance,
      usdValue: `$${parseFloat(usdValue).toLocaleString()}`,
      rate: `1 ${symbol.toUpperCase()} = $${(parseFloat(usdValue) / parseFloat(balance)).toFixed(2)}`,
      profit: '+$0.00',
      profitPct: '+0%',
      color,
      sparkline: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 20)
    });

    // Reset form
    setName('');
    setSymbol('');
    setBalance('');
    setUsdValue('');
    setColor(COLORS[0]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={styles.modalContainer}
            style={{ maxWidth: 400 }}
          >
            <div className={styles.modalHeader} style={{ background: 'none', padding: '24px 32px' }}>
              <h2 className="outfit" style={{ fontSize: 20 }}>Add Asset</h2>
              <button onClick={onClose} className="iconBtn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody} style={{ gap: 20, padding: '0 32px 32px' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Asset Name</label>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    placeholder="e.g. Bitcoin" 
                    style={{ paddingLeft: 16 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Symbol</label>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    placeholder="e.g. BTC" 
                    style={{ paddingLeft: 16 }}
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Balance</label>
                    <input 
                      type="number" 
                      step="any"
                      className={styles.inputField} 
                      placeholder="0.00" 
                      style={{ paddingLeft: 16 }}
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>USD Value</label>
                    <input 
                      type="number" 
                      step="any"
                      className={styles.inputField} 
                      placeholder="0.00" 
                      style={{ paddingLeft: 16 }}
                      value={usdValue}
                      onChange={(e) => setUsdValue(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Theme Color</label>
                  <div className={styles.colorPicker} style={{ padding: 0 }}>
                    {COLORS.map((c) => (
                      <div 
                        key={c}
                        className={`${styles.colorOption} ${color === c ? styles.colorOptionActive : ''}`}
                        style={{ background: c, width: 28, height: 28 }}
                        onClick={() => setColor(c)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter} style={{ padding: '24px 32px 32px' }}>
                <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Add
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}