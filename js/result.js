var app = app || {};
app.selectedComponents = {};

app.showCandidates = function() {
  var elements = app.system.toJSON().topology.elements;
  var candidates = elements.motor.candidates;
  if (elements.motor.component || candidates.length <= 1) {
    $('#result-candidates').hide();
    $('#result-final').show();
  } else {
    $('#result-final').hide();
    $('#result-candidates').show();
    $('#save-button').prop('disabled', false);
  }
  candidates.forEach(function(c, i) {
    Object.keys(c).forEach(function(p) {
      var value = c[p];
      $("#result-motor-" + p + "-" + i).val(value);
    });
  });
  for (var i = candidates.length; i < 4; i++) {
    $('div[id^="result-motor-group-' + i + '"]').hide();
  }
};

$(function() {
  $('input[name="result-motor-select"]').on("change", function(x, y) {
    var index = $(x.target).data('candidate-index');
    var elements = app.system.toJSON().topology.elements;
    var candidate = elements.motor.candidates[index];
    app.selectedComponents['motor'] = candidate;
    app.saveCandidate();
  });
});

app.saveCandidate = function() {
  var id = app.system.toJSON().id;
  $.ajax(app.apiUrl + '/systems/' + id + '/components', {
      data : JSON.stringify(app.selectedComponents),
      contentType : 'application/json',
      type : 'PUT' })
    .done(function(data) {
      app.system.fetch({
        success: function() {
          app.showResult();
        }
      });
    });
}
