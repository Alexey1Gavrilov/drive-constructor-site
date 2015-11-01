---
---
var app = app || {};

app.apiUrl = "{{ site.apiUrl }}";

app.alertTemplate = _.template([
  '<div class="alert alert-danger">',
    '<a href="#" class="close" data-dismiss="alert">&times;</a>',
    '<strong>Errors:</strong><br />',
    '<%= message %>',
  '</div>'].join(''));

app.resetSystem = function() {
  window.location.hash = '';
  window.location.reload();
}

app.invalidInputs = [];

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

app.onError = function(model, response) {
  var message = '';
  if (response.responseJSON.errors) {
    response.responseJSON.errors.forEach(function (v) {
      if (v.property.startsWith('topology.elements.')) {
        var path = v.property.split('.');
        var form = $('#element-form-' + path[2]);
        var button = $('#icon-el-' + path[2]);
        button.addClass('invalid-element');
        var input = $(form.find($('div[data-param="'
            + path[3] + '"]')));
        input.addClass('has-error');
        app.invalidInputs.push({input: input, button: button});
        var label = $(form.find($('#label-' + path[3]))).text();
        message += '<i>' + path[2].capitalizeFirstLetter() 
            + ' :: '+ label + ' : </i> '
            + v.message + '<br />';
      } else {
        message += v.message + '<br />';
      }
    });
  } else if (response.responseJSON.message) {
    message = response.responseJSON.message;
  }
  var html = app.alertTemplate({message: message});
  $('#alert-placeholder').append(html);
}

app.saveSystem = function() {
  $('#alert-placeholder').find('.alert').alert('close');
  app.invalidInputs.forEach(function(i) {
    i.input.removeClass('has-error');
    i.button.removeClass('invalid-element');
  });
  app.invalidInputs = [];
  app.system.save({}, {
    error: app.onError,
    
    success: function() {
      app.selectTopologyElement(null, 'result');
    }
  });  
}

app.showResult = function() {
  $('#result').removeClass('hidden');
  $('#save-button').prop('disabled', true);
  var pump = app.system.toJSON().topology.elements.pump;
  $('textarea[id="pump"]').val(JSON.stringify(pump, null, 2));
  var motor = app.system.toJSON().topology.elements.motor;
  $('textarea[id="motor"]').val(JSON.stringify(motor, null, 2));
  var converter = app.system.toJSON().topology.elements.converter;
  $('textarea[id="converter"]').val(JSON.stringify(converter, null, 2));
},

app.getCurrentTopologyUrl = function() {
	var path = window.location.pathname.split('/');
	if (path[1] === 'topologies') {
		return '/topologies/' + path[2];
	}
}

app.selectTopologyElement = function(topology, element) {
  if (element != null && element != 'result') {
    $('#save-button').prop('disabled', false);
    $('#result').addClass('hidden');
  } else if (element == 'result') {
    app.showResult();
  }
  app.activeElement = element; 
  $('div[data-element-form]').each(function(index, e) {
    var el = $(e);
    if (el.data('element-form') === element) {
      el.show();
    } else {
      el.hide();
    }
  });
  $('div[data-element-button]').each(function(index, e) {
    var el = $(e);
    if (el.data('element-button') === element) {
      el.addClass('active')
    } else {
      el.removeClass('active')
    }
  });
  var id = app.system.get('id');
  app.router.navigate(id + '/' + (element ? element : ''));
}

app.spinner = new Spinner().spin();

$.ajaxSetup({
  beforeSend: function() {
//  	$(document.getElementById('loading').appendChild(app.spinner.el));
  },  
  complete: function() {
  //	app.spinner.stop();
  }
});
