const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const messagesFile = path.join(__dirname, 'messages.json');

// Load messages from the file
let messages = [];
if (fs.existsSync(messagesFile)) {
    const data = fs.readFileSync(messagesFile);
    messages = JSON.parse(data);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/send', (req, res) => {
    const { userType, message } = req.body;
    messages.push({ userType, message });
    if (messages.length > 150) {
        messages.shift();
    }

    // Save messages to the file
    fs.writeFileSync(messagesFile, JSON.stringify(messages));

    io.emit('new_message', { userType, message });
    res.sendStatus(200);
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
