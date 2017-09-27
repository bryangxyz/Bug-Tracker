import React from 'react';
import ReactDOM from 'react-dom';

class BugFilter extends React.Component {
  render() {
    console.log("Rending BugFilter");
    return (
      <div>A way to filter the list of bugs would come here.</div>
    )
  }
};

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

class BugAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1'});
    // clear the form for the next input
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    console.log("Rending BugAdd");
    return (
      <div>
        <form name="bugAdd">
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button onClick={this.handleSubmit}>Add Bug</button>
        </form>
      </div>
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

  render() {
    console.log("Rending bug list, num items:", this.state.bugs.length);
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this.addBug}/>
      </div>
    );
  }

};

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <BugList />,
    document.getElementById('mount')
  );
});
