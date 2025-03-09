const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const chat = document.getElementById('chat');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

let username = '';

// Проверка, авторизован ли пользователь
function checkAuth() {
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername) {
        username = savedUsername;
        authForm.style.display = 'none'; // Скрываем форму авторизации
        chat.style.display = 'block'; // Показываем чат
        loadMessages(); // Загружаем сообщения
    }
}

// Авторизация
loginBtn.addEventListener('click', () => {
    const inputUsername = usernameInput.value.trim();
    if (inputUsername !== '') {
        username = inputUsername;
        localStorage.setItem('chatUsername', username); // Сохраняем ник
        authForm.style.display = 'none'; // Скрываем форму авторизации
        chat.style.display = 'block'; // Показываем чат
        loadMessages(); // Загружаем сообщения
    } else {
        alert('Введите ваш ник!');
    }
});

// Загрузка сообщений из localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    chatBox.innerHTML = ''; // Очистить чат перед загрузкой
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
        saveMessage(`${username}: ${message}`); // Сохраняем сообщение с ником
        chatInput.value = ''; // Очистить поле ввода
        loadMessages(); // Обновляем чат
    }
});

// Обработка нажатия Enter
chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendBtn.click(); // Отправить сообщение
    }
});


// Автоматическое обновление чата каждую секунду
setInterval(loadMessages, 1000);

// Проверяем авторизацию при загрузке страницы
checkAuth();

const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Выйти';
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('chatUsername');
    location.reload(); // Перезагрузить страницу
});
document.querySelector('.container').appendChild(logoutBtn);
