let dots;
(function() {
	if('ontouchstart' in window) {
		evnt_move = 'touchstart';
		evnt_end = 'touchend';
	} else {
		evnt_move = 'mousemove';
		evnt_end = 'mouseout';
	}

	const BALL_SIZE = 1;
	const BALL_SPEED = 5;
	const BALL_NUM = 36;
	const SPARK_COLOR = '#fff';
	const COLOR = ['#9ee', '#09f', '#f60', '#e99', '#e9e', '#ee9', '#99e', '#9e9'];
	let globalSize;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ori = {};
	let balls = [];
	let hover = false;
	let yeah = true;

	class Ball {
		constructor(i) {
			this.x = (.1 + Math.random() * .9) * globalSize;
			this.y = (.1 + Math.random() * .9) * globalSize;
			this.reset(i);
		}
		reset(i) {
			this.size = BALL_SIZE;
			this.speed = BALL_SPEED;
			// this.color = COLOR[i % COLOR.length];

			this.angle = Math.random() * Math.PI * 2;

			this.crash();
		}
		crash() {
			this.speed_x = Math.cos(this.angle) * this.speed;
			this.speed_y = - Math.sin(this.angle) * this.speed;
		}
		get_angle() {
			let r = Math.pow(Math.pow(hover.x - this.x, 2) + Math.pow(hover.y - this.y, 2), .5);
			yeah = false;
			this.speed_x = this.speed * Math.abs(hover.y - this.y) / r;
			this.speed_y = this.speed * Math.abs(hover.x - this.x) / r;

			if(hover.x > this.x) {
				this.speed_y *= -1;
			}
			if(hover.y < this.y) {
				this.speed_x *= -1;
			}
		}
		update(i) {
			let this_ball = this;
			this_ball.x = this_ball.x + this_ball.speed_x;
			this_ball.y = this_ball.y + this_ball.speed_y;

			if(hover) {
				this_ball.get_angle();
			}

			if(this_ball.x <= 0) {
				this_ball.x = globalSize + 2;
				this_ball.y = (.1 + Math.random() * .9) * globalSize;
			} else if(this_ball.x >= globalSize) {
				this_ball.x = - 2;
				this_ball.y = (.1 + Math.random() * .9) * globalSize;
			} else if(this_ball.y <= 0) {
				this_ball.y = globalSize + 2;
				this_ball.x = (.1 + Math.random() * .9) * globalSize;
			} else if(this_ball.y >= globalSize) {
				this_ball.y = - 2;
				this_ball.x = (.1 + Math.random() * .9) * globalSize;
			}

			ctx.save();
				ctx.translate(this_ball.x, this_ball.y);
				ctx.beginPath();
					ctx.arc(0, 0, this_ball.size + 2, 0, Math.PI * 2);
					ctx.fillStyle = hover ? '#9ce' : '#ddd';
					ctx.fill();
				ctx.closePath();
			ctx.restore();
		}
	};

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

	dots = function(id) {
		let box = document.getElementById(id);
		box.addEventListener('mousemove', function(e) {
			hover = {
				x: e.offsetX,
				y: e.offsetY
			};
		});
		box.addEventListener('mouseout', function(e) {
			hover = false;
		});
		box_init(box);

		for(let i=0; i<BALL_NUM; i++) {
			balls.push(new Ball(i));
		}

		update();
	}

	function update() {
		ctx.fillStyle = hover ? 'rgba(48, 48, 48, .3)' : '#333';
		ctx.fillRect(0, 0, globalSize, globalSize);

		balls.map(function(ball, i) {
			ball.update(i);
		});

		window.requestAnimationFrame(update);
	}
}());

dots('dots');
