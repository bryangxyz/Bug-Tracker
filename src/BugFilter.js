import React from 'react';
import ReactDOM from 'react-dom';

class BugFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      priority: ''
    };
    this.submit = this.submit.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
  }

  onChangeStatus(e) {
    this.setState({status: e.target.value});
  }

  onChangePriority(e) {
    this.setState({priority: e.target.value});
  }

  submit(e) {
    // e.preventDefault();
    this.props.submitHandler({priority: this.state.priority, status: this.state.status});
  }

  render() {
    console.log("Rending BugFilter");
    return (
      <div>
        <h3>Filter</h3>
        Status:
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value=''>(Any)</option>
          <option value='New'>New</option>
          <option value='Open'>Open</option>
          <option value='Closed'>Closed</option>
        </select>
        <br/>
        Priority:
        <select value={this.state.priority} onChange={this.onChangePriority}>
          <option value=''>(Any)</option>
          <option value='P1'>P1</option>
          <option value='P2'>P2</option>
          <option value='P3'>P3</option>
        </select>
        <br/>
        <button onClick={this.submit}>Apply</button>
      </div>
    );
  }
};

module.exports = BugFilter;
