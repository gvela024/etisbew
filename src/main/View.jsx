const React = require('react');
const ReactDom = require('react-dom');
const HashRouter = require('react-router-dom').HashRouter;
const Route = require('react-router-dom').Route;
const Redirect = require('react-router-dom').Redirect;

const ComponentOrganizationView = require('./ComponentOrganizationView');

ReactDom.render(
  (
    <div>
      <h1>Sensors</h1>
      <HashRouter>
        <div>
          <Route path="/main" component={ ComponentOrganizationView } />
          <Redirect from="/" to="/main" />
        </div>
      </HashRouter>
    </div>
  ),

  document.getElementById('main')
);
