const React = require('react');
const Button = require('react-bootstrap/lib/Button');
const Panel = require('react-bootstrap/lib/Panel');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const FormControl = require('react-bootstrap/lib/FormControl');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
const Table = require('react-bootstrap/lib/Table');

class ModifyView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identification: '',
      sensors: [],
      ifTheSensorIdIsNotInTheList: true,
      ifASensorIsNotLoaded: true,
      loadedSensor: {}
    };

    this.loadSensor = this.loadSensor.bind(this);
    this.clearSensor = this.clearSensor.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('returningSensorList', (sensors) => {
      this.setState({sensors: sensors});
    });

    this.props.socket.on('sensorListUpdated', (sensors) => {
      this.setState({sensors: sensors});
    });

    this.props.socket.on('returningSensor', (sensor) => {
      this.setState({loadedSensor: sensor, ifASensorIsNotLoaded: false});
    })

    this.props.socket.emit('requestSensorList');
  }

  loadSensor(event) {
    event.preventDefault();
    this.props.socket.emit('requestSensorById', this.state.identification);
  }

  clearSensor(event) {
    event.preventDefault();
    this.setState({ifASensorIsNotLoaded: true, loadedSensor: {}});
  }

  saveSensor(event) {
    let loadedSensor = Object.assign({}, this.state.loadedSensor);
    loadedSensor.readings = event.readings;
    this.props.socket.emit('updateSensor', loadedSensor);
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

  render() {
    let loadedSensor = [];
    if (Object.keys(this.state.loadedSensor).length === 0) {
      loadedSensor.splice(0, loadedSensor.length - 1);
    } else {
      loadedSensor.push(<ModifySensor key={this.state.loadedSensor.identification} sensor={this.state.loadedSensor} saveSensor={this.saveSensor.bind(this)}/>)
    }

    return (
      <div>
        <Panel header='Modify Sensor'>
          <FormGroup>
            <ControlLabel>ID</ControlLabel>
            <FormControl name='identification' type='text' placeholder='12ab' onChange={this.handleInputChange}/>
          </FormGroup>
          <ButtonToolbar>
            <Button bsStyle='primary' onClick={this.loadSensor} disabled={this.state.ifTheSensorIdIsNotInTheList}>Load</Button>
            <Button bsStyle='warning' onClick={this.clearSensor} disabled={this.state.ifASensorIsNotLoaded}>Clear</Button>
          </ButtonToolbar>
          {loadedSensor}
        </Panel>
      </div>
    )
  }
}

class ModifySensor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      identifiaction: '',
      description: '',
      readings: this.props.sensor.readings.slice()
    }

    this.save = this.save.bind(this);
    this.newEmptyRow = this.newEmptyRow.bind(this);
  }

  save(event) {
    event.preventDefault();
    this.props.saveSensor({readings: this.state.readings});
  }

  newEmptyRow(event) {
    event.preventDefault();
    this.setState({
      readings: this.state.readings.concat({temperature: undefined, relativeHumidity: undefined})
    });
  }

  handleInputChange(event) {
    let readings = this.state.readings.slice();
    readings[event.index][event.name] = event.value

    this.setState({
      readings: readings
    });
  }

  render() {
    const readings = this.state.readings.map((reading, index) => {
      return <SensorReadings key={index} index={index} reading={reading} handleInputChange={this.handleInputChange.bind(this)}/>
    });

    return (
      <div>
        <Panel header={this.props.sensor.identification}>
          <FormGroup>
            <ControlLabel>ID</ControlLabel>
            <FormControl name='identification' type='text' placeholder={this.props.sensor.identification}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl name='identification' type='text' placeholder={this.props.sensor.description}/>
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
                {readings}
                <tr>
                  <td colSpan='2'>
                    <Button onClick={this.newEmptyRow}>+</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </FormGroup>
          <ButtonToolbar>
            <Button bsStyle='primary' onClick={this.save} disabled={this.state.ifTheSensorIdIsNotInTheList}>Save</Button>
          </ButtonToolbar>
        </Panel>
      </div>
    )
  }
}

class SensorReadings extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.props.handleInputChange({
      name: event.target.name,
      value: event.target.value,
      index: this.props.index
    });
  }

  render() {
    return (
      <tr>
        <td>
          <FormGroup>
            <FormControl type='text' name='temperature' value={this.props.reading.temperature} onChange={this.handleInputChange}/>
          </FormGroup>
        </td>
        <td>
          <FormGroup>
            <FormControl type='text' name='relativeHumidity' value={this.props.reading.relativeHumidity} onChange={this.handleInputChange}/>
          </FormGroup>
        </td>
      </tr>
    )
  }
}

module.exports = ModifyView
