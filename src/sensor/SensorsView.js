const React = require('react');
const ReactDom = require('react-dom');
const HashRouter = require('react-router-dom').HashRouter;
const Route = require('react-router-dom').Route;
const Redirect = require('react-router-dom').Redirect;
const Button = require('react-bootstrap/lib/Button');

const socket = io();

class Temp extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2'>
            <div className='input-group'>
              <span className='input-group-addon'>ID</span>
              <input type='number' id='id' className='form-control' value='1234'/>
            </div>
          </div>

          <div className='col-lg-2'>
            <div className='input-group'>
              <span className='input-group-addon'>Description</span>
              <input type='text' id='description' className='form-control' value='A description'/>
            </div>
          </div>

          <div className='col-lg-2'>
            <div className='input-group'>
              <span className='input-group-addon'>Latitude</span>
              <input type='number' id='latitude' className='form-control' value='12.34'/>
            </div>
          </div>

          <div className='col-lg-2'>
            <div className='input-group'>
              <span className='input-group-addon'>Longitude</span>
              <input type='number' id='longitude' className='form-control' value='12.34'/>
            </div>
          </div>

          <div className='col-lg-2'>
            <div className='input-group'>
              <span className='input-group-addon'>Temperature</span>
              <input type='number' id='temperature' className='form-control' value='12'/>
            </div>
          </div>

          <div className='col-lg-2'>
            <div className='input-group'>
              <span className='input-group-addon'>Relative Humidity</span>
              <input type='number' id='relativeHumidity' className='form-control' value='34'/>
            </div>
          </div>

          <div className='col-lg-1'>
            <Button value="Add" bsStyle="primary" onClick={ this.handleCreate } />
          </div>
        </div>
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

ReactDom.render(
  (
    <HashRouter>
      <div>
        <Route path="/temp" component={ Temp } />
        <Redirect from="/" to="/temp" />
      </div>
    </HashRouter>
  ),

  document.getElementById('main')
);
