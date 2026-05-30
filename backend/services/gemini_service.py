import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = (
    "You are StudyAI, an expert academic tutor and study assistant. "
    "Your goal is to help students understand concepts deeply, not just give them the answers. "
    "When explaining topics, use clear language, analogies, and step-by-step breakdowns. "
    "Use markdown formatting (bolding, lists, code blocks, tables) to make your explanations easy to read."
)


def get_gemini_response(message: str, history: list) -> str:
    """Call Google Gemini 1.5 Flash with conversation history."""
    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=SYSTEM_PROMPT,
        )

        # Convert history to Gemini contents format (last 10 messages)
        contents = []
        for msg in history[-10:]:
            role = "user" if msg.role == "user" else "model"
            contents.append({
                "role": role,
                "parts": [{"text": msg.content}]
            })

        # Add current user message
        contents.append({
            "role": "user",
            "parts": [{"text": message}]
        })

        response = model.generate_content(contents)
        return response.text

    except Exception as e:
        print(f"Gemini error: {e}")
        return "Sorry, I encountered an error with Gemini. Please try again."
