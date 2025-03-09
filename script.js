const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Загрузка сообщений из localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
    });
    chatBox.scrollTop = chatBox.scrollHeight; // Прокрутить вниз
}

// Сохранение сообщения в localStorage
function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Отправка сообщения
sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = `Вы: ${message}`;
        chatBox.appendChild(messageElement);
        saveMessage(`Вы: ${message}`); // Сохраняем сообщение
        chatInput.value = ''; // Очистить поле ввода
        chatBox.scrollTop = chatBox.scrollHeight; // Прокрутить вниз
    }
});

// Обработка нажатия Enter
chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendBtn.click(); // Отправить сообщение
    }
});

// Загружаем сообщения при загрузке страницы
loadMessages();
