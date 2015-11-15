var app = app || {};
app.selectedComponents = {};
app.elementsWithCandidates = [];

app.showCandidates = function(element) {
  var elements = app.system.toJSON().topology.elements;
  var candidates = elements[element].candidates;
  if (elements[element].component) {
    $('#result-candidates').hide();
    $('#result-final').show();
    $('#result-' + element).hide();
  } else {
    if (app.elementsWithCandidates.length == 0) {
      $('#result-' + element).show();
    } else {
      $('#result-' + element).hide();
    }
    app.elementsWithCandidates.push(element);
    $('#result-final').hide();
    $('#result-candidates').show();
    $('#save-button').prop('disabled', false);
  }
  candidates.forEach(function(c, i) {
    Object.keys(c).forEach(function(p) {
      var value = c[p];
      $('#result-' + element + '-' + p + '-' + i).val(value);
    });
  });
  for (var i = candidates.length; i < 4; i++) {
    $('div[id^="result-' + element + '-group-' + i + '"]').hide();
  }
};

$(function() {
  app.addSelectionListener('motor');
  app.addSelectionListener('converter');
});

app.addSelectionListener = function(element) {
  $('input[name="result-' + element + '-select"]')
      .on("change", function(x, y) {
    var index = $(x.target).data('candidate-index');
    var elements = app.system.toJSON().topology.elements;
    var candidate = elements[element].candidates[index];
    $('#result-' + element).hide();

    app.elementsWithCandidates = _.without(app.elementsWithCandidates, element);

    app.selectedComponents[element] = candidate;
    if (app.elementsWithCandidates.length == 0) {
      app.saveCandidates();
    } else {
      var next = app.elementsWithCandidates[0];
      console.log(app.elementsWithCandidates);
      $('#result-' + next).show();
    }
  });
}

app.saveCandidates = function() {
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
