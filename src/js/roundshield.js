let round_shield;
(function() {
	function create_hexagon(num) {
		let text = '';
		for(let i=0; i<num; i++) {
			text += '<span class="hexagon"></span>';
		}
		return text;
	}
	function create_row(num) {
		let text = '';
		for(let i=0; i<num; i++) {
			text += ('<div class="shield-row">' + create_hexagon(12) + '</div>');
		}
		return text;
	}
	round_shield = function(id) {
		let box = document.getElementById(id);
		box.innerHTML = ('<div class="round-shield">' + create_row(7) + '</div>');
	}
}());

round_shield('round_shield');
