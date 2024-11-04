let blockDim = 40;

let canvasHeight = blockDim * 20;
let canvasWidth = blockDim * 20;

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

//snake
let snakeX = 0;
let snakeY = 200;

let snakeBody = [];

let snakeVelX = 0;
let snakeVelY = 0;
//food 
let foodX;
let foodY;
let appleImage = new Image();
appleImage.src = 'apple.png'; // Assurez-vous que le chemin de l'image est correct

let gameOver = false;

//score
let score = 0;

document.addEventListener("DOMContentLoaded", function() {

  placeFood();

  document.addEventListener('keyup', function(event) {
    changeDirection(event);  
  });
  
  setInterval(update, 100)
});

function update() {
  if (gameOver) {
    return;
  }

  for (let y = 0; y < canvasHeight / blockDim; y++) {
    for (let x = 0; x < canvasWidth / blockDim; x++) {
      if ((x + y) % 2 === 0) {
        ctx.fillStyle = "#305A2A"; // Couleur pour les cases paires
      } else {
        ctx.fillStyle = "#456F47"; // Couleur pour les cases impaires
      }
      ctx.fillRect(x * blockDim, y * blockDim, blockDim, blockDim);
    }
  }

  ctx.drawImage(appleImage, foodX, foodY, blockDim, blockDim);
  // Vérifier si le serpent mange la nourriture
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]),
    score= score+1;
    document.getElementById("score").textContent = score;
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

  // Conditions de Game Over
  if (snakeX >= canvasWidth || snakeX < 0 || snakeY >= canvasHeight || snakeY < 0) {
    gameOver = true;
    alert("Game Over!");
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over!");
    }
  }
}


function placeFood() {
  foodX = Math.floor(Math.random() * 20) * blockDim;
  foodY = Math.floor(Math.random() * 20) * blockDim;
  
  console.log("Food: (", foodX,',', foodY ,')');
  console.log(snakeBody)
}

// Système direction
function changeDirection (event) {

  console.log("Pressed: ",event.key);

  if(event.key == "ArrowUp" && snakeVelY == 0)
  {
    snakeVelY = -1 * blockDim;
    snakeVelX = 0;
  }

  if(event.key == "ArrowDown" && snakeVelY == 0)
  {
    snakeVelY = 1 * blockDim;
    snakeVelX = 0;
  }

  if(event.key == "ArrowLeft" && snakeVelX == 0)
  {
    snakeVelX = -1 * blockDim;
    snakeVelY = 0;
  }

  if(event.key == "ArrowRight" && snakeVelX == 0)
  {
    snakeVelX = 1 * blockDim;
    snakeVelY = 0;
  }
  
}