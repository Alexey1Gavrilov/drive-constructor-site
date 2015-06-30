var app = app || {};

(function() {
  app.SystemView = Backbone.View.extend({

    events : {
      'change input': 'changed',
      'change select': 'changed'
    },

    initialize: function() {
      _.bindAll(this, 'changed');
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    changed: function(evt) {
      var changed = evt.currentTarget;
      var value = $(evt.currentTarget).val();
      if (value === '<any>') {
        value = null;
      }
      this.model.set('topology.elements.'
          + app.activeElement + '.' + changed.id, value);
    },

    render: function() {  
      _.each(this.model.attributes.topology.elements,
        function(value, key) {
          _.each(value, function(paramValue, paramName) {
            var param = $('[data-element-form="' + key + '"]')
              .find('[id=' + paramName + "]");
            if (paramValue == null 
                && param.prop("tagName") === 'SELECT') {
              paramValue = '<any>';
            }
            param.val(paramValue);
          });
        });
        $('#save-button').prop('disabled', !this.model.hasChanged());
    }
  });
})();