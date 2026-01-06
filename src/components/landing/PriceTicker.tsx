import { motion } from 'framer-motion';

const prices = [
  { symbol: 'BTC', price: '$96,432.12', change: '+2.4%' },
  { symbol: 'ETH', price: '$2,743.89', change: '+1.8%' },
  { symbol: 'SOL', price: '$184.56', change: '+5.2%' },
  { symbol: 'BNB', price: '$612.34', change: '-0.4%' },
  { symbol: 'ARB', price: '$1.12', change: '+3.1%' },
  { symbol: 'OP', price: '$2.45', change: '+0.8%' },
  { symbol: 'MATIC', price: '$0.78', change: '-1.2%' },
  { symbol: 'LINK', price: '$18.90', change: '+4.5%' },
];

export const PriceTicker = () => {
  return (
    <div className="w-full bg-white/5 border-y border-white/5 py-2 overflow-hidden whitespace-nowrap relative">
      <motion.div
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="inline-flex gap-12"
        style={{ willChange: 'transform' }}
      >
        {[...prices, ...prices].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2 text-xs font-medium">
            <span className="text-white/40">{item.symbol}</span>
            <span className="text-white">{item.price}</span>
            <span className={item.change.startsWith('+') ? 'text-[#4fffa8]' : 'text-red-400'}>
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
    </div>
  );
};
