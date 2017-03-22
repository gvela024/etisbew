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

    this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return (
      <div>
        <Panel header='Create Sensor'>
          <FormGroup>
            <ControlLabel>ID</ControlLabel>
            <FormControl type='number' placeholder='1234'/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl type='text' placeholder='1234'/>
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
          <Button bsStyle="primary" onClick={ this.handleCreate }>Create</Button>
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
