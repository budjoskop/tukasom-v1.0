
var canv = document.getElementById('canvas'),
	$ = canv.getContext('2d'),
	_ = [], // tiles
	s = 700, // size:width x height =700

	 m = Math,
	 l = 40, // # of tiles (length)
	 n = 20; // # of circles
   m.r = m.random;
   canv.width = s;
   canv.height = s;
   $.fillStyle = '#000';
   $.lineWidth = 11;

// random 0..255
function x() {
	return m.floor(m.r()*255.9);
}

// tile class
function tile() {
	var a = m.r()*2;
	return {
		time: +new Date(), // time
		color: 'rgba('+x()+','+x()+','+x()+',', // color w/o alpha channel
		w: 0.1, // width
		l: (1+m.r())/3, // length
		s: a, // start position (depth)
		z: a, // current position (depth)
		r: m.r() // position (radial)
	};
}

// make tiles
for (var i=0; i<l; i++) _[i] = new tile();

// main
setInterval(function() {
	var time = +new Date(), // current time
		h = s/2, // give me half of size
		r = m.sqrt(s*h), // max radius
		p = 1/n; // step = 1 / # circles

	$.fillRect(0,0,s,s); // background

	for (var i=0; i<l; i++) {
		var a = _[i],
			d = (a.s + 0.0015*(time-a.time)) % 2; // 0.0015 - speed
		a.z = d - 1; // new position, start from -1
	}

	for (var o=p; o<=1; o+=p) { // depth and opacity
		for (var i=0; i<l; i++) {
			if ((o>_[i].z) && (_[i].z+_[i].l>o)) {
				var a = _[i],
					e = 2*m.PI*a.r;
				$.strokeStyle = a.color+o+')'; // + opacity
				$.beginPath();
				$.arc(h,h,r*o,e,e-2*m.PI*a.w,true); // draw
				$.stroke();
			}
		}
	}
}, 1000/35); // max 35 FPS
