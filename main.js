const chatBox = document.getElementById('chat-box');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');

function sendMessage() {
    const nickname = nicknameInput.value.trim();
    const password = passwordInput.value.trim();
    const message = messageInput.value.trim();

    if (!nickname || !message) {
        alert('Nickname and message are required!');
        return;
    }

    let userType = 'Player';
    let messageColor = 'blue';

    if (nickname === 'MASTER' && password === 'I LOSE') {
        userType = 'MASTER';
        messageColor = 'red';
    } else if (nickname === 'MASTER') {
        alert('Incorrect password for MASTER!');
        return;
    }

    const messageElement = document.createElement('div');
    messageElement.style.color = messageColor;
    messageElement.textContent = `${userType}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send message to the server
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userType, message })
    });

    messageInput.value = '';
}

function fetchMessages() {
    fetch('/messages')
        .then(response => response.json())
        .then(messages => {
            chatBox.innerHTML = '';
            messages.forEach(({ userType, message }) => {
                const messageElement = document.createElement('div');
                messageElement.style.color = userType === 'MASTER' ? 'red' : 'blue';
                messageElement.textContent = `${userType}: ${message}`;
                chatBox.appendChild(messageElement);
            });
            chatBox.scrollTop = chatBox.scrollHeight;
        });
}

setInterval(fetchMessages, 1000);
