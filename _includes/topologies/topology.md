{% if include.name %}
{% assign name=include.name %}
{% else %}
{% assign name=page.topology %}
{% endif %}

{% assign topology=site.data.topologies[name] %}

{% if include.disabled %}
	{% assign disabled="disabled" %}
### [{{ topology.title }}](/topologies/{{name}})
{% else %}
## {{topology.title}}
{% endif %}

<div class="btn-group btn-group-border" role="group">
{% for e in topology.elements %}
  {% if e == page.element %}
  		{% assign active="active" %}
  {% else %}
  		{% assign active=nil %}
  {% endif %}
 	<a class="btn btn-default no-padding {{disabled}} {{active}}"
 			href="/topologies/{{name}}/elements/{{e}}.html">
		<div class="icon-el-{{e}} normal"></div>	
	</a>
{% endfor %}
</div>

<div id="alert-placeholder"></div>

<div class="btn-group" role="group" aria-label="">
  <button type="button" class="btn btn-default"
  		onClick="app.newSystem()">New system</button>
</div>
