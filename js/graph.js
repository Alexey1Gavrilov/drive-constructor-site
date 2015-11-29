var app = app || {};

app.showGraph = function(element) {
  google.load('visualization', '1', {
    packages: ['corechart', 'line'],
    callback: app.drawLoadGraph
  });
}

app.drawLoadGraph = function() {
  var graphData = app.system.toJSON().topology.elements
      .motor.component.loadGraphData;
     // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Motor normal torque');
    data.addColumn('number', 'Motor overload torque');
    data.addRows(graphData);

    // Set chart options
    var options = {
      title: 'Motor Load Curve',
      legend: {
        position: 'top'
      }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(
        document.getElementById('load-graph'));
    chart.draw(data, options);
}
