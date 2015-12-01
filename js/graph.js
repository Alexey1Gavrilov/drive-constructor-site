var app = app || {};

app.showGraph = function(element) {
  google.load('visualization', '1', {
    packages: ['corechart', 'line'],
    callback: app.drawLoadGraph
  });
}

app.drawLoadGraph = function() {
  var motor = app.system.toJSON().topology.elements.motor;
  var pump = app.system.toJSON().topology.elements.pump;
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Pump')
  if (motor.component) {
    data.addColumn('number', 'Motor normal torque');
    data.addColumn('number', 'Motor overload torque');
    var graphData = [];
    var loadGraphData = motor.component.loadGraphData;
    for (var i = 0; i < loadGraphData.speed.length; i++) {
      graphData.push([
          loadGraphData.speed[i],
          pump.loadGraphData.torque[i],
          loadGraphData.normalTorque[i],
          loadGraphData.overLoadTorque[i]])
    }
    data.addRows(graphData);
    title = 'Motor Load Curve';
  } else if (motor.candidates.length > 0) {
    var graphData = [];
    motor.candidates.forEach(function(c) {
      data.addColumn('number', c.manufacturer + ' ' + c.designation);
    });
    var speedArray = motor.candidates[0].loadGraphData.speed;
    for (var i = 0; i < speedArray.length; i++) {
      var row = [speedArray[i], pump.loadGraphData.torque[i]];
      motor.candidates.forEach(function(c) {
        row.push(c.loadGraphData.normalTorque[i]);
      });
      graphData.push(row);
    }
    data.addRows(graphData);
    title = 'Motors';
  }
  // Set chart options
  var options = {
    title: title,
    legend: {
      position: 'top'
    }
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.LineChart(
      document.getElementById('load-graph'));
  chart.draw(data, options);
}
