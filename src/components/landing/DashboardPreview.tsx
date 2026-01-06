'use client';

import React, { useState, useMemo } from 'react';
import styles from '@/styles/Dashboard.module.css';
import {
  MoreHorizontal,
  ChevronDown,
  Plus,
  Check,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AddAssetModal } from '@/components/dashboard/AddAssetModal';
import { WalletChartProps } from '@/components/dashboard/WalletChart';
import { AllocationChartProps } from '@/components/dashboard/AllocationChart';
import { MiniChartProps } from '@/components/dashboard/MiniChart';

const WalletChart = dynamic<WalletChartProps>(() => import('@/components/dashboard/WalletChart'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading...</div>
});

const AllocationChart = dynamic<AllocationChartProps>(() => import('@/components/dashboard/AllocationChart'), { 
  ssr: false,
  loading: () => <div style={{ height: '140px', width: '140px', borderRadius: '50%', border: '2px solid var(--card-border)' }} />
});

const MiniChart = dynamic<MiniChartProps>(() => import('@/components/dashboard/MiniChart'), { 
  ssr: false,
  loading: () => <div style={{ height: '40px', width: '80px', background: 'var(--glass)', borderRadius: 4 }} />
});


const chartDataMap: Record<string, any[]> = {
  '1D': [
    { time: '04:00', value: 400000 },
    { time: '06:00', value: 450000 },
    { time: '08:00', value: 420000 },
    { time: '10:00', value: 500000 },
    { time: '12:00', value: 480000 },
    { time: '14:00', value: 550000 },
    { time: '16:00', value: 600000 },
    { time: '18:00', value: 580000 },
    { time: '20:00', value: 700000 },
    { time: '00:00', value: 650000 },
  ],
  '7D': [
    { time: 'Mon', value: 400000 },
    { time: 'Tue', value: 480000 },
    { time: 'Wed', value: 450000 },
    { time: 'Thu', value: 520000 },
    { time: 'Fri', value: 600000 },
    { time: 'Sat', value: 580000 },
    { time: 'Sun', value: 650000 },
  ],
  '1M': [
    { time: 'Week 1', value: 400000 },
    { time: 'Week 2', value: 550000 },
    { time: 'Week 3', value: 500000 },
    { time: 'Week 4', value: 650000 },
  ],
  'ALL': [
    { time: '2021', value: 100000 },
    { time: '2022', value: 400000 },
    { time: '2023', value: 650000 },
  ]
};

const INITIAL_ASSETS = [
  { name: 'Bitcoin', symbol: 'BTC', balance: '108.61', usdValue: '$213,017.17', rate: '1 BTC = $19,509.23', profit: '+$1,237.45', profitPct: '+5%', color: '#F7931A', sparkline: [40, 45, 42, 50, 48, 55, 60] },
  { name: 'Ethereum', symbol: 'ETH', balance: '107.45', usdValue: '$31,569.20', rate: '1 ETH = $1,316.04', profit: '+$3,237.45', profitPct: '+8%', color: '#627EEA', sparkline: [30, 35, 32, 40, 38, 45, 50] },
  { name: 'Tether', symbol: 'USDT', balance: '1,568.76', usdValue: '$1,552.51', rate: '1 USDT = $0.99', profit: '-$12.45', profitPct: '-1%', color: '#26A17B', sparkline: [50, 48, 52, 50, 49, 51, 50] },
  { name: 'Ripple', symbol: 'XRP', balance: '500.00', usdValue: '$245,841.0', rate: '1 XRP = $0.45', profit: '-$37.45', profitPct: '-3%', color: '#23292F', sparkline: [20, 25, 22, 18, 20, 22, 21] },
];

const transactions = [
  { id: '0000000000000000000000459f73...', asset: 'Bitcoin', type: 'Deposit', date: '2022-09-11 20:53', amount: '+1.05401 BTC', color: '#F7931A' },
  { id: '96afab209aab982cf4bef872ad...', asset: 'Bitcoin', type: 'Deposit', date: '2022-09-09 15:21', amount: '+0.02642 BTC', color: '#F7931A' },
  { id: '654652485KL', asset: 'Debit Card', type: 'Deposit', date: '2022-09-08 16:45', amount: '+$980.97', color: '#FF5252' },
  { id: '0x3a72e9b4e4bf6702db7...', asset: 'Ethereum', type: 'Deposit', date: '2022-09-06 09:44', amount: '+0.0144 ETH', color: '#627EEA' },
];

export default function DashboardPreview() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('1D');
  const [historyRange, setHistoryRange] = useState('1Y');
  const [activeCard, setActiveCard] = useState(0);
  const [payAmount, setPayAmount] = useState('1');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const currentChartData = useMemo(() => {
    return chartDataMap[timeRange] || chartDataMap['1D'];
  }, [timeRange]);

  const receiveAmount = useMemo(() => {
    const amount = parseFloat(payAmount) || 0;
    return (amount * 1316.04).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [payAmount]);

  const handleTransfer = () => {
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setTransferSuccess(true);
      setTimeout(() => setTransferSuccess(false), 3000);
    }, 1500);
  };

  const handleAddAsset = (newAsset: any) => {
    setAssets(prev => [newAsset, ...prev]);
  };


  return (
      <div className={styles.dashboard} style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div className={styles.mainContent}>
          {/* Top Row */}
          <div className={styles.topRow}>
            <div className={`card ${styles.balanceCard}`}>
              <div className={styles.balanceHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, border: '1px solid var(--text-muted)', borderRadius: 4 }} />
                  <span>Balance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                  <span>USD</span>
                  <ChevronDown size={14} />
                </div>
              </div>
              <div className={styles.balanceAmount}>$1,180,577.24</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '12px 0' }}>
                <div style={{ width: 140, height: 140 }}>
                  <AllocationChart data={{
                    labels: ['BTC', 'ETH', 'USDT', 'Other'],
                    values: [40, 30, 20, 10],
                    colors: ['#F7931A', '#627EEA', '#26A17B', '#707a8a']
                  }} />
                </div>
                <div className={styles.balanceLegend} style={{ flex: 1, gridTemplateColumns: '1fr', gap: 8 }}>
                  <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#F7931A' }} /> BTC (40%)</div>
                  <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#627EEA' }} /> ETH (30%)</div>
                  <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#26A17B' }} /> USDT (20%)</div>
                  <div className={styles.legendItem}><div className={styles.dot} style={{ background: '#707a8a' }} /> Other (10%)</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 12, borderTop: '1px solid var(--card-border)' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Profit today <ChevronDown size={10} /></div>
                  <div style={{ color: 'var(--success)', fontSize: 14, fontWeight: 600 }}>+$4,245.45</div>
                </div>
                <div style={{ color: 'var(--success)', fontSize: 14, fontWeight: 600 }}>+14.5%</div>
              </div>

            </div>

            <button className={`card ${styles.addCard}`} onClick={() => setIsAddModalOpen(true)}>
              <Plus size={20} />
              <span style={{ fontSize: 11, marginTop: 4, fontWeight: 600 }}>ADD</span>
            </button>

            {assets.map((asset) => (
              <div 
                key={asset.symbol} 
                className={`card ${styles.assetCard} ${selectedAsset === asset.symbol ? styles.assetCardActive : ''}`} 
                onClick={() => setSelectedAsset(asset.symbol === selectedAsset ? null : asset.symbol)}
              >
                <div className={styles.assetHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className={styles.assetIcon} style={{ background: asset.color }}>
                      {asset.symbol[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{asset.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{asset.rate}</div>
                    </div>
                  </div>
                  <MoreHorizontal size={16} color="var(--text-muted)" />
                </div>

                <div className={styles.assetMain}>
                  <div>
                    <div className={styles.assetValue}>{asset.balance} {asset.symbol}</div>
                    <div className={styles.assetSubValue}>{asset.usdValue}</div>
                  </div>
                  <div className={styles.miniChartContainer}>
                    <MiniChart color={asset.color} data={asset.sparkline} />
                  </div>
                </div>

                <div className={styles.assetProfit}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: asset.profit.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>
                    {asset.profit.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span style={{ fontWeight: 600 }}>{asset.profitPct}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    {asset.profit}
                  </div>
                </div>

                <div className={styles.assetActions}>
                  <button className={styles.actionBtn}>Swap</button>
                  <button className={styles.actionBtn}>Send</button>
                </div>
              </div>
            ))}


          </div>
          <div className={styles.contentRow}>

            <div className={styles.leftColumn}>
              {/* Chart Section */}
              <div className={`card ${styles.chartCard}`}>
                <div className={styles.chartHeader}>
                  <h3 className="outfit" style={{ fontSize: 16 }}>My Wallets</h3>
                  <div className={styles.timeFilters}>
                    {['1D', '7D', '1M', '3M', '6M', '1Y', 'ALL'].map((t) => (
                      <button 
                        key={t} 
                        className={`${styles.timeBtn} ${t === timeRange ? styles.timeBtnActive : ''}`}
                        onClick={() => setTimeRange(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ height: '300px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(22, 26, 30, 0.8)', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--card-border)', fontSize: 12, backdropFilter: 'blur(4px)' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>My Balance</div>
                    <div style={{ fontWeight: 700 }}>$1,176,356.46 <span style={{ color: 'var(--success)' }}>+3.21%</span></div>
                  </div>
                  <WalletChart data={currentChartData} />
                </div>
              </div>

              {/* Transaction History */}
              <div className={`card ${styles.historyCard}`}>
                <div className={styles.chartHeader}>
                  <h3 className="outfit" style={{ fontSize: 16 }}>Transaction history</h3>
                  <div className={styles.timeFilters}>
                    {['1D', '7D', '1M', '3M', '6M', '1Y', 'ALL'].map((t) => (
                      <button 
                        key={t} 
                        className={`${styles.timeBtn} ${t === historyRange ? styles.timeBtnActive : ''}`}
                        onClick={() => setHistoryRange(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.tableWrapper}>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[var(--card-border)] hover:bg-transparent">
                        <TableHead className="text-[var(--text-muted)] font-medium h-10">Crypto trade</TableHead>
                        <TableHead className={`text-[var(--text-muted)] font-medium h-10 ${styles.hideMobile}`}>ID</TableHead>
                        <TableHead className="text-[var(--text-muted)] font-medium h-10">Type</TableHead>
                        <TableHead className={`text-[var(--text-muted)] font-medium h-10 ${styles.hideMobile}`}>Date</TableHead>
                        <TableHead className="text-[var(--text-muted)] font-medium h-10 text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx, i) => (
                        <TableRow key={i} className="border-b border-[var(--card-border)] hover:bg-[var(--glass)] transition-colors">
                          <TableCell className="py-4">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: tx.color }} />
                              <span style={{ fontWeight: 500 }}>{tx.asset}</span>
                            </div>
                          </TableCell>
                          <TableCell className={`py-4 text-[var(--text-muted)] underline cursor-pointer ${styles.hideMobile}`}>{tx.id}</TableCell>
                          <TableCell className="py-4">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              {tx.type === 'Deposit' ? <ArrowDownLeft size={14} className="text-[var(--success)]" /> : <ArrowUpRight size={14} className="text-[var(--danger)]" />}
                              <span style={{ fontSize: 13 }}>{tx.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className={`py-4 text-[var(--text-muted)] ${styles.hideMobile}`}>{tx.date}</TableCell>
                          <TableCell className={`py-4 text-right font-semibold ${tx.amount.startsWith('+') ? 'text-[var(--success)]' : 'text-[var(--foreground)]'}`}>
                            {tx.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

              </div>
            </div>
            {/* Right Column */}
            <div className={styles.rightColumn}>
              <div className={styles.cardSection}>
                <div className={styles.cardHeader}>
                  <h3 className="outfit" style={{ fontSize: 16 }}>My Card</h3>
                  <button className={styles.addBtn} onClick={() => alert('Add Card functionality coming soon!')}>+ ADD</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div 
                    className={styles.virtualCard} 
                    style={{ 
                      border: activeCard === 0 ? '1px solid var(--primary)' : '1px solid transparent',
                      opacity: activeCard === 0 ? 1 : 0.5,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setActiveCard(0)}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.mastercard}>
                        <div className={styles.mcCircle} style={{ background: '#EB001B', opacity: 0.8 }} />
                        <div className={styles.mcCircle} style={{ background: '#F79E1B', opacity: 0.8, marginLeft: -12 }} />
                      </div>
                      {activeCard === 0 && (
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={10} color="#000" strokeWidth={4} />
                        </div>
                      )}
                    </div>
                    <div className={styles.cardNumber}>1111 2222 3333 4444</div>
                    <div className={styles.cardBottom}>
                      <div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Card holder</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>JORDAN BELFORD</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Expiry</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>01/23</div>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>PERSONAL</div>
                    </div>
                  </div>

                  <div 
                    className={styles.virtualCard} 
                    style={{ 
                      border: activeCard === 1 ? '1px solid var(--primary)' : '1px solid transparent',
                      opacity: activeCard === 1 ? 1 : 0.5,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setActiveCard(1)}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.mastercard}>
                        <div className={styles.mcCircle} style={{ background: '#EB001B', opacity: 0.8 }} />
                        <div className={styles.mcCircle} style={{ background: '#F79E1B', opacity: 0.8, marginLeft: -12 }} />
                      </div>
                      {activeCard === 1 && (
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={10} color="#000" strokeWidth={4} />
                        </div>
                      )}
                    </div>
                    <div className={styles.cardNumber}>4444 3333 2222 1111</div>
                    <div className={styles.cardBottom}>
                      <div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Card holder</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>MIKE PROFITS</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>Expiry</div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>01/23</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`card ${styles.quickTransfer}`}>
                <h3 className="outfit" style={{ fontSize: 16 }}>Quick Transfer</h3>
                <div className={styles.inputGroup}>
                  <div className={styles.inputWrapper}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#F7931A', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>B</div>
                    <input type="text" defaultValue="0xf616...7f7e" style={{ color: 'var(--text-muted)' }} />
                    <ChevronDown size={14} color="var(--text-muted)" />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className={styles.inputLabel}>You pay</span>
                    <span className={styles.inputLabel}>Balance: 107.45 ETH</span>
                  </div>
                  <div className={styles.inputWrapper}>
                    <input 
                      type="number" 
                      value={payAmount} 
                      onChange={(e) => setPayAmount(e.target.value)}
                    />
                    <div className={styles.tokenSelector}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#627EEA' }} />
                      ETH
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className={styles.inputLabel}>You receive</span>
                    <span className={styles.inputLabel}>1 ETH = $1,316.04</span>
                  </div>
                  <div className={styles.inputWrapper}>
                    <input type="text" value={receiveAmount} readOnly />
                    <div className={styles.tokenSelector}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#26A17B' }} />
                      USD
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>

                <div className={styles.transferActions}>
                  <button 
                    className={styles.sendBtn} 
                    onClick={handleTransfer}
                    disabled={isTransferring}
                  >
                    {isTransferring ? (
                      <RefreshCw size={18} className="animate-spin mx-auto" />
                    ) : transferSuccess ? (
                      'Success!'
                    ) : (
                      'Send Now'
                    )}
                  </button>
                  <button className={styles.clearBtn} onClick={() => setPayAmount('0')}>Clear</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      <AddAssetModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddAsset}
      />
    </div>

  );
}
