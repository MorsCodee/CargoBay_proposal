import { useState, useCallback } from 'react';
import { aiEngine } from '../services/aiEngine';

const INITIAL_GREETING = {
  id: 'init-1',
  role: 'assistant',
  text: `Hello & Welcome! 👋 I'm the <strong>CargoBay Assistant</strong> 🇨🇭\n\nI provide **simple & direct shipping answers**:\n\n• 💰 <strong>Freight Prices:</strong> Air, Sea & Road cost estimates worldwide\n• ⚡ <strong>Fastest Routes:</strong> Best way to ship your cargo quickly\n• ⚠️ <strong>Delay Alerts:</strong> Red Sea & Hormuz route warnings\n• 📋 <strong>Customs Help:</strong> Simple document checklist\n\n<em>Ask me anything in simple words: e.g., "How much to ship 100kg from Pakistan to UK?" or "Fastest route from China to USA?"</em>`,
  isRisk: false,
};

export function useChat() {
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [isBusy, setIsBusy] = useState(false);

  const sendMessage = useCallback((text) => {
    if (isBusy || !text || !text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      isRisk: false,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsBusy(true);

    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      const res = aiEngine.respond(text);
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: res.text,
        isRisk: res.isRisk,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsBusy(false);
    }, delay);
  }, [isBusy]);

  const clearMessages = useCallback(() => {
    setMessages([INITIAL_GREETING]);
  }, []);

  return {
    messages,
    isBusy,
    sendMessage,
    clearMessages,
  };
}
