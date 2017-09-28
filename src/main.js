import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, browserHistory, Route, Redirect, Switch} from 'react-router-dom';

import BugList from './BugList';
import BugEdit from './BugEdit';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    (
      <HashRouter>
        <Switch>
          <Route exact path='/bugs' component={BugList} />
          <Route path='/bugs/:id' component={BugEdit} />
          <Redirect exact from="/" to="/bugs" />
          <Route path='*' render={function() {
            return <p>Not Found</p>
          }} />
        </Switch>
     </HashRouter>
    ),
    document.getElementById('mount')
  );
});
