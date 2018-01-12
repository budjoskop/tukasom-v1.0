window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (loop) { window.setTimeout(callback, 1000 / 60); };
})();

var c = document.getElementById('canvas');
    var $ = c.getContext('2d');
    var w = c.width = window.innerWidth;
    var h = c.height = window.innerHeight;
    var angle = .666;
    var max_s = w;
    run();

function run() {
  go();
  window.requestAnimFrame(run);
}

function go() {
  $.save();
  $.translate(w/2, h/2);
  $.lineWidth = 2;

  for (var i=0; i<3000; i++) {
    $.strokeStyle = 'hsla(0,5%, 5%, 0.4)';
    $.strokeRect(max_s/2, max_s/2, max_s, max_s);
    $.rotate(angle * Math.PI);
    $.scale(0.666, 0.666);
  }
  $.restore();
  angle += .666;

}
