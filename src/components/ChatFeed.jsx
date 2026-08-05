import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ChatFeed({ messages, isBusy }) {
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isBusy]);

  const formatContent = (text) => {
    // Replace markdown bold/em and newlines safely
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    return { __html: formatted };
  };

  return (
    <div className="chat-feed" ref={feedRef}>
      {messages.map((msg) => (
        <div key={msg.id} className={`msg-row ${msg.role}`}>
          {msg.role === 'assistant' && (
            <div className="msg-avatar-sm">CB</div>
          )}
          <div className={`msg-bubble ${msg.isRisk ? 'is-risk' : ''}`}>
            {msg.isRisk && (
              <div className="risk-label">
                <AlertTriangle size={12} style={{ marginRight: '4px' }} />
                Route Delay Risk Detected
              </div>
            )}
            <div dangerouslySetInnerHTML={formatContent(msg.text)} />
          </div>
        </div>
      ))}

      {isBusy && (
        <div className="typing-row">
          <div className="msg-avatar-sm">CB</div>
          <div className="typing-bubble">
            <div className="td"></div>
            <div className="td"></div>
            <div className="td"></div>
          </div>
        </div>
      )}
    </div>
  );
}
