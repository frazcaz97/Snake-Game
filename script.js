const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const increment = 10; //size of each "space" on the canvas
let storeKey;
let randomNumber = function() {
  return Math.ceil((Math.random() * (canvas.width - 10)) / increment) * increment;
}
let snake = {
  x: randomNumber(),
  y: randomNumber(),
  colour: "#11ff00",
  xSpeed: 0,  //snake speed per update x axis
  ySpeed: 0,  //snake speed per update y axis
  size: 1,
  memory: [[0,0]] //snakes body x and y stored in 2d array per size
}

let apple = {
  x: randomNumber(),
  y: randomNumber(),
  colour: "#fc0324"
}

function draw() {
  //clear screen before drawing
  ctx.clearRect(0,0,canvas.width,canvas.height);

  //draw canvas boundry
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.closePath();
  ctx.stroke();

  //draw snake on screen
  ctx.beginPath();
  ctx.fillStyle = snake.colour;
  for (let i = 0; i < snake.memory.length; i++) {
    ctx.rect(snake.memory[i][0], snake.memory[i][1], increment-1, increment-1);
  }
  ctx.closePath();
  ctx.fill();

  //draw apple on screen
  ctx.beginPath();
  ctx.fillStyle = apple.colour;
  ctx.rect(apple.x,apple.y,increment-1,increment-1);  //increment -1 creates a grid effect
  ctx.closePath();
  ctx.fill();
}

function update() {
  //update the snakes postion
  snake.x += snake.xSpeed;
  snake.y += snake.ySpeed;

  //update snake direction, snake can't reverse direction
  if (storeKey == "w" && snake.ySpeed === 0) {
      snake.xSpeed = 0;
      snake.ySpeed = -increment;
  }
  if (storeKey == "a" && snake.xSpeed === 0) {
      snake.xSpeed = -increment;
      snake.ySpeed = 0;
  }
  if (storeKey == "s" && snake.ySpeed === 0) {
      snake.xSpeed = 0;
      snake.ySpeed = increment;
  }
  if (storeKey == "d" && snake.xSpeed === 0) {
      snake.xSpeed = increment;
      snake.ySpeed = 0;
  }
  snake.memory.unshift([snake.x,snake.y]);
  if (snake.memory.length > snake.size) {
    snake.memory.pop();
  }

  //if snake eats apple, create new apple, update snake size
  if (snake.x === apple.x && snake.y === apple.y) {
    apple.x =  randomNumber();
    apple.y =  randomNumber();
    snake.size++;
  }

  //reset snake to default
  function resetSnake() {
    snake.memory = [];
    snake.size = 1;
    snake.x = randomNumber();
    snake.y = randomNumber();
  }

  //check if snake should reset
  if (snake.x > canvas.width || snake.y > canvas.height || snake.x < -10 || snake.y < -10) {
    resetSnake();
  }
  else if (snake.size > 1) {
    for (let n = 1; n < snake.memory.length; n++) {
      if (snake.x === snake.memory[n][0] && snake.y === snake.memory[n][1]) {
        resetSnake();
      }
    }
  }
}

function input() {
  document.addEventListener("keydown", function(event) {storeKey = event.key;});
}

const gameLoop = setInterval(function() {
  input();
  update();
  draw();
},100);
