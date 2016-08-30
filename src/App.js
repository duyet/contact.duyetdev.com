import React, { Component } from 'react';
import $ from 'jquery';

import { Grid, Row, Col, 
  Panel, Modal,
  Form, FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';

import logo from './duyetdev.jpg';
import './App.css';

const DUYETDEV_EMAIL = 'me@duyetdev.com';
const CC_EMAIL = 'lvduit08@gmail.com';
const SUBJECT_EMAIL = 'Contact message from contact.duyetdev.com';

class App extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      name: '',
      content: '',
      showMessage: false,
      modalMessage: 'Error',
      isSuccess: false
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.doSubmit = this.doSubmit.bind(this);
    this.modalClose = () => this.setState({ showMessage: false });
  }


  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  
  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }


  doSubmit(e) {
    e.preventDefault();

    if (this.state.email === '' || this.state.name === '' || this.state.message === '')
      return this.setState({ showMessage: true, modalMessage: 'Please fill out all.' });
    
    $.ajax({
      url: `https://formspree.io/${DUYETDEV_EMAIL}`, 
      method: "POST",
      data: {
        _cc: CC_EMAIL,
        _subject: SUBJECT_EMAIL,
        _replyto: this.state.email,
        name: this.state.name,
        message: this.state.content
      },
      dataType: "json",
      error: (message) => {
        if (message) {
          return this.setState({ showMessage: true, modalMessage: 'Something went wrong' });
        }
      },

      success: () => {
        this.setState({ isSuccess: true })
      }
    });
  }

  render() {
    return (
      <div className='App'>
        <div className="App-header">
          <a href='https://duyetdev.com' alt='@duyetdev'>
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <h2>
              contact.duyetdev.com
          </h2>
          <p>
            Fill out the form bellow or drop me a line me(a)duyetdev.com
          </p>
        </div>
        <div className="form-main">
          <Grid>
            <Row className="show-grid">
              <Col xs={8} xsOffset={2} md={6} mdOffset={3}>
                {this.state.isSuccess ? <Alert bsStyle="success">Success</Alert> : null}
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={8} xsOffset={2} md={6} mdOffset={3}>
                <Panel>
                <Form onSubmit={this.doSubmit}>
                  <FormGroup>
                    <ControlLabel>Your name</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.name}
                      placeholder="Enter your name"
                      onChange={this.handleNameChange}
                    />
                    
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="email"
                      value={this.state.email}
                      placeholder="Enter email"
                      onChange={this.handleEmailChange}
                    />
                    
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>Message</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      value={this.state.content}
                      placeholder="Your message"
                      onChange={this.handleContentChange}
                    />
                    
                  </FormGroup>
                  <Button type="submit">Submit</Button>
                </Form>
                </Panel>
              </Col>
            </Row>
          </Grid>

          <MessageModal show={this.state.showMessage} onHide={this.modalClose} message={this.state.modalMessage} />
        </div>
      </div>
    );
  }
}

const MessageModal = React.createClass({
  render() {
    const message = this.props.message || '...'
    return (
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
      </Modal>
    );
  }
});

export default App;
