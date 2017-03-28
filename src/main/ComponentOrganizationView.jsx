const React = require('react');
const ReactDom = require('react-dom');
const Table = require('react-bootstrap/lib/Table');

const CreateModifySensorView = require('./../sensor/CreateModifyView');
const SensorsListView = require('./../sensor/ListView');

const _socket = io();
class ComponentOrganizationView extends React.Component {
  render() {
    return (
      <Table responsive>
        <tbody>
          <tr>
            <td><SensorsListView socket={_socket}/></td>
            <td><CreateModifySensorView socket={_socket}/></td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

module.exports = ComponentOrganizationView;
