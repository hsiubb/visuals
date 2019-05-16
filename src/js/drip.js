let drip;

(function() {
    if('ontouchstart' in window) {
        evnt_move = 'touchstart';
        evnt_end = 'touchend';
    } else {
        evnt_move = 'mousemove';
        evnt_end = 'mouseout';
    }

    const COLOR = ['#9ee', '#09f', '#f60', '#e99', '#e9e', '#ee9', '#99e', '#9e9'];
    const Pi = Math.PI;
    let dots = [];
    let dot_len;
    let globalSize;
    let cvs = document.createElement('canvas');
    let ctx = cvs.getContext('2d');
    let ori = {};
    let rad_unit;
    let max_radius;

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

    class Dot {
        constructor() {
            this.radius = 0;
            this.opacity = 1;
            this.get_pos();
        }
        get_pos() {
            this.x = Math.random() * (globalSize - max_radius * 2) + max_radius;
            this.y = Math.random() * (globalSize - max_radius * 2) + max_radius;
        }
        waits() {
            let _this = this;
            _this.radius = 0;
            _this.opacity = 0;
            setTimeout(function() {
                _this.radius = 0;
                _this.get_pos();
                _this.opacity = 1;
            }, 599 + Math.random() * 601);
        }
        update() {
            this.radius = this.radius + rad_unit;
            if(this.radius > max_radius) {
                this.waits();
                if(dots.length < dot_len && !Math.floor(Math.random() * 20)) {
                    setTimeout(() => {
                        dots.push(new Dot());
                    }, 97);
                }
            }

            if(this.opacity) {
                ctx.save();
                    ctx.lineWidth = 3;
                    ctx.translate(this.x, this.y);
                    ctx.beginPath();
                        ctx.arc(0, 0, this.radius * .2, 0, Pi * 2);
                        ctx.fillStyle = 'rgba(255, 255, 255, ' + ((1 - this.radius / max_radius) * .1) + ')';
                        ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                        ctx.arc(0, 0, this.radius, 0, Pi * 2);
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = 'rgba(144, 192, 255, ' + (1 - this.radius / max_radius) + ')';
                        ctx.stroke();
                    ctx.closePath();
                ctx.restore();
            }
        }
    }

    let sparks = [];
    drip = function(id) {
        let box = document.getElementById(id);
        box_init(box);

        rad_unit = globalSize * .004;
        max_radius = globalSize * .1;
        dot_len = globalSize * 0.09;

        dots.push(new Dot());

        update();
    }

    function update() {
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, globalSize, globalSize);

        dots.map(function(dot) {
            dot.update();
        });

        window.requestAnimationFrame(update);
    }
}());

drip('drip');
