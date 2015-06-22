---
---
var app = app || {};

app.loadSystem = function() {
  var id = $.cookie('currentSystemId');
  var callback = {
    success: function(system) {
      $('#element-form').show();
      app.trigger('system-loaded', system);
    }
  };
  if (id) {
    app.system = new app.System();
    app.system.set('id', id);
    app.system.fetch(callback);
  } else {
    var topologyUrl = app.getCurrentTopologyUrl();
    $.getJSON(topologyUrl + '/default.json', function(data) {
      app.system = new app.System({
        topology: data
      });
      app.system.save({}, callback);
    });
  }
};

(function() {

  app.System = Backbone.DeepModel.extend({    
    urlRoot: app.apiUrl +'/systems',

    initialize: function(attributes) {
      this.on('sync', this.storeId);
    },

    storeId: function(x, y) {
      $.cookie("currentSystemId", this.get('id'), { expires : 1 });
    }
  });
  app.loadSystem();
  app.on('system-loaded', function(system) {
    $('#element-form').removeClass('form-hidden')
    $(function() {
      app.systemView = new app.SystemView({
        el: $('#element-form'),
        model: system
      });
    });
  });
})();

