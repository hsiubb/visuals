let maze;
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

	let ori = {};
	let grids = [];
	let globalSize;
	let unitSize;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ev_status = {
		type: 'spread'
	};

	let grid_count = 16;
	let direction = 'trbl';
	function Grid(i, j) {
		let _this = this;
		_this.dir = {
			t: false,
			r: false,
			b: false,
			l: false
		};
		_this.opacity = 1;
		_this.i = i;
		_this.j = j;
		_this.x = (i + .5) * unitSize;
		_this.y = (j + .5) * unitSize;
		_this.t = [_this.x, j * unitSize];
		_this.b = [_this.x, (j + 1) * unitSize];
		_this.r = [(i + 1) * unitSize, _this.y];
		_this.l = [i * unitSize, _this.y];
	}
	Grid.prototype.update = function() {
		let _this = this;
		_this.opacity = Math.min(1, _this.opacity + .05);
		ctx.save();
			ctx.lineWidth = unitSize * .1;
			// ctx.lineWidth = 3;
			ctx.lineJoin = 'round';
			ctx.strokeStyle = '#9ce';
			ctx.globalAlpha = _this.opacity;
			for(let d in _this.dir) {
				if(_this.dir[d]) {
					ctx.beginPath();
						ctx.moveTo(_this.x, _this.y);
						ctx.lineTo(_this[d][0], _this[d][1]);
					ctx.closePath();
					ctx.stroke();
				}
			}
		ctx.restore();
	}
	Grid.prototype.spread = function(dis, from) {
		if(dis) {
			dis--;
			let _this = this;
			_this.opacity = .05;
			for(let dir in _this.dir) {
				if(dir !== from) {
					window.requestAnimationFrame(function() {
						if(_this.dir[dir] && (dir === 't') && (_this.j !== 0)) {
							grids[_this.i][_this.j - 1].spread(dis, 'b');

						} else if(_this.dir[dir] && (dir === 'b') && (_this.j !== (grid_count - 1))) {
							grids[_this.i][_this.j + 1].spread(dis, 't');

						} else if(_this.dir[dir] && (dir === 'l') && (_this.i !== 0)) {
							grids[_this.i - 1][_this.j].spread(dis, 'r');

						} else if(_this.dir[dir] && (dir === 'r') && (_this.i !== (grid_count - 1))) {
							grids[_this.i + 1][_this.j].spread(dis, 'l');
						}
					});
				}
			}
		}
	}

	function set_maze(x, y) {
		let cover = document.createElement('div');
		cover.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;background:transparent;')
		cover.addEventListener(evnt_start, function(e) {
			e.stopPropagation();
		});
		cvs.parentNode.appendChild(cover);

		let path = [];

		function from(d) {
			if(d === 'l') {
				return 'r';
			} else if(d === 'r') {
				return 'l';
			} else if(d === 't') {
				return 'b';
			} else if(d === 'b') {
				return 't';
			}
		}

		let build_count = 0;
		function check_builed(relate, i, j) {
			let tar = '';
			function check(d, i, j) {
				if(grids[i] && grids[i][j] && !grids[i][j].build) {
					tar += d;
					relate.push(grids[i][j]);
				}
			}
			check('l', i - 1, j);
			check('r', i + 1, j);
			check('t', i, j - 1);
			check('b', i, j + 1);

			return tar;
		}

		function grid_check(d, i, j) {
			let cur = grids[i][j];
			d && (cur.dir[from(d)] = true);
			if(!cur.build) {
				cur.build = true;
				build_count++;
			}

			let relate = [];
			let tar = check_builed(relate, i, j);

			let next;
			let aim;

			if(relate.length) {
				path.push([cur, d]);

				aim = random(0, relate.length);
				tar = tar[aim];
				next = relate[aim];
				cur.dir[tar] = true;
			} else {
				path.pop();
				tar = path[path.length - 1][1];
				next = path[path.length - 1][0];
			}

			if(build_count < grid_count * grid_count) {
				if(relate.length) {
					window.requestAnimationFrame(function() {
						grid_check(tar, next.i, next.j);
					});
				} else {
					grid_check(tar, next.i, next.j);
				}
			} else {
				cover.parentNode.removeChild(cover);
			}
		}

		build_count = 0;
		grids.map(function(col) {
			col.map(function(grid) {
				grid.build = false;
				grid.dir = {
					t: false,
					r: false,
					b: false,
					l: false
				};
			})
		});

		// grid_check('', 0, 0);
		grid_check('', x, y);
	}

	function set_grid() {
		for(let i=0; i<grid_count; i++) {
			grids[i] = [];
			for(let j=0; j<grid_count; j++) {
				grids[i][j] = new Grid(i, j);
			}
		}

		grids.update = function() {
			grids.map(function(grid_col) {
				grid_col.map(function(grid) {
					grid.update();
				});
			});
		}

		set_maze(random(0, grid_count), random(0, grid_count));
	}

	function box_init(box) {
		box.innerHTML = '';

		ori.x = box.offsetLeft;
		ori.y = box.offsetTop;
		globalSize = Math.min(box.offsetWidth, box.offsetHeight);
		unitSize = globalSize / grid_count;

		cvs.style.width = globalSize;
		cvs.style.height = globalSize;
		cvs.width = globalSize;
		cvs.height = globalSize;

		box.appendChild(cvs);

		set_grid();

		cvs.addEventListener(evnt_start, function(e) {
			let pos = {};
			pos.x = e.pageX - ori.x;
			pos.y = e.pageY - ori.y;

			ev_status.i = parseInt(pos.x / unitSize);
			ev_status.j = parseInt(pos.y / unitSize);
			ev_status.type = 'spread';
			setTimeout(function() {
				ev_status.type = 'rebuild';
			}, 300);
		});
		cvs.addEventListener(evnt_end, function(e) {
			if(ev_status.type === 'spread') {
				grids[ev_status.i][ev_status.j].spread(-1);
			} else {
				set_maze(ev_status.i, ev_status.j);
			}
		});
	}

	maze = function(id) {
		let box = document.getElementById(id);
		box_init(box);

		update();
	}

	function update() {
		ctx.fillStyle = '#333';
		ctx.fillRect(0, 0, globalSize, globalSize);

		grids.update();

		window.requestAnimationFrame(update);
	}

}());

maze('maze');
