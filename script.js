function sendMessage() {
    var nickname = document.getElementById("nickname").value;
    var message = document.getElementById("message").value;
    if (nickname && message) {
        var formattedMessage = nickname + ": " + message;
        document.getElementById("chat-box").innerHTML += "<p>" + formattedMessage + "</p>";
    } else {
        alert("Please enter both a nickname and a message.");
    }
}
