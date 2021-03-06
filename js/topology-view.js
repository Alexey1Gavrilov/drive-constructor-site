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
      var result = app.elementUtils.fromInputValue(
        this.model.attributes.topology.elements[app.activeElement],
        evt.currentTarget,
        changed.id,
        value);
      var model = this.model;
      if (_.isObject(result)) {
        _.each(result, function(v, k) {
            model.set('topology.elements.'
                + app.activeElement + '.' + k, v);
        });
      } else {
          model.set('topology.elements.'
                + app.activeElement + '.' + changed.id, result);
      }
    },

    render: function() {
      var elements = this.model.attributes.topology.elements;
      $('div[id^="element-form-"]').each(function(i, object) {
        var element = $(object).data('element-form');
        $(object).find('input,select').each(function(j, input) {
          var paramName = $(input).attr('id');
          var paramValue = app.elementUtils.toInputValue(
                elements[element],
                $(input),
                paramName); 
          $(input).val(paramValue);
        });
        $(object).find('div[id="element-param"]').each(function(j, div) {
          var paramName = $(div).data('param');
          app.elementUtils.renderParam(
                element,
                elements[element],
                $(div),
                paramName);
        });
      });
      $('#save-button').prop('disabled', !this.model.hasChanged());
    }
  });
})();