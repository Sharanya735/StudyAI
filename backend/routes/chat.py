from fastapi import APIRouter
try:
    from backend.models.schemas import ChatRequest, ChatResponse
    from backend.services.gemini_service import get_gemini_response
except ImportError:
    from models.schemas import ChatRequest, ChatResponse
    from services.gemini_service import get_gemini_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat endpoint — always uses Google Gemini 2.5 Flash."""
    try:
        reply = get_gemini_response(request.message, request.history)
        return ChatResponse(reply=reply, model_used="Gemini 2.5 Flash")

    except Exception as e:
        print(f"Chat route error: {e}")
        return ChatResponse(
            reply="Sorry, I encountered an error. Please try again.",
            model_used="Gemini 2.5 Flash",
        )


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}
