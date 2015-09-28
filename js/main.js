---
---
var app = app || {};

app.apiUrl = "{{ site.apiUrl }}";

app.alertTemplate = _.template([
  '<div class="alert alert-warning">',
    '<a href="#" class="close" data-dismiss="alert">&times;</a>',
    '<strong>Warning!</strong> <%= message %>',
  '</div>'].join(''));

app.resetSystem = function() {
  window.location.hash = '';
  location.reload();
}

app.onError = function(model, response) {
  var message = response.responseText;
  if (response.responseJSON.errors) {
    message = response.responseJSON.errors.join('<br>');   
  } else if (response.responseJSON.message) {
    message = response.responseJSON.message;
  }
  console.log(message);
  var html = app.alertTemplate({message: message});
  $('#alert-placeholder').append(html);  
}

app.saveSystem = function() {
  app.system.save({}, {
    error: app.onError,
    
    success: function() {
      $('#result').removeClass('hidden');
      $('#save-button').prop('disabled', true);
      app.selectTopologyElement();
    }
  });  
}

app.getCurrentTopologyUrl = function() {
	var path = window.location.pathname.split('/');
	if (path[1] === 'topologies') {
		return '/topologies/' + path[2];
	}
}

app.selectTopologyElement = function(topology, element) {
  if (element != null) {
    $('#save-button').prop('disabled', false);
    $('#result').addClass('hidden');
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
  window.location.hash = '/' + id + '/' + (element ? element : '');
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
