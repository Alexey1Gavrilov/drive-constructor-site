<div id="element-form" class="form-hidden" data-element="{{page.element}}">
{% for param in site.data.elements[page.element] %}
  {% assign loopindex = forloop.index | modulo: 2 %}
  {% if loopindex == 1 %}
  <div class="row">
  {% endif %}
  {% include inputs/input.md param="{{param[0]}}" %}
  {% if loopindex == 0 %}
  </div>
  {% endif %}
{% endfor %}
</div>
