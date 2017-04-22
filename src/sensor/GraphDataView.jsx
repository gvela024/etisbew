const React = require('react');
const Panel = require('react-bootstrap/lib/Panel');
const loadjs = require('loadjs');

const options = {
  title: 'Accelerometer and Compass readings from Android',
  series: {
    0: {
      targetAxisIndex: 0
    },
    1: {
      targetAxisIndex: 1
    }
  },
  vAxes: {
    0: {
      title: 'Accelerometer x-Axis'
    },
    1: {
      title: 'Accelerometer y-Axis'
    }
  },
  width: 800,
  height: 500,
};

class GraphDataView extends React.Component {
  constructor(props) {
    super(props);

    const prepareChart = () => {
      this.data = new this.google.visualization.DataTable();
      this.data.addColumn('string', 'Timestamp');
      this.data.addColumn('number', 'Accelerometer x-Axis');
      this.data.addColumn('number', 'Accelerometer y-Axis');
      this.chart = new this.google.visualization.LineChart(document.getElementById('chart_div'));
    }

    const onSuccess = () => {
      google.charts.load('current', {'packages': ['corechart']});
      google.charts.setOnLoadCallback(prepareChart);
      this.google = google;
    }

    loadjs(['https://www.gstatic.com/charts/loader.js'], 'Google Charts', {
      success: onSuccess,
      error: function(depsNotFound) {
        console.log('error: ', depsNotFound);
      }
    });
  }

  render() {
    if (this.props.sensors[this.props.indexOfSensorBeingGraphed] && this.google !== undefined) {
      const sensor = this.props.sensors[this.props.indexOfSensorBeingGraphed];
      this.data.removeRows(0, this.data.getNumberOfRows());
      sensor.readings.forEach((reading) => {
        this.data.addRow([reading.timestamp, reading.temperature, reading.relativeHumidity]);
      });
      this.chart.draw(this.data, options);
    }

    return (
      <div id='chart_div'></div>
    )
  }
}

module.exports = GraphDataView;
