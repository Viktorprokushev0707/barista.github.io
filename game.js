const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Добавляем фон
const backgroundImg = new Image();
backgroundImg.src = 'fon.png';  // Укажите путь к изображению фона

const baristaImg = new Image();
baristaImg.src = 'barista.png';  // Изображение баристы

const itemsImg = {
    'сырник': 'syrnik.png',
    'кофе': 'coffee.png',
    'тост': 'toast.png',
    'купюра': 'money.png'
};

let barista = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 60,
    speed: 7
};

let items = [];
let score = 0;

document.addEventListener('keydown', moveBarista);

function moveBarista(e) {
    if (e.key === 'ArrowLeft' && barista.x > 0) {
        barista.x -= barista.speed;
    } else if (e.key === 'ArrowRight' && barista.x + barista.width < canvas.width) {
        barista.x += barista.speed;
    }
}

function createItem() {
    const types = ['сырник', 'кофе', 'тост', 'купюра'];
    const type = types[Math.floor(Math.random() * types.length)];
    const img = new Image();
    img.src = itemsImg[type];
    let item = {
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        img: img,
        speed: 2 + Math.random() * 2
    };
    items.push(item);
}

function updateItems() {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.y += item.speed;

        if (
            item.x < barista.x + barista.width &&
            item.x + item.width > barista.x &&
            item.y < barista.y + barista.height &&
            item.y + item.height > barista.y
        ) {
            items.splice(i, 1);
            score += 1;
            document.getElementById('score').innerText = 'Счёт: ' + score;
        } else if (item.y > canvas.height) {
            items.splice(i, 1);
        }
    }
}

function drawBarista() {
    ctx.drawImage(baristaImg, barista.x, barista.y, barista.width, barista.height);
}

function drawItems() {
    for (const item of items) {
        ctx.drawImage(item.img, item.x, item.y, item.width, item.height);
    }
}

function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height); // Отрисовка фона
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Очистка канваса перед отрисовкой
    drawBackground();  // Отрисовываем фон
    drawBarista();     // Отрисовываем баристу
    drawItems();       // Отрисовываем предметы
    updateItems();     // Обновляем позиции предметов
    requestAnimationFrame(gameLoop);
}

// Запуск игры после загрузки изображений
window.onload = function() {
    backgroundImg.onload = () => {
        baristaImg.onload = () => {
            setInterval(createItem, 1000);  // Создание нового предмета каждую секунду
            gameLoop();
        };
    };
};