let dotline;
(function() {
	if('ontouchstart' in window) {
		evnt_move = 'touchstart';
		evnt_end = 'touchend';
	} else {
		evnt_move = 'mousemove';
		evnt_end = 'mouseout';
	}

	let globalSize, mouseoff;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ori = {};

	function box_init(box) {
		ori.x = box.offsetLeft;
		ori.y = box.offsetTop;
		globalSize = Math.min(box.offsetWidth, box.offsetHeight);

		cvs.style.width = globalSize;
		cvs.style.height = globalSize;
		cvs.width = globalSize;
		cvs.height = globalSize;

		box.innerHTML = '';
		box.appendChild(cvs);
	}

	let dots = [];
	let line_dots = [];
	let dot_count = 12;
	let dot_color = '#09f';
	let dot_opacity = .4;
	function Dot(i, j) {
		this.size = globalSize / dot_count;
		this.x = this.size * i;
		this.y = this.size * j;
		this.opacity = dot_opacity;
	}
	Dot.prototype.update = function() {
		let dot = this;
		ctx.save();
			ctx.translate(this.x, this.y);
			ctx.beginPath();
				ctx.globalAlpha = this.opacity;
				ctx.arc(0, 0, 4, 0, 2 * Math.PI);
				ctx.fillStyle = dot_color;
				ctx.fill();
			ctx.closePath();
		ctx.restore();
	}
	dots.update = function() {
		this.map(function(dot) {
			dot.update();
		});

		line_dots.length = 0;
		dots.map(function(dot) {
			drawLine(dot, line_dots);
		});
	};
	line_dots.update = function() {
		this.map(function(dot) {
			ctx.save();
				ctx.beginPath();
					ctx.moveTo(line_dots.x, line_dots.y);
					ctx.lineTo(dot.x, dot.y);
				ctx.closePath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = dot_color;
				ctx.stroke();
			ctx.restore();
		});
	};

	function distance(a, b) {
		return Math.pow(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2), .5);
	}
	function drawLine(dot, pos) {
		if(distance(dot, pos) < dot.size * 1.8) {
			line_dots.push(dot);
			dot.opacity = 1;
		} else {
			dot.opacity = dot_opacity;
		}
	}
	function back_to(x, y) {
		if(mouseoff) {
			line_dots.x = (line_dots.x - x) * .9 + x;
			line_dots.y = (line_dots.y - y) * .9 + y;

			window.requestAnimationFrame(function() {
				if(Math.abs(x - line_dots.x) >= 2 || Math.abs(y - line_dots.y) >= 2) {
					back_to(x, y);
				} else {
					line_dots.x = x;
					line_dots.y = y;
				}
				update();
			});
		}
	}

	cvs.addEventListener(evnt_move, function(e) {
		line_dots.x = e.pageX - ori.x;
		line_dots.y = e.pageY - ori.y;
		// let x = e.pageX - ori.x;
		// let y = e.pageY - ori.y;
		// back_to(x, y);

		mouseoff = false;
		update();
	});

	cvs.addEventListener(evnt_end, function(e) {
		mouseoff = true;
		back_to(globalSize * .5, globalSize * .5);
	});

	dotline = function(id) {
		let box = document.getElementById(id);
		box_init(box);

		for(let i = 0; i <= dot_count; i++) {
			for(let j = 0; j <= dot_count; j++) {
				dots.push(new Dot(i, j));
				// new_dot(i, j);
			}
		}
		line_dots.x = globalSize * .5;
		line_dots.y = globalSize * .5;
		update();
	}

	function update() {
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, globalSize, globalSize);

		dots.update();
		line_dots.update();
	}

}());

dotline('dot-line');
