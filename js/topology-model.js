---
---
var app = app || {};

app.parseUrl = function() {
  var pattern = new UrlPattern('*/topologies/:topology/index.html#:id/:element');
  return pattern.match(window.location.href);
}

app.loadSystem = function(callback) {
  var match = this.parseUrl();
  if (match && match.id) {
    app.system = new app.System();
    app.system.set('id', match.id);
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
    urlRoot: app.apiUrl +'/systems'
    /*,initialize: function(attributes) {
      this.on('sync', this.storeId);
    }*/
  });
  var callback = {
    success: function(system) {
      $(function() {
        app.systemView = new app.SystemView({
          el: $('#element-form'),
          model: system
        });
        var e = Object.keys(system.get('topology.elements'))[0];
        var topology = null;
        var match = app.parseUrl();
        if (match) {
          e = match.element;
          topology = match.topology;
        }
        app.selectTopologyElement(topology, e)
      });
    }
  };

  var Router = Backbone.Router.extend({
    routes: {
      ':systemId/:element': 'elementChanged'
    },

    elementChanged: function(systemId, element) {
      if (app.system) {
        app.selectTopologyElement(null, element);
      }
    }
  });
  app.router = new Router();
  Backbone.history.start();
  app.loadSystem(callback);
})();

