const chatBox = document.getElementById('chat-box');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');
const nicknameContainer = document.getElementById('nickname-container');
const chatContainer = document.getElementById('chat-container');

let userType = 'Player';

function chooseNickname() {
    const nickname = nicknameInput.value;
    const password = passwordInput.value.trim();

    if (nickname === 'MASTER' && password !== 'I LOSE') {
        alert('Incorrect password for MASTER!');
        return;
    }

    userType = nickname;
    nicknameContainer.style.display = 'none';
    chatContainer.style.display = 'block';
    messageInput.focus();
}

function sendMessage() {
    const message = messageInput.value.trim();

    if (!message) {
        alert('Message cannot be empty!');
        return;
    }

    let messageColor = userType === 'MASTER' ? 'red' : 'blue';

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

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

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
