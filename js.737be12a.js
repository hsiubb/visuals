parcelRequire=function(e,r,n,t){function i(n,t){function o(e){return i(o.resolve(e))}function c(r){return e[n][1][r]||r}if(!r[n]){if(!e[n]){var l="function"==typeof parcelRequire&&parcelRequire;if(!t&&l)return l(n,!0);if(u)return u(n,!0);if(f&&"string"==typeof n)return f(n);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}o.resolve=c;var a=r[n]=new i.Module(n);e[n][0].call(a.exports,o,a,a.exports,this)}return r[n].exports}function o(e){this.id=e,this.bundle=i,this.exports={}}var u="function"==typeof parcelRequire&&parcelRequire,f="function"==typeof require&&require;i.isParcelRequire=!0,i.Module=o,i.modules=e,i.cache=r,i.parent=u;for(var c=0;c<n.length;c++)i(n[c]);if(n.length){var l=i(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):t&&(this[t]=l)}return i}({9:[function(require,module,exports) {
var t=void 0;!function(){"ontouchstart"in window?(evnt_start="touchstart",evnt_move="touchmove",evnt_end="touchend"):(evnt_start="mousedown",evnt_move="mousemove",evnt_end="mouseup");var e=["#ed7700","#ffe100","#c73379","#1f38c1","#2db1b9","#7ba918"],n=void 0,o=void 0,i={},a=[],c=document.createElement("canvas"),r=c.getContext("2d"),l=16;function f(t,n){this.x=t*o,this.y=n*o,this.opacity=.3,this.color=e[Math.floor(Math.random()*e.length)]}function s(t,e){var n=new f(t,e);a[t][e]=n}function u(t,e){var n={};n.x=t.pageX-i.x,n.y=t.pageY-i.y;var c=parseInt(n.x/o),r=parseInt(n.y/o);a[c]&&a[c][r]&&e(a[c][r],c,r)}function h(){r.fillStyle="#fff",r.fillRect(0,0,n,n),a.update(),window.requestAnimationFrame(h)}f.prototype.update=function(){this.opacity=Math.max(.3,this.opacity-.05),r.save(),r.translate(this.x,this.y),r.globalAlpha=this.opacity,r.beginPath(),r.fillStyle=this.color,r.fillRect(0,0,o,o),r.closePath(),r.restore()},f.prototype.interlock=function(t,e,n){a[e][n].opacity=1,setTimeout(function(){switch(t){case"all":a[e]&&a[e][n]&&a[e][n].interlock("up",e,n),a[e]&&a[e][n]&&a[e][n].interlock("down",e,n),a[e]&&a[e][n]&&a[e][n].interlock("left",e,n),a[e]&&a[e][n]&&a[e][n].interlock("right",e,n);break;case"up":a[e]&&a[e][n-1]&&a[e][n-1].interlock("up",e,n-1);break;case"down":a[e]&&a[e][n+1]&&a[e][n+1].interlock("down",e,n+1);break;case"left":a[e-1]&&a[e-1][n]&&a[e-1][n].interlock("left",e-1,n),a[e-1]&&a[e-1][n]&&a[e-1][n].interlock("up",e-1,n),a[e-1]&&a[e-1][n]&&a[e-1][n].interlock("down",e-1,n);break;case"right":a[e+1]&&a[e+1][n]&&a[e+1][n].interlock("right",e+1,n),a[e+1]&&a[e+1][n]&&a[e+1][n].interlock("up",e+1,n),a[e+1]&&a[e+1][n]&&a[e+1][n].interlock("down",e+1,n)}},30)},c.addEventListener(evnt_start,function(t){u(t,function(t,e,n){t.interlock("all",e,n)})}),c.addEventListener(evnt_move,function(t){u(t,function(t){t.opacity=1})}),t=function(t){var e=document.getElementById(t);i.x=e.offsetLeft,i.y=e.offsetTop,n=Math.min(e.offsetWidth,e.offsetHeight),o=n/l,c.style.width=n,c.style.height=n,c.width=n,c.height=n,function(){for(var t=0;t<l;t++){a[t]=[];for(var e=0;e<l;e++)s(t,e)}a.update=function(){a.map(function(t){t.map(function(t){t.update()})})}}(),e.innerHTML="",e.appendChild(c),h()}}(),t("lightbox");
},{}],8:[function(require,module,exports) {
var t=void 0;!function(){function i(t,i){return t=parseInt(t),i=parseInt(i),Math.floor(Math.random()*(i-t))+t}"ontouchstart"in window?(evnt_start="touchstart",evnt_move="touchmove",evnt_end="touchend"):(evnt_start="mousedown",evnt_move="mousemove",evnt_end="mouseup");var e={},n=[],o=void 0,r=void 0,a=document.createElement("canvas"),s=a.getContext("2d"),d={type:"spread"},u=16;function h(t,i){this.dir={t:!1,r:!1,b:!1,l:!1},this.opacity=1,this.i=t,this.j=i,this.x=(t+.5)*r,this.y=(i+.5)*r,this.t=[this.x,i*r],this.b=[this.x,(i+1)*r+.5],this.r=[(t+1)*r+.5,this.y],this.l=[t*r,this.y]}function p(t,e){var o=document.createElement("div");o.setAttribute("style","position:absolute;top:0;left:0;width:100%;height:100%;background:transparent;"),o.addEventListener(evnt_start,function(t){t.stopPropagation()}),a.parentNode.appendChild(o);var r=[];var s=0;s=0,n.map(function(t){t.map(function(t){t.build=!1,t.dir={t:!1,r:!1,b:!1,l:!1}})}),function t(e,a,d){var h=n[a][d];e&&(h.dir[function(t){return"l"===t?"r":"r"===t?"l":"t"===t?"b":"b"===t?"t":void 0}(e)]=!0),h.build||(h.build=!0,s++);var p=[],f=function(t,i,e){var o="";function r(i,e,r){n[e]&&n[e][r]&&!n[e][r].build&&(o+=i,t.push(n[e][r]))}return r("l",i-1,e),r("r",i+1,e),r("t",i,e-1),r("b",i,e+1),o}(p,a,d),c=void 0,v=void 0;p.length?(r.push([h,e]),v=i(0,p.length),f=f[v],c=p[v],h.dir[f]=!0):(r.pop(),f=r[r.length-1][1],c=r[r.length-1][0]),s<u*u?p.length?window.requestAnimationFrame(function(){t(f,c.i,c.j)}):t(f,c.i,c.j):o.parentNode.removeChild(o)}("",t,e)}function f(t){t.innerHTML="",e.x=t.offsetLeft,e.y=t.offsetTop,o=Math.min(t.offsetWidth,t.offsetHeight),r=o/u,a.style.width=o,a.style.height=o,a.width=o,a.height=o,t.appendChild(a),function(){for(var t=0;t<u;t++){n[t]=[];for(var e=0;e<u;e++)n[t][e]=new h(t,e)}n.update=function(){n.map(function(t){t.map(function(t){t.update()})})},p(i(0,u),i(0,u))}(),a.addEventListener(evnt_start,function(t){var i={};i.x=t.pageX-e.x,i.y=t.pageY-e.y,d.i=parseInt(i.x/r),d.j=parseInt(i.y/r),d.type="spread",setTimeout(function(){d.type="rebuild"},300)}),a.addEventListener(evnt_end,function(t){"spread"===d.type?n[d.i][d.j].spread(-1):p(d.i,d.j)})}function c(){s.fillStyle="#fff",s.fillRect(0,0,o,o),n.update(),window.requestAnimationFrame(c)}h.prototype.update=function(){for(var t in this.opacity=Math.min(1,this.opacity+.05),s.save(),s.lineWidth=2,s.strokeStyle="#333",s.globalAlpha=this.opacity,this.dir)this.dir[t]&&(s.beginPath(),s.moveTo(this.x,this.y),s.lineTo(this[t][0],this[t][1]),s.closePath(),s.stroke());s.restore()},h.prototype.spread=function(t,i){var e=this;t&&function(){t--;var o=e;o.opacity=.05;var r=function(e){e!==i&&window.requestAnimationFrame(function(){o.dir[e]&&"t"===e&&0!==o.j?n[o.i][o.j-1].spread(t,"b"):o.dir[e]&&"b"===e&&o.j!==u-1?n[o.i][o.j+1].spread(t,"t"):o.dir[e]&&"l"===e&&0!==o.i?n[o.i-1][o.j].spread(t,"r"):o.dir[e]&&"r"===e&&o.i!==u-1&&n[o.i+1][o.j].spread(t,"l")})};for(var a in o.dir)r(a)}()},t=function(t){f(document.getElementById(t)),c()}}(),t("maze");
},{}],10:[function(require,module,exports) {
var t=void 0;!function(){function e(t,e){return t=parseInt(t),e=parseInt(e),Math.floor(Math.random()*(e-t))+t}"ontouchstart"in window?(evnt_start="touchstart",evnt_move="touchmove",evnt_end="touchend"):(evnt_start="mousedown",evnt_move="mousemove",evnt_end="mouseup");var n={},s=[],i=void 0,o=document.createElement("canvas"),a=o.getContext("2d"),h=1.5;function r(t){this.x=e(0,i),this.y=e(0,i),this.z=.05*function(t,e,n){for(var s=e-t,i=1/(s+1),o=0,a=[],h=1;h<=s;h++)o+=h*i,a.push(o);a.map(function(t,e){a[e]=1-t/o}),a.unshift(1),!n&&a.reverse();for(var r=1-Math.random(),f=0,u=0;u<s;u++)(!n&&r>=a[u]&&r<a[u+1]||n&&r>=a[u+1]&&r<a[u])&&(f=u+t);return f}(5,30),this.size=2*this.z,this.sp_x=this.z*h,this.sp_y=4*this.z}r.prototype.update=function(){this.x=(i+this.x+this.sp_x)%i,this.y=(i+this.y+this.sp_y)%i,a.save(),a.translate(this.x,this.y),a.beginPath(),a.fillStyle="#fff",a.arc(0,0,this.size,0,2*Math.PI),a.fill(),a.closePath(),a.restore()};var f=160;function u(t){t.innerHTML="",n.x=t.offsetLeft,n.y=t.offsetTop,i=Math.min(t.offsetWidth,t.offsetHeight),i/f,o.style.width=i,o.style.height=i,o.width=i,o.height=i,function(){for(var t=0;t<f;t++)s.push(new r);s.update=function(){s.map(function(t){var e=t.z*h;t.sp_x!==e&&(Math.abs(e-t.sp_x)>=.05?t.sp_x+=.3*(e-t.sp_x):t.sp_x=e),t.update()})}}(),o.addEventListener(evnt_start,function(t){h=(t.pageX-n.x)/i*6-3}),o.addEventListener(evnt_move,function(t){h=(t.pageX-n.x)/i*6-3}),t.appendChild(o)}function d(){a.fillStyle="#333",a.fillRect(0,0,i,i),s.update(),window.requestAnimationFrame(d)}t=function(t){u(document.getElementById(t)),d()}}(),t("snow");
},{}],11:[function(require,module,exports) {
var e=void 0;!function(){var t=void 0,n=void 0,i=document.createElement("canvas"),o=i.getContext("2d"),f={},a={},l=[];function r(e,t){return(l[t][1]-l[e][1])/(l[t][0]-l[e][0])}function x(){o.fillStyle="rgba(48, 48, 48, .135)",o.fillRect(0,0,t,t),function(){var e={};e.x=(a.x+n)%(t+n),e.y=a.y;var i=l.length;if(e.x<l[0][0]||e.x>l[i-1][0])e.y=.5*t;else for(var f=0,x=l.length;f<x;f++){var c=(f+1)%x;if(e.x>=l[f][0]&&e.x<l[c][0]){var y=r(f,c);e.y=(e.x-a.x)*y+a.y;break}}e.x<n&&(a.x=0,e.x=a.x+n),o.save(),o.beginPath(),o.moveTo(a.x,a.y),o.lineTo(e.x,e.y),o.closePath(),o.lineWidth=1,o.strokeStyle="#38c",o.stroke(),o.restore(),a.x=e.x,a.y=e.y}(),window.requestAnimationFrame(x)}e=function(e){!function(e){f.x=e.offsetLeft,f.y=e.offsetTop,t=Math.min(e.offsetWidth,e.offsetHeight),i.width=t,i.height=t,a.x=0,a.y=.5*t,n=t/(4*(l=[[0,.5],[.1,.35],[.2,.6],[.3,.5],[.4,.6],[.5,.5],[.6,.6],[.7,0],[.8,1],[.9,.3],[1,.6]]).length),l.map(function(e){e[0]=.375*t+.25*t*e[0],e[1]=.375*t+.25*t*e[1]}),o.fillStyle="#333",o.fillRect(0,0,t,t),e.innerHTML="",e.appendChild(i)}(document.getElementById(e)),x()}}(),e("heartbeat");
},{}],12:[function(require,module,exports) {
var n=void 0;!function(){function i(n){for(var i="",r=0;r<n;r++)i+='<span class="hexagon"></span>';return i}n=function(n){document.getElementById(n).innerHTML='<div class="round-shield">'+function(n){for(var r="",d=0;d<n;d++)r+='<div class="shield-row">'+i(12)+"</div>";return r}(7)+"</div>"}}(),n("round_shield");
},{}],13:[function(require,module,exports) {
var t=void 0;!function(){var e=void 0,i=document.createElement("canvas"),a=i.getContext("2d"),n={};var o={step:1,radius:0,update:function(){this.radius+=1.3/(2*Math.PI),a.save(),a.translate(o.x,o.y),a.rotate(this.radius),a.beginPath(),a.moveTo(0,0);for(var t=0;t<600;t++){var e=-Math.cos(t/(2*Math.PI))*t*t*.001,i=Math.sin(t/(2*Math.PI))*t*t*.001;a.lineTo(e,i)}a.strokeStyle="#fff",a.stroke(),a.closePath(),a.restore()}};function s(){a.fillStyle="#333",a.fillRect(0,0,e,e),o.update(),window.requestAnimationFrame(s)}t=function(t){!function(t){t.innerHTML="",n.x=t.offsetLeft,n.y=t.offsetTop,e=Math.min(t.offsetWidth,t.offsetHeight),i.style.width=e,i.style.height=e,i.width=e,i.height=e,t.appendChild(i)}(document.getElementById(t)),o.x=.5*e,o.y=.5*e,s()}}(),t("spiral");
},{}],6:[function(require,module,exports) {
"use strict";function e(e,t,r){for(var i=t-e,u=1/(i+1),n=0,o=[],a=1;a<=i;a++)n+=a*u,o.push(n);o.map(function(e,t){o[t]=1-e/n}),o.unshift(1),!r&&o.reverse();for(var l=1-Math.random(),s=0,c=0;c<i;c++)(!r&&l>=o[c]&&l<o[c+1]||r&&l>=o[c+1]&&l<o[c])&&(s=c+e);return s}require("./lightbox"),require("./maze"),require("./snow"),require("./heartbeat"),require("./roundshield"),require("./spiral"),[].slice.call(document.querySelectorAll("section [title]")).map(function(e){e.offsetLeft,e.offsetTop;var t=document.createElement("div");t.setAttribute("class","title-tag"),t.innerHTML=e.getAttribute("title"),e.removeAttribute("title"),e.appendChild(t)});
},{"./lightbox":9,"./maze":8,"./snow":10,"./heartbeat":11,"./roundshield":12,"./spiral":13}]},{},[6], null)
//# sourceMappingURL=js.737be12a.map