'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Rocket, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AffiliatePage() {
  return (
    <MainLayout>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{ 
          width: 80, 
          height: 80, 
          borderRadius: '24px', 
          background: 'var(--primary-glow)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: 24,
          color: 'var(--primary)'
        }}>
          <Rocket size={40} />
        </div>
        
        <h1 className="outfit" style={{ fontSize: 32, marginBottom: 12 }}>Affiliate Program</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 400, marginBottom: 32, lineHeight: 1.6 }}>
          Our referral program is currently under development. Soon you'll be able to earn rewards by inviting your friends to the platform.
        </p>
        
        <div className="card" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12, 
          padding: '12px 24px',
          background: 'rgba(255, 255, 255, 0.02)',
          marginBottom: 32
        }}>
          <Clock size={18} color="var(--primary)" />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Coming Q1 2024</span>
        </div>
        
        <Link href="/" className="btn-secondary">
          <ArrowLeft size={18} style={{ marginRight: 8 }} />
          Back to Dashboard
        </Link>
      </div>
    </MainLayout>
  );
}
