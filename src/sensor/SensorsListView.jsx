const React = require('react');
const Link = require('react-router-dom').Link;

const socket = io();

// class SensorRow extends React.Component {
//   render() {
//     return (
//       <tr>
//         <td>{this.props.sensors.id}</td>
//         <td>{this.props.sensors.description}</td>
//         <td>{this.props.sensors.location.latitude}, {this.props.sensors.location.longitude}</td>
//       </tr>
//     )
//   }
// }

class SensorsListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sensors: [] };

    socket.on('SensorListLoad', (sensors) => {
      this.setState({ sensors: sensors});
    });
  }

  componentDidMount() {
    console.log('this is annoying');
    socket.emit('RequestSensorList');
  }

  render() {
      // let sensorList = this.props.sensors.map(function(sensor) {
      //   return <SensorRow key={ sensor._id } sensor={ sensor } />
      // });

      return (
        <table className="table table-striped table-bordered table-condensed">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>doing stuff</p>
              </td>
            </tr>
          </tbody>
        </table>
    )
  }
}

module.exports = SensorsListView;
