---
---
var app = app || {};

app.apiUrl = "{{ site.apiUrl }}";
 _.extend(app, Backbone.Events);

app.alertTemplate = _.template([
  '<div class="alert alert-warning">',
    '<a href="#" class="close" data-dismiss="alert">&times;</a>',
    '<strong>Warning!</strong> <%= message %>',
  '</div>'].join(''));

app.showWarning = function(message) {
  var html = app.alertTemplate({message: message});
  $('#alert-placeholder').append(html);
};

app.hideWarning = function() {
  //$('#alert-placeholder').child().remove();
}

app.newSystem = function() {
  sessionStorage.removeItem('currentSystemId');
  location.reload();
}

app.getCurrentTopologyUrl = function() {
	var path = window.location.pathname.split('/');
	if (path[1] === 'topologies') {
		return '/topologies/' + path[2];
	}
}

