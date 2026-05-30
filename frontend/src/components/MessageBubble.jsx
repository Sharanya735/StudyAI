import React from 'react';
import ReactMarkdown from 'react-markdown';

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`message-wrapper ${message.role}`}>
      <div className="message-row">
        {!isUser && (
          <div className="avatar avatar-ai" aria-hidden="true">💡</div>
        )}

        <div
          className={`message-bubble ${message.role}`}
          aria-label={isUser ? 'Your message' : 'AI response'}
        >
          {isUser ? (
            <span>{message.content}</span>
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>

        {isUser && (
          <div className="avatar avatar-user" aria-hidden="true">S</div>
        )}
      </div>

      <div className="message-meta">
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}

export default MessageBubble;
