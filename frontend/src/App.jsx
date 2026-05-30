import React, { useState, useCallback } from 'react';
import axios from 'axios';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

const API_BASE = 'http://localhost:8000/api';

function genId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chipValue, setChipValue] = useState('');

  const handleSend = useCallback(
    async (userMessage) => {
      if (!userMessage.trim() || isLoading) return;

      const userMsg = {
        id: genId(),
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setChipValue('');

      try {
        const historyForApi = messages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await axios.post(`${API_BASE}/chat`, {
          message: userMessage,
          history: historyForApi,
        });

        const { reply } = response.data;

        const aiMsg = {
          id: genId(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMsg]);
      } catch (error) {
        console.error('Chat error:', error);
        const errMsg = {
          id: genId(),
          role: 'assistant',
          content:
            "Sorry, I couldn't process that. Please ensure your connection is stable and try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleChipClick = useCallback((text) => {
    setChipValue(text);
  }, []);

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-brand">
          <div className="header-logo" aria-hidden="true">🎓</div>
          <div>
            <div className="header-title">StudyAI</div>
            <div className="header-subtitle">Your Academic Assistant</div>
          </div>
        </div>

        <div className="model-badge-pill" title="Powered by Google Gemini 2.5 Flash">
          <span className="model-badge-dot" />
          <span>Gemini 2.5 Flash</span>
        </div>
      </header>

      {/* ── Chat Messages ── */}
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        onChipClick={handleChipClick}
      />

      {/* ── Input Bar ── */}
      <InputBar
        onSend={handleSend}
        isLoading={isLoading}
        initialValue={chipValue}
      />
    </div>
  );
}

export default App;
