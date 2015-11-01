{% capture more_info %}
[More info...](/help/applications/{{include.element}}/{{param[0]}}.html)
{% endcapture %}
{% assign param=site.data.elements[page.element][include.param] %}
<div id="element-param" data-param="{{param[0]}}" class="col-xs-6 col-sm-3 col-md-3 col-lg-3 form-group">
<label 
	id="label-{{param[0]}}"
	class="text-info label-link"
	data-toggle="popover"
	data-content="{{param[1].content | xml_escape}}{{more_info | markdownify | xml_escape}}"
	data-html="true" data-title="{{param[1].label}}">{{param[1].label}}</label>
{% if param[1].type == 'select' %}
	<select id="{{param[0]}}" class="form-control" {{param[1].attributes}}>
	{% if param[1].nullValue %}
		<option value="@null@">{{param[1].nullValue}}</option>
	{% endif %}
	{% if param[1].interval %}
		{% include inputs/input-select-interval.md param=param %}
  {% else %}
    {% include inputs/input-select-values.md param=param %}
	{% endif %}
	</select>
{% elsif param[1].type == 'number' %}
	<div class="form-group">
    {% if param[1].nullValue %}
    <div class="input-group">
      <span class="input-group-addon">
        <input id="{{param[0]}}" type="checkbox" aria-label="..."> any</input>
      </span>
    {% endif %}
	 	<input id="{{param[0]}}" min="{{param[1].min}}"
	 		max="{{param[1].max}}" class="form-control" type="number"/>
    {% if param[1].nullValue %}
    </div>
    {% endif %}  
 		<input id="{{param[0]}}" min="{{param[1].min}}"
	 		max="{{param[1].max}}" type="range" step="{{param[1].step}}"/>
 	</div>
{% else %}
 	<input id="{{param[0]}}" class="form-control" type="{{param[1].type}}"/>
{% endif %}
</div>
