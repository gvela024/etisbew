const React = require('react');
const Button = require('react-bootstrap/lib/Button');
const Panel = require('react-bootstrap/lib/Panel');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const FormControl = require('react-bootstrap/lib/FormControl');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');

const numberOfValidForms = 6;

class CreateView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validFormCount: 0,
      identification: '',
      description: '',
      latitude: 0,
      longitude: 0,
      temperature: 0,
      relativeHumidity: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  hasValue(value) {
    if (value.length > 0) {
      return 'success';
    } else {
      return 'error';
    }
  }

  validateId() {
    return this.hasValue(this.state.identification);
  }

  validateDescription() {
    return this.hasValue(this.state.description);
  }

  validateLatitude() {
    return this.hasValue(this.state.latitude);
  }

  validateLongitude() {
    return this.hasValue(this.state.longitude);
  }

  validateTemperature() {
    return this.hasValue(this.state.temperature);
  }

  validateRelativeHumidity() {
    return this.hasValue(this.state.relativeHumidity);
  }

  ifAtLeastOneFormIsEmpty() {
    return this.state.identification.length > 0 && this.state.description.length > 0 && this.state.latitude.length > 0 && this.state.longitude.length > 0 && this.state.temperature.length > 0 && this.state.relativeHumidity.length > 0
      ? false
      : true;
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreate(event) {
    event.preventDefault();
    this.props.socket.emit('newSensorCreated', {
      identification: this.state.identification,
      description: this.state.description,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      temperature: this.state.temperature,
      relativeHumidity: this.state.relativeHumidity
    });
  }

  render() {
    return (
      <div>
        <Panel header='Create Sensor'>
          <FormGroup validationState={this.validateId()}>
            <ControlLabel>ID</ControlLabel>
            <FormControl name='identification' type='text' placeholder='12ab' onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup validationState={this.validateDescription()}>
            <ControlLabel>Description</ControlLabel>
            <FormControl name='description' type='text' placeholder='Some description' onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup validationState={this.validateLatitude()}>
            <ControlLabel>Latitude</ControlLabel>
            <FormControl name='latitude' type='text' placeholder='12.34' onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup validationState={this.validateLongitude()}>
            <ControlLabel>Longitude</ControlLabel>
            <FormControl name='longitude' type='text' placeholder='12.34' onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup validationState={this.validateTemperature()}>
            <ControlLabel>Temperature</ControlLabel>
            <FormControl name='temperature' type='text' placeholder='34' onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup validationState={this.validateRelativeHumidity()}>
            <ControlLabel>Relative Humidity</ControlLabel>
            <FormControl name='relativeHumidity' type='text' placeholder='12' onChange={this.handleInputChange}/>
          </FormGroup>
          <Button bsStyle="primary" onClick={this.handleCreate} disabled={this.ifAtLeastOneFormIsEmpty()}>Create</Button>
        </Panel>
      </div>
    )
  }
}

module.exports = CreateView;
