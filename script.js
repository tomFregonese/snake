let blockDim = 40;

let canvasHeight = blockDim * 20;
let canvasWidth = blockDim * 20;

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

// Initialisation du score
let score = 0;
let highScore = localStorage.getItem("highScore") || 0; // Charger le meilleur score depuis le stockage local

document.getElementById("highScore").innerText = "TOP : " + highScore;

// Variables du serpent
let snakeX = 0;
let snakeY = 200;
let snakeBody = [];

let snakeVelX = 0;
let snakeVelY = 0;

// Nourriture
let foodX;
let foodY;
let appleImage = new Image();
appleImage.src = 'apple.png'; 

let gameOver = false;



document.addEventListener("DOMContentLoaded", function() {
  placeFood();

  document.addEventListener('keyup', function(event) {
    changeDirection(event);  
  });

  setInterval(update, 120);
});

function update() {
  if (gameOver) {
    return;
  }

  // Dessiner le fond en damier
  for (let y = 0; y < canvasHeight / blockDim; y++) {
    for (let x = 0; x < canvasWidth / blockDim; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? "#305A2A" : "#456F47";
      ctx.fillRect(x * blockDim, y * blockDim, blockDim, blockDim);
    }
  }

  // Dessiner la nourriture
  ctx.drawImage(appleImage, foodX, foodY, blockDim, blockDim);

  // Vérifier si le serpent mange la nourriture
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    score++;
    document.getElementById("currentScore").innerText = "Score : "+ score;

    if (score > highScore) {
      highScore = score;
      document.getElementById("highScore").innerText = "TOP : " + highScore;
      localStorage.setItem("highScore", highScore); // Enregistrer le meilleur score
    }

    placeFood();
  }

  // Déplacer le corps du serpent
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i][0] = snakeBody[i - 1][0];
    snakeBody[i][1] = snakeBody[i - 1][1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // Dessiner le serpent
  ctx.fillStyle = "#2FD326";
  snakeX += snakeVelX;
  snakeY += snakeVelY;
  ctx.fillRect(snakeX, snakeY, blockDim, blockDim);
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockDim, blockDim);
  }
  
  //Game Over Conditions
  if((snakeX > canvasWidth - 20 || snakeX < 0) || (snakeY > canvasHeight - 20 || snakeY < 0))
  {
    gameOver = true;
    alert("Game Over!");
    resetGame();
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over!");
      resetGame();
    }
  }
}

function resetGame() {
  // Réinitialiser le score et l'affichage
  score = 0;
  document.getElementById("currentScore").innerText = "Score : 0";

  // Réinitialiser la position du serpent
  snakeX = 0;
  snakeY = 200;
  snakeBody = [];
  snakeVelX = 0;
  snakeVelY = 0;
  gameOver = false;

  placeFood();
}

function placeFood() {
  foodX = Math.floor(Math.random() * 20) * blockDim;
  foodY = Math.floor(Math.random() * 20) * blockDim;
}

function changeDirection(event) {
  if (event.key === "ArrowUp" && snakeVelY === 0) {
    snakeVelY = -1 * blockDim;
    snakeVelX = 0;
  }
  if (event.key === "ArrowDown" && snakeVelY === 0) {
    snakeVelY = 1 * blockDim;
    snakeVelX = 0;
  }
  if (event.key === "ArrowLeft" && snakeVelX === 0) {
    snakeVelX = -1 * blockDim;
    snakeVelY = 0;
  }
  if (event.key === "ArrowRight" && snakeVelX === 0) {
    snakeVelX = 1 * blockDim;
    snakeVelY = 0;
  }
}
