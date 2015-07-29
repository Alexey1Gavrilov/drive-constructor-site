{% assign param=include.param %}
{% for value in param[1].values %}
	{% if param[1].options %}
	{% assign index = forloop.index | minus: 1 %}
	<option value="{{value}}">{{param[1].options[index]}}</option> 
	{% else %}
	<option value="{{value}}">{{value}}</option>
	{% endif %}
{% endfor %}
