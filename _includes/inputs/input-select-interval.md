{% assign interval=include.param[1].interval %}
{% for number in (interval.from...interval.to) %}
	{% assign value=number | divided_by: interval.mod %}
	{% if value == 0 %}
    {% assign value=0 %}
  {% endif %}
	<option value="{{value}}">{{value}}</option>
{% endfor %}
