let spiral;
(function() {
	if('ontouchstart' in window) {
		evnt_move = 'touchstart';
		evnt_end = 'touchend';
	} else {
		evnt_move = 'mousemove';
		evnt_end = 'mouseout';
	}

	let globalSize;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ori = {};

	function box_init(box) {
		box.innerHTML = '';

		ori.x = box.offsetLeft;
		ori.y = box.offsetTop;
		globalSize = Math.min(box.offsetWidth, box.offsetHeight);

		cvs.style.width = globalSize;
		cvs.style.height = globalSize;
		cvs.width = globalSize;
		cvs.height = globalSize;

		box.appendChild(cvs);
	}

	let rotate_spiral = {
		step: 1,
		radius: 0,
		clockwise: true,
		update() {
			if(this.clockwise) {
				this.radius += (1.3 / (2 * Math.PI) - (2 * Math.PI)) % (2 * Math.PI);
			} else {
				this.radius -= (1.3 / (2 * Math.PI)) % (2 * Math.PI);
			}
			ctx.save();
				ctx.translate(rotate_spiral.x, rotate_spiral.y);
				ctx.rotate(this.radius);
				ctx.beginPath();
					ctx.moveTo(0, 0);
					for(let i=0; i<600; i++) {
						let s_x = - Math.cos(i/(2 * Math.PI)) * i * i * .001;
						let s_y = Math.sin(i/(2 * Math.PI)) * i * i * .001;
						ctx.lineTo(s_x, s_y);
					}
					ctx.strokeStyle = '#000';
					ctx.stroke();
				ctx.closePath();
			ctx.restore();
		}
	}

	cvs.addEventListener(evnt_start, function(e) {
		rotate_spiral.clockwise = !rotate_spiral.clockwise;
	});

	spiral = function(id) {
		let box = document.getElementById(id);
		box_init(box);

		rotate_spiral.x = globalSize * .5;
		rotate_spiral.y = globalSize * .5;
		update();
	}

	function update() {
		ctx.fillStyle = 'rgba(48, 48, 48, .2)';
		ctx.fillRect(0, 0, globalSize, globalSize);

		rotate_spiral.update();

		window.requestAnimationFrame(update);
	}

}());

spiral('spiral');
