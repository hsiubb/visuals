let gears;
(function() {
	if('ontouchstart' in window) {
		evnt_move = 'touchstart';
		evnt_end = 'touchend';
	} else {
		evnt_move = 'mousemove';
		evnt_end = 'mouseout';
	}

    let large_gear, small_gear;
	let globalSize;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
	let ori = {};

    class Gear {
        constructor(props) {
            this.size = props.size == 'large' ? 40 : 31;
            this.ratio = 0;
            this.x = globalSize / 2 + 35.5 * (props.size == 'large' ? 1 : -1);
            this.y = globalSize / 2 + (props.size == 'large' ? -1 : -10);
        }
        update() {
            let size = this.size == 40;
            let innerSize = this.size - 5;
            this.ratio = (this.ratio + (size ? 1 : -4000/3111) * 4);

            ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.ratio / 180 + (size ? 0 : -1/8));
                ctx.strokeStyle = size ? '#99e' :'#9e9';
                // ctx.lineWidth = 1;
                // ctx.beginPath();
                //     ctx.moveTo(0, -innerSize);
                //     ctx.lineTo(0, innerSize);
                //     ctx.moveTo(-innerSize * Math.cos(Math.PI * 1/6), -innerSize * Math.sin(Math.PI * 1/6));
                //     ctx.lineTo(innerSize * Math.cos(Math.PI * 1/6), innerSize * Math.sin(Math.PI * 1/6));
                //     ctx.moveTo(innerSize * Math.cos(Math.PI * 1/6), -innerSize * Math.sin(Math.PI * 1/6));
                //     ctx.lineTo(-innerSize * Math.cos(Math.PI * 1/6), innerSize * Math.sin(Math.PI * 1/6));
                //     ctx.stroke();
                // ctx.closePath();
                ctx.lineWidth = 5;
                ctx.beginPath();
                    ctx.arc(0, 0, innerSize, 0, Math.PI * 2, false);
                    ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                    ctx.setLineDash([5, 9]);
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2, false);
                    ctx.stroke();
                ctx.closePath();
            ctx.restore();
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


	gears = function(id) {
		let box = document.getElementById(id);
		box_init(box);

        large_gear = new Gear({size: 'large'});
        small_gear = new Gear({size: 'small'});

		update();
	}

	function update() {
		ctx.fillStyle = '#333';
		ctx.fillRect(0, 0, globalSize, globalSize);

		large_gear.update();
		small_gear.update();

		window.requestAnimationFrame(update);
	}
}());

gears('gears');
