const React = require('react');
const Table = require('react-bootstrap/lib/Table');
const Button = require('react-bootstrap/lib/Button');

class SensorsListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sensorRows = this.props.sensors.map((sensor, index) => {
      return <SensorRow key={sensor.identification} sensor={sensor} index={index} newSensorToBeGraphed={this.props.newSensorToBeGraphed}/>
    });

    return (
      <Table striped bordered condensed responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sensorRows}
        </tbody>
      </Table>
    )
  }
}

class SensorRow extends React.Component {
  constructor(props) {
    super(props);

    this.graphNewSensor = this.graphNewSensor.bind(this);
  }

  graphNewSensor(event) {
    event.preventDefault();
    this.props.newSensorToBeGraphed({index: this.props.index});
  }

  render() {
    return (
      <tr>
        <td>
          <Button bsStyle="link" onClick={this.graphNewSensor}>
            {this.props.sensor.identification}
          </Button>
        </td>
        <td>{this.props.sensor.description}
        </td>
        <td>{this.props.sensor.location.latitude}, {this.props.sensor.location.longitude}</td>
        <td>todo status</td>
      </tr>
    )
  }
}

module.exports = SensorsListView;
