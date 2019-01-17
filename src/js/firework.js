let firework;
(function() {
	if('ontouchstart' in window) {
		evnt_move = 'touchstart';
		evnt_end = 'touchend';
	} else {
		evnt_move = 'mousemove';
		evnt_end = 'mouseout';
	}

    const COLOR = ['#9ee', '#09f', '#f60', '#e99', '#e9e', '#ee9', '#99e', '#9e9'];
	let globalSize;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ori = {};
    let center = 20;

	const TYPES = [function(fw, radius) {
		// dashLine
		ctx.translate(fw.x, fw.y);
		ctx.setLineDash([Math.pow(radius, .5), Math.pow(radius, .5)]);
		for(let i = 0; i < 30; i++) {
			ctx.rotate((1/15) * Math.PI);
			ctx.beginPath();
				ctx.moveTo(Math.pow(radius, .5), Math.pow(radius, .5));
				ctx.lineTo(radius, radius);
				ctx.strokeStyle = (i % 2) ? fw.tail : fw.flame;
				ctx.stroke();
			ctx.closePath();
		}
	}, function(fw, radius) {
		// rotate
		ctx.translate(fw.x, fw.y);
		ctx.setLineDash([Math.pow(radius, .5), Math.pow(radius, .5)]);
		for(let i = 0; i < 30; i++) {
			ctx.rotate((1/15) * Math.PI + radius/180);
			ctx.beginPath();
				ctx.arc(radius, radius, 1, 2 * Math.PI, 0, false);
				ctx.strokeStyle = (i % 2) ? fw.tail : COLOR[Math.floor(Math.random() * 8)];
				ctx.stroke();
			ctx.closePath();
		}
	}, function(fw, radius) {
		// dots
		if(Math.floor(radius) % 2){
			ctx.translate(fw.x, fw.y);
			ctx.setLineDash([4]);
			ctx.rotate(radius / 180);
			ctx.strokeStyle = COLOR[Math.floor(Math.random() * 8)];
			ctx.beginPath();
				ctx.arc(0, 0, radius * .7, 0, Math.PI * 2);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
				ctx.arc(0, 0, radius * .4, 0, Math.PI * 2);
			ctx.closePath();
			ctx.stroke();

			ctx.fillStyle = COLOR[Math.floor(Math.random() * 8)];
			for(let i=.1; i<1; i+=.2) {
				ctx.rotate(Math.PI * 2 * Math.random());
				ctx.fillRect(0, radius * i, 2, 2);
				ctx.fillRect(0, -radius * i, 2, 2);
				ctx.fillRect(radius * i, 0, 2, 2);
				ctx.fillRect(-radius * i, 0, 2, 2);
			}
		}
	}, function(fw, radius) {
		// flower
		ctx.translate(fw.x, fw.y);
		ctx.rotate(- radius / 30);
		for(let i=0; i<10; i++) {
			ctx.rotate(2 * Math.PI / 10);
			ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.arcTo(.5 * radius, .5 * radius, 0, radius, radius / 2);
				ctx.strokeStyle = (i % 2) ? fw.tail : fw.flame;
				ctx.stroke();
			ctx.closePath();
		}
	}, function(fw, radius) {
		// fan
		let fan_blade = 3;
		fw.flame_radius+=1;
		ctx.translate(fw.x, fw.y);
		ctx.rotate((fw.tail >= fw.flame ? 1 : -1) * radius / 15);
		ctx.setLineDash([2]);
		for(let i=0; i<radius; i++) {
			if(!(i%8)) {
				ctx.rotate(fan_blade * 0.025 * Math.PI);
				for(let j=0; j<fan_blade; j++) {
					ctx.beginPath();
						ctx.arc(0, 0, i, j * 2 * Math.PI / fan_blade, (j * 2 + 1) * Math.PI / fan_blade, false);
						ctx.strokeStyle = COLOR[Math.floor(Math.random() * 8)];
						ctx.stroke();
					ctx.closePath();
				}
			}
		}
	// }, function(fw, radius) {
	// 	// circle
	// 	ctx.setLineDash([2, radius % (Math.random() * 70 - 20)]);
	// 	ctx.translate(fw.x, fw.y);
	// 	ctx.rotate(- radius / 10);
	// 	ctx.beginPath();
	// 		ctx.arc(0, 0, radius, 2 * Math.PI, 0, false);
	// 		ctx.strokeStyle = COLOR[parseInt((radius - center) / 8) % 8];
	// 		ctx.stroke();
	// 	ctx.closePath();
	}];

	function explotion(fw) {
		ctx.save();
			let radius = fw.flame_radius / 2;
			TYPES[fw.type](fw, radius);
		ctx.restore();
	}

    class Firework {
        constructor(props) {
        	this.reset();
			this.type = 2;
        };
        reset() {
			this.x = (.25 + Math.random() * .5) * globalSize;
			this.y = globalSize;
			this.height = (.25 + Math.random() * .5) * globalSize;
			this.size = globalSize * (.2 + Math.random() * .3);

			this.tail = COLOR[Math.floor(Math.random() * 8)];
			this.flame = this.tail;
			while(this.tail == this.flame) {
				this.flame = COLOR[Math.floor(Math.random() * 8)];
			}
			this.type = Math.floor(Math.random() * TYPES.length);
			// this.type = 4;
            this.flame_radius = center;
        };
        update() {
			if(this.height == this.y) {
				this.flame_radius+=1;
				if(this.flame_radius < this.size) {
					explotion(this);
				} else {
					// 烟花消失，重新生成
		        	this.reset();
				}
			} else {
				let dis = this.height - this.y;
				ctx.save();
					ctx.translate(this.x, this.y);
					ctx.beginPath();
						ctx.moveTo(0, 0);
						ctx.lineTo(0, dis * .1);
						ctx.strokeStyle = this.tail;
						ctx.stroke();
					ctx.closePath();
				ctx.restore();

				if(Math.abs(dis) < 2) {
					this.y = this.height;
				} else {
					this.y = this.y + dis * .1;
				}
			}
        }
    }

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

    let shot_fireworks = [];

	firework = function(id) {
		let box = document.getElementById(id);
		box_init(box);

		shot_fireworks.push(new Firework());
		setTimeout(function() {
			shot_fireworks.push(new Firework());
		}, globalSize / 2 * 15);
		setTimeout(function() {
			shot_fireworks.push(new Firework());
		}, globalSize / 2 * 30);

		update();
	}

	function update() {
		ctx.fillStyle = 'rgba(48, 48, 48, .2)';
		ctx.fillRect(0, 0, globalSize, globalSize);

		shot_fireworks.map(function(firework) {
			firework.update();
		});

		window.requestAnimationFrame(update);
	}
}());

firework('firework');
