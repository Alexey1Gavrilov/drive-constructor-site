<div id="result-motor" class="form-horizontal">
<div class="form-group">
  <label for="result-motor-select" class="control-label col-xs-2 col-md-2">Select</label>
  {% for index in (0..3) %}
  <div class="col-xs-2 col-md-2">
    <input name="result-motor-select" id="result-motor-select-{{index}}" type="radio"></input>
  </div>
  {% endfor %}
</div>
{% for param in site.data.elements["motor"] %}
<div class="form-group">
  <label for="result-motor-{{param[0]}}" class="control-label col-xs-2 col-md-2">{{param[1].label}}</label>
  {% for index in (0..3) %}
  <div class="col-xs-2 col-md-2">
    <input disabled id="result-motor-{{param[0]}}-{{index}}" class="form-control" value="{{param[0]}}"></input>
  </div>
  {% endfor %}
</div>
{% endfor %}
</div>
