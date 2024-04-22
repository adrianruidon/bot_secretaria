document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    const minimizeButton = document.getElementById('minimizeBtn');
    const minimizedIcon = document.getElementById('minimized-icon');
    const chatBox = document.getElementById('chatbox');
    const inputArea = document.querySelector('.input-area');
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('sendBtn');

    // Configuración de Marked.js para habilitar enlaces y otras opciones
    const renderer = new marked.Renderer();
    renderer.link = function(href, title, text) {
        // Abrir enlaces en una nueva pestaña
        return `<a target="_blank" href="${href}" title="${title || ''}">${text}</a>`;
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        breaks: true,
        sanitize: false
    });

    // Evento para minimizar el chat
    minimizeButton.addEventListener('click', function() {
        chatContainer.style.display = 'none';
        minimizedIcon.style.display = 'flex';
    });

    // Evento para restaurar el chat
    minimizedIcon.addEventListener('click', function() {
        chatContainer.style.display = 'flex';
        minimizedIcon.style.display = 'none';
    });

    // Evento para enviar mensajes
    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    // Permite enviar mensajes con la tecla Enter
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Función para enviar mensajes
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
        messageDiv.innerHTML = marked.parse(text);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});