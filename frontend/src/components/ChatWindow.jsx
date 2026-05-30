import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

function TypingIndicator() {
  return (
    <div className="typing-indicator" aria-live="polite" aria-label="StudyAI is typing">
      <div className="avatar avatar-ai" aria-hidden="true">💡</div>
      <div className="typing-bubble">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-label">Thinking...</span>
      </div>
    </div>
  );
}

function WelcomeScreen({ onChipClick }) {
  const subjects = [
    {
      icon: '📐',
      title: 'Mathematics',
      desc: 'Step-by-step calculus, algebra, and geometry.',
      prompt: 'Can you walk me through the steps to solve a quadratic equation?'
    },
    {
      icon: '🧬',
      title: 'Sciences',
      desc: 'Physics, chemistry, and biology explained simply.',
      prompt: 'Explain the process of cellular respiration in simple terms.'
    },
    {
      icon: '📚',
      title: 'Humanities',
      desc: 'History analysis and literature essay help.',
      prompt: 'What were the main causes of the French Revolution?'
    },
    {
      icon: '💻',
      title: 'Computer Science',
      desc: 'Code review, algorithms, and debugging.',
      prompt: 'Write a Python function to perform a binary search and explain it.'
    }
  ];

  return (
    <div className="welcome-screen">
      <div className="welcome-icon" aria-hidden="true">📚</div>
      <h1 className="welcome-title">StudyAI</h1>
      <p className="welcome-subtitle">
        Your personal academic assistant. Select a subject below or ask any question to get started.
      </p>
      
      <div className="subjects-grid">
        {subjects.map((subj) => (
          <div 
            key={subj.title} 
            className="subject-card"
            onClick={() => onChipClick(subj.prompt)}
            role="button"
            tabIndex={0}
          >
            <div className="subject-icon">{subj.icon}</div>
            <div className="subject-info">
              <h3>{subj.title}</h3>
              <p>{subj.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatWindow({ messages, isLoading, onChipClick }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <main
      className="chat-window"
      id="chat-window"
      role="log"
      aria-live="polite"
      aria-label="Chat conversation"
    >
      {messages.length === 0 ? (
        <WelcomeScreen onChipClick={onChipClick} />
      ) : (
        messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
      )}

      {isLoading && <TypingIndicator />}

      <div ref={bottomRef} aria-hidden="true" />
    </main>
  );
}

export default ChatWindow;
