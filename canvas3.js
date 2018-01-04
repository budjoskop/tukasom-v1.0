window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

var c = document.getElementById("canvas");
var $=c.getContext("2d");

var W=c.width=window.innerWidth;
var H=c.height = window.innerHeight;

var wheels = [];
var grads = [];

var go = function(){
  for(var i = 0; i < 50; i++){
    wheels.push(new Wheel(Math.random()*W, Math.random()*H, Math.random()*10-5,Math.random()*10-5, Math.random()*20+20, Math.random()*255>>0,Math.random()*255>>0,Math.random()*255>>0));
  grads.push("rgba(" + 255 + "," + 255 + "," + 255 + ",");
  grads.push("rgba(" + 0 + "," + 0 + "," + 0 + ",");
  grads.push("rgba(" + wheels[i].r + "," + wheels[i].g + "," + wheels[i].b + ",");
  }
  run();
}
var run = function(){
  window.requestAnimFrame(run);
  draw();
}
var draw = function(){
  $.globalCompositeOperation = "source-over";
  $.fillStyle = "rgba(0, 0, 0, 0.5)";
  $.fillRect(0, 0, W, H);

  $.globalCompositeOperation = "lighter";

  for(i=0; i<wheels.length; i++){
    $.beginPath();
  var w = wheels[i];
    var gradblur = $.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.size);
        w.alpha += (w.toAlpha-w.alpha)/4.0;
        if(w.alpha > 1) w.alpha = 1;

    gradblur.addColorStop(0,grads[i*3+1]+(w.alpha)+")");
    gradblur.addColorStop(0.4,grads[i*3+1]+(w.alpha)+")");
    gradblur.addColorStop(0.65,grads[i*3+2]+(w.alpha*0.9)+")");
    gradblur.addColorStop(0.65,grads[i*3]+(w.alpha)+")");
    gradblur.addColorStop(0.75,grads[i*3]+(w.alpha)+")");
    gradblur.addColorStop(0.75,grads[i*3+2]+(w.alpha*0.9)+")");
    gradblur.addColorStop(1,grads[i*3+1]+(w.alpha)+")");
    w.toAlpha = 0;
    $.fillStyle = gradblur;
    $.arc(w.x, w.y, w.size, 0, Math.PI*2, false);
    $.fill();
    w.x += w.vx;
    w.y += w.vy;

    if(w.x < -20) w.x = W+20;
    if(w.y < -20) w.y = H+20;
    if(w.x > W+20) w.x = -20;
    if(w.y > H+20) w.y = -20;

  for (var j = i + 1; j < 50; j++) {
    spokes(w, wheels[j]);
  }
  }
}

var spokes = function(w1, w2){
  var dx = w2.x - w1.x;
  var dy = w2.y - w1.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  if(dist < 100){
    var grad = $.createLinearGradient(w1.x, w1.y, w2.x, w2.y);
    grad.addColorStop(0,'rgba('+w1.r+','+w1.g+','+w1.b+','+(1-dist/100)+')');
    grad.addColorStop(1,'rgba('+w2.r+','+w2.g+','+w2.b+','+(1-dist/100)+')');
    $.strokeStyle = grad;
    $.beginPath();
    $.moveTo(w1.x,w1.y);
    $.lineTo(w2.x,w2.y);
    $.closePath();
    $.stroke();
    w1.toAlpha += 0.1;
    w2.toAlpha += 0.1;
    var ax = dx * 0.0075;
    var ay = dy * 0.0075;
    w1.vx += ax / w1.size;
    w1.vy += ay / w1.size;
    w2.vx -= ax / w2.size;
    w2.vy -= ay / w2.size;
  }
}

var Wheel = function(x,y,vx,vy,size,r,g,b){
  this.r = r;
  this.g = g;
  this.b = b;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.toAlpha=0.0;
  this.alpha = 1.0;
}
window.addEventListener('resize', function(){
  c.width = W = window.innerWidth;
  c.height = H = window.innerHeight;
});
go();
