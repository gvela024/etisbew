const React = require('react');
const Button = require('react-bootstrap/lib/Button');
const Panel = require('react-bootstrap/lib/Panel');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const FormControl = require('react-bootstrap/lib/FormControl');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const Table = require('react-bootstrap/lib/Table');

class NewReadingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identification: '',
      sensors: [],
      ifTheSensorIdIsNotInTheList: true,
      temperature: '',
      relativeHumidity: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewReading = this.handleNewReading.bind(this);
    this.handleChangeTemperature = this.handleChangeTemperature.bind(this);
    this.handleChangeRelativeHumidity = this.handleChangeRelativeHumidity.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('returningSensorList', (sensors) => {
      this.setState({sensors: sensors});
    });

    this.props.socket.on('sensorListUpdated', (sensors) => {
      this.setState({sensors: sensors});
    });

    this.props.socket.emit('requestSensorList');
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

  handleChangeTemperature(event) {
    this.setState({temperature: event.target.value});
  }

  handleChangeRelativeHumidity(event) {
    this.setState({relativeHumidity: event.target.value});
  }

  handleNewReading(event) {
    event.preventDefault();
    this.props.socket.emit('newReadingFromSensor', this.state.identification, {
      temperature: this.state.temperature,
      relativeHumidity: this.state.relativeHumidity
    });
  }

  render() {
    return (
      <div>
        <Panel header='New Sensor Reading'>
          <FormGroup>
            <ControlLabel>ID</ControlLabel>
            <FormControl name='identification' type='text' placeholder='12ab' onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
            <Table striped bordered condensed responsive>
              <thead>
                <tr>
                  <th>Temperature</th>
                  <th>Relative Humidity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <FormGroup>
                      <FormControl type='text' name='temperature' placeholder='34' onChange={this.handleChangeTemperature}/>
                    </FormGroup>
                  </td>
                  <td>
                    <FormGroup>
                      <FormControl type='text' name='relativeHumidity' placeholder='86' onChange={this.handleChangeRelativeHumidity}/>
                    </FormGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
          </FormGroup>
          <Button bsStyle='primary' onClick={this.handleNewReading} disabled={this.state.ifTheSensorIdIsNotInTheList}>Send Reading</Button>
        </Panel>
      </div>
    )
  }
}

module.exports = NewReadingView;
