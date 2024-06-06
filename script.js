let nickname = '';

function setNickname() {
    const nicknameInput = document.getElementById('nickname');
    nickname = nicknameInput.value.trim();

    if (!nickname) {
        alert('Please enter a nickname.');
        return;
    }

    document.getElementById('nickname-container').style.display = 'none';
    document.getElementById('chat-box').style.display = 'block';
}

function sendMessage() {
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    const messageElement = document.createElement('div');
    if (nickname.toLowerCase() === 'master') {
        messageElement.innerHTML = `<strong style="color: red;">Master:</strong> ${message}`;
    } else {
        messageElement.innerHTML = `<strong>${nickname}:</strong> ${message}`;
    }

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    messageInput.value = '';

    if (messagesDiv.children.length > 100) {
        messagesDiv.removeChild(messagesDiv.firstChild);
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
