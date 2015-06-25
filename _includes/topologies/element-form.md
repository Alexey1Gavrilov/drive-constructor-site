{% for param in site.data.elements[include.element] %}
  {% assign loopindex = forloop.index | modulo: 4 %}
  {% if loopindex == 1 %}
  <div class="row">
  {% endif %}
  {% include inputs/input.md element=include.element param="{{param[0]}}" %}
  {% if loopindex == 0 %}
  </div> <!-- end row -->
  {% endif %}
{% endfor %}
{% if loopindex == 1 %}
</div> <!-- end row -->
{% endif %}
