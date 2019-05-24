let snow;
(function() {
	if('ontouchstart' in window) {
		evnt_start = 'touchstart';
		evnt_move = 'touchmove';
		evnt_end = 'touchend';
	} else {
		evnt_start = 'mousedown';
		evnt_move = 'mousemove';
		evnt_end = 'mouseup';
	}
	function random(min, max) {
		min = parseInt(min);
		max = parseInt(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function grad_random(min, max, is_fall) {
		let dis = max - min;
		let step = 1 / (dis + 1);

		let total = 0;
		let list = [];
		for(let i=1; i<=dis; i++) {
			total += (i * step);
			list.push(total);
		}
		list.map(function(val, i) {
			list[i] = 1 - val / total;
		});
		list.unshift(1);

		!is_fall && list.reverse();

		let rand = 1 - Math.random();
		let result = 0;
		for(let i=0; i<dis; i++) {
			if(
				(!is_fall && rand >= list[i] && rand < list[i+1]) || (is_fall && rand >= list[i+1] && rand < list[i])
			) {
				result = i + min;
			}
		}

		return result;
	}

	let ori = {};
	let flakes = [];
	let globalSize, unitSize;
	let status = 'snow'; // or 'asteroid'
	let opacity = 1;
	let unit_color = '#fff';
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');

	let wind = 1;
	let gravity = 2;
	function Flake(i) {
		this.x = random(0, globalSize);
		this.y = random(0, globalSize);
		// this.z = random(10, 30) * .05;
		this.z = grad_random(2, 30) * .05;
		this.size = this.z * 2;
		this.sp_x = this.z * wind;
		this.sp_y = this.z * gravity;
	}
	Flake.prototype.update = function() {
		let _this = this;
		this.x = (globalSize + this.x + this.sp_x) % globalSize;
		this.y = (globalSize + this.y + this.sp_y) % globalSize;
		ctx.save();
			ctx.translate(this.x, this.y);
			ctx.beginPath();
				ctx.fillStyle = unit_color;
				ctx.arc(0, 0, this.size, 0, Math.PI * 2);
				ctx.fill();
			ctx.closePath();
		ctx.restore();
	}

	let flake_count = 160;
	function set_flates() {
		for(let i=0; i<flake_count; i++) {
			flakes.push(new Flake());
		}

		flakes.update = function() {
			flakes.map(function(flake) {
				let tar_sp_x = flake.z * wind;
				flake.sp_y = flake.z * gravity;
				if(flake.sp_x !== tar_sp_x) {
					if(Math.abs(tar_sp_x - flake.sp_x) >= .05) {
						flake.sp_x += (tar_sp_x - flake.sp_x) * .3;
					} else {
						flake.sp_x = tar_sp_x;
					}
				}

				flake.update();
			});
		}
	}

	function box_init(box) {
		box.innerHTML = '';

		ori.x = box.offsetLeft;
		ori.y = box.offsetTop;
		globalSize = Math.min(box.offsetWidth, box.offsetHeight);
		unitSize = globalSize / flake_count;

		cvs.style.width = globalSize;
		cvs.style.height = globalSize;
		cvs.width = globalSize;
		cvs.height = globalSize;

		set_flates();

		cvs.addEventListener('mousemove', function(e) {
			wind = (e.pageX - ori.x) / globalSize * 6 - 3;
			// gravity = (e.pageY - ori.y) / globalSize * 8 - 4;
		});
		cvs.addEventListener('click', function(e) {
			if(status == 'snow') {
				status = 'asteroid';
				opacity = .3;
				unit_color = '#f90';
				gravity = 4;
			} else {
				status = 'snow';
				opacity = 1;
				unit_color = '#fff';
				gravity = 2;
			}
		});

		box.appendChild(cvs);
	}

	snow = function(id) {
		let box = document.getElementById(id);
		box_init(box);

		update();
	}

	function update() {
		ctx.fillStyle = (status == 'snow') ? '#333' : 'rgba(64, 48, 48, .2)';
		// ctx.fillStyle = '#333';
		ctx.fillRect(0, 0, globalSize, globalSize);

		flakes.update();

		window.requestAnimationFrame(update);
	}

}());

snow('snow');
