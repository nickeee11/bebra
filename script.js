const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const keyboard = document.getElementById('keyboard');

// Обработка нажатия на клавиши клавиатуры
keyboard.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const key = event.target.getAttribute('data-key');
        if (key === 'backspace') {
            chatInput.value = chatInput.value.slice(0, -1); // Удалить последний символ
        } else if (key === 'space') {
            chatInput.value += ' '; // Добавить пробел
        } else {
            chatInput.value += key; // Добавить символ
        }
    }
});

// Отправка сообщения
sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = `Вы: ${message}`;
        chatBox.appendChild(messageElement);
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
