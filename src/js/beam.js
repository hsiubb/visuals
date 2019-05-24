let beam;
(function() {
	if('ontouchstart' in window) {
		evnt_move = 'touchstart';
		evnt_end = 'touchend';
	} else {
		evnt_move = 'mousemove';
		evnt_end = 'mouseout';
	}

	const COLOR = ['#9ee', '#09f', '#f60', '#e99', '#e9e', '#ee9', '#99e', '#9e9'];
	let Pi = Math.PI;
	let lights = [];
	let light_len = 20;
	let STEP = 8;
	let globalSize, unitSize, stepSize;
	let radius_step = Pi * .5 * (1 / STEP);
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ori = {};

	function box_init(box) {
		ori.x = box.offsetLeft;
		ori.y = box.offsetTop;
		globalSize = Math.min(box.offsetWidth, box.offsetHeight);
		unitSize = globalSize * .1;
		stepSize = unitSize * (1 / STEP);

		cvs.style.width = globalSize;
		cvs.style.height = globalSize;
		cvs.width = globalSize;
		cvs.height = globalSize;

		box.innerHTML = '';
		box.appendChild(cvs);
	}

	class Beam {
		constructor() {
			this.reset();
		}
		reset() {
			this.x = Math.floor(Math.random() * 9 + .5) * unitSize;
			this.y = Math.floor(Math.random() * 9 + .5) * unitSize;
			this.dir = Math.floor(Math.random() * 4);
			this.turn = 0;
			this.step = 0;

			this.count();
		}
		count() {
			this.step++;
			if(this.turn) {
				this.curve();
			} else {
				this.straight();
			}

			if(this.step == STEP) {
				this.tar_x = (parseInt(this.x / unitSize) + .5) * unitSize;
				this.tar_y = (parseInt(this.y / unitSize) + .5) * unitSize;
				this.dir = (this.dir + 3 + Math.floor(Math.random() * 3)) % 4;
				this.turn = Math.floor(Math.random() * 2);
				this.step = 0;
			}
		}
		straight() {
			switch(this.dir) {
				case 1:
					this.tar_x = this.x;
					this.tar_y = this.y - stepSize;
					break;
				case 2:
					this.tar_x = this.x + stepSize;
					this.tar_y = this.y;
					break;
				case 3:
					this.tar_x = this.x;
					this.tar_y = this.y + stepSize;
					break;
				default:
					this.tar_x = this.x - stepSize;
					this.tar_y = this.y;
			}
		}
		curve() {
			let rad = radius_step * this.step;

			switch(this.dir) {
				case 0:
					rad -= (Pi * .5);
					break;
				case 2:
					rad += (Pi * .5);
					break;
				case 3:
					rad += Pi;
					break;
				default:;
			}

			let tar_x = (Math.cos(rad - radius_step) - Math.cos(rad)) * unitSize;
			let tar_y = (Math.sin(rad) - Math.sin(rad - radius_step)) * unitSize;

			this.tar_x = this.x + tar_x;
			this.tar_y = this.y + tar_y;
		}
		check() {
			if (
				this.x > globalSize ||
				this.y > globalSize ||
				this.x < 0 ||
				this.y < 0
			) {
				this.reset();
				if(lights.length < light_len) {
					setTimeout(function() {
						lights.push(new Beam());
					}, 599);
				}
			}
		}
		update() {
			ctx.save();
				ctx.beginPath();
					ctx.moveTo(this.x, this.y);
					ctx.lineTo(this.tar_x, this.tar_y);
					ctx.strokeStyle = '#09f';
					ctx.stroke();
				ctx.closePath();
			ctx.restore();

			this.x = this.tar_x;
			this.y = this.tar_y;

			this.count();
			this.check();
		}
	}

	beam = function(id) {
		let box = document.getElementById(id);
		box_init(box);

		ctx.fillStyle = '#333';
		ctx.fillRect(0, 0, globalSize, globalSize);

		lights.push(new Beam());

		update();
	}

	function update() {
		ctx.fillStyle = 'rgba(48, 48, 48, .1)';
		ctx.fillRect(0, 0, globalSize, globalSize);

		lights.map(function(light) {
			light.update();
		});

		window.requestAnimationFrame(update);
	}
}());

beam('beam');
