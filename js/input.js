$(function() {
	$('input[type="range"]').on("input", function(x, y) {
			var input = $('input[id="' + this.id 
				+ '"][type="number"]');
			input.val(this.value);
		});
	$('input[type="checkbox"]').on("change", function(x, y) {
		var input = $('input[id="' + $(this).data('param-id')
				+ '"][type="number"]');
		input.attr('disabled', $(this).is(':checked'))
		if ($(this).is(':checked')) {
			input.val(null);			
		}
	});
});
