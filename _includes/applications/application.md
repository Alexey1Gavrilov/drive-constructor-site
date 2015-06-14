# {{page.title}}

{% for t in site.data.topologies %}
	{% if t[1].applications contains page.appName %}
		{% assign name=t[0] %}
  	{% include topologies/topology.md name=name disabled=true %}		
  {% endif %}
{% endfor %}
