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
      initialize: function() {

      },
      urlRoot: 'http://localhost:8080/api/systems'
  });

  var SystemCollection = Backbone.Collection.extend({
    model: System,
    url: 'http://localhost:8080/api/systems'
  });

   var SystemView = Backbone.View.extend({
        events : {
            "change input" :"changed",
            "change select" :"changed"
        },

        initialize: function() {
          _.bindAll(this, "changed");
          this.listenTo(this.model, "change", this.render);
        },

        changed: function(evt) {
           var changed = evt.currentTarget;
           var value = $(evt.currentTarget).val();
           var element = $('#element-form').children().first().attr('id');
           var obj = this.model.attributes.topology.elements;
           obj[element][changed.id] = value;
           this.model.set(this.model);
        },

        render: function() {
          _.each(this.model.attributes.topology.elements,
              function(value, key) {
                _.each(value, function(paramValue, paramName) {
             //     console.log(key + ' ' + paramName + ' ' + paramValue);
                  $('#' + key).find('input[id=' + paramName+ ']')
                      .val(paramValue);  
                });
              });
        }
      });

/*  if (sessionStorage.getItem('currentSystem')) {
      var system = new System($.parseJSON(sessionStorage.getItem('currentSystem')));
      system.bind('change', function() {
        sessionStorage.setItem('currentSystem', JSON.stringify(system.toJSON()));    
      });
      var systemView = new SystemView({
        el: $('#element-form'),
        model: system
      });
      systemView.render();
      return;
  }
*/
  applications.fetch({
    success: function() {
      var topology = applications.get(1).get('topologies')[0]; 

      var system = new System({topology: topology});
     
      var systemView = new SystemView({
        el: $('#element-form'),
        model: system
      });

      system.save({}, {
        success: function() {
          console.log(system.get('id'));
          sessionStorage.setItem('currentSystem', JSON.stringify(system.toJSON()))
        }   
      });
    }
  });
});
