'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import styles from '@/styles/Trade.module.css';
import dynamic from 'next/dynamic';
import { Chat } from '@/components/trade/Chat';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ChevronDown, 
  Settings, 
  Info, 
  Maximize2,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Shield,
  Activity
} from 'lucide-react';

// Dynamically import the custom TradeChart component to avoid SSR issues
const TradeChart = dynamic(() => import('@/components/trade/TradeChart'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading Chart...</div>
});



// Memoized data generation to prevent lagging
const generateCandleData = () => {
  const data = {
    x: [] as string[],
    open: [] as number[],
    high: [] as number[],
    low: [] as number[],
    close: [] as number[],
  };

  let lastClose = 1640;
  for (let i = 0; i < 100; i++) {
    const open = lastClose;
    const close = open + (Math.random() - 0.5) * 40;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    
    data.x.push(`2023-12-26 ${Math.floor(i/4)}:${(i%4)*15}:00`);
    data.open.push(open);
    data.high.push(high);
    data.low.push(low);
    data.close.push(close);
    lastClose = close;
  }
  return data;
};


const ORDER_BOOK_ASKS = [
  { price: '1,700.50', size: '15.00', sum: '13.06M', depth: 80 },
  { price: '1,680.25', size: '1.06K', sum: '114.17M', depth: 65 },
  { price: '1,660.00', size: '1.5K', sum: '46.72M', depth: 50 },
  { price: '1,655.75', size: '521.5', sum: '960.47K', depth: 40 },
  { price: '1,652.10', size: '86.71', sum: '6.74M', depth: 30 },
  { price: '1,650.45', size: '75.51', sum: '1.47M', depth: 20 },
  { price: '1,649.80', size: '39.08', sum: '741.06K', depth: 15 },
  { price: '1,648.90', size: '864.86', sum: '226.06M', depth: 10 },
];

const ORDER_BOOK_BIDS = [
  { price: '1,647.35', size: '96.00', sum: '16.06M', depth: 10 },
  { price: '1,645.20', size: '4.56K', sum: '78.41M', depth: 25 },
  { price: '1,642.15', size: '19.72', sum: '341.71M', depth: 40 },
  { price: '1,640.00', size: '8.52K', sum: '961.22M', depth: 55 },
  { price: '1,638.50', size: '131.10', sum: '721.58M', depth: 70 },
  { price: '1,635.75', size: '14.79K', sum: '42.06M', depth: 85 },
  { price: '1,632.40', size: '56.78K', sum: '44.99M', depth: 90 },
  { price: '1,630.10', size: '12.12K', sum: '91.27M', depth: 95 },
];

const MARKET_TRADES = [
  { price: '1,648.35', size: '0.452', time: '14:22:01', side: 'buy' },
  { price: '1,648.30', size: '1.205', time: '14:21:58', side: 'sell' },
  { price: '1,648.35', size: '0.012', time: '14:21:55', side: 'buy' },
  { price: '1,648.40', size: '5.000', time: '14:21:50', side: 'buy' },
  { price: '1,648.25', size: '0.890', time: '14:21:45', side: 'sell' },
  { price: '1,648.35', size: '2.145', time: '14:21:42', side: 'buy' },
];

export default function TradePage() {
  const [activeChartTab, setActiveChartTab] = useState('Chart');
  const [activeBottomTab, setActiveBottomTab] = useState('Positions');
  const [activeBookTab, setActiveBookTab] = useState('Order Book');
  const [orderType, setOrderType] = useState('Limit');
  const [side, setSide] = useState('Long');
  const [marginType, setMarginType] = useState('Isolated');
  const [leverage, setLeverage] = useState(20);
  const [price, setPrice] = useState('1648.35');
  const [amount, setAmount] = useState('100.00');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [candleData, setCandleData] = useState(() => generateCandleData());

  // Simulate real-time price updates
  const [currentPrice, setCurrentPrice] = useState(1648.35);
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = currentPrice + (Math.random() - 0.5) * 2;
      setCurrentPrice(newPrice);
      
      // Update the last candle in the chart
      setCandleData(prev => {
        const newData = { ...prev };
        const lastIdx = newData.close.length - 1;
        newData.close[lastIdx] = newPrice;
        if (newPrice > newData.high[lastIdx]) newData.high[lastIdx] = newPrice;
        if (newPrice < newData.low[lastIdx]) newData.low[lastIdx] = newPrice;
        return { ...newData };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [currentPrice]);


  return (
    <MainLayout>
      <div className={styles.trade}>
        {/* Asset Header */}
        <div className={styles.assetHeader}>
          <div className={styles.pairInfo}>
            <div className={styles.pairName}>
              <span style={{ color: 'var(--success)' }}>{currentPrice.toFixed(2)}</span>
              ETH-USDT
              <ChevronDown size={16} />
            </div>
            <div className={styles.pairType}>Perpetual <Activity size={12} style={{ display: 'inline', marginLeft: 4 }} /></div>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricLabel}>Mark</span>
            <span className={styles.metricValue}>{currentPrice.toFixed(2)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Index</span>
            <span className={styles.metricValue}>{(currentPrice - 0.05).toFixed(2)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Funding / Countdown</span>
            <span className={styles.metricValue} style={{ color: 'var(--primary)' }}>0.0044% / 00:38:34</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>24H Change</span>
            <span className={styles.metricValue} style={{ color: 'var(--danger)' }}>-11.60 -0.44%</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>24H High / Low</span>
            <span className={styles.metricValue}>1,677 / 1,635</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>24H Volume</span>
            <span className={styles.metricValue}>335K / 804M</span>
          </div>
          <div className={styles.headerActions}>
            <Info size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            <Settings size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Main Chart Section */}
        <div className={styles.chartSection}>
          <div className={`card ${styles.chartCard}`}>
            <div className={styles.chartControls}>
              <div className={styles.chartTabs}>
                {['Chart', 'Depth', 'Funding', 'Details'].map(tab => (
                  <span 
                    key={tab}
                    className={`${styles.chartTab} ${activeChartTab === tab ? styles.chartTabActive : ''}`}
                    onClick={() => setActiveChartTab(tab)}
                    style={{ cursor: 'pointer' }}
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className={styles.timeFilters} style={{ background: 'none' }}>
                  {['1m', '5m', '15m', '1h', '4h', '1d', '1w'].map(t => (
                    <button key={t} className={`${styles.timeBtn} ${t === '1h' ? styles.timeBtnActive : ''}`}>{t}</button>
                  ))}
                </div>
                <Maximize2 size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              </div>
            </div>
            
            <div className={styles.chartWrapper}>
              {mounted && (
                <TradeChart data={candleData} />
              )}
            </div>




          </div>

          <div className={`card ${styles.positionsCard}`}>
            <div className={styles.chartTabs} style={{ marginBottom: 16 }}>
              {['Positions', 'Orders', 'History', 'Chat'].map(tab => (
                <span 
                  key={tab}
                  className={`${styles.chartTab} ${activeBottomTab === tab ? styles.chartTabActive : ''}`}
                  onClick={() => setActiveBottomTab(tab)}
                  style={{ cursor: 'pointer' }}
                >
                  {tab === 'Positions' ? 'Open Positions (2)' : tab}
                </span>
              ))}
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activeBottomTab === 'Chat' ? (
                <Chat />
              ) : activeBottomTab === 'Positions' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { pair: 'ETH-USDT', side: 'Short', size: '10.00', entry: '2,540', margin: '1,700.00', pnl: '-315.2 USDT', pnlPct: '-18.7%', color: 'var(--danger)' },
                    { pair: 'ETH-USDT', side: 'Long', size: '14.39', entry: '2,177', margin: '1,750.60', pnl: '+842.1 USDT', pnlPct: '+12.4%', color: 'var(--success)' },
                  ].map((pos, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#1c2127', borderRadius: '8px', border: '1px solid var(--card-border)', transition: 'transform 0.2s', cursor: 'pointer' }} className="hover:scale-[1.01]">
                      <div style={{ display: 'flex', gap: 24 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{pos.pair}</div>
                          <div style={{ fontSize: 11, color: pos.color }}>{pos.side} {pos.size}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Entry Price</div>
                          <div style={{ fontSize: 12 }}>{pos.entry}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Margin</div>
                          <div style={{ fontSize: 12 }}>{pos.margin}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Unrealized PNL</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: pos.color }}>{pos.pnl} ({pos.pnlPct})</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: 13 }}>
                  No {activeBottomTab.toLowerCase()} to display
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Book & Market Trades */}
        <div className={styles.orderBook}>
          <div className={`card`} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className={styles.chartTabs} style={{ marginBottom: 4 }}>
              {['Order Book', 'Market Trades'].map(tab => (
                <span 
                  key={tab}
                  className={`${styles.chartTab} ${activeBookTab === tab ? styles.chartTabActive : ''}`}
                  onClick={() => setActiveBookTab(tab)}
                  style={{ cursor: 'pointer', fontSize: 12 }}
                >
                  {tab}
                </span>
              ))}
            </div>

            {activeBookTab === 'Order Book' ? (
              <>
                <div className={styles.bookHeader}>
                  <div style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-muted)' }}>
                    <span>Precision</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#1c2127', padding: '2px 6px', borderRadius: 4 }}>
                      <span>0.01</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>
                <Table className={styles.bookTable}>
                  <TableHeader>
                    <TableRow className="border-none hover:bg-transparent">
                      <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px]">Price (USDT)</TableHead>
                      <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px] text-right">Size (ETH)</TableHead>
                      <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px] text-right">Sum (USDT)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ORDER_BOOK_ASKS.map((row, i) => (
                      <TableRow key={i} className="border-none hover:bg-[var(--glass)] relative group h-6 cursor-pointer">
                        <TableCell className="py-1 text-[var(--danger)] text-[11px] z-10">{row.price}</TableCell>
                        <TableCell className="py-1 text-right text-[11px] z-10">{row.size}</TableCell>
                        <TableCell className="py-1 text-right text-[11px] z-10">{row.sum}</TableCell>
                        <div 
                          className={styles.depthBar} 
                          style={{ 
                            width: `${row.depth}%`, 
                            background: 'var(--danger)',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 0,
                            opacity: 0.1,
                            pointerEvents: 'none'
                          }} 
                        />
                      </TableRow>
                    ))}
                    <TableRow className="border-none hover:bg-transparent">
                      <TableCell colSpan={3} className="py-4 text-center">
                        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          {currentPrice.toFixed(2)}
                          <TrendingUp size={16} />
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Index: {(currentPrice - 0.05).toFixed(2)}</div>
                      </TableCell>
                    </TableRow>
                    {ORDER_BOOK_BIDS.map((row, i) => (
                      <TableRow key={i} className="border-none hover:bg-[var(--glass)] relative group h-6 cursor-pointer">
                        <TableCell className="py-1 text-[var(--success)] text-[11px] z-10">{row.price}</TableCell>
                        <TableCell className="py-1 text-right text-[11px] z-10">{row.size}</TableCell>
                        <TableCell className="py-1 text-right text-[11px] z-10">{row.sum}</TableCell>
                        <div 
                          className={styles.depthBar} 
                          style={{ 
                            width: `${row.depth}%`, 
                            background: 'var(--success)',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 0,
                            opacity: 0.1,
                            pointerEvents: 'none'
                          }} 
                        />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <Table className={styles.bookTable}>
                <TableHeader>
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px]">Price (USDT)</TableHead>
                    <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px] text-right">Size (ETH)</TableHead>
                    <TableHead className="h-8 text-[var(--text-muted)] font-medium text-[11px] text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MARKET_TRADES.map((trade, i) => (
                    <TableRow key={i} className="border-none hover:bg-[var(--glass)] h-6 cursor-pointer">
                      <TableCell className={`py-1 text-[11px] ${trade.side === 'buy' ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                        {trade.price}
                      </TableCell>
                      <TableCell className="py-1 text-right text-[11px]">{trade.size}</TableCell>
                      <TableCell className="py-1 text-right text-[11px] text-[var(--text-muted)]">{trade.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        {/* Trading Panel */}
        <div className={styles.tradingPanel}>
          <div className={styles.orderTypeToggle}>
            {['Isolated', 'Cross'].map(t => (
              <button 
                key={t}
                className={`${styles.typeBtn} ${marginType === t ? styles.typeBtnActive : ''}`}
                onClick={() => setMarginType(t)}
              >
                {t}
              </button>
            ))}
            <div style={{ width: 1, background: 'var(--card-border)', margin: '4px 0' }} />
            <button className={styles.typeBtn} style={{ color: 'var(--primary)' }}>{leverage}x</button>
          </div>

          <div className={styles.sideToggle}>
            <button 
              className={`${styles.sideBtn} ${side === 'Long' ? styles.longActive : ''}`}
              onClick={() => setSide('Long')}
            >
              Long
            </button>
            <button 
              className={`${styles.sideBtn} ${side === 'Short' ? styles.shortActive : ''}`}
              onClick={() => setSide('Short')}
            >
              Short
            </button>
          </div>

          <div className={styles.orderTypeToggle}>
            {['Market', 'Limit', 'Stop'].map(t => (
              <button 
                key={t}
                className={`${styles.typeBtn} ${orderType === t ? styles.typeBtnActive : ''}`}
                onClick={() => setOrderType(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className={styles.inputField}>
            <div className={styles.inputLabel}>
              <span>Order Price</span>
              <span>Limit</span>
            </div>
            <div className={styles.inputWrapper}>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>USDT</span>
            </div>
          </div>

          <div className={styles.inputField}>
            <div className={styles.inputLabel}>
              <span>Leverage</span>
              <span>{leverage}x</span>
            </div>
            <div className={styles.leverageSlider} onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const pct = Math.round((x / rect.width) * 100);
              setLeverage(Math.max(1, Math.min(125, pct)));
            }}>
              <div className={styles.sliderHandle} style={{ left: `${(leverage / 125) * 100}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)' }}>
              <span>1x</span>
              <span>25x</span>
              <span>50x</span>
              <span>75x</span>
              <span>100x</span>
              <span>125x</span>
            </div>
          </div>

          <div className={styles.inputField}>
            <div className={styles.inputLabel}>
              <span>Position Amount</span>
              <span>Available: 90,000 USDT</span>
            </div>
            <div className={styles.inputWrapper}>
              <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                USDT <ChevronDown size={12} />
              </div>
            </div>
          </div>

          <button 
            className={styles.placeOrderBtn}
            style={{ 
              background: side === 'Long' ? 'var(--success)' : 'var(--danger)',
              color: side === 'Long' ? '#000' : '#fff'
            }}
          >
            {side} ETH
          </button>

          <div className={styles.marginInfo}>
            <div className={styles.infoRow}>
              <span>Margin Balance</span>
              <span className={styles.infoValue}>101,200</span>
            </div>
            <div className={styles.infoRow}>
              <span>USDT Wallet balance</span>
              <span className={styles.infoValue}>100,000</span>
            </div>
            <div className={styles.infoRow}>
              <span>Unrealized PNL</span>
              <span className={styles.infoValue} style={{ color: 'var(--success)' }}>+8,000 / +12%</span>
            </div>
            <div className={styles.infoRow}>
              <span>Free Margin</span>
              <span className={styles.infoValue}>90,000 USDT</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

