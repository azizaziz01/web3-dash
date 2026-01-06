'use client';

import React from 'react';
import Link from 'next/link';

import { ArrowUpRight, ExternalLink } from 'lucide-react';

import dynamic from 'next/dynamic';

import { motion } from 'framer-motion';
import { Plus, Minus, Twitter, Github, Linkedin, Mail, ArrowLeft, ArrowRight, ArrowUpRight as ArrowIcon, Zap, Smile } from 'lucide-react';

import { TextReveal } from '@/components/ui/TextReveal';
import { PriceTicker } from '@/components/landing/PriceTicker';

const FloatingLines = dynamic(() => import('@/components/landing/FloatingLines'), { ssr: false });
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });
const DashboardPreview = dynamic(() => import('@/components/landing/DashboardPreview'), { ssr: false });

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

const floating = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulse = {
  animate: {
    boxShadow: [
      "0 0 0 0px rgba(79, 255, 168, 0)",
      "0 0 0 15px rgba(79, 255, 168, 0.1)",
      "0 0 0 0px rgba(79, 255, 168, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function LandingPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Outfit']  overflow-hidden relative">
      <div className="grain-overlay" />
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#4fffa8] blur-[150px] opacity-10 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#4fffa8] blur-[150px] opacity-10 rounded-full pointer-events-none" />

      <header className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 md:px-6 lg:px-16 transition-all duration-300 ${scrolled ? 'py-3 md:py-4 bg-black/80 backdrop-blur-lg border-b border-white/5' : 'py-4 md:py-6 bg-transparent'}`}>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 md:gap-4"
          >
            <div className="inline-flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 border border-white/10 rounded-[30px] text-xs md:text-sm font-medium">
              <span className="text-[#4fffa8]">*</span> Web3 dashboard
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fffa8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4fffa8]"></span>
              </span>
              Live Status
            </div>
          </motion.div>
        </div>
        <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
          <Link href="#" className=" no-underline text-[0.85rem] transition-colors hover:text-[#4fffa8] tracking-[0.5px]">About</Link>
          <Link href="#" className=" no-underline text-[0.85rem] transition-colors hover:text-[#4fffa8] tracking-[0.5px]">Products</Link>
          <Link href="#" className=" no-underline text-[0.85rem] transition-colors hover:text-[#4fffa8] tracking-[0.5px]">Solutions</Link>
          <Link href="#" className=" no-underline text-[0.85rem] transition-colors hover:text-[#4fffa8] tracking-[0.5px]">Company</Link>
        </nav>
        <div className="flex-1 flex justify-end items-center gap-3 md:gap-4">
          <Link href="/dashboard" className="hidden sm:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#4fffa8] text-black px-4 md:px-6 py-2 md:py-2.5 rounded-[20px] font-medium border border-[#4fffa8] cursor-pointer transition-all hover:bg-[#4fffa8]/90 text-[0.75rem] md:text-[0.85rem] shadow-[0_0_20px_rgba(79,255,168,0.2)]"
            >
              Launch App
            </motion.button>
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[72px] left-0 right-0 z-[99] bg-black/95 backdrop-blur-lg border-b border-white/5 md:hidden"
        >
          <nav className="flex flex-col px-6 py-6 gap-4">
            <Link href="#" className="text-white no-underline text-base transition-colors hover:text-[#4fffa8] py-2">About</Link>
            <Link href="#" className="text-white no-underline text-base transition-colors hover:text-[#4fffa8] py-2">Products</Link>
            <Link href="#" className="text-white no-underline text-base transition-colors hover:text-[#4fffa8] py-2">Solutions</Link>
            <Link href="#" className="text-white no-underline text-base transition-colors hover:text-[#4fffa8] py-2">Company</Link>
            <Link href="/dashboard" className="mt-4">
              <button className="w-full bg-[#4fffa8] text-black px-6 py-3 rounded-[20px] font-medium border border-[#4fffa8] transition-all hover:bg-[#4fffa8]/90 text-base shadow-[0_0_20px_rgba(79,255,168,0.2)]">
                Launch App
              </button>
            </Link>
          </nav>
        </motion.div>
      )}

      <main className="flex flex-col items-center justify-center min-h-screen text-center pt-24 md:pt-32 pb-16 px-8 relative z-[2]">
        {/* FloatingLines Background */}
        <div className="absolute inset-0 w-full h-full -z-[1] pointer-events-none">
          <FloatingLines 
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 15, 20]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
            linesGradient={['#4fffa8', '#2dd4bf', '#06b6d4']}
            mixBlendMode="screen"
          />
        </div>



        {/* Main Content */}
        <div className="relative z-[5] flex flex-col items-center text-center px-4">
          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-medium leading-[1.1] mb-4 md:mb-6 tracking-[-1px] md:tracking-[-2px] max-w-[1000px]">
            <TextReveal text="The Gateway to" type="word" delay={0.2} />
            <br />
            <TextReveal text="Institutional Capital" type="word" delay={0.4} />
          </h1>

          <div className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-[650px] leading-relaxed px-4">
            <TextReveal text="The sole gateway for institutional DeFi access. Join us to transform your institution's financial landscape" delay={0.6} />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.8 }}
                className="w-full sm:w-auto bg-[#4fffa8] text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-[0_0_30px_rgba(79,255,168,0.2)]"
              >
                Launch app
              </motion.button>
            </Link>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.9 }}
              className="hidden sm:flex w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full bg-white/5 border border-white/10 text-white items-center justify-center hover:bg-white/10 transition-all"
            >
              <ArrowIcon size={20} className="sm:w-6 sm:h-6 -rotate-45" />
            </motion.button>
          </div>
        </div>

     
      </main>

      <PriceTicker />

      {/* About Section */}
      <motion.section
        {...fadeInUp}
        className="py-12 md:py-16 lg:py-32 px-4 md:px-8 max-w-[1200px] mx-auto text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-white/10 rounded-[20px] text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-8 border border-white/10">
          <span>01</span> About <span className="text-[#4fffa8]">*</span> Web3 dashboard
        </div>
        <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.3] md:leading-[1.2] font-normal text-white">
          <TextReveal text="Our team" type="word" />
          <span className="inline-flex items-center justify-center bg-[#4fffa8] text-black px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
            +
          </span>
          <TextReveal text="has been creating" type="word" />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#1a1a1a",
              border: "1px solid #333",
              verticalAlign: "middle",
              transform: "translateY(-4px)",
              margin: "0 8px",
            }}
          >
            <Zap size={18} fill="#fff" />
          </span>
          <TextReveal text="a unique and powerful crypto and fintech product for" type="word" />
          <span className="inline-flex items-center justify-center bg-[#4fffa8] text-black px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
            <span style={{ color: "#4fffa8", marginRight: 6 }}>*</span>
            Web3 dashboard
          </span>
          <TextReveal text="5 years. A team of 20+" type="word" />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#fff",
              color: "#000",
              verticalAlign: "middle",
              transform: "translateY(-4px)",
              margin: "0 8px",
            }}
          >
            <Smile size={20} strokeWidth={2.5} />
          </span>
          <TextReveal text="people." type="word" />
        </h2>


        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-16 items-start"
        >
          {/* Card 1: Constant Monitoring */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ y: -10 }}
            className="flex flex-col group/card"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-[20px] md:rounded-[24px] h-[320px] md:h-[380px] relative overflow-hidden mb-4 md:mb-6 flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:border-[#4fffa8]/30 group-hover:shadow-[0_20px_50px_rgba(79,255,168,0.1)]">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              {/* UI Mockup Elements */}
              <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[120px] h-[120px] border border-[#4fffa8]/20 rounded-full flex items-center justify-center">
                <div className="w-[80px] h-[80px] border border-[#4fffa8]/40 rounded-full animate-pulse" />
              </div>
              <div className="absolute top-5 left-[30px] w-[60px] h-10 border border-white/10 rounded-lg bg-white/5" />
              <div className="absolute top-5 right-[30px] w-[60px] h-10 border border-white/10 rounded-lg bg-white/5" />
              
              {/* Center Asterisk with Glow */}
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-[#4fffa8] opacity-20" />
                <div className="text-[3rem] text-[#4fffa8] font-light relative">*</div>
              </div>

              {/* Bottom Pills */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                <div className="bg-[#4fffa8]/10 text-[#4fffa8] border border-[#4fffa8]/20 px-5 py-2 rounded-full font-medium text-[0.85rem]">Domain</div>
                <div className="bg-[#4fffa8]/10 text-[#4fffa8] border border-[#4fffa8]/20 px-5 py-2 rounded-full font-medium text-[0.85rem]">Website</div>
              </div>
            </div>
            <div className="px-2">
              <h3 className="text-[1.2rem] md:text-[1.4rem] font-medium text-white mb-2">Constant monitoring</h3>
              <p className="text-xs md:text-sm text-[#888] leading-relaxed">Monitor domains, websites, app stores and other platforms in real-time.</p>
            </div>
          </motion.div>

          {/* Card 2: AI-based Detection */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ y: -10 }}
            className="h-full group/card"
          >
            <div className="bg-[#4fffa8] px-6 py-5 mb-5 rounded-[24px] flex justify-between items-center font-semibold text-[1.1rem] text-black transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(79,255,168,0.4)]">
              <span>SHARE IT</span>
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                <ArrowIcon size={16} />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-[20px] md:rounded-[24px] min-h-[320px] md:min-h-[370px] flex flex-col items-center justify-center relative p-6 md:p-8 mb-4 md:mb-6 border border-white/10 transition-all duration-500 group-hover:border-[#4fffa8]/30 group-hover:shadow-[0_20px_50px_rgba(79,255,168,0.1)]">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#4fffa8] blur-[80px] opacity-10" />
              
              {/* Detective Figure */}
              <div className="flex flex-col items-center justify-center flex-1 relative z-10">
                <div className="text-[5rem] -mb-5 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">🎩</div>
                <div className="text-[4rem] text-[#4fffa8] font-light leading-[0.8] animate-pulse">*</div>
              </div>
              {/* Scam Badge */}
              <div className="bg-[#4fffa8] text-black px-8 py-3 rounded-full text-[0.9rem] font-bold mt-4 shadow-[0_0_20px_rgba(79,255,168,0.3)] relative z-10">Scam detected!</div>
            </div>
            <div className="px-2">
              <h3 className="text-[1.2rem] md:text-[1.4rem] font-medium text-white mb-2">AI-based detection</h3>
              <p className="text-xs md:text-sm text-[#888] leading-relaxed">Out of the box detection for phishing, brand infringement, scams and typosquat attacks.</p>
            </div>
          </motion.div>

          {/* Card 3: Automatic Triage */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ y: -10 }}
            className="flex flex-col group/card"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-[24px] h-[380px] relative overflow-hidden mb-6 flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:border-[#4fffa8]/30 group-hover:shadow-[0_20px_50px_rgba(79,255,168,0.1)]">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              {/* Circular Text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] animate-[spin_10s_linear_infinite]">
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                  <defs>
                    <path id="circlePath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
                  </defs>
                  <text fontSize="10" fill="#4fffa8" fillOpacity="0.4" letterSpacing="2">
                    <textPath href="#circlePath">
                      THREAT NEUTRALIZER • AUTO TRIAGE • REAL-TIME PROTECTION •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Center Asterisk with Glow */}
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-[#4fffa8] opacity-30" />
                <div className="text-[4rem] text-[#4fffa8] font-light relative z-10">*</div>
              </div>

              {/* Threat Pills */}
              <div className="absolute bottom-12 left-[15%] bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[0.75rem] text-[#888] -rotate-[15deg] backdrop-blur-md">Threat</div>
              <div className="absolute bottom-6 left-[35%] bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[0.75rem] text-[#888] rotate-[5deg] backdrop-blur-md">Threat</div>
              <div className="absolute bottom-[60px] right-[20%] bg-[#4fffa8]/10 border border-[#4fffa8]/20 px-5 py-2 rounded-full text-[0.75rem] text-[#4fffa8] -rotate-[5deg] backdrop-blur-md">Neutralized</div>
            </div>
            <div className="px-2">
              <h3 className="text-[1.2rem] md:text-[1.4rem] font-medium text-white mb-2">Automatic triage</h3>
              <p className="text-xs md:text-sm text-[#888] leading-relaxed">Neutralize threats without human intervention using our automated response system.</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>



      {/* Exchange Preview Section */}
      <motion.section
        {...fadeInUp}
        className="py-20 px-8 max-w-[1200px] mx-auto text-center"
      >
        <h2 className="text-[2rem] md:text-[3rem] leading-tight font-medium text-white mb-6">
          <TextReveal text="Your Favourite Crypto Exchange,&#10;Plus A Whole Lot More!" type="word" />
        </h2>
        <div className="text-[#888] max-w-[800px] mx-auto mb-16 text-lg">
          <TextReveal text="Discover everything you expect from your favorite crypto exchange, plus innovative tools and features designed to elevate your trading experience." type="word" />
        </div>

        <motion.div 
          variants={floating}
          animate="animate"
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[16/9] group"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="scale-[0.55] origin-top-left w-[181.8%] h-[181.8%] pointer-events-none select-none p-8">
              <DashboardPreview />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Trade Crypto Section */}
      <motion.section
        {...fadeInUp}
        className="py-20 px-8 max-w-[1200px] mx-auto"
      >
        <h2 className="text-[2rem] md:text-[2.5rem] leading-tight font-medium text-white mb-12 max-w-[600px]">
          <TextReveal text="Trade Crypto And Gain Exposure To Other Asset Classes." type="word" />
        </h2>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Row 1 */}
          {/* Card 1: Identity Verification */}
          <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 flex flex-col items-start hover:border-[#4fffa8]/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8] mb-6 group-hover:scale-110 transition-transform">
              <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
                <div className="w-2 h-1 border-l-2 border-b-2 border-current rotate-[-45deg] -mt-0.5" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Complete Identity Verification</h3>
            <p className="text-[#888] text-sm leading-relaxed mb-8">
              Complete your identity verification seamlessly to unlock full access to trading, withdrawals, and advanced account security features.
            </p>
            <button className="mt-auto px-6 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
              Verify
            </button>
          </motion.div>

          {/* Card 2: 2FA */}
          <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 flex flex-col items-start hover:border-[#4fffa8]/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8] mb-6 group-hover:scale-110 transition-transform">
              <div className="w-4 h-5 border-2 border-current rounded-sm flex items-center justify-center relative">
                <div className="absolute -top-1.5 w-3 h-3 border-t-2 border-l-2 border-r-2 border-current rounded-t-full" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">2-factor Authentication (2FA)</h3>
            <p className="text-[#888] text-sm leading-relaxed mb-8">
              Enable 2-Factor Authentication (2FA) to add an extra layer of security, ensuring your account stays safe from unauthorized access.
            </p>
            <button className="mt-auto px-6 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
              Enable
            </button>
          </motion.div>

          {/* Card 3: Start Trading */}
          <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 flex flex-col items-start hover:border-[#4fffa8]/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8] mb-6 group-hover:scale-110 transition-transform">
              <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
                <div className="w-2 h-1 border-l-2 border-b-2 border-current rotate-[-45deg] -mt-0.5" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Start Trading Instantly</h3>
            <p className="text-[#888] text-sm leading-relaxed mb-8">
              Buy crypto with just one click. Offering a fast, easy, and secure way to start trading digital assets immediately.
            </p>
            <button className="mt-auto px-6 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
              Buy Crypto
            </button>
          </motion.div>

          {/* Row 2 */}
          {/* Card 4: VIP Level */}
          <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5 flex flex-col hover:border-[#4fffa8]/30 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-white font-medium">
                <div className="w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs">V</div>
                VIP Lv. 0
              </div>
              <span className="text-xs text-[#4fffa8] cursor-pointer">View more &gt;</span>
            </div>
            <div className="flex justify-between text-xs text-[#888] mb-2">
              <span>Spot fee rate</span>
              <span>Futures fee rate</span>
            </div>
            <div className="flex justify-between text-sm text-white font-medium mb-6">
              <div className="flex gap-4">
                <span>0.22 %</span>
                <span>0.22 %</span>
              </div>
              <div className="flex gap-4">
                <span>0.02 %</span>
                <span>0.05 %</span>
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex justify-between text-xs text-[#888] mb-2">
                <span>KCS holdings</span>
                <span>1 of 2</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-[#4fffa8] rounded-full" />
              </div>
              <p className="text-[10px] text-[#666] mt-2">Increase your KCS holdings to upgrade next level.</p>
            </div>
          </motion.div>

          {/* Card 5: Wallet Balance */}
          <motion.div 
            variants={fadeInUp} 
            className="bg-[#4fffa8] p-6 rounded-3xl border border-white/5 flex flex-col relative overflow-hidden group"
          >
            <motion.div
              variants={pulse}
              animate="animate"
              className="absolute inset-0 rounded-3xl pointer-events-none"
            />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex gap-2 mb-6 relative z-10">
              <button className="px-3 py-1 bg-black/20 rounded text-xs font-medium hover:bg-black/30 transition-colors">Buy crypto</button>
              <button className="px-3 py-1 bg-black/20 rounded text-xs font-medium hover:bg-black/30 transition-colors">Deposit</button>
              <button className="px-3 py-1 bg-black/20 rounded text-xs font-medium hover:bg-black/30 transition-colors">Withdraw</button>
            </div>

            <div className="mt-auto relative z-10">
              <div className="text-xs text-white/70 mb-1">Total asset</div>
              <div className="text-2xl font-bold text-white mb-1">0.17554271 BTC</div>
              <div className="text-sm text-white/70">≈ $5,375.37 USD</div>
            </div>

            <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
              <span className="text-2xl">₿</span>
            </div>
          </motion.div>

          {/* Card 6: Deposit Methods */}
          <motion.div variants={fadeInUp} className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5 flex flex-col hover:border-[#4fffa8]/30 transition-colors">
            <h3 className="text-white font-medium mb-6">Deposit or buy crypto through these methods.</h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group/item">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8]">
                    <div className="w-4 h-3 bg-current rounded-sm" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Buy Crypto</div>
                    <div className="text-xs text-[#666]">Visa, Mastercard, etc.</div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[#666] group-hover/item:border-white/30 group-hover/item:text-white transition-all">
                  <span className="text-xs">→</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group/item">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8]">
                    <div className="w-4 h-4 rounded-full border-2 border-current" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Deposit</div>
                    <div className="text-xs text-[#666]">Deposit crypto directly</div>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[#666] group-hover/item:border-white/30 group-hover/item:text-white transition-all">
                  <span className="text-xs">→</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Bento Grid */}
      <motion.section
        {...fadeInUp}
        className="py-24 px-8 max-w-[1200px] mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-[20px] text-sm uppercase tracking-wider mb-8 border border-white/10">
          <span>02</span> Features
        </div>
        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.2] font-normal text-white mb-16">
          <TextReveal text="Advanced tools for" type="word" className="inline-block mr-3" />
          <span className="inline-flex items-center justify-center bg-[#1a1a1a] border border-[#333] text-white px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
             <TextReveal text="Modern" type="char" delay={0.5} />
          </span>
          <TextReveal text="traders." type="word" className="inline-block ml-3" delay={0.8} />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[600px]">
          {/* Large Feature 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 md:row-span-2 bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4fffa8] blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[#4fffa8]/20 flex items-center justify-center text-[#4fffa8] mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Analytics</h3>
              <p className="text-[#888] leading-relaxed mb-8 max-w-[300px]">
                Get deep insights into market trends with our proprietary AI models that track whale movements and social sentiment in real-time.
              </p>
              <div className="mt-auto">
                <div className="flex gap-2 mb-4">
                  <div className="h-1 w-12 bg-[#4fffa8] rounded-full" />
                  <div className="h-1 w-8 bg-white/10 rounded-full" />
                  <div className="h-1 w-8 bg-white/10 rounded-full" />
                </div>
                <span className="text-sm text-white/40">Real-time processing active</span>
              </div>
            </div>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group"
          >
            <div className="relative z-10 flex items-center justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Multi-Chain Support</h3>
                <p className="text-[#888] text-sm max-w-[200px]">Manage assets across 15+ EVM and non-EVM chains seamlessly.</p>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-[#1a1a1a] border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold">
                    {i === 4 ? '+12' : 'Ξ'}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Small Feature 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 bg-white/5 border border-white/10 rounded-[32px] p-8 relative overflow-hidden group"
          >
            <div className="relative z-10 flex items-center justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Alerts</h3>
                <p className="text-[#888] text-sm max-w-[200px]">Never miss a move with personalized price and volume notifications.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#4fffa8] transition-colors">
                <ArrowIcon size={20} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Roadmap Section */}
      <motion.section
        {...fadeInUp}
        className="py-16 md:py-32 px-8 max-w-[1200px] mx-auto text-left"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-[20px] text-sm uppercase tracking-wider mb-8 border border-white/10">
          <span>03</span> Roadmap
        </div>
        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.2] font-normal text-white">
          <TextReveal text="The future of" type="word" />
          <span className="inline-flex items-center justify-center bg-[#4fffa8] text-black px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
             <TextReveal text="Trading" type="char" delay={0.5} />
          </span>
          <TextReveal text="." type="char" delay={0.8} />
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 relative before:content-[''] before:absolute before:top-[7px] before:left-0 before:w-full before:h-[2px] before:bg-white/10 before:hidden lg:before:block"
        >
          {[
            { date: 'Q1 2026', title: 'Beta Launch', desc: 'Public beta launch with core portfolio and swap features.' },
            { date: 'Q2 2026', title: 'Pro Trading', desc: 'Institutional-grade trading tools and advanced charting.' },
            { date: 'Q3 2026', title: 'AI Analytics', desc: 'Predictive analytics and whale tracking system.' },
            { date: 'Q4 2026', title: 'Mobile App', desc: 'Native iOS and Android applications for trading on the go.' }
          ].map((item, i) => (
            <motion.div variants={fadeInUp} key={i} className="relative pt-8">
              <div className="w-4 h-4 bg-[#4fffa8] rounded-full absolute top-0 left-0 border-[3px] border-[#050505]" />
              <div className="text-[#4fffa8] font-semibold mb-2 text-sm">{item.date}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQ Section */}

      <div className='flex flex-col lg:flex-row w-full items-center justify-center mx-auto max-w-[1200px] gap-12'>
        <div className="w-full max-w-[400px] h-[400px] lg:h-[600px] relative pointer-events-none mt-8 lg:mt-0 order-2 lg:order-1">
          <Spline
            scene="https://prod.spline.design/Y1RACMlfues-TBhe/scene.splinecode"
          />
        </div>
        <motion.section
          {...fadeInUp}
          className="py-16 md:py-32 px-8 w-full lg:max-w-[600px] text-left order-1 lg:order-2"
        >
          <div className="flex flex-col justify-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-[20px] text-sm uppercase tracking-wider mb-8 border border-white/10">
                <span>04</span> FAQ
              </div>
              <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.2] font-normal text-white">
                <TextReveal text="Common" type="word" />
                <span className="inline-flex items-center justify-center bg-[#1a1a1a] border border-[#333] text-white px-3 h-10 rounded-lg text-base font-semibold mx-2 align-middle -translate-y-1">
                   <TextReveal text="Questions" type="char" delay={0.5} />
                </span>
                <TextReveal text="." type="char" delay={0.8} />
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { q: 'Is BlockTrade secure?', a: 'Yes, BlockTrade is a non-custodial platform. We never have access to your private keys or funds.' },
              { q: 'Which chains are supported?', a: 'We currently support Ethereum, Binance Smart Chain, Polygon, Arbitrum, and Optimism.' },
              { q: 'Are there any fees?', a: 'Portfolio tracking is free. We charge a small 0.1% fee on swaps to maintain the platform.' }
            ].map((item, i) => (
              <div key={i} className="border-b border-white/10 py-6 cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex justify-between items-center text-xl font-medium text-white">
                  {item.q}
                  {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-[#888] mt-4 leading-relaxed overflow-hidden"
                  >
                    {item.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Investors Section */}
      <motion.section
        {...fadeInUp}
        className="py-24 px-8  w-full flex flex-col items-center justify-center text-left"
      >
        {/* Top label */}
        <div className="flex items-left gap-4 mb-6">
          <span className="text-sm text-white/40">02</span>
          <div className="px-5 py-1.5 bg-white/10 rounded-full text-sm border border-white/10">
            Investors of <span className="text-[#4fffa8]">*</span> Web3 dashboard
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[2.2rem] leading-tight font-normal text-white mb-14">
          <TextReveal text="Our investors of" type="word" />
          <span className="text-white/80 mx-2">*</span>
          <TextReveal text="Web3 dashboard project" type="word" />
        </h2>

        {/* Carousel */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left arrow */}
          <button className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 transition">
            <ArrowLeft size={20} />
          </button>

          {/* Logos */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8"
        >
          {/* Logo 1 */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/60 cursor-pointer transition-colors hover:border-[#4fffa8]/50"
          >
            <span className="text-2xl">⛵</span>
          </motion.div>

          {/* Logo 2 */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/60 cursor-pointer transition-colors hover:border-[#4fffa8]/50"
          >
            <span className="text-2xl">❖</span>
          </motion.div>

          {/* Logo 3 */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/60 cursor-pointer transition-colors hover:border-[#4fffa8]/50"
          >
            <span className="text-2xl">🦅</span>
          </motion.div>

          {/* Active (Slice) */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.1 }}
            className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#4fffa8] flex items-center justify-center text-black relative shadow-[0_0_40px_rgba(79,255,168,0.35)] cursor-pointer"
          >
            <span className="text-xl font-extrabold tracking-tight rotate-[-5deg]">
              SLICE
            </span>
            <div className="absolute bottom-3 right-3 w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <ArrowIcon size={16} className="text-white" />
            </div>
          </motion.div>

          {/* Logo 4 */}
          <motion.div 
            variants={fadeInUp} 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-black border border-white/10 flex items-center justify-center text-white/70 cursor-pointer transition-colors hover:border-[#4fffa8]/50"
          >
            <span className="text-sm font-medium">Petal</span>
          </motion.div>
        </motion.div>

          {/* Right arrow */}
          <button className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 transition">
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.section>


      {/* CTA Section */}
      <motion.section
        {...fadeInUp}
        className="py-32 px-8 max-w-[1200px] mx-auto text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4fffa8] blur-[150px] opacity-5 rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-[3rem] md:text-[5rem] font-light leading-[1] mb-8 tracking-[-2px]">
            Ready to <span className="text-[#4fffa8]">elevate</span> your<br />
            trading experience?
          </h2>
          <p className="text-[#888] text-lg mb-12 max-w-[600px] mx-auto">
            Join 93m+ users and start managing your Web3 portfolio with professional-grade tools today.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#4fffa8] text-black px-10 py-4 rounded-full font-semibold text-lg shadow-[0_0_30px_rgba(79,255,168,0.3)]"
              >
                Get Started Now
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full font-semibold text-lg border border-white/10 text-white transition-colors"
            >
              View Documentation
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-20 pb-10 px-8 bg-[#020202]">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16"
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <div className="text-2xl font-bold tracking-widest text-[#4fffa8] uppercase mb-2">
              <TextReveal text="BlockTrade" type="char" />
            </div>
            <p className="text-[#888] leading-relaxed max-w-[300px]">Professional Web3 analytics and trading dashboard for the modern investor.</p>
            <div className="flex gap-4 mt-8">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#4fffa8] hover:border-[#4fffa8] hover:bg-[#4fffa8]/5 transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </motion.div>
          
          {[
            { title: 'Platform', links: ['Dashboard', 'Trade', 'Portfolio', 'Analytics'] },
            { title: 'Resources', links: ['Documentation', 'API Reference', 'Security', 'Terms of Use'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] }
          ].map((col, i) => (
            <motion.div variants={fadeInUp} key={i} className="[&>h4]:text-white [&>h4]:font-semibold [&>h4]:mb-6 [&>ul]:list-none [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-3 [&>ul>li>a]:text-[#888] [&>ul>li>a]:transition-all [&>ul>li>a:hover]:text-[#4fffa8] [&>ul>li>a:hover]:pl-1">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link, j) => (
                  <li key={j}><Link href="#">{link}</Link></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between text-[#666] text-sm">
          <div>© 2026 BlockTrade. All rights reserved.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#4fffa8] text-black flex items-center justify-center shadow-[0_0_20px_rgba(79,255,168,0.3)] z-[100] cursor-pointer hover:scale-110 transition-transform"
      >
        <ArrowIcon size={20} className="-rotate-90" />
      </motion.button>
    </div>
  );
}

