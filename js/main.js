$(document).ready(function() {
  var Topology = Backbone.Model.extend();
  var TopologyCollection = Backbone.Collection.extend({
    model: Topology
  });
  var Applicaiton = Backbone.Model.extend({
    topologies: TopologyCollection
  });
  var ApplicaitonList = Backbone.Collection.extend({
    model: Applicaiton,
    url: 'http://localhost:8080/api/applications'
  });
  var applications = new ApplicaitonList();

  var System = Backbone.Model.extend({
        url: 'http://localhost:8080/api/systems'
  });
  var SystemCollection = Backbone.Collection.extend({
    model: System,
    url: 'http://localhost:8080/api/systems'
  });

  applications.fetch({
    success: function() {
      var topology = applications.get(1).get('topologies')[0]; 
      console.log(applications.get(1).get('topologies')[0]);

      var system = new System({topology: topology})
      system.save({},{
        success: function() {
          console.log(system.get('id')); 
        }   
      });
    }
  });

  var SystemView = Backbone.View.extend({
    render: function() {
      console.log("xxx");
    }
  });

  var systemView = new SystemView({el: $('xxx')})
});
