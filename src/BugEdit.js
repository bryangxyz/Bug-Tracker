import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Alert from 'react-bootstrap/lib/Alert';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

class BugEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      priority: '',
      owner: '',
      title: '',
      successVisible: false
    };
    this.loadData = this.loadData.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.submit = this.submit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.dismissSuccess = this.dismissSuccess.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
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
        this.showSuccess();
		}.bind(this));
  }

  showSuccess() {
    this.setState({successVisible: true});

  }

  dismissSuccess() {
    this.setState({successVisible: false});
  }

  render() {
    var success = (
      <Alert bsStyle="success" onDismiss={this.dismissSuccess}>
        Bug saved to database successfully.
      </Alert>
    );

    return (
      <div style={{maxWidth: 600}}>
        <Panel header={"Edit bug: " + this.props.match.params.id}>
          <form onSubmit={this.submit}>
            <FormGroup bsSize="small">
              <ControlLabel>priority</ControlLabel>
              <FormControl componentClass="select" name="priority" value={this.state.priority} onChange={this.onChangePriority}>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </FormControl>
              <ControlLabel>Status</ControlLabel>
              <FormControl componentClass="select" name="status" value={this.state.status} onChange={this.onChangeStatus}>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Fixed">Fixed</option>
                <option value="Closed">Closed</option>
              </FormControl>
              <ControlLabel>Owner</ControlLabel>
              <FormControl type="text" name="owner" value={this.state.owner} onChange={this.onChangeOwner} />
              <ControlLabel>Title</ControlLabel>
              <FormControl type="text" name="title" value={this.state.title} onChange={this.onChangeTitle} />
            </FormGroup>
            <ButtonToolbar>
                <Button type="submit" bsStyle="primary">Submit</Button>
                <Link className="btn btn-link" to="/bugs">Back</Link>
            </ButtonToolbar>
          </form>
        </Panel>
        {this.state.successVisible ? success : null}
      </div>
    );
  }
}

module.exports = BugEdit;
