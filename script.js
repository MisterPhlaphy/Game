let nickname = '';

function setNickname() {
    const nicknameSelect = document.getElementById('nickname');
    const passwordInput = document.getElementById('password');
    nickname = nicknameSelect.value;

    if (nickname === 'Master') {
        passwordInput.style.display = 'block';
        const password = passwordInput.value.trim();
        if (password !== 'I LOSE') {
            alert('Incorrect password for Master.');
            return;
        }
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
    if (nickname === 'Master') {
        messageElement.innerHTML = `<strong style="color: red;">Master:</strong> ${message}`;
    } else {
        messageElement.innerHTML = `<strong style="color: blue;">Player:</strong> ${message}`;
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

document.getElementById('nickname').addEventListener('change', function() {
    const passwordInput = document.getElementById('password');
    if (this.value === 'Master') {
        passwordInput.style.display = 'block';
    } else {
        passwordInput.style.display = 'none';
    }
});
