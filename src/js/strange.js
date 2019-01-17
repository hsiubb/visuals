let strange;

(function() {
	if('ontouchstart' in window) {
		evnt_move = 'touchstart';
		evnt_end = 'touchend';
	} else {
		evnt_move = 'mousemove';
		evnt_end = 'mouseout';
	}

    const COLOR = ['#9ee', '#09f', '#f60', '#e99', '#e9e', '#ee9', '#99e', '#9e9'];
    let portal;
	let globalSize;
	let cvs = document.createElement('canvas');
	let ctx = cvs.getContext('2d');
    let ori = {};
    let portal_radius = 0;
    let rad_unit = Math.PI*.0075;

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

    function spark_update(pos, radius, frame, dir) {
        ctx.moveTo(pos + frame * .5, radius + (3 + frame * .5) * dir);
        ctx.lineTo(pos + 3 + frame * .5, radius + (4 + frame * .5) * dir);
    }

    class Spark {
        constructor(props) {
            this.angle = props.angle;
            this.pos = 0;
            this.view = 1;
            this.frame = 0;
        }
        update() {
            this.radius = portal_radius;
            this.frame+=.5;
            let _this = this;
            let opacity = (this.view ? (this.frame / 20) : 0);
            if (this.frame <= 20) {
                ctx.save();
                    ctx.translate(globalSize * .5, globalSize * .5);
                    ctx.rotate(- this.angle * 10);
                    ctx.beginPath();
                        spark_update(_this.pos, _this.radius, _this.frame, 1);
                        spark_update(_this.pos, _this.radius - 1, _this.frame, -1);
                        ctx.strokeStyle = 'rgba(240, 128, 0, ' + opacity + ')';
                        ctx.stroke();
                    ctx.closePath();
                ctx.restore();
            } else {
                this.frame = 0;
            }
        }
    }

    class Portal {
        constructor() {
            this.radius = globalSize * .3;
            this.cur_rotation = 0;
            this.zoomIn = true;
        }
        update() {
            let radius = this.radius;
            if (this.zoomIn && this.radius <= globalSize * .4) {
                this.radius += .2;
            } else if (!this.zoomIn && this.radius >= globalSize * .3) {
                this.radius -= .2;
            } else {
                this.zoomIn = !this.zoomIn;
            }
            portal_radius = this.radius;
            this.cur_rotation = (this.cur_rotation + rad_unit ) % (2 * Math.PI);
            ctx.save();
                ctx.translate(globalSize*.5, globalSize*.5);
                ctx.save();
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                        ctx.fillStyle = '#111';
                        ctx.fill();
                        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                        ctx.strokeStyle = '#fc0';
                        ctx.stroke();
                    ctx.closePath();
                ctx.restore();

                for(let i=0,j=0; i < 2*Math.PI; i += rad_unit,j++) {
                    ctx.rotate(rad_unit);
                    ctx.beginPath();
                        ctx.moveTo(0, radius + Math.random() * 4 - 2);
                        ctx.lineTo(10 + Math.random() * 10, radius + Math.random() * 20 - 10);
                        ctx.strokeStyle = '#f80';
                        ctx.stroke();
                    ctx.closePath();
                }
                (new Spark({ radius, angle: 0 })).update();

                ctx.rotate(- this.cur_rotation * 7);
                for(let i=0; i<.2*Math.PI; i+=rad_unit) {
                    ctx.beginPath();
                        ctx.moveTo(0, radius);
                        ctx.lineTo(Math.random() * 20, radius + Math.random() * 20 - 10);
                        ctx.moveTo(0, - radius);
                        ctx.lineTo(- Math.random() * 20, 10 - radius - Math.random() * 20);
                        ctx.strokeStyle = '#f90';
                        ctx.stroke();
                    ctx.closePath();
                }
            ctx.restore();
        }
    }

    let sparks = [];
    strange = function(id) {
		let box = document.getElementById(id);
        box_init(box);

        portal_radius = globalSize * .3;

        portal = new Portal();
        for (let i = 0, j = 0; i < 2 * Math.PI; i = i + rad_unit / 2, j++) {
            sparks[j] = new Spark({ angle: i });
        }

		update();
    }

	function update() {
		ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, globalSize, globalSize);

        portal.update();

        sparks.map(function(spark) {
            if (!Math.floor(Math.random() * 10)) {
                spark.update();
            }
        });

		window.requestAnimationFrame(update);
	}
}());

strange('strange');
