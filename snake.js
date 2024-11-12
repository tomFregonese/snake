const playground = document.querySelector(".playground");
const scoreElement = document.querySelector("#currentScoreValue");
const highScoreElement = document.querySelector("#higherScoreValue");

const gridSize = 20;

let foodX, foodY;
let snakeHeadX = 10, snakeHeadY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let gameOver = false;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = `${highScore}`;

const changeDirection = (event) => {
    if (event.key === "ArrowUp" && velocityY !== 1) {
        velocityY = -1;
        velocityX = 0;
        console.log("Snake is moving up");
    }
    if (event.key === "ArrowDown" && velocityY !== -1) {
        velocityY = 1;
        velocityX = 0;
        console.log("Snake is moving down");
    }
    if (event.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
        console.log("Snake is moving left");
    }
    if (event.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
        console.log("Snake is moving right");
    }
}

const loadANewFood = () => {
    foodX = Math.floor(Math.random() * gridSize) + 1;
    foodY = Math.floor(Math.random() * gridSize) + 1;
}


const initGame = () => {

    if (gameOver) {
        return handleGameOver();
    }

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeHeadX === foodX && snakeHeadY === foodY) {
        loadANewFood();
        snakeBody.push([snakeHeadX, snakeHeadY]);
        score += 1;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("highScore", highScore);
        scoreElement.innerText = `${score}`;
        highScoreElement.innerText = `${highScore}`;
    }

    // Check if the snake head is out of the playground.
    if(snakeHeadX < 1 || snakeHeadX > gridSize || snakeHeadY < 1 || snakeHeadY > gridSize) {
        gameOver = true;
    }

    // Loop that handle to snake body to follow the head.
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }

    snakeBody[0] = [snakeHeadX, snakeHeadY];

    snakeHeadY += velocityY;
    snakeHeadX += velocityX;

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="snake-body" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playground.innerHTML = htmlMarkup;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over");
    location.reload();
}

loadANewFood();
setIntervalId = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection);