let lightbox;
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

	const COLORS = ['#ed7700','#ffe100','#c73379','#1f38c1','#2db1b9','#7ba918'];

	let total_size, unit_size;
	let ori = {};
	let boxes = [];
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');

	let light_count = 16;
	function Box(i, j) {
		this.x = i * unit_size;
		this.y = j * unit_size;
		this.opacity = .3;
		this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
	}
	Box.prototype.update = function() {
		this.opacity = Math.max(.3, this.opacity - .05);
		ctx.save();
			ctx.translate(this.x, this.y);
			ctx.globalAlpha = this.opacity;
			ctx.beginPath();
				ctx.fillStyle = this.color;
				ctx.fillRect(0, 0, unit_size, unit_size);
			ctx.closePath();
		ctx.restore();
	}
	Box.prototype.interlock = function(dir, i, j) {
		boxes[i][j].opacity = 1;

		setTimeout(function() {
			switch(dir) {
				case 'all':
					boxes[i] && boxes[i][j] && boxes[i][j].interlock('up', i, j);
					boxes[i] && boxes[i][j] && boxes[i][j].interlock('down', i, j);
					boxes[i] && boxes[i][j] && boxes[i][j].interlock('left', i, j);
					boxes[i] && boxes[i][j] && boxes[i][j].interlock('right', i, j);
					break;
				case 'up':
					boxes[i] && boxes[i][j - 1] && boxes[i][j - 1].interlock('up', i, j - 1);
					break;
				case 'down':
					boxes[i] && boxes[i][j + 1] && boxes[i][j + 1].interlock('down', i, j + 1);
					break;
				case 'left':
					boxes[i - 1] && boxes[i - 1][j] && boxes[i - 1][j].interlock('left', i - 1, j);
					boxes[i - 1] && boxes[i - 1][j] && boxes[i - 1][j].interlock('up', i - 1, j);
					boxes[i - 1] && boxes[i - 1][j] && boxes[i - 1][j].interlock('down', i - 1, j);
					break;
				case 'right':
					boxes[i + 1] && boxes[i + 1][j] && boxes[i + 1][j].interlock('right', i + 1, j);
					boxes[i + 1] && boxes[i + 1][j] && boxes[i + 1][j].interlock('up', i + 1, j);
					boxes[i + 1] && boxes[i + 1][j] && boxes[i + 1][j].interlock('down', i + 1, j);
					break;
				default:
					break;
			}
		}, 30);
	}

	function create_box(i, j) {
		let box = new Box(i, j);
		boxes[i][j] = box;
	}
	function set_lightbox() {
		for(let i=0; i<light_count; i++) {
			boxes[i] = [];
			for(let j=0; j<light_count; j++) {
				create_box(i, j);
			}
		}

		boxes.update = function() {
			boxes.map(function(box_col) {
				box_col.map(function(box) {
					box.update();
				});
			});
		}
	}
	function pos_idx(e, func) {
		let pos = {};
		pos.x = e.pageX - ori.x;
		pos.y = e.pageY - ori.y;

		let i = parseInt(pos.x / unit_size);
		let j = parseInt(pos.y / unit_size);

		boxes[i] && boxes[i][j] && func(boxes[i][j], i, j);
	}
	cvs.addEventListener(evnt_start, function(e) {
		pos_idx(e, function(box, i, j) {
			box.interlock('all', i, j);
		});
	});

	cvs.addEventListener(evnt_move, function(e) {
		pos_idx(e, function(box) {
			box.opacity = 1;
		});
	});


	lightbox = function(id) {
		let box = document.getElementById(id);
		ori.x = box.offsetLeft;
		ori.y = box.offsetTop;

		total_size = Math.min(box.offsetWidth, box.offsetHeight);
		unit_size = total_size / light_count;

		cvs.style.width = total_size;
		cvs.style.height = total_size;
		cvs.width = total_size;
		cvs.height = total_size;

		set_lightbox();

		box.innerHTML = '';
		box.appendChild(cvs);
		update();
	}

	function update() {
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, total_size, total_size);

		boxes.update();

		window.requestAnimationFrame(update);
	}

}());

lightbox('lightbox');
