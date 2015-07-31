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
        result['ratedVoltageYMin'] = Number(array[0]);
        result['ratedVoltageYMax'] = Number(array[1]);
        return result;
      }
    },

    ratedSynchronousSpeedAtFrequency: {
      toInputValue: function(element, param, paramName, paramValue) {
        var value = element['ratedSynchronousSpeed'] + '@'
            + element['ratedFrequency'] + ' Hz';
        return value;
      },

      fromInputValue: function(element, param, paramName, paramValue) {
        var result = {};
        var array = paramValue.split(/[@|\s]/);
        result['ratedSynchronousSpeed'] = Number(array[0]);
        result['ratedFrequency'] = Number(array[1]);
        return result;
      }
    }
  }
}
