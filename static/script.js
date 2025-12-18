// Simple chat application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chat application starting...');
    
    // Get DOM elements
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // Focus input on load
    userInput.focus();
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    // Enter key handler
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send message function
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Clear input
        userInput.value = '';
        
        // Add user message
        addMessage('user', message);
        
        // Show typing indicator
        showTyping(true);
        
        try {
            // Send to backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Hide typing indicator
            showTyping(false);
            
            // Check if we got a valid response
            if (data && data.reply) {
                // Add AI response with typing effect
                typeMessage('ai', data.reply);
            } else {
                // Fallback if no reply
                addMessage('ai', "I'm here! What would you like to talk about?");
            }
            
        } catch (error) {
            console.error('Error:', error);
            showTyping(false);
            
            // User-friendly error messages
            const errorMessages = [
                "I'm having trouble connecting right now. Can you try again?",
                "Let me catch my breath and try that again!",
                "Connection issue detected. Please send your message again.",
                "I'm here, just having a brief technical moment. Try again!"
            ];
            
            const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            addMessage('ai', randomError);
        }
    }
    
    // Add message immediately
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Escape HTML and preserve line breaks
        const safeText = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = `
            <div class="message-bubble">${safeText}</div>
            <div class="message-time">${time}</div>
        `;
        
        chatBox.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Type message with character-by-character effect
    function typeMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-bubble" id="typing-bubble"></div>
            <div class="message-time">${time}</div>
        `;
        
        chatBox.appendChild(messageDiv);
        
        const bubble = messageDiv.querySelector('#typing-bubble');
        let index = 0;
        
        function typeCharacter() {
            if (index < text.length) {
                const char = text.charAt(index);
                
                // Handle special characters
                if (char === '<') {
                    bubble.innerHTML += '&lt;';
                } else if (char === '>') {
                    bubble.innerHTML += '&gt;';
                } else if (char === '&') {
                    bubble.innerHTML += '&amp;';
                } else if (char === '\n') {
                    bubble.innerHTML += '<br>';
                } else {
                    bubble.innerHTML += char;
                }
                
                index++;
                
                // Random typing speed for natural feel
                const speed = 20 + Math.random() * 30;
                setTimeout(typeCharacter, speed);
                
                // Scroll to show new character
                scrollToBottom();
            }
        }
        
        // Start typing
        typeCharacter();
    }
    
    // Show/hide typing indicator
    function showTyping(show) {
        if (show) {
            typingIndicator.style.display = 'flex';
            typingIndicator.style.opacity = '0';
            
            // Fade in
            setTimeout(() => {
                typingIndicator.style.transition = 'opacity 0.3s';
                typingIndicator.style.opacity = '1';
            }, 10);
        } else {
            typingIndicator.style.opacity = '0';
            
            // Hide after fade out
            setTimeout(() => {
                typingIndicator.style.display = 'none';
            }, 300);
        }
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    // Test that everything is working
    console.log('Chat application ready!');
    console.log('Try typing a message and pressing Enter.');
    
    // Add some sample messages for testing
    setTimeout(() => {
        console.log('System: Ready to chat! Type a message and press Enter.');
    }, 1000);
});