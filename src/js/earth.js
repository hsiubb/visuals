let earth;
(function() {
	if('ontouchstart' in window) {
		evnt_move = 'touchstart';
		evnt_end = 'touchend';
	} else {
		evnt_move = 'mousemove';
		evnt_end = 'mouseout';
	}

    const COLOR = ['#9ee', '#09f', '#f60', '#e99', '#e9e', '#ee9', '#99e', '#9e9'];
    let world;
	let globalSize;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ori = {};

	var img = new Image();
	img.src = "./world.png";

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

	function drawEarth(unit, rotate) {
		ctx.save();
			ctx.translate(rotate, 7 * unit);
			ctx.beginPath();
				ctx.moveTo(unit * 4, unit * 4);
				ctx.lineTo(unit * 6, unit * 4);
				ctx.lineTo(unit * 7, unit * 5);
				ctx.lineTo(unit * 14, unit * 1);
				ctx.lineTo(unit * 15, unit * 3);
				ctx.lineTo(unit * 23, unit * 5);
				ctx.lineTo(unit * 15, unit * 14);
				ctx.lineTo(unit * 13, unit * 14);
				ctx.lineTo(unit * 12, unit * 13);
				ctx.lineTo(unit * 11, unit * 15);
				ctx.lineTo(unit * 10, unit * 13);
				ctx.lineTo(unit * 9, unit * 13);
				ctx.lineTo(unit * 4, unit * 20);
				ctx.lineTo(unit * 3, unit * 15);
				ctx.lineTo(unit * 1, unit * 15);
				ctx.lineTo(unit * 0, unit * 13.5);
				ctx.lineTo(unit * 4, unit * 4);

				ctx.moveTo(unit * 14.5, unit * 18);
				ctx.lineTo(unit * 15, unit * 20);
				ctx.lineTo(unit * 17, unit * 19.5);
				ctx.lineTo(unit * 19, unit * 21);
				ctx.lineTo(unit * 20, unit * 19);
				ctx.lineTo(unit * 17, unit * 17);

				ctx.moveTo(unit * 24, unit * 4.5);
				ctx.lineTo(unit * 25, unit * 4);
				ctx.lineTo(unit * 27, unit * 4.5);
				ctx.lineTo(unit * 31, unit * 0);
				ctx.lineTo(unit * 33, unit * 2);
				ctx.lineTo(unit * 34, unit * 0);
				ctx.lineTo(unit * 39, unit * 1.5);
				ctx.lineTo(unit * 39, unit * 5);
				ctx.lineTo(unit * 37, unit * 6);
				ctx.lineTo(unit * 34, unit * 12);
				ctx.lineTo(unit * 33, unit * 12);
				ctx.lineTo(unit * 32.5, unit * 13);
				ctx.lineTo(unit * 33, unit * 15);
				ctx.lineTo(unit * 29, unit * 12);
				ctx.lineTo(unit * 28, unit * 8);
				ctx.lineTo(unit * 27, unit * 7);
				ctx.lineTo(unit * 24, unit * 8);

				ctx.moveTo(unit * 33.5, unit * 15);
				ctx.lineTo(unit * 34.5, unit * 14);
				ctx.lineTo(unit * 39, unit * 16.5);
				ctx.lineTo(unit * 38, unit * 18.5);
				ctx.lineTo(unit * 34.5, unit * 23.5);
				ctx.lineTo(unit * 35.5, unit * 24.5);
				ctx.lineTo(unit * 34.5, unit * 24.5);
				ctx.lineTo(unit * 33.5, unit * 23.5);
				ctx.lineTo(unit * 34.5, unit * 18);
				ctx.lineTo(unit * 33, unit * 16);

				ctx.fillStyle = '#9e9';
				ctx.fill();
			ctx.closePath();

			ctx.fillStyle = '#fff';

			ctx.save();
				ctx.translate(rotate * .2, 0);
				ctx.beginPath();
					ctx.translate(unit * 16, unit * 16);
					ctx.arc(0, 0, unit, 0, Math.PI * 2);
					ctx.arc(1.5 * unit, 0, unit, 0, Math.PI * 2);
					ctx.fill();
				ctx.closePath();
			ctx.restore();

			ctx.save();
				ctx.translate(rotate * .15, 0);
				ctx.beginPath();
					ctx.translate(unit * 15, unit * 7);
					ctx.arc(0, 0, unit, 0, Math.PI * 2);
					ctx.arc(1.5 * unit, 0, unit, 0, Math.PI * 2);
					ctx.arc(.2 * unit, .8 * unit, unit, 0, Math.PI * 2);
					ctx.arc(2.4 * unit, unit, unit, 0, Math.PI * 2);
					ctx.arc(3 * unit, 2 * unit, unit, 0, Math.PI * 2);
					ctx.arc(1.1 * unit, 1.9 * unit, unit, 0, Math.PI * 2);
					ctx.fill();
				ctx.closePath();
			ctx.restore();

			ctx.save();
				ctx.translate(rotate * .25, 0);
				ctx.beginPath();
					ctx.translate(unit * 5, unit * 5);
					ctx.arc(0, 0, unit, 0, Math.PI * 2);
					ctx.arc(unit, unit, unit, 0, Math.PI * 2);
					ctx.arc(.2 * unit, .8 * unit, unit, 0, Math.PI * 2);
					ctx.arc(2 * unit, 2 * unit, unit, 0, Math.PI * 2);
					ctx.arc(1.1 * unit, 1.9 * unit, unit, 0, Math.PI * 2);
					ctx.fill();
				ctx.closePath();
			ctx.restore();

			ctx.save();
				ctx.translate(rotate * .2, 0);
				ctx.beginPath();
					ctx.translate(unit, unit * 22);
					ctx.arc(0, 0, unit, 0, Math.PI * 2);
					ctx.arc(unit, unit, unit, 0, Math.PI * 2);
					ctx.arc(.2 * unit, .8 * unit, unit, 0, Math.PI * 2);
					ctx.arc(2.4 * unit, unit, unit, 0, Math.PI * 2);
					ctx.arc(3 * unit, 2 * unit, unit, 0, Math.PI * 2);
					ctx.arc(1.1 * unit, 1.9 * unit, unit, 0, Math.PI * 2);
					ctx.fill();
				ctx.closePath();
			ctx.restore();

			ctx.save();
				ctx.translate(rotate * .15, 0);
				ctx.beginPath();
					ctx.translate(unit * 26, unit * 15);
					ctx.arc(0, 0, unit, 0, Math.PI * 2);
					ctx.arc(unit, unit, unit, 0, Math.PI * 2);
					ctx.arc(.2 * unit, .8 * unit, unit, 0, Math.PI * 2);
					ctx.arc(1.6 * unit, .2 * unit, unit, 0, Math.PI * 2);
					ctx.arc(3 * unit, 2 * unit, unit, 0, Math.PI * 2);
					ctx.arc(1.1 * unit, 1.9 * unit, unit, 0, Math.PI * 2);
					ctx.fill();
				ctx.closePath();
			ctx.restore();

			ctx.save();
				ctx.translate(rotate * .25, 0);
				ctx.beginPath();
					ctx.translate(unit * 30, unit * 4);
					ctx.arc(0, 0, unit, 0, Math.PI * 2);
					ctx.arc(-1.1 * unit, 1.9 * unit, unit, 0, Math.PI * 2);
					ctx.arc(-.2 * unit, .8 * unit, unit, 0, Math.PI * 2);
					ctx.arc(-unit, unit, unit, 0, Math.PI * 2);
					ctx.arc(-3 * unit, 2 * unit, unit, 0, Math.PI * 2);
					ctx.arc(-2.4 * unit, unit, unit, 0, Math.PI * 2);
					ctx.fill();
				ctx.closePath();
			ctx.restore();

			ctx.save();
				ctx.translate(rotate * .1, 0);
				ctx.beginPath();
					ctx.translate(unit * 36, unit * 12);
					ctx.arc(0, 0, unit, 0, Math.PI * 2);
					ctx.arc(1 * unit, .3 * unit, unit, 0, Math.PI * 2);
					ctx.arc(.2 * unit, .8 * unit, unit, 0, Math.PI * 2);
					ctx.fill();
				ctx.closePath();
			ctx.restore();
			ctx.fillRect(0, 27 * unit, globalSize, unit * 3);
		ctx.restore();
	}

	class Earth {
		constructor(props) {
			this.rotate = 0;
            this.unit = .02 * globalSize;
			this.radius = .2 * globalSize;
		}
		update() {
			this.rotate = (this.rotate - 1) % (40 * this.unit);

			ctx.save();
				ctx.save();
					ctx.rotate(Math.PI * .05);
					ctx.translate(3.6 * this.unit, this.unit);
					ctx.beginPath();
						ctx.moveTo(.5 * globalSize, 0);
						ctx.lineTo(.5 * globalSize, 40 * this.unit);
						ctx.setLineDash([5]);
						ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
						ctx.stroke();
					ctx.closePath();
				ctx.restore();

				ctx.beginPath();
					ctx.arc(.5 * globalSize, .5 * globalSize, this.unit * 15, 0, 2 * Math.PI);
					ctx.fillStyle = '#09f';
					ctx.fill();
					ctx.arc(.5 * globalSize, .5 * globalSize, this.unit * 15 + 1, 0, 2 * Math.PI);
					ctx.clip();
				ctx.closePath();
				ctx.save();
					ctx.rotate(Math.PI * .05);
					drawEarth(this.unit, this.rotate);
					drawEarth(this.unit, this.rotate + 40 * this.unit);
					drawEarth(this.unit, this.rotate + 80 * this.unit);
				ctx.restore();
				ctx.fillStyle = 'rgba(0, 0, 0, .3)';
				ctx.fillRect(.5 * globalSize, 0, .5 * globalSize, globalSize);
			ctx.restore();

		}
	}

	earth = function(id) {
		let box = document.getElementById(id);
		box_init(box);

		world = new Earth();

		update();
	}

	function update() {
		// ctx.fillStyle = '#09f';
		// ctx.fillStyle = 'rgba(48, 48, 48, .2)';
		ctx.fillStyle = '#333';
		ctx.fillRect(0, 0, globalSize, globalSize);

		world.update();

		window.requestAnimationFrame(update);
	}
}());

earth('earth');
