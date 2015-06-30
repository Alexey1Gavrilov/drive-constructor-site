{% assign topology=site.data.topologies[include.name] %}

{% if include.disabled %}
	{% assign disabled="disabled" %}
### [{{ topology.title }}](/topologies/{{name}}/index.html)
{% else %}
## {{topology.title}}
{% endif %}

<p>
{{topology.text}}
</p>

<div class="btn-group btn-group-border" role="group">
{% for e in topology.elements %}
 	<div id="element-button-{{e}}"
 			class="btn btn-default no-padding {{disabled}} {{active}}"
    	data-element-button="{{e}}"
    	onClick="app.selectTopologyElement('{{name}}', '{{e}}')">
		<div class="icon-el-{{e}} normal"></div>
	</div>
{% endfor %}
</div>

{% if include.disabled == null %}

<div id='alert-placeholder'></div>

<div id="element-form">
{% for e in topology.elements %}
  <div id="element-form-{{e}}" hidden data-element-form="{{e}}">
  {% include topologies/element-form.md element=e %}
  </div><!-- end form -->
{% endfor %}
</div>
<div class="pull-right">
	<button id="save-button" onClick="app.saveSystem()" 
			class="btn-primary btn">Calculate</button>
	<button id="reset-button" onClick="app.resetSystem()"
			class="btn-primary btn">Reset</button>
</div>
{% endif %}