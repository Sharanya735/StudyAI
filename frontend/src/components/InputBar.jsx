import React, { useState, useRef, useEffect } from 'react';

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function InputBar({ onSend, isLoading, initialValue = '' }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (initialValue) {
      setInput(initialValue);
      textareaRef.current?.focus();
    }
  }, [initialValue]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    autoResize();
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div className="input-area">
      <div className="input-container">
        <textarea
          ref={textareaRef}
          id="chat-input"
          className="input-textarea"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question or request a study guide..."
          disabled={isLoading}
          rows={1}
          aria-label="Message input"
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
      <p className="input-hint">
        Shift + Enter for a new line. Ask about any subject.
      </p>
    </div>
  );
}

export default InputBar;
