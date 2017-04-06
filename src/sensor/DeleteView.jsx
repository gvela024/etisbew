const React = require('react');
const Button = require('react-bootstrap/lib/Button');
const Panel = require('react-bootstrap/lib/Panel');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const FormControl = require('react-bootstrap/lib/FormControl');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');

class DeleteView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identification: 0,
      sensors: [],
      ifTheSensorIdIsNotInTheList: true
    };

    // fixme: this is a hack but we are depending on the `requestSensorList` event
    // being sent from sensor/ListView
    this.props.socket.on('returningSensorList', (sensors) => {
      this.setState({sensors: sensors});
    });

    this.props.socket.on('sensorListUpdated', (sensors) => {
      this.setState({ sensors: sensors});
    });

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    let sensorNotInTheList = true;
    this.state.sensors.forEach((sensor) => {
      if (sensor.identification === event.target.value) {
        sensorNotInTheList = false;
      }
    });
    this.setState({
      ifTheSensorIdIsNotInTheList: sensorNotInTheList,
      [event.target.name]: event.target.value
    });
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.socket.emit('deleteSensorById', this.state.identification);
  }

  render() {
    return (
      <div>
        <Panel header='Delete Sensor'>
          <FormGroup>
            <ControlLabel>ID</ControlLabel>
            <FormControl name='identification' type='text' placeholder='12ab' onChange={this.handleInputChange}/>
          </FormGroup>
          <Button bsStyle="danger" onClick={this.handleDelete} disabled={this.state.ifTheSensorIdIsNotInTheList}>Delete</Button>
        </Panel>
      </div>
    )
  }
}

module.exports = DeleteView;
