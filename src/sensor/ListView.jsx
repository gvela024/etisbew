const React = require('react');
const Table = require('react-bootstrap/lib/Table');

class SensorsListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sensors: [] };
  }

  componentDidMount() {
    this.props.socket.on('returningSensorList', (sensors) => {
      this.setState({ sensors: sensors});
    });

    this.props.socket.on('sensorListUpdated', (sensors) => {
      this.setState({ sensors: sensors});
    });

    this.props.socket.emit('requestSensorList');
  }

  render() {
      const sensorRows = this.state.sensors.map((sensor) => {
        return <SensorRow key={ sensor.identification } sensor={ sensor } />
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

class SensorRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.sensor.identification}</td>
        <td>{this.props.sensor.description}</td>
        <td>{this.props.sensor.location.latitude}, {this.props.sensor.location.longitude}</td>
        <td>todo status</td>
      </tr>
    )
  }
}

module.exports = SensorsListView;
