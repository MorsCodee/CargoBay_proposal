import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSendMessage, isBusy }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isBusy) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input"
        placeholder="Ask in simple words... (e.g., How much to ship 100kg from Pakistan to UK?)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isBusy}
        autoComplete="off"
      />
      <button type="submit" className="send-btn" disabled={isBusy || !inputValue.trim()}>
        Send <Send size={15} />
      </button>
    </form>
  );
}
