let gears;
(function() {
    if('ontouchstart' in window) {
        evnt_move = 'touchstart';
        evnt_end = 'touchend';
    } else {
        evnt_move = 'mousemove';
        evnt_end = 'mouseout';
    }

    let LARGE_SIZE = 40;
    let SMALL_SIZE = 30;
    let large_gear, small_gear;
    let Pi = Math.PI;
    let globalSize;
    let cvs = document.createElement('canvas');
    let ctx = cvs.getContext('2d');
    let ori = {};
    let rotate_speed = 8;

    class Gear {
        constructor(props) {
            this.size = props.size == 'large' ? LARGE_SIZE : SMALL_SIZE;
            this.ratio = 0;
            this.x = globalSize / 2 + (LARGE_SIZE + SMALL_SIZE - .3) * .5 * (props.size == 'large' ? 1 : -1);
            this.y = globalSize / 2 + (props.size == 'large' ? -1 : -10);

            this.teeth_size = this.size / 19; // 齿宽
            this.teeth_num = Math.floor(this.size * Pi * .5 / this.teeth_size); // 齿数
            this.teeth_rad = this.teeth_size / this.size; // 齿宽所占弧度
            this.teeth_space_rad = 2 * Pi / this.teeth_num - this.teeth_rad; // 齿间距弧度
        }
        update() {
            let size = this.size == LARGE_SIZE;
            let innerSize = this.size - 5;
            this.ratio = this.ratio + rotate_speed * (size ? 1 : -1);

            ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.ratio / 180);
                ctx.strokeStyle = size ? '#99e' :'#9e9';

                ctx.lineWidth = 2;
                let blade = 6;
                let step = Pi / blade;
                for(let i=0; i<Pi*2; i+=(step*2)) {
                    ctx.save();
                        ctx.rotate(i);
                        ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(0, innerSize);
                            ctx.stroke();
                        ctx.closePath();
                    ctx.restore();
                }
                ctx.beginPath();
                    ctx.arc(0, 0, innerSize * .6, 0, Math.PI * 2, false);
                    ctx.stroke();
                ctx.closePath();

                ctx.lineWidth = 3;
                ctx.beginPath();
                    ctx.arc(0, 0, innerSize, 0, Math.PI * 2, false);
                    ctx.stroke();
                ctx.closePath();
                let st_r = 0;
                ctx.lineWidth = 5;
                for(let i=0; i<this.teeth_num; i++) {
                    ctx.beginPath();
                        ctx.arc(0, 0, this.size - 1, st_r, st_r + this.teeth_rad, false);
                        ctx.stroke();
                    ctx.closePath();
                    st_r = st_r + this.teeth_rad + this.teeth_space_rad;
                }
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
        box.addEventListener('mouseover', function(e) {
            rotate_speed = 1;
        });
        box.addEventListener('mouseout', function() {
            rotate_speed = 8;
        });
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
