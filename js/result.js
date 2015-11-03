var app = app || {};

app.showCandidates = function() {
  var elements = app.system.toJSON().topology.elements;
  var candidates = elements.motor.candidates;
  if (candidates.length <= 1) {
  	$('#result-motor').hide();
  }
  candidates.forEach(function(c, i) {
    Object.keys(c).forEach(function(p) {
      var value = c[p];
      $("#result-motor-" + p + "-" + i).val(value);
    });
  });
  for (var i = candidates.length; i < 4; i++) {
  	console.log(i);
  	$('div[id^="result-motor-group-' + i + '"]').hide();
  }
};
