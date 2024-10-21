import { fetchCountryInfo } from './fetch.js';
import { Circle } from './circle.js';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Circle(900, 500, 30, 'blue');
const playerSpeed = 5;

// Static collision circles with country codes
const circles = [
    new Circle(650, 620, 80, 'transparent', 'BR'),  // Brazil
    new Circle(500, 270, 120, 'transparent', 'US'), // United States
    new Circle(1300, 380, 80, 'transparent', 'CN'), // China
    new Circle(1100, 230, 80, 'transparent', 'RU'), // Russia
    new Circle(1350, 180, 40, 'transparent', 'RU'), // Russia
    new Circle(1250, 180, 40, 'transparent', 'RU') // Russia
];

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

let collisionDetected = false;
let isPaused = false;

window.addEventListener('keydown', (event) => {
    if (event.key in keys && !isPaused) {
        keys[event.key] = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key in keys && !isPaused) {
        keys[event.key] = false;
    }
});

function checkCollisions() {
    let isColliding = false;

    circles.forEach(circle => {
        if (player.checkCollision(circle)) {
            isColliding = true;

            if (!collisionDetected) {
                collisionDetected = true;
                isPaused = true;
                keys.ArrowUp = keys.ArrowDown = keys.ArrowLeft = keys.ArrowRight = false;

                fetchCountryInfo(circle.countryCode)
                    .then((info) => {
                        if (info) {
                            alert(`Collision detected with ${info.name}!\nPopulation in ${info.year}: ${info.population.toLocaleString()}`);
                        } else {
                            alert("No data available for the selected country.");
                        }
                        isPaused = false;
                    })
                    .catch(() => {
                        alert("There was an error fetching the country data.");
                        isPaused = false;
                    });
            }
        }
    });

    if (!isColliding) {
        collisionDetected = false; // Reset collision detection
    }
}

function updatePlayerPosition() {
    if (!isPaused) {
        if (keys.ArrowUp) player.updatePosition(0, -playerSpeed);
        if (keys.ArrowDown) player.updatePosition(0, playerSpeed);
        if (keys.ArrowLeft) player.updatePosition(-playerSpeed, 0);
        if (keys.ArrowRight) player.updatePosition(playerSpeed, 0);

        checkCollisions();
    }
}

function drawAllCircles() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    circles.forEach(circle => circle.draw(context));
}

function gameLoop() {
    updatePlayerPosition();
    drawAllCircles();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawAllCircles();
});

gameLoop();
