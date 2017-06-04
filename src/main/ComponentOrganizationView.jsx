const React = require('react');
const ReactDom = require('react-dom');
const Table = require('react-bootstrap/lib/Table');
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');

const CreateSensorView = require('./../sensor/CreateView');
const DeleteSensorView = require('./../sensor/DeleteView');
const ModifySensorView = require('./../sensor/ModifyView');
const SensorsListView = require('./../sensor/ListView');
const NewSensorReadingView = require('./../sensor/NewReadingView');
const GraphSensorDataView = require('./../sensor/GraphDataView');

const socket = io();

class ComponentOrganizationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indexOfSensorBeingGraphed: null,
      sensors: []
    }

    this.newSensorToBeGraphed = this.newSensorToBeGraphed.bind(this);
  }

  componentDidMount() {
    socket.on('returningSensorList', (sensors) => {
      this.setState({sensors: sensors});
    });

    socket.on('sensorListUpdated', (sensors) => {
      console.log('sensor list updated');
      this.setState({sensors: sensors});
    });

    socket.emit('requestSensorList');
  }

  newSensorToBeGraphed(event) {
    this.setState({indexOfSensorBeingGraphed: event.index});
  }

  render() {
    return (
      <Table responsive>
        <tbody>
          <tr>
            <td>
              <SensorsListView socket={socket} sensors={this.state.sensors} newSensorToBeGraphed={this.newSensorToBeGraphed}/>
              <GraphSensorDataView sensors={this.state.sensors} indexOfSensorBeingGraphed={this.state.indexOfSensorBeingGraphed}/>
            </td>
            <td>
              <h3>Modification</h3>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Create"><CreateSensorView socket={socket}/></Tab>
                <Tab eventKey={2} title="Delete"><DeleteSensorView socket={socket} sensors={this.state.sensors}/></Tab>
                <Tab eventKey={3} title="Modify"><ModifySensorView socket={socket} sensors={this.state.sensors}/></Tab>
                <Tab eventKey={4} title="New Reading"><NewSensorReadingView socket={socket} sensors={this.state.sensors}/></Tab>
              </Tabs>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

module.exports = ComponentOrganizationView;
