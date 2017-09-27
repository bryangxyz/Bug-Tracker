import React from 'react';
import ReactDOM from 'react-dom';
import BugList from './BugList';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <BugList />,
    document.getElementById('mount')
  );
});
