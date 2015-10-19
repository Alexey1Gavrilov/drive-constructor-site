$(function() {
  $('input[type="range"]').on("input", function(x, y) {
      var input = $('input[id="' + this.id 
        + '"][type="number"]');
      input.val(this.value);
    });
  $('input[type="checkbox"]').on("change", function(x, y) {
    var input = $('input[id="' + this.id + '"][type="number"]');
    var input2 = $('input[id="' + this.id + '"][type="range"]');
    input.attr('disabled', $(this).is(':checked'));
    input2.attr('disabled', $(this).is(':checked'));
  });
});
