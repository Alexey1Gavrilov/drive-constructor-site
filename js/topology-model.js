---
---
var app = app || {};

app.loadSystem = function() {
  var id = sessionStorage.getItem('currentSystemId');
  var callback = {
    success: function(system) {
      app.trigger('system-loaded', system);
    }
  };
  if (id) {
    app.system = new app.System();
    app.system.set('id', id);
    app.system.fetch(callback);
  } else {
    app.system = new app.System({
      topology: app.applications.get(1).get('topologies')[0]
    });
    app.system.save({}, callback);
  }
};

(function() {
  var apiUrl = "{{ site.apiUrl }}";

  app.System = Backbone.DeepModel.extend({    
    urlRoot: apiUrl +'/systems',

    initialize: function(attributes) {
      this.on('sync', this.storeId);
    },

    storeId: function(x, y) {
      sessionStorage.setItem('currentSystemId', this.get('id'));
    }
  });
  app.on('application-loaded', app.loadSystem);
  app.on('system-loaded', function(system) {
    $(function() {
      console.log(document.readyState);
      app.systemView = new app.SystemView({
        el: $('#element-form'),
        model: system
      });
    });
  });
})();

