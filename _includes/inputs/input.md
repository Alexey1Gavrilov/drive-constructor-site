{% capture more_info %}
[More info...](/help/{{include.element}}/{{param[0]}}.html)
{% endcapture %}
{% assign param=site.data.elements[page.element][include.param] %}
<div class="col-xs-6 col-md-3 form-group">
<label 
	class="text-info label-link"
	data-toggle="popover"
	data-content="{{param[1].content | xml_escape}}{{more_info | markdownify | xml_escape}}"
	data-html="true" data-title="{{param[1].label}}">{{param[1].label}}:</label>
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
