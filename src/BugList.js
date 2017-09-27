import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import BugFilter from './BugFilter';
import BugAdd from './BugAdd';

class BugRow extends React.Component {
  render() {
    console.log("Rending BugRow:", this.props.bug);
    return (
      <tr>
        <td>{this.props.bug.id}</td>
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
    console.log("Rending bug table, num items:", this.props.bugs.length);
    var bugRows = this.props.bugs.map(bug => {
      return <BugRow key={bug.id} bug={bug} />
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
  }

  componentDidMount() {
    fetch('/api/bugs')
      .then((res)=>res.json())
      .then(data=>this.setState({
        bugs: data,
      }));
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

  loadData(filter) {
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

  render() {
    console.log("Rending bug list, num items:", this.state.bugs.length);
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter submitHandler={this.loadData}/>
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this.addBug}/>
      </div>
    );
  }

};

module.exports = BugList;
