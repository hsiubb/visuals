// 梯度随机数
function grad_random(min, max, is_fall) {
	let dis = max - min;
	let step = 1 / (dis + 1);

	let total = 0;
	let list = [];
	for(let i=1; i<=dis; i++) {
		total += (i * step);
		list.push(total);
	}
	list.map(function(val, i) {
		list[i] = 1 - val / total;
	});
	list.unshift(1);

	!is_fall && list.reverse();

	let rand = 1 - Math.random();
	let result = 0;
	for(let i=0; i<dis; i++) {
		if(
			(!is_fall && rand >= list[i] && rand < list[i+1]) || (is_fall && rand >= list[i+1] && rand < list[i])
		) {
			result = i + min;
		}
	}

	return result;
}

[].slice.call(document.querySelectorAll('section [data-board]')).map(function(block) {
	let type = block.getAttribute('data-board');
	let left = block.offsetLeft;
	let top = block.offsetTop;

	let title_tag = document.createElement('div');
	title_tag.setAttribute('class', 'title-tag');
	title_tag.innerHTML = type;

	block.appendChild(title_tag);
	let tag_list = [].slice.call(block.querySelectorAll('.title-tag + .title-tag'));
	if(tag_list.length) {
		[].slice.call(block.querySelectorAll('.title-tag + .title-tag')).map(function(tag) {
			block.removeChild(tag);
		});
	}
});


// import './skate-rink';
import './snow';
import './firework';
import './strange';
// import './earth';
import './spiral';
import './heartbeat';
import './gears';
import './roundshield';
import './maze';
import './drip';
import './dots';
// import './lightbox';
// import './dot-line';
