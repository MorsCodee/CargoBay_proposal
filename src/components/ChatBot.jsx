// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  PlaneTakeoff,
  Plane,
  Ship,
  Zap,
  AlertTriangle,
  FileText,
  Send,
  X,
  MessageCircle,
  Truck,
} from 'lucide-react';
import { askCargoBayAI } from '../services/aiEngine';

// Quick Chips Data
const CHIPS = [
  { label: 'Zurich → Dubai', prompt: 'How much to ship 100kg from Zurich to Dubai?', icon: PlaneTakeoff },
  { label: 'Pakistan → UK', prompt: 'Air freight price from Pakistan to UK for 100kg', icon: Plane },
  { label: 'China → USA', prompt: 'Sea freight cost from China to USA for 100kg', icon: Ship },
  { label: 'Fastest Way', prompt: 'What is the fastest way to ship cargo?', icon: Zap },
  { label: 'Route Delays', prompt: 'Are there any shipping route delays right now?', icon: AlertTriangle },
  { label: 'Customs Docs', prompt: 'What customs documents do I need for shipping?', icon: FileText },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: 'Hello! I’m your CargoBay shipping assistant. How can I help you with rates, routes, or customs today?',
      isRisk: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isBusy]);

  const formatContent = (text) => {
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    return { __html: formatted };
  };

  // CargoBay Knowledge Base Fallback Engine
  const getCargoBayResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('zurich') && q.includes('dubai')) {
      return {
        text: 'Air freight from **Zurich to Dubai** typically costs **CHF 5–15 per kg** with a delivery window of 1–3 days. For urgent shipments, our Rapid Response Trucking handles airport dispatch within an hour.',
        isRisk: false,
      };
    }

    if (q.includes('pakistan') && q.includes('uk')) {
      return {
        text: 'Standard air freight rates from **Pakistan to the UK** range from **CHF 5–15 per kg** (approx. $5.50–$16.50/kg). Transit time usually takes 3–5 business days.',
        isRisk: false,
      };
    }

    if (q.includes('china') && q.includes('usa') || q.includes('sea freight')) {
      return {
        text: 'Sea freight costs are estimated at **CHF 80–250 per CBM** for LCL, or **CHF 1,200–3,500** for a 20ft FCL container. Note: Red Sea / Suez canal routes currently face +10–14 days delay.',
        isRisk: true,
      };
    }

    if (q.includes('fastest')) {
      return {
        text: 'The fastest option is **Express Air Freight** combined with our **Rapid Response Trucking** (drivers available within 1 hour for door-to-ramp pickup).',
        isRisk: false,
      };
    }

    if (q.includes('delay') || q.includes('risk')) {
      return {
        text: '**Route Status Update:**\n• **Red Sea / Suez:** High Risk (+10–14 Days delay)\n• **Middle East Sea:** Moderate Risk (+5–7 Days delay)\n• **Air Cargo:** Safe & Direct (No major delays)',
        isRisk: true,
      };
    }

    if (q.includes('document') || q.includes('custom')) {
      return {
        text: 'Key shipping documents include:\n• **Air Waybill (AWB)** or **Bill of Lading**\n• **Commercial Invoice & Packing List**\n• **Customs Declarations:** E-Dec, Carnet ATA, or NCTS\n• **Letters of Credit** (if required for trade financing)',
        isRisk: false,
      };
    }

    return {
      text: 'Cargobay AG (Zurich Airport) provides multimodal freight forwarding across Air, Sea, Road, and Rail. How can I assist with your cargo details?',
      isRisk: false,
    };
  };

  const handleSend = async (text) => {
  if (!text.trim() || isBusy) return;

  const userMsg = { id: Date.now(), role: 'user', text: text.trim(), isRisk: false };

  // 1. Build updated history array including the new user message
  const updatedHistory = [...messages, userMsg];
  setMessages(updatedHistory);
  setInputValue('');
  setIsBusy(true);

  try {
    // 2. Call the updated API service function
    const aiResponseText = await askCargoBayAI(updatedHistory);

    const botMsg = {
      id: Date.now() + 1,
      role: 'assistant',
      text: aiResponseText,
      isRisk: false,
    };

    setMessages((prev) => [...prev, botMsg]);
  } catch (error) {
    console.error('AI error:', error);
    
    // Fallback if the API call fails
    const fallbackText = "I'm having trouble connecting to the network right now. Please try again in a moment.";
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: 'assistant',
        text: fallbackText,
        isRisk: false,
      },
    ]);
  } finally {
    setIsBusy(false);
  }
};

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: '#f97316',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chatbot Container */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 999,
            width: '360px',
            maxWidth: 'calc(100vw - 32px)',
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
          }}
        >
          {/* Header */}
          <header
            style={{
              padding: '12px 16px',
              background: '#1a73e8',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h1 style={{ fontSize: '15px', fontWeight: '700', margin: 0, letterSpacing: '0.3px' }}>
                CargoBay Assistant
              </h1>
              <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '2px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#4ade80',
                    marginRight: '6px',
                  }}
                />
                Zurich Airport • Swiss Logistics
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}
            >
              <X size={18} />
            </button>
          </header>

          {/* Chat Feed */}
          <div
            ref={feedRef}
            style={{
              flex: 1,
              padding: '12px',
              overflowY: 'auto',
              background: '#f9fafb',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    lineHeight: '1.45',
                    background: msg.role === 'user' ? '#1a73e8' : '#e5e7eb',
                    color: msg.role === 'user' ? '#fff' : '#1f2937',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.isRisk && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontWeight: '600',
                        color: '#dc2626',
                        fontSize: '11px',
                        marginBottom: '4px',
                      }}
                    >
                      <AlertTriangle size={13} /> Route Advisory Notice
                    </div>
                  )}
                  <div dangerouslySetInnerHTML={formatContent(msg.text)} />
                </div>
              </div>
            ))}
            {isBusy && (
              <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic', padding: '4px 8px' }}>
                CargoBay is typing...
              </div>
            )}
          </div>

          {/* Quick Chips Scroll Bar */}
          <div
            style={{
              padding: '6px 10px',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              borderTop: '1px solid #f3f4f6',
              background: '#ffffff',
              whiteSpace: 'nowrap',
            }}
          >
            {CHIPS.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <button
                  key={idx}
                  disabled={isBusy}
                  onClick={() => handleSend(chip.prompt)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '14px',
                    border: '1px solid #e5e7eb',
                    background: '#f8fafc',
                    color: '#374151',
                    fontSize: '11px',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={12} />
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            style={{
              display: 'flex',
              padding: '8px 10px',
              borderTop: '1px solid #e5e7eb',
              background: '#ffffff',
            }}
          >
            <input
              type="text"
              placeholder="Ask about rates, routes, docs..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isBusy}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '13px',
                marginRight: '6px',
              }}
            />
            <button
              type="submit"
              disabled={isBusy || !inputValue.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 12px',
                background: '#f97316',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                opacity: isBusy || !inputValue.trim() ? 0.5 : 1,
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}