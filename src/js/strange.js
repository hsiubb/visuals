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
    const Pi = Math.PI;
    let portal;
    let globalSize;
    let cvs = document.createElement('canvas');
    let ctx = cvs.getContext('2d');
    let ori = {};
    let portal_radius = 0;
    let rad_unit = Pi*.0075;
    let rotate_speed = 10;

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

    function random_num(rate) {
        return Math.floor(Math.random() * (rate || 2));
    }
    function get_opacity(cur, total, min, max) {
        min = min == undefined ? .5 : min;
        let dis = Math.min(max || 1, 1) - min;
        return cur / total * dis + min;
    }
    function get_radius(radius,i,time) {
        return radius + (Pi * 2 - i) * (time || 1) + (random_num(2) - 1);
    }
    function get_dis(e) {
        return 25 - (Math.max(Math.abs(e.offsetX - (globalSize * .5)), Math.abs(e.offsetY - (globalSize * .5))) / (globalSize * .5)) * 15;
    }

    class Portal {
        constructor() {
            this.radius = globalSize * .25;
            this.cur_rotation = 0;
            this.zoomIn = true;
        }
        update() {
            let radius = this.radius;
            portal_radius = this.radius;
            this.cur_rotation = (this.cur_rotation + rad_unit * rotate_speed) % (2 * Pi);
            ctx.save();
                ctx.translate(globalSize*.5, globalSize*.5);
                ctx.save();
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, 2 * Pi);
                        ctx.fillStyle = '#023';
                        ctx.fill();
                        ctx.rotate(this.cur_rotation);
                        for(let i=0; i<Pi*2; i+=rad_unit) {
                            ctx.rotate(rad_unit);
                            ctx.fillStyle = 'rgba(255, 143, 0, ' + get_opacity(i, Pi*2, 0, 1) + ')';
                            ctx.fillRect(0, radius, 1, 1);
                            ctx.fillRect(0, get_radius(radius,i, 1), 1, 1);
                            ctx.fillRect(0, get_radius(radius,i, 4), 1, 1);
                            ctx.fillRect(0, get_radius(radius,i, 9), 1, 1);
                            ctx.fillStyle = 'rgba(255, 143, 0, ' + get_opacity(i, Pi*2, 0, .8) + ')';
                            for(let j=2; j<20; j++) {
                                random_num(3) && ctx.fillRect(0, get_radius(radius,i,j), 1, 1);
                            }
                        }
                        for(let i=0; i<Pi*2; i+=rad_unit) {
                            ctx.rotate(rad_unit);
                            ctx.fillStyle = 'rgba(255, 192, 144, ' + get_opacity(i, Pi*2, 0, 1) + ')';
                            random_num(3) && ctx.fillRect(0, get_radius(radius,i,2), 1, 1);
                            random_num(3) && ctx.fillRect(0, get_radius(radius,i,4), 1, 1);
                            random_num(3) && ctx.fillRect(0, get_radius(radius,i,7), 1, 1);
                        }
                        for(let i=0; i<Pi*2; i+=rad_unit) {
                            ctx.rotate(rad_unit);
                            ctx.fillStyle = 'rgba(255, 216, 192, ' + get_opacity(i, Pi*2, 0, 1) + ')';
                            random_num(3) && ctx.fillRect(0, get_radius(radius,i,.1), 1, 1);
                            random_num(3) && ctx.fillRect(0, get_radius(radius,i,.4), 1, 1);
                            random_num(3) && ctx.fillRect(0, get_radius(radius,i,.9), 1, 1);
                        }
                    ctx.closePath();
                ctx.restore();

            ctx.restore();
        }
    }

    let sparks = [];
    strange = function(id) {
        let box = document.getElementById(id);
        box.addEventListener('mousemove', function(e) {
            rotate_speed = get_dis(e);
        });
        box.addEventListener('mouseout', function() {
            rotate_speed = 10;
        });
        box_init(box);

        portal_radius = globalSize * .3;

        portal = new Portal();

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
