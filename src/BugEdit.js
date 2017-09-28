import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class BugEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      priority: '',
      owner: '',
      title: ''
    };
    this.loadData = this.loadData.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    console.log("prevProps", prevProps);
    console.log("BugEdit: componentDidUpdate", prevProps.match.params.id, this.props.match.params.id);
    if (this.props.match.params.id != prevProps.match.params.id) {
      this.loadData();
    }
  }

  loadData() {
    fetch('/api/bugs/' + this.props.match.params.id)
      .then((res)=>res.json())
      .then(data=>this.setState(data));
  }

  onChangePriority(e) {
    this.setState({priority: e.target.value});
  }

  onChangeStatus(e) {
    this.setState({status: e.target.value});
  }

  onChangeOwner(e) {
    this.setState({owner: e.target.value});
  }

  onChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  submit(e) {
    e.preventDefault();
    var bug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
      title: this.state.title
    }

    fetch('/api/bugs/' + this.props.match.params.id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bug)
		}).then(function(res){ return res.json(); })
			.then(function(data){
        console.log('Update bug', data);
		}.bind(this));
  }

  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        Edit bug: {this.props.match.params.id}
        <br/>
        <form onSubmit={this.submit}>
          Priority:
          <select name="priority" value={this.state.priority} onChange={this.onChangePriority}>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
          <br/>
          Status:
          <select name="status" value={this.state.status} onChange={this.onChangeStatus}>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Fixed">Fixed</option>
            <option value="Closed">Closed</option>
          </select>
          <br/>
          Owner: <input  type="text" value={this.state.owner} onChange={this.onChangeOwner}/>
          <br/>
          Title: <input type="text" value={this.state.title} onChange={this.onChangeTitle}/>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

module.exports = BugEdit;
