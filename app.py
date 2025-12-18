from flask import Flask, request, jsonify, render_template, send_from_directory
import requests
import os
import time
import random
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable CORS for all routes

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = "mistralai/mistral-7b-instruct:free"

# Rate limiting storage
request_timestamps = []

SYSTEM_PROMPT = """You are Larow, an AI assistant with a friendly and helpful personality.
You're kind, smart, and creative. Speak in a warm, engaging way.
Keep responses concise and natural. Be genuinely helpful."""

# Fallback responses when API fails
FALLBACK_RESPONSES = [
    "I'm here to help! What would you like to chat about?",
    "Let's continue our conversation! What's on your mind?",
    "That's interesting! Tell me more about that.",
    "I'm listening! How can I assist you further?",
    "Thanks for sharing! What else would you like to discuss?",
    "I understand. How can I help you with that?",
    "Great point! Let me know if you need any assistance.",
    "I'm here to help with anything you need!",
    "What a wonderful question! Let's explore that together.",
    "I appreciate your message! How can I be of service?"
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    global request_timestamps
    
    # Simple rate limiting (max 3 requests per 10 seconds)
    current_time = time.time()
    request_timestamps = [t for t in request_timestamps if current_time - t < 10]
    
    if len(request_timestamps) >= 3:
        # Rate limit exceeded - use fallback
        return jsonify({
            "reply": "I'm processing a lot of requests right now. Let me think for a moment..."
        })
    
    request_timestamps.append(current_time)
    
    user_input = request.json.get("message", "").strip()
    if not user_input:
        return jsonify({"reply": "Please send me a message!"})
    
    # Clean the input
    user_input = user_input[:500]  # Limit input length
    
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.7,
        "max_tokens": 300,
        "stream": False
    }
    
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "HTTP-Referer": "http://localhost:5000",
                "X-Title": "Larow Assistant",
                "Content-Type": "application/json"
            },
            json=payload,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            if "choices" in data and len(data["choices"]) > 0:
                reply = data["choices"][0]["message"]["content"].strip()
                if reply:
                    return jsonify({"reply": reply})
        
        # If we get here, something went wrong with the API
        # Use a fallback response
        fallback = random.choice(FALLBACK_RESPONSES)
        return jsonify({"reply": fallback})
        
    except requests.exceptions.Timeout:
        return jsonify({"reply": "I'm taking a bit longer to think. Please try again in a moment!"})
    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {str(e)}")
        # Use contextual fallback based on user input
        if "?" in user_input:
            fallback = "That's a great question! I'm having trouble connecting to my knowledge base right now. Could you ask me again in a moment?"
        else:
            fallback = random.choice(FALLBACK_RESPONSES)
        return jsonify({"reply": fallback})
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"reply": "I encountered an unexpected issue. Let's try that again!"})

# Serve the video
@app.route('/background.mp4')
def serve_video():
    return send_from_directory(directory='.', path='background.mp4')

# Health check endpoint
@app.route('/health')
def health():
    return jsonify({"status": "healthy", "service": "Larow AI"})

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')