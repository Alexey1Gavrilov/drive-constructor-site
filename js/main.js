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
  $.removeCookie('currentSystemId');
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
      $('#save-button').prop('disabled', true);
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

$(function () {
  $('[data-toggle="popover"]').popover();
  $('body').on('click', function (e) {
    //only buttons
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('.popover.in').length === 0) { 
        $('[data-toggle="popover"]').popover('hide');
    }
  });
  $('[data-toggle="popover"]').click(function() {
    $('[data-toggle="popover"]').not(this).popover('hide'); //all but this
  });
})

