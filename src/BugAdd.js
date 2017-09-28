import React from 'react';
import ReactDOM from 'react-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

class BugAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({owner: form.owner.value, title: form.title.value, status: form.status.value, priority: form.priority.value});
    // clear the form for the next input
    form.owner.value = '';
    form.title.value = '';
    form.status.value = '';
    form.priority.value = '';
  }

  render() {
    return (
      <Panel header="Add Bug">
        <form name="bugAdd">
          <FormGroup bsSize="small">
            <ControlLabel>Owner</ControlLabel>
            <FormControl type="text" name="owner" />
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" name="title" />
            <ControlLabel>Priority</ControlLabel>
            <FormControl componentClass="select" name="priority">
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
            </FormControl>
            <ControlLabel>Status</ControlLabel>
            <FormControl componentClass="select" name="status">
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="Fixed">Fixed</option>
              <option value="Closed">Closed</option>
            </FormControl>
          </FormGroup>
          <Button value="Add" bsStyle="primary" onClick={this.handleSubmit}>Add</Button>
        </form>
      </Panel>
    );
  }
};

module.exports = BugAdd;
