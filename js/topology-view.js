var app = app || {};

$(function() {
  app.SystemView = Backbone.View.extend({

    events : {
      'change input': 'changed',
      'change select': 'changed'
    },

    initialize: function() {
      _.bindAll(this, 'changed');
      this.listenTo(this.model, 'changed', this.render);
      this.render();
    },

    changed: function(evt) {
      var changed = evt.currentTarget;
      var value = $(evt.currentTarget).val();
      var element = $('#element-form')
          .children()
          .first()
          .attr('id');
      this.model.set('topology.elements.'
          + element + '.' + changed.id, value);
      this.model.save();
    },

    render: function() {
      console.log(this.model.attributes)
      _.each(this.model.attributes.topology.elements,
        function(value, key) {
          _.each(value, function(paramValue, paramName) {
            $('#' + key).find('input[id=' + paramName+ ']')
              .val(paramValue);  
          });
        });
    }
  });
});