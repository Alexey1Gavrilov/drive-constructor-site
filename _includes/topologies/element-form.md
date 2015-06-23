{% for param in site.data.elements[include.element] %}
  {% assign loopindex = forloop.index | modulo: 2 %}
  {% if loopindex == 1 %}
  <div class="row">
  {% endif %}
  {% include inputs/input.md param="{{param[0]}}" %}
  {% if loopindex == 0 %}
  </div> <!-- end row -->
  {% endif %}
{% endfor %}
{% if loopindex == 1 %}
</div> <!-- end row -->
{% endif %}
