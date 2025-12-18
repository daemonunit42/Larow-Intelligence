Larow Intelligence Chat Interface
<div align="center"> <h3>A clean, minimalist AI chat interface with full-screen video background</h3>
https://img.shields.io/badge/interface-chat-blue
https://img.shields.io/badge/backend-flask-green
https://img.shields.io/badge/ai-openrouter-orange
https://img.shields.io/badge/design-responsive-purple

</div>
✨ Features
🎬 Full-screen video background with overlay

🎯 Minimalist UI design inspired by modern chat applications

✍️ Real-time typing effects for AI responses

📱 Responsive design that works on all devices

⏎ Enter-to-send functionality with visual feedback

🪟 Glass-morphism aesthetic with subtle blur effects

🟢 Online status indicator

🚀 Fast and lightweight

📸 Preview
<div align="center"> <img src="https://via.placeholder.com/800x450/1e1e2e/ffffff?text=Larow+Intelligence+Chat" alt="Chat Preview" width="600"/> </div>
🚀 Quick Start
Prerequisites
Python 3.8+

Flask

OpenRouter API key

Installation
Clone and navigate

bash
git clone https://github.com/yourusername/larow-intelligence.git
cd larow-intelligence
Set up virtual environment

bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies

bash
pip install -r requirements.txt
Configure environment

bash
cp .env.example .env
# Edit .env and add your OpenRouter API key
Run the application

bash
python app.py
Open in browser

text
http://localhost:5000
📁 Project Structure
text
larow-intelligence/
├── static/
│   ├── style.css      # Main stylesheet
│   └── script.js      # Frontend logic
├── templates/
│   └── index.html     # Main HTML template
├── .env.example       # Environment template
├── requirements.txt   # Python dependencies
├── app.py            # Flask backend
└── background.mp4    # Background video
🎨 Customization
Changing Colors
Edit style.css to modify the color scheme:

css
/* Primary colors */
.message.user .message-bubble {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}
Changing Background Video
Replace background.mp4 with your own video file (MP4 format recommended).

Adjusting Typing Speed
Modify the typing speed in script.js:

javascript
const speed = 20 + Math.random() * 30; // Adjust these values
🔧 API Configuration
The application uses OpenRouter AI. To configure:

Get an API key from OpenRouter

Add it to your .env file:

env
OPENROUTER_API_KEY=your_api_key_here
📱 Responsive Design
The interface automatically adjusts for:

Mobile devices (phones)

Tablets

Desktop computers

Various screen sizes

🛠️ Built With
Frontend: HTML5, CSS3, JavaScript (ES6+)

Backend: Flask (Python)

AI Integration: OpenRouter API

Styling: Custom CSS with glass-morphism effects

Icons: SVG inline icons

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgements
OpenRouter for AI API access

Flask for the web framework

Inter Font for typography

📞 Support
For support, please:

Check the Issues page

Create a new issue if your problem isn't already listed

<div align="center"> <p>Made with ❤️ for clean AI interfaces</p>
https://img.shields.io/github/stars/yourusername/larow-intelligence?style=social
https://img.shields.io/github/forks/yourusername/larow-intelligence?style=social

</div>
