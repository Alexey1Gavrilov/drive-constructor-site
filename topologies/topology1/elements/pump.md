---
layout: default
topology: true
---
{% include topologies/topology.md name="topology1" activeElement="pump"%}

<div id="element-form">
<div id="motor" class="row">
        <div class="col-xs-6 form-group">
            <label>Label1:</label>
            <input id="type" class="form-control"/>
        </div>
        <div class="col-xs-6 form-group">
            <label>Label2</label>
            <input id='ratedPower' class="form-control" type="number"/>
        </div>
        <div class="col-xs-6">
            <div class="row">
                <label class="col-xs-12">Label3</label>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <input id="ipClass" class="form-control" type="text"/>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <input id='ipClass' class="form-control" type="text"/>
                </div>
            </div>
        </div>
        <div class="col-xs-6 form-group">
            <label>Label4</label>
            <select id="frameMaterial" class="form-control">
                <option value="XXX">XXX</option>
                <option value="STEEL">STEEL</option>
            </select>
        </div>
    </div>
</div>
