# StudyAI - AI-Powered Academic Assistant

A full-stack AI chatbot supporting **Google Gemini 2.5 Flash**, built with FastAPI and React + Vite.

---



### 1. Backend Setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure API keys
# Edit backend/.env and add your keys:
#   OPENAI_API_KEY=sk-...
#   GEMINI_API_KEY=AIza...

# Run the server
uvicorn main:app --reload --port 8000
```



### 2. Frontend Setup

```bash
cd frontend

# Install Node dependencies (already done if you ran npm install)
npm install

# Start development server
npm run dev
```



---

##  Project Structure

```
AI-BOT/
├── backend/
│   ├── main.py                    # FastAPI app entry point
│   ├── routes/
│   │   └── chat.py                # POST /api/chat, GET /api/health
│   ├── services/
│   │   ├── openai_service.py      # GPT-4o integration
│   │   └── gemini_service.py      # Gemini 1.5 Flash integration
│   ├── models/
│   │   └── schemas.py             # Pydantic request/response models
│   ├── requirements.txt
│   └── .env                       # API keys (not committed to git)
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatWindow.jsx      # Scrollable message list
    │   │   ├── MessageBubble.jsx   # Individual message (with markdown)
    │   │   ├── InputBar.jsx        # Text input + send button
    │   │   └── ModelToggle.jsx     # OpenAI / Gemini toggle
    │   ├── App.jsx                 # Root state manager
    │   ├── main.jsx                # React entry point
    │   └── index.css               # Full design system
    └── index.html
```

---

##  API Keys


- **Google Gemini**: https://aistudio.google.com/app/apikey

---

##  Features

- Real-time switching between GPT-4o and Gemini 1.5 Flash
- Full conversation history (last 10 messages sent to API)
- Markdown rendering for AI responses (code blocks, bullets, tables)
- Typing indicator while AI responds
- Dark premium UI with glassmorphism and animations
- Suggestion chips on the welcome screen
- Accessible ARIA roles and labels
