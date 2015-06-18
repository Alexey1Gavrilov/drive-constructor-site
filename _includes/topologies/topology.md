{% assign topology=site.data.topologies[include.name] %}

{% if include.disabled %}
	{% assign disabled="disabled" %}
### [{{ topology.title }}](/topologies/{{ include.name }})
{% else %}
## {{topology.title}}
{% endif %}

<div class="btn-group btn-group-border" role="group">
{% for e in topology.elements %}
  {% if e == include.activeElement %}
  		{% assign active="active" %}
  {% else %}
  		{% assign active=nil %}
  {% endif %}
 	<a class="btn btn-default no-padding {{disabled}} {{active}}"
 			href="/topologies/{{include.name}}/elements/{{e}}.html">
		<div class="icon-el-{{e}} normal"></div>	
	</a>
{% endfor %}
</div>
