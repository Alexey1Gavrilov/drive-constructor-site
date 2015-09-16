var app = app || {};

app.elementUtils = {

  toInputValue: function(element, param, paramName) {
    var paramValue = element[paramName];
    if (paramValue == null 
        && param.prop("tagName") === 'SELECT') {
      return '@null@';
    }
    return paramValue;
    if (app.elementUtils.custom[paramName] && app.elementUtils.custom[paramName].toInputValue) {
      return app.elementUtils.custom[paramName].toInputValue(element, param, paramName);
    }
  },

  fromInputValue: function(element, param, paramName, paramValue) {
    var result = {};
    if (paramValue === '@null@') {
      paramValue = null;
    }
    if (app.elementUtils.custom[paramName] && app.elementUtils.custom[paramName].fromInputValue) {
      return app.elementUtils.custom[paramName].fromInputValue(
          element,
          param,
          paramName,
          paramValue);
    }
    result[paramName] = paramValue;
    return result;
  },

   renderParam: function(element, param, paramName) {
    if (app.elementUtils.custom[paramName] && app.elementUtils.custom[paramName].renderParam) {
      return app.elementUtils.custom[paramName].renderParam(element, param);
    }
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
    },

    coolantTemperature: {
      renderParam: function(element, div) {
        if (element['cooling'] === 'AIR') {
          div.hide();
        } else {
          div.show();
        }
      }
    }
  }
}
