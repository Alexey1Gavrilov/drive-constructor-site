<h3>Result</h3>

<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</p>

<div id="result-candidates">
  <div class="row">
  {% include topologies/result-element.md name='motor' %}
  </div>
  <div class="row">
  {% include topologies/result-element.md name='converter' %}
  </div>
</div>
<div id="result-final">
  <div class="row">
    <div class="col-xs-4 col-md-4">
      <h4>Pump</h4>
      <textarea id="pump" rows="10" class="form-control">
      </textarea>
    </div>
    <div class="col-xs-4 col-md-4">
      <h4>Motor</h4>
      <textarea id="motor" rows="10" class="form-control">
      </textarea>
    </div>
    <div class="col-xs-4 col-md-4">
      <h4>Converter</h4>
      <textarea id="converter" rows="10" class="form-control">
      </textarea>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-6 col-md-6">
      <div class="thumbnail">
        <img src="/images/result1.png"/>
      </div>
    </div>
    <div class="col-xs-6 col-md-6">
      <div class="thumbnail">
        <img src="/images/result2.png"/>
      </div>
    </div>
  </div>
</div>
<!-- end result -->
