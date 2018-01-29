var size = Math.min(window.innerWidth, window.innerHeight) / 50;
var angle = 0;
var iterator = 0;
var speed = 1.5;
var colors = [
  'rgb(19, 166, 144)',
  'rgb(145, 219, 207)',
  'rgb(235, 218, 204)'
];
var loopId, canvas, ctx;

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  //Get canvas & context
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  size = Math.min(window.innerWidth, window.innerHeight) / 50;
  //initialise animation
  startAnimation();
}

function animationLoop(timeStamp) {
  // 1 - Clear & resize
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  size = Math.min(window.innerWidth, window.innerHeight) / 50;
  // 2 Draw
  drawCat();
  // 3 Move
  updateTailAngle();
  // call again mainloop after 16.6ms (corresponds to 60 frames/second)
  id = requestAnimationFrame(animationLoop);
}

function startAnimation() {
  loopId = requestAnimationFrame(animationLoop);
}

function stopAnimation() {
  if (loopId) {
    cancelAnimationFrame(loopId);
  }
}

function drawCat() {
  drawBody();
  drawHead();
  drawTail();
}

function updateTailAngle() {
  iterator += speed;
  angle = Math.sin(iterator * Math.PI / 180) * 2.5;
  /*if (iterator >= 180 || iterator <= 0){
		speed = -speed;
	}*/
  size = $(window).width() / 40;
}

function drawBody() {

  ctx.save();

  ctx.translate(canvas.width / 2, canvas.height / 2);

  //cuerpo 1
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-5 * size, 12 * size);
  ctx.lineTo(12 * size, 12 * size);
  ctx.closePath();
  ctx.fillStyle = colors[2];
  ctx.fill();

  //cuerpo 2
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(12 * size, 12 * size);
  ctx.lineTo(10 * size, -5 * size);
  ctx.closePath();
  ctx.fillStyle = colors[0];
  ctx.fill();

  //cuerpo 3
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(10 * size, -5 * size);
  ctx.lineTo(3 * size, -14 * size);
  ctx.closePath();
  ctx.fillStyle = colors[1];
  ctx.fill();

  ctx.restore();
}

function drawHead() {

  ctx.save();

  ctx.translate(canvas.width / 2, canvas.height / 2);

  //cabeza
  ctx.beginPath();
  ctx.moveTo(1 * size, -8 * size);
  ctx.lineTo(-4 * size, -8 * size);
  ctx.lineTo(-6 * size, -15 * size);
  ctx.lineTo(4 * size, -15 * size);
  ctx.closePath();
  ctx.fillStyle = colors[1];
  ctx.fill();

  //nariz
  ctx.beginPath();
  ctx.moveTo(-2 * size, -10 * size);
  ctx.lineTo(-3 * size, -11 * size);
  ctx.lineTo(-1 * size, -11 * size);
  ctx.closePath();
  ctx.fillStyle = colors[0];
  ctx.fill();

  //oreja 1
  ctx.beginPath();
  ctx.moveTo(-3 * size, -15 * size);
  ctx.lineTo(-6 * size, -16 * size);
  ctx.lineTo(-4 * size, -20 * size);
  ctx.closePath();
  ctx.fillStyle = colors[0];
  ctx.fill();

  //oreja 2
  ctx.beginPath();
  ctx.moveTo(1 * size, -15 * size);
  ctx.lineTo(4 * size, -16 * size);
  ctx.lineTo(2 * size, -21 * size);
  ctx.closePath();
  ctx.fillStyle = colors[0];
  ctx.fill();

  //ojo 1
  ctx.beginPath();
  ctx.moveTo(-5 * size, -12 * size);
  ctx.lineTo(-3 * size, -12 * size);
  ctx.closePath();
  ctx.lineWidth = size * 0.2;
  ctx.strokeStyle = colors[0];
  ctx.stroke();

  //ojo 2
  ctx.beginPath();
  ctx.moveTo(-1 * size, -12 * size);
  ctx.lineTo(2 * size, -12 * size);
  ctx.closePath();
  ctx.lineWidth = size * 0.2;
  ctx.strokeStyle = colors[0];
  ctx.stroke();

  ctx.restore();
}

function drawTail() {

  ctx.save();

  ctx.translate(canvas.width / 2 + 12 * size, canvas.height / 2 + 12 * size);
  ctx.rotate(angle * Math.PI / 180);

  //cola 1
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(2 * size, -13 * size);
  ctx.lineTo(0, -13 * size);
  ctx.closePath();
  ctx.fillStyle = colors[0];
  ctx.fill();

  //cola 2
  ctx.beginPath();
  ctx.moveTo(0, -13 * size);
  ctx.lineTo(2 * size, -13 * size);
  ctx.lineTo(-2 * size, -19 * size);
  ctx.closePath();
  ctx.fillStyle = colors[0];
  ctx.fill();

  //cola 3
  ctx.beginPath();
  ctx.moveTo(-2 * size, -19 * size);
  ctx.lineTo(-1 * size, -17.5 * size);
  ctx.lineTo(2 * size, -23 * size);
  ctx.closePath();
  ctx.fillStyle = colors[1];
  ctx.fill();

  //cola 4
  ctx.beginPath();
  ctx.moveTo(2 * size, -23 * size);
  ctx.lineTo(3 * size, -19 * size);
  ctx.lineTo(1 * size, -21.2 * size);
  ctx.closePath();
  ctx.fillStyle = colors[1];
  ctx.fill();

  ctx.restore();
}
