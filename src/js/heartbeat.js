let heartbeat;
(function() {
	let globalSize;
	let beat_unit;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ori = {};
	let cur = {};
	let points = [];
	let color = '#38c';

	function box_init(box) {
		ori.x = box.offsetLeft;
		ori.y = box.offsetTop;
		globalSize = Math.min(box.offsetWidth, box.offsetHeight);

		cvs.width = globalSize;
		cvs.height = globalSize;
		cur.x = 0;
		cur.y = globalSize * .5;
		points = [
			[   0, .5  ],
			[  .1, .35 ],
			[  .2, .6  ],
			[  .3, .5  ],
			[  .4, .6  ],
			[  .5, .5  ],
			[  .6, .6  ],
			[  .7, 0   ],
			[  .8, 1   ],
			[  .9, .3  ],
			[   1, .6  ]
		];
		beat_unit = globalSize / (points.length * 4);

		points.map(function(point) {
			point[0] = globalSize * .375 + globalSize * .25 * point[0];
			point[1] = globalSize * .375 + globalSize * .25 * point[1];
		});

		ctx.fillStyle = '#333';
		ctx.fillRect(0, 0, globalSize, globalSize);

		box.innerHTML = '';
		box.appendChild(cvs);
	}

	heartbeat = function(id) {
		let box = document.getElementById(id);
		box_init(box);
		update();
	};

	function get_rate(i, j) {
		return (points[j][1] - points[i][1]) / (points[j][0] - points[i][0]);
	}
	function drawLine() {
		let tar = {};
		tar.x = (cur.x + beat_unit) % (globalSize + beat_unit);
		tar.y = cur.y;

		let len = points.length;

		if(tar.x < points[0][0] || tar.x > points[len-1][0]) {
			tar.y = globalSize * .5;
		} else {
			for(let i=0, len=points.length; i<len; i++) {
				let j = (i + 1) % len;
				if(tar.x >= points[i][0] && tar.x < points[j][0]) {
					let k = get_rate(i, j);
					tar.y = (tar.x - cur.x) * k + cur.y;

					break;
				}
			}
		}

		if(tar.x < beat_unit) {
			cur.x = 0;
			tar.x = cur.x + beat_unit;
		}
		if(hovering) {
			cur.y = globalSize * .5;
			tar.y = globalSize * .5;
		}

		ctx.save();
			ctx.beginPath();
				ctx.moveTo(cur.x, cur.y);
				ctx.lineTo(tar.x, tar.y);
			ctx.closePath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = color;
			ctx.stroke();
		ctx.restore();
		cur.x = tar.x;
		cur.y = tar.y;
	}

	let hovering = false;
	let turndown = false;
	function update() {
		// if(hovering) {
		// 	// turndown = (turndown + 1) % 10;
		// 	turndown = (turndown + 1) % 4;
		// 	if(!turndown) {
		// 		ctx.fillStyle = 'rgba(48, 48, 48, .135)';
		// 		ctx.fillRect(0, 0, globalSize, globalSize);

		// 		drawLine();
		// 	}
		// } else {
		// 	ctx.fillStyle = 'rgba(48, 48, 48, .135)';
		// 	ctx.fillRect(0, 0, globalSize, globalSize);

		// 	drawLine();
		// }

		ctx.fillStyle = 'rgba(48, 48, 48, .135)';
		ctx.fillRect(0, 0, globalSize, globalSize);

		drawLine();

		window.requestAnimationFrame(update);
	}

	cvs.addEventListener('mouseover', function() {
		color = '#e33';
		hovering = true;
	});
	cvs.addEventListener('mouseout', function() {
		color = '#38c';
		hovering = false;
	});
}());

heartbeat('heartbeat');
