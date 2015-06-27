$(function() {
	$('input[type="range"]').on("input", function(x, y) {
			var input = $('input[id="' + this.id 
				+ '"][type="number"]');
			input.val(this.value);
		});
});