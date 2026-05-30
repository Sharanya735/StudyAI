from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
    from backend.routes.chat import router as chat_router
except ImportError:
    from routes.chat import router as chat_router

app = FastAPI(
    title="AI Chatbot API",
    description="LLM-powered chatbot supporting OpenAI GPT-4o and Google Gemini",
    version="1.0.0",
)

# Enable CORS for the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(chat_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "AI Chatbot API is running. Visit /docs for API documentation."}
