{% assign param=site.data.elements[page.element][include.param] %}
<div class="col-xs-6 form-group">
<label>{{param[1].label}}</label>
{% if param[1].type == 'select' %}
	<select id="{{param[0]}}" class="form-control">
	{% if param[1].any %}
		<option value="<any>">(any)</option>
	{% endif %}
	{% for value in param[1].values %}
		{% if param[1].options %}
		{% assign index = forloop.index | minus: 1 %}
		<option value="{{value}}">{{param[1].options[index]}}</option> 
		{% else %}
		<option value="{{value}}">{{value}}</option>
		{% endif %}
	{% endfor %}
	</select>
{% else %}
 	<input id="{{param[0]}}" class="form-control" type="{{param[1].type}}"/>
{% endif %}
</div>
