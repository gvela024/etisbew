const React = require('react');
const Button = require('react-bootstrap/lib/Button');
const Panel = require('react-bootstrap/lib/Panel');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');

class ValidateSensorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorBeingPondered: {},
      ifSensorIsNotBeingPondered: true
    };

    this.accept = this.accept.bind(this);
    this.decline = this.decline.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('requestSensorValidation', (sensor) => {
      this.setState({sensorBeingPondered: sensor, ifSensorIsNotBeingPondered: false});
    });
  }

  accept(event) {
    event.preventDefault();
    this.props.socket.emit('sensorAccepted', (this.state.sensorBeingPondered));
    this.setState({sensorBeingPondered: {}, ifSensorIsNotBeingPondered: true})
  }

  decline(event) {
    event.preventDefault();
    this.setState({sensorBeingPondered: {}, ifSensorIsNotBeingPondered: true});
  }

  render() {
    let sensorBeingPondered = [];
    if (Object.keys(this.state.sensorBeingPondered).length === 0) {
      sensorBeingPondered.splice(0, sensorBeingPondered.length - 1);
    } else {
      sensorBeingPondered.push(<SensorBeingPondered sensor={this.state.sensorBeingPondered}/>);
    }

    return (
      <div>
        <Panel header='Validate Sensor'>
          <FormGroup>
            {sensorBeingPondered}
          </FormGroup>
        </Panel>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.accept} disabled={this.state.ifSensorIsNotBeingPondered}>Accept</Button>
          <Button bsStyle='warning' onClick={this.decline} disabled={this.state.ifSensorIsNotBeingPondered}>Decline</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

class SensorBeingPondered extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Panel>
          <ControlLabel>ID: {this.props.sensor.identification}</ControlLabel><br/>
          <ControlLabel>Description: {this.props.sensor.description}</ControlLabel><br/>
          <ControlLabel>Lat/Long: {this.props.sensor.latitude}, {this.props.sensor.longitude}</ControlLabel><br/>
        </Panel>
      </div>
    )
  }
}

module.exports = ValidateSensorView;
