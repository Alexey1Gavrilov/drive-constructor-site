---
---
var app = app || {};

$(function() {
  _.extend(app, Backbone.Events);
  var apiUrl = "{{ site.apiUrl }}";
  Applicaiton = Backbone.Model.extend({});

  var ApplicaitonCollection = Backbone.Collection.extend({
    model: Applicaiton,

    url: apiUrl + '/applications'
  });
  
  app.applications = new ApplicaitonCollection();
  app.applications.fetch({
    success: function() {
      app.trigger("application-loaded") 
    }
  });

});
