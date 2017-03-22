const React = require('react');
const ReactDom = require('react-dom');
const Table = require('react-bootstrap/lib/Table');

const CreateModifySensorView = require('./../sensor/CreateModifySensorView');
const SensorsListView = require('./../sensor/SensorsListView');

class ComponentOrganizationView extends React.Component {
  render() {
    return (
      <Table>
        <tbody>
          <tr>
            <td><SensorsListView/></td>
            <td><CreateModifySensorView/></td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

module.exports = ComponentOrganizationView;
