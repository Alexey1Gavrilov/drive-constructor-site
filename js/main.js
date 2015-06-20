var app = app || {};

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