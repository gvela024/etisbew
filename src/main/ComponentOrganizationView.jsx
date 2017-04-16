const React = require('react');
const ReactDom = require('react-dom');
const Table = require('react-bootstrap/lib/Table');
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');

const CreateSensorView = require('./../sensor/CreateView');
const DeleteSensorView = require('./../sensor/DeleteView');
const ModifySensorView = require('./../sensor/ModifyView');
const SensorsListView = require('./../sensor/ListView');

const _socket = io();
class ComponentOrganizationView extends React.Component {
  render() {
    return (
      <Table responsive>
        <tbody>
          <tr>
            <td><SensorsListView socket={_socket}/></td>
            <td>
              <h3>Modification</h3>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Create"><CreateSensorView socket={_socket}/></Tab>
                <Tab eventKey={2} title="Delete"><DeleteSensorView socket={_socket}/></Tab>
                <Tab eventKey={3} title="Modify"><ModifySensorView socket={_socket}/></Tab>
              </Tabs>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

module.exports = ComponentOrganizationView;
