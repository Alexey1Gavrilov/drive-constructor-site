<div id="result-{{include.name}}" class="form-horizontal">
<div class="form-group">
  <label for="result-{{include.name}}-select" class="control-label col-xs-2 col-md-2">Select</label>
  {% for index in (0..3) %}
  <div id="result-{{include.name}}-group-{{index}}" class="col-xs-2 col-md-2">
    <input name="result-{{include.name}}-select" id="result-{{include.name}}-select-{{index}}" type="radio" data-candidate-index="{{index}}"></input>
  </div>
  {% endfor %}
</div>
{% for param in site.data.candidates[{{include.name}}] %}
<div id="result-{{include.name}}-group" class="form-group">
  <label for="result-{{include.name}}-{{param[0]}}" class="control-label col-xs-2 col-md-2">{{param[1].label}}</label>
  {% for index in (0..3) %}
  <div id="result-{{include.name}}-group-{{index}}" class="col-xs-2 col-md-2">
    <input id="result-{{include.name}}-{{param[0]}}-{{index}}" class="form-control" value="{{param[0]}}"></input>
  </div>
  {% endfor %}
</div>
{% endfor %}
</div>
