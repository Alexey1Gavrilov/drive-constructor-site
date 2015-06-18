---
---
var app = app || {};

$(function() {
  var apiUrl = "{{ site.apiUrl }}";

  var System = Backbone.DeepModel.extend({
    defaults: function() {
      return {
        topology: app.applications.get(1).get('topologies')[0]
      };
    },
    
    urlRoot: apiUrl +'/systems',

    initialize: function() {
      this.on('sync', this.storeId);
    },

    storeId: function(x, y) {
      sessionStorage.setItem('currentSystemId', this.get('id'));
    }
  });
  app.on('application-loaded', function() {
    app.system = new System();
    var id = sessionStorage.getItem('currentSystemId');
    var callback = {
      success: function(system) {
        app.trigger('system-loaded', system);
      }
    };
    if (id) {
      app.system.set('id', id);
      app.system.fetch(callback);
    } else {
      app.system.save({}, callback);
    }
  });
  app.on('system-loaded', function(system) {
    var systemView = new app.SystemView({
      el: $('#element-form'),
      model: system
    });
  });
});

