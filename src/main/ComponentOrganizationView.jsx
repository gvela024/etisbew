const React = require('react');
const ReactDom = require('react-dom');
const Table = require('react-bootstrap/lib/Table');

const CreateModifySensorView = require('./../sensor/CreateModifyView');
const SensorsListView = require('./../sensor/ListView');

class ComponentOrganizationView extends React.Component {
  render() {
    return (
      <Table responsive>
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
