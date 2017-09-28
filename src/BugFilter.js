import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class BugFilter extends React.Component {
  constructor(props) {
    super(props);
    var initFilter = this.props.initFilter;
    this.state = {
      status: initFilter.status,
      priority: initFilter.priority
    };
    this.submit = this.submit.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.initFilter.status === this.state.status
        && newProps.initFilter.priority === this.state.priority) {
      return;
    }
    this.setState({status: newProps.initFilter.status, priority: newProps.initFilter.priority});
  }

  onChangeStatus(e) {
    this.setState({status: e.target.value});
  }

  onChangePriority(e) {
    this.setState({priority: e.target.value});
  }

  submit(e) {
    // this.props.submitHandler({priority: this.state.priority, status: this.state.status});
    var newFilter = {};
    if (this.state.priority) {
      newFilter.priority = this.state.priority;
    }
    if (this.state.status) {
      newFilter.status = this.state.status;
    }
    this.props.submitHandler(newFilter);
  }

  render() {
    return (
      <Panel collapsible header="Filter">
        <Grid fluid={true}>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <ControlLabel>Status</ControlLabel>
              <FormControl componentClass="select" name="status" value={this.state.status} onChange={this.onChangeStatus}>
                <option value=''>(Any)</option>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Fixed">Fixed</option>
                <option value="Closed">Closed</option>
              </FormControl>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ControlLabel>Priority</ControlLabel>
              <FormControl componentClass="select" name="priority" value={this.state.priority} onChange={this.onChangePriority}>
                <option value=''>(Any)</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </FormControl>
            </Col>
            <Col xs={12} sm={6} md={4}>
            <br />
            <Button bsStyle="primary" onClick={this.submit}>Search</Button>
            </Col>
          </Row>
        </Grid>
      </Panel>
    );
  }
};

module.exports = BugFilter;
