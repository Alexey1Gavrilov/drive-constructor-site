var app = app || {};

$(function() {
  app.SystemView = Backbone.View.extend({

    events : {
      'change input': 'changed',
      'change select': 'changed'
    },

    initialize: function() {
      _.bindAll(this, 'changed');
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'fetch', app.hideWarning());
      this.render();
    },

    onError: function(model, response) {
      var message = response.responseText;
      if (response.responseJSON.errors) {
        message = response.responseJSON.errors.join('<br>');   
      } else if (response.responseJSON.message) {
        message = response.responseJSON.message;
      }
      console.log(message);
      app.showWarning(message);    
    },

    changed: function(evt) {
      var changed = evt.currentTarget;
      var value = $(evt.currentTarget).val();
      var element = $('#element-form').data('element');
      this.model.set('topology.elements.'
          + element + '.' + changed.id, value);
      this.model.save({}, {error: this.onError});
    },

    render: function() {
      _.each(this.model.attributes.topology.elements,
        function(value, key) {
          _.each(value, function(paramValue, paramName) {
            $('[data-element="' + key + '"]')
              .find('input[id=' + paramName+ ']')
              .val(paramValue);  
          });
        });
    }
  });
});