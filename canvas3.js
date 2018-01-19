var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
F = 0;
run();

function D() {
  F++;
  ctx.fillStyle = 'hsla(0,0%,95%,0.8)';
  ctx.fillRect(0, 0, w, h);
  for (i = 50; i--;) {
    t = F / -8 - i * 6;
    ctx.fillStyle = 'hsla(0, 0%, 5%,1)';
    E(-50 + i * Math.cos(t), 8 * i + 3 * Math.sin(t));
    E(125 + i * Math.cos(t), 4 * i + 3 * Math.sin(t));

  }
};
function E(a, b) {
  G(a, b);
  G(-a, b);
  G(-a, -b);
  G(a, -b);
  G(b, -a);
  G(-b, -a);
  G(-b, a);
  G(b, a);
}

function G(a, b) {
  ctx.beginPath();
  ctx.arc(w / 2 + a, h / 2 + b, 1, 0, Math.PI*2, false);
  ctx.fill();
}
window.addEventListener('resize',function(){
  c.width = w = window.innerWidth;
  c.height = h =  window.innerHeight;
}, false);
function run() {
  window.requestAnimationFrame(run);
  D();
}
