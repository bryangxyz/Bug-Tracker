import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import queryString from 'query-string';

import BugFilter from './BugFilter';
import BugAdd from './BugAdd';

class BugRow extends React.Component {
  render() {
    // console.log("Rending BugRow:", this.props.bug);
    return (
      <tr>
        <td>{this.props.bug._id}</td>
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
    // console.log("Rending bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(bug => {
      return <BugRow key={bug._id} bug={bug} />
    });

    return (
      <table>
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
    console.log("BugList: componentDidMount");
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
      console.log("BugList: componentDidUpdate, no change in filter, no updating");
      return;
    } else {
      console.log("BugList: componentDidUpdate, loading data with new filter");
      this.loadData();
    }
  }

  addBug(bug) {
    console.log("Adding bug:", bug);
    fetch('/api/bugs', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bug)
		}).then(function(res){ return res.json(); })
			.then(function(data){
        console.log('addBug', data);
        var bug = data;
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({bugs: bugsModified});
        console.log(this.state.bugs);
		}.bind(this));

  }

  loadData() {
    var query = queryString.parse(this.props.location.search) || {};
    var filter = {priority: query.priority, status: query.status};
    console.log("apply filter", filter);
    fetch('/api/filter', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(filter)
		}).then(function(res){ return res.json(); })
			.then(function(data){
        console.log('filter', data);
        var bugs = data;
        this.setState({bugs: bugs});
        console.log(this.state.bugs);
		}.bind(this));
  }

  changeFilter(newFilter) {
    this.props.history.push({search: '?' + $.param(newFilter)});
  }

  render() {
    // console.log("Rending bug list, num items:", this.state.bugs.length);
    const parsed = queryString.parse(this.props.location.search);
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter submitHandler={this.changeFilter} initFilter={parsed}/>
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this.addBug}/>
      </div>
    );
  }

};

module.exports = BugList;
