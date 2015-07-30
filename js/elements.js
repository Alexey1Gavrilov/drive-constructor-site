var app = app || {};

app.elementUtils = {

  toInputValue: function(element, param, paramName) {
    if (app.elementUtils.custom[paramName]) {
      return app.elementUtils.custom[paramName].toInputValue(element, param, paramName);
    }
    var paramValue = element[paramName];
    if (paramValue == null 
        && param.prop("tagName") === 'SELECT') {
      return '<any>';
    }
    return paramValue;
  },

  fromInputValue: function(element, param, paramName, paramValue) {
    var result = {};
    if (paramValue === '<any>') {
      result[paramName] = null;
    }
    if (app.elementUtils.custom[paramName]) {
      return app.elementUtils.custom[paramName].fromInputValue(
          element,
          param,
          paramName,
          paramValue);
    }
    result[paramName] = paramValue;
    return result;
  },

  custom: {
    ratedVoltageYRange: {
      toInputValue: function(element, param, paramName, paramValue) {
        var value = element['ratedVoltageYMin'] + '-' + element['ratedVoltageYMax'];
        return value;
      },

      fromInputValue: function(element, param, paramName, paramValue) {
        var result = {};
        var array = paramValue.split('-');
        result['ratedVoltageYMin'] = array[0];
        result['ratedVoltageYMax'] = array[1];
        return result;
      }
    }
  }
}
