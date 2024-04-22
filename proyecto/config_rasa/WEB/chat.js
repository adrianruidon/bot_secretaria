document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    const minimizeButton = document.getElementById('minimizeBtn');
    const minimizedIcon = document.getElementById('minimized-icon');
    const chatBox = document.getElementById('chatbox');
    const inputArea = document.querySelector('.input-area');
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('sendBtn');

    minimizeButton.addEventListener('click', function() {
        chatContainer.style.display = 'none';
        minimizedIcon.style.display = 'flex';
    });

    minimizedIcon.addEventListener('click', function() {
        chatContainer.style.display = 'flex';
        minimizedIcon.style.display = 'none';
    });

    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = inputField.value.trim();
        if (message) {
            appendMessage('Tú', message, 'user-message');
            inputField.value = '';

            fetch('http://localhost:5005/webhooks/rest/webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sender: 'user', message: message }),
            })
            .then(response => response.json())
            .then(messages => {
                messages.forEach(msg => {
                    appendMessage('Bot', msg.text, 'bot-message');
                });
            })
            .catch(error => console.error('Error fetching data:', error));
        }
    }

    function appendMessage(sender, text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${className}`;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});