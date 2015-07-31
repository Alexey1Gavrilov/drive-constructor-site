---
---
var app = app || {};

app.loadSystem = function(callback) {
  var id = $.cookie('currentSystemId');
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
  var callback = {
    success: function(system) {
      $(function() {
        app.systemView = new app.SystemView({
          el: $('#element-form'),
          model: system
        });
        var e = Object.keys(system.get('topology.elements'))[0];
        var pattern = new UrlPattern('*/topologies/:topology/index.html#:element');
        var match = pattern.match(window.location.href);
        if (match.element) {
          e = match.element;
        }
        app.selectTopologyElement(match.topology, e)
      });
    }
  };
  app.loadSystem(callback);
})();

