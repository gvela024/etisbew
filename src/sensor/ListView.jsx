const React = require('react');
const Link = require('react-router-dom').Link;
const Table = require('react-bootstrap/lib/Table');

const socket = io();

class SensorRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.sensor.id}</td>
        <td>{this.props.sensor.description}</td>
        <td>{this.props.sensor.location.latitude}, {this.props.sensors.location.longitude}</td>
        <td> - todo status</td>
      </tr>
    )
  }
}

class SensorsListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sensors: [] };

    socket.on('returningSensorList', (sensors) => {
      this.setState({ sensors: sensors});
    });
  }

  componentDidMount() {
    socket.emit('requestSensorList');
  }

  render() {
      let sensorRows = this.state.sensors.map(function(sensor) {
        return <SensorRow key={ sensor._id } sensor={ sensor } />
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
            { sensorRows }
          </tbody>
        </Table>
    )
  }
}

module.exports = SensorsListView;
