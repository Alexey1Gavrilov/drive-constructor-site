var app = app || {};

app.elementUtils = {

  toInputValue: function(element, param, paramName) {
    var paramValue = this.isCustomized(paramName) 
        ? app.elementUtils.custom[paramName].toInputValue(
              element,
              param,
              paramName)
        : element[paramName];
    if (paramValue == null && param.prop('tagName') === 'SELECT') {
      return '@null@';
    }
    var input = $('input[id="' + paramName + '"][type="number"]');
    if (input.length && param.prop('type') === 'checkbox') {
      param.prop('checked', paramValue == null);//.change();
    }
    return paramValue;
  },

  isCustomized: function(paramName) {
    return app.elementUtils.custom[paramName]
        && app.elementUtils.custom[paramName].toInputValue;
  },

  fromInputValue: function(element, param, paramName, paramValue) {
    if (paramValue === '@null@' && $(param).prop('tagName') === 'SELECT') {
      paramValue = null;
    }
    var checkbox = $('input[id="' + paramName + '"][type="checkbox"]');
    if (checkbox.length) {
      if ($(param).is(':checked')) {
        $(param).data('default-value', paramValue);
        paramValue = null; 
      } else {
        paramValue = $(param).data('default-value') || null;
      }
    }
    return this.isCustomized(paramName)
        ? app.elementUtils.custom[paramName].fromInputValue(
              element,
              param,
              paramName,
              paramValue)
        : paramValue;
  },

   renderParam: function(element, param, paramName) {
    if (app.elementUtils.custom[paramName] && app.elementUtils.custom[paramName].renderParam) {
      return app.elementUtils.custom[paramName].renderParam(element, param);
    }
  },

  custom: {
    ratedVoltageYRange: {
      toInputValue: function(element, param, paramName, paramValue) {
        if (!element['ratedVoltageYMin'] || !element['ratedVoltageYMax']) {
          return null;
        }
        var value = element['ratedVoltageYMin'] + '-' + element['ratedVoltageYMax'];
        return value;
      },

      fromInputValue: function(element, param, paramName, paramValue) {
        var result = {};
        var array = paramValue == null ? null : paramValue.split('-');
        result['ratedVoltageYMin'] = array == null ? null : Number(array[0]);
        result['ratedVoltageYMax'] = array == null ? null : Number(array[1]);
        return result;
      }
    },

    gridSideVoltageRange: {
      toInputValue: function(element, param, paramName, paramValue) {
        if (!element['gridSideVoltageMin'] || !element['gridSideVoltageMax']) {
          return null;
        }
        var value = element['gridSideVoltageMin'] + '-' + element['gridSideVoltageMax'];
        return value;
      },

      fromInputValue: function(element, param, paramName, paramValue) {
        var result = {};
        var array = paramValue == null ? null : paramValue.split('-');
        result['gridSideVoltageMin'] = array == null ? null : Number(array[0]);
        result['gridSideVoltageMax'] = array == null ? null : Number(array[1]);
        return result;
      }
    },

    machineSideVoltageRange: {
      toInputValue: function(element, param, paramName, paramValue) {
        if (!element['machineSideVoltageMin'] || !element['machineSideVoltageMax']) {
          return null;
        }
        var value = element['machineSideVoltageMin'] + '-' + element['machineSideVoltageMax'];
        return value;
      },

      fromInputValue: function(element, param, paramName, paramValue) {
        var result = {};
        var array = paramValue == null ? null : paramValue.split('-');
        result['machineSideVoltageMin'] = array == null ? null : Number(array[0]);
        result['machineSideVoltageMax'] = array == null ? null : Number(array[1]);
        return result;
      }
    },

    ratedSynchronousSpeedAtFrequency: {
      toInputValue: function(element, param, paramName, paramValue) {
        if (!element['ratedSynchronousSpeed'] || !element['ratedFrequency']) {
          return null;
        }
        var value = element['ratedSynchronousSpeed'] + '@'
            + element['ratedFrequency'] + ' Hz';
        return value;
      },

      fromInputValue: function(element, param, paramName, paramValue) {
        var result = {};
        var array = paramValue == null ? null : paramValue.split(/[@|\s]/);
        result['ratedSynchronousSpeed'] = array == null ? null : Number(array[0]);
        result['ratedFrequency'] = array == null ? null : Number(array[1]);
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
