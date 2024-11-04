let blockDim = 20;

let canvasHeight = blockDim * 20;
let canvasWidth = blockDim * 20;

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

//snake
let snakeX = 10 * blockDim /2;
let snakeY = 20 * blockDim /2;

let snakeBody = [];

let snakeVelX = 0;
let snakeVelY = 0;

let foodX;
let foodY;

let gameOver = false;

document.addEventListener("DOMContentLoaded", function() {

  placeFood();

  document.addEventListener('keyup', function(event) {
    changeDirection(event);  
  });
  
  setInterval(update, 100)
});

function update()
{
  if(gameOver)
  {
    return;
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, blockDim, blockDim)

  //console.log('Snake :' , '(', snakeX ,',', snakeY , ')');

  if(snakeX == foodX && snakeY == foodY)
  {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length -1; i > 0; i--) {
    snakeBody[i][0] = snakeBody[i-1][0]
    snakeBody[i][1] = snakeBody[i-1][1]
  }
  if(snakeBody.length)
  {
    snakeBody[0] = [snakeX, snakeY]
  }

  ctx.fillStyle = "green";
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
    alert("Game Over!")
  }
  for (let index = 0; index < snakeBody.length; index++) {
    if(snakeX == snakeBody[index][0] && snakeY == snakeBody[index][1])
    {
      gameOver = true;
      alert("Game Over!")
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