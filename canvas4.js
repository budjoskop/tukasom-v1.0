window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var num = 8;
var mLn = num * 20;
var prevX = new Array(mLn);
var prevY = new Array(mLn);
var _xct = 0,
  _yct = 0,
  time = 0;
var _x = new Array(num);
var _y = new Array(num);
var x, y;

var c = document.getElementById('canvas');
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;

var draw = function() {
  ctx.clearRect(-c.width / 2, -c.height / 2, c.width, c.height);
  x.xd_();
  y.yd_();

  ctx.beginPath();
  ctx.fillStyle = 'hsla(0,0%,5%,.5)';
  ctx.arc((x.x += x.a), (y.y += y.b), 20, 0, 2 * Math.PI, true);
  ctx.fill();
  prevX[_xct] = x.x;
  prevY[_yct] = y.y;
  _xct++;
  _yct++;
  if (_xct == mLn) _xct = 0;
  if (_yct == mLn) _yct = 0;

  ctx.beginPath();
  ctx.moveTo(x.x, y.y);
  ctx.lineWidth = 15;
  ctx.strokeStyle = 'hsla(0,0%,5%,1)';
  ctx.lineTo(prevX[_x[1]], prevY[_y[1]]);
  ctx.stroke();
  for (var i = 0; i < num - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(prevX[_x[i]], prevY[_y[i]]);
    ctx.lineWidth = 5;
    ctx.lineTo(prevX[_x[i + 1]], prevY[_y[i + 1]]);
    ctx.stroke();
  }
  var a = [1 / 100];
  var colors = ['hsla(310, 95%, 55%, 1)',
    'hsla(232, 5%, 95%, 1)',
    'hsla(282, 95%, 15%, 1)',
    'hsla(214, 95%, 45%, 1)',
    'hsla(116, 95%, 45%, 1)',
    'hsla(52, 95%, 55%, 1)',
    'hsla(18, 95%, 45%, 1)',
    'hsla(0, 95%, 25%, 1)'
  ];
  for (var i = 0; i < num; i++) {
    for (i in colors) {
      _x[i]++;
      _y[i]++;
      if (_x[i] == mLn) _x[i] = 0;
      if (_y[i] == mLn) _y[i] = 0;

      //ring one (closests to inner circle)
      //shadow mimic
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(prevX[_x[i]] - 15, prevY[_y[i]] - 15, 31, 0, 2 * Math.PI, true);
      ctx.fillStyle = 'hsla(0,0%,0%,0.8)';
      ctx.fill();
      //color
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(prevX[_x[i]] - 15, prevY[_y[i]] - 15, 30, 0, 2 * Math.PI, true);
      ctx.fillStyle = colors[i];
      ctx.fill();

      //inner circle
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(prevX[_x[i]] - 15, prevY[_y[i]] - 15, 10, 0, 2 * Math.PI, true);
      ctx.fillStyle = 'hsla(0,5%,5%,1)';
      ctx.fill();

      //outer ring
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'hsla(0,0%,5%,.8)';
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(prevX[_x[i]] - 15, prevY[_y[i]] - 15, 88, 0, 2 * Math.PI, true);
      ctx.stroke();

      //second ring (closest to outer ring)
      //shadow mimic
      ctx.strokeStyle = 'hsla(0,0%,0%,0.8)';
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(prevX[_x[i]] - 15, prevY[_y[i]] - 15, 57, 0, 2 * Math.PI, true);
      ctx.stroke();
      //color
      ctx.strokeStyle = colors[i];
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(prevX[_x[i]] - 15, prevY[_y[i]] - 15, 55, 0, 2 * Math.PI, true);
      ctx.stroke();
    }
  }
};
var dry = function() {
  this.b = 0;
  this.bc;
  this.exY;
  this.pY;
  this.y = c.height;
};
dry.prototype.yd_ = function() {
  if (this.b >= 7) {
    this.b = 7;
  }
  if (this.b <= -7) {
    this.b = -7;
  }
  this.b += this.bc;
  if (this.bc > 0) {
    if (this.y >= this.pY) {
      do {
        this.pY = (Math.random() - 1) * 100;
        this.exY = this.pY - this.y;
      } while (Math.abs(this.exY) <= 7);
      this.bc = this.exY / 150;
    }
  }
  if (this.bc <= 0) {
    if (this.y <= this.pY) {
      do {
        this.pY = (Math.random() - 1) * 100;
        this.exY = this.pY - this.y;
      } while (Math.abs(this.exY) <= 7);
      this.bc = this.exY / 150;
    }
  }
};
var drx = function() {
  this.a = 0;
  this.ac;
  this.exX;
  this.pX;
  this.x = c.width;
};
drx.prototype.xd_ = function() {
  if (this.a >= 7) {
    this.a = 7;
  }
  if (this.a <= -7) {
    this.a = -7;
  }
  this.a += this.ac;
  if (this.ac > 0) {
    if (this.x >= this.pX) {
      do {
        this.pX = (Math.random() - 1) * 200;
        this.exX = this.pX - this.x;
      } while (Math.abs(this.exX) <= 20);
      this.ac = this.exX / 300;

    }
  }
  if (this.ac <= 0) {
    if (this.x <= this.pX) {
      do {
        this.pX = (Math.random() - 1) * 100;
        this.exX = this.pX - this.x;
      } while (Math.abs(this.exX) <= 20);
      this.ac = this.exX / 300;
    }
  }
};
var ready = function() {
  ctx.translate(w / 2, h / 2);
  for (var i = 0; i < mLn; i++) {
    prevX[i] = w;
    prevY[i] = h;
  }
  for (var i = 0; i < num; i++) {
    _x[i] = mLn - i * 25;
    _y[i] = mLn - i * 25;
  }
  x = new drx();
  y = new dry();
  x.pX = (Math.random() - 0.5) * 15;
  y.pY = (Math.random() - 0.5) * 15;
  x.exX = x.pX - x.x;
  y.exY = y.pY - y.y;
  x.ac = x.exX / 200;
  y.bc = y.exY / 200;
  run();
};

var run = function() {
  window.requestAnimFrame(run);
  draw();
}
ready();

/******

var key:
-----------
num: number of objects
mln: max line length
prevX: previous x position
prevY: previous y position
_xct: section length x pos
_yct: section length y pos
x, y : x && y positions
_x, _y: x && y object arrays

function key:
------------
function draw = draw scene
function xd_ = draw x pos
funtion yd_ = draw y pos
function drx = draw x object
function dry = draw y object
function ready = canvas setup
function run = animation loop

*******/
