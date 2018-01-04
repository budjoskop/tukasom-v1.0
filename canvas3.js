window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(loop) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var fps = 30;

var Circle = function(_dir) {
  _dir = _dir || {};

  this._begin = _dir._begin;
  this._fin = this._begin;
  this._add = Math.PI * 4 / fps / 3;

  this.r = _dir.r;

  this.go();
};

Circle.prototype.go = function() {};

var Set = function() {
  this._c_ = [];
  this.go();
};

Set.prototype.go = function() {
  this.c = document.getElementById("canvas");

  this.$ = this.c.getContext("2d");

  this.c.width = window.innerWidth;
  this.c.height = window.innerHeight;

  for (var i = 1; i < 12; i++) {

    var _dir = {
      _begin: Math.PI * 2 / 12 * i,
      r: 25 * i
    };
    var _c = new Circle(_dir);
    this._c_.push(_c);

  }

  this.$.fillStyle = "hsla(0,0%,0%,1)";
  this.$.fillRect(0, 0, this.c.width, this.c.height);
  this.$.globalCompositeOperation = 'source-over';

};

Set.prototype.draw = function() {
  this.$.fillStyle = "hsla(0,0%,5%,.1)";
  this.$.fillRect(0, 0, this.c.width, this.c.height);
  this.$.lineWidth = 18;
  this.$.lineCap = 'round';

  for (var i in this._c_) {

    this.$.beginPath();
    this.$.strokeStyle = 'hsla(' + i + 12 + ',100%, 50%,1)';
    if (this._c_[i]._begin > Math.PI * 2) {
      this._c_[i]._begin = 0;
      this._c_[i]._fin = 0;
    } else {
      this._c_[i]._begin = this._c_[i]._fin;
      this._c_[i]._fin += this._c_[i]._add;
    }
    this.$.arc(this.c.width / 2, this.c.height / 2, this._c_[i].r, this._c_[i]._begin, this._c_[i]._fin, false);
    this.$.stroke();
    this.$.closePath();
  }

};

Set.prototype.ready = function() {
  var hc = this;
  setInterval(function() {
    hc.draw();
  }, fps);
};

var ready = new Set();
ready.ready();

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
});
