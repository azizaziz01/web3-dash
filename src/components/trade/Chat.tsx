'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import styles from '@/styles/Trade.module.css';

interface Message {
  id: number;
  username: string;
  text: string;
  timestamp: string;
  isMe?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, username: 'System', text: 'Welcome to the ETH-USDT Trollbox! Please be respectful.', timestamp: '14:00' },
  { id: 2, username: 'WhaleHunter', text: 'ETH looking bullish here 🚀', timestamp: '14:02' },
  { id: 3, username: 'CryptoKing', text: 'Resistance at 1700 is strong though.', timestamp: '14:03' },
  { id: 4, username: 'MoonBoy', text: 'Just went long 20x! LFG!', timestamp: '14:05' },
  { id: 5, username: 'AlphaTrader', text: 'Watch out for the funding rate flip.', timestamp: '14:06' },
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      username: 'You',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages} ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.message} style={{ opacity: msg.username === 'System' ? 0.7 : 1 }}>
            <div className={styles.messageHeader}>
              <span 
                className={styles.username} 
                style={{ 
                  color: msg.username === 'System' ? 'var(--text-muted)' : msg.isMe ? 'var(--primary)' : '#627EEA',
                  fontSize: msg.username === 'System' ? '11px' : '12px'
                }}
              >
                {msg.username}
              </span>
              <span className={styles.timestamp}>{msg.timestamp}</span>
            </div>
            <div 
              className={styles.messageText}
              style={{ 
                background: msg.username === 'System' ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
                borderLeft: msg.username === 'System' ? '2px solid var(--card-border)' : 'none',
                fontStyle: msg.username === 'System' ? 'italic' : 'normal',
                fontSize: msg.username === 'System' ? '12px' : '13px'
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input 
          type="text" 
          placeholder="Message..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className={styles.sendBtn} onClick={handleSend}>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

