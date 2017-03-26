const React = require('react');
const Button = require('react-bootstrap/lib/Button');
const Panel = require('react-bootstrap/lib/Panel');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const FormControl = require('react-bootstrap/lib/FormControl');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');

const socket = io();

class CreateModifySensorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formsAreValid: false,
      id: undefined,
      description: undefined,
      latitude: undefined,
      longitude: undefined,
      temperature: undefined,
      relativeHumidity: undefined
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  hasValue(value) {
    console.log('hasValue');
    if (value === undefined) {
      return null
    } else {
      if (value.length > 0) {
        return 'success';
      } else {
        return 'error';
      }
    }
  }

  validateThatId() {
    console.log('validateThatId');
    return this.hasValue(this.state.id);
  }

  validateThatDescription() {
    console.log('validateThatDescription');
    return this.hasValue(this.state.description);
  }

  handleInputChange(event) {
    console.log('handleInputChange: ', event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Panel header='Create Sensor'>
          <FormGroup validationState={this.validateThatId()}>
            <ControlLabel>ID</ControlLabel>
            <FormControl name='id' type='number' placeholder='1234' onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup validationState={this.validateThatDescription()}>
            <ControlLabel>Description</ControlLabel>
            <FormControl name='description' type='text' placeholder='Some description' onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Latitude</ControlLabel>
            <FormControl type='number' placeholder='12.34'/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Longitude</ControlLabel>
            <FormControl type='number' placeholder='12.34'/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Temperature</ControlLabel>
            <FormControl type='number' placeholder='34'/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Relative Humidity</ControlLabel>
            <FormControl type='number' placeholder='12'/>
          </FormGroup>
          <Button bsStyle="primary" onClick={this.handleCreate}>Create</Button>
        </Panel>
      </div>
    )
  }

  handleCreate(event) {
    event.preventDefault();
    console.log('The button was clicked');
    socket.emit('newSensorCreated', 1);
    console.log('sent the event');
  }
}

module.exports = CreateModifySensorView;
