import React from 'react';

/**
 * ModelToggle — Tab UI to switch between OpenAI GPT-4o and Google Gemini.
 * @param {{ selectedModel: string, onModelChange: (model: string) => void }} props
 */
function ModelToggle({ selectedModel, onModelChange }) {
  const models = [
    { id: 'openai', label: 'GPT-4o', icon: '⚡' },
    { id: 'gemini', label: 'Gemini', icon: '✦' },
  ];

  return (
    <div className="model-toggle" role="tablist" aria-label="AI model selector">
      {models.map((model) => (
        <button
          key={model.id}
          id={`model-toggle-${model.id}`}
          role="tab"
          aria-selected={selectedModel === model.id}
          className={`model-toggle-btn ${model.id} ${selectedModel === model.id ? 'active' : ''}`}
          onClick={() => onModelChange(model.id)}
          title={`Switch to ${model.id === 'openai' ? 'OpenAI GPT-4o' : 'Google Gemini 1.5 Flash'}`}
        >
          <span className="model-toggle-dot" />
          <span>{model.icon}</span>
          <span>{model.label}</span>
        </button>
      ))}
    </div>
  );
}

export default ModelToggle;
