import BackgroundCanvas from './components/BackgroundCanvas';
import Header from './components/Header';
import StatsRow from './components/StatsRow';
import RateStrip from './components/RateStrip';
import ChatFeed from './components/ChatFeed';
import QuickChips from './components/QuickChips';
import ChatInput from './components/ChatInput';
import Footer from './components/Footer';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, isBusy, sendMessage } = useChat();

  return (
    <div className="page">
      <BackgroundCanvas />

      <Header />

      <StatsRow />

      <div className="chat-card">
        <div className="card-header">
          <div className="bot-identity">
            <div className="bot-avatar">
              <div className="bot-avatar-inner">CB</div>
              <div className="bot-avatar-ring"></div>
            </div>
            <div>
              <div className="bot-name">
                CARGOBAY ASSISTANT
                <span style={{ fontSize: '0.9rem', marginLeft: '0.35rem' }}>🇨🇭</span>
              </div>
              <div className="bot-sub">Instant Prices · Easy Routes · Simple Delay Warnings</div>
            </div>
          </div>

          <div className="online-badge">
            <span className="pulse-dot"></span>
            Online &amp; Ready
          </div>
        </div>

        <RateStrip />

        <ChatFeed messages={messages} isBusy={isBusy} />

        <QuickChips onSelectChip={sendMessage} isBusy={isBusy} />

        <ChatInput onSendMessage={sendMessage} isBusy={isBusy} />
      </div>

      <Footer />
    </div>
  );
}