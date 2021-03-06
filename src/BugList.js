import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import queryString from 'query-string';
import {Link} from 'react-router-dom';

import BugFilter from './BugFilter';
import BugAdd from './BugAdd';

class BugRow extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link>
        </td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.owner}</td>
        <td>{this.props.bug.title}</td>
      </tr>
    );
  }
};

class BugTable extends React.Component {
  render() {
    var bugRows = this.props.bugs.map(bug => {
      return <BugRow key={bug._id} bug={bug} />
    });

    return (
      <table className="table table-striped table-bordered table-condensed">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </table>
    );
  }
};

class BugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs: [],
    };
    this.addBug = this.addBug.bind(this);
    this.loadData = this.loadData.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    fetch('/api/bugs')
      .then((res)=>res.json())
      .then(data=>this.setState({
        bugs: data,
      }));
  }

  componentDidUpdate(prevProps) {
    var oldQuery = queryString.parse(prevProps.location.search);
    var newQuery = queryString.parse(this.props.location.search);
    if (oldQuery.priority === newQuery.priority &&
        oldQuery.status === newQuery.status) {
      return;
    } else {
      this.loadData();
    }
  }

  addBug(bug) {
    fetch('/api/bugs', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bug)
		}).then(function(res){ return res.json(); })
			.then(function(data){
        var bug = data;
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({bugs: bugsModified});
		}.bind(this));

  }

  loadData() {
    var query = queryString.parse(this.props.location.search) || {};
    var filter = {priority: query.priority, status: query.status};
    fetch('/api/filter', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(filter)
		}).then(function(res){ return res.json(); })
			.then(function(data){
        var bugs = data;
        this.setState({bugs: bugs});
		}.bind(this));
  }

  changeFilter(newFilter) {
    this.props.history.push({search: '?' + $.param(newFilter)});
  }

  render() {
    const parsed = queryString.parse(this.props.location.search);
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter submitHandler={this.changeFilter} initFilter={parsed}/>
        <BugTable bugs={this.state.bugs}/>
        <BugAdd addBug={this.addBug}/>
      </div>
    );
  }

};

module.exports = BugList;
