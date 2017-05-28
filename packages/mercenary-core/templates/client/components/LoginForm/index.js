import React from 'react';
import propTypes from 'prop-types';
import { Segment, Button, Form, Message } from 'semantic-ui-react';
import validator from 'validator';

class LoginForm extends React.Component {
  static propTypes = {
    requestSuccess: propTypes.bool,
    requestFailedMessage: propTypes.string,

    requestLoginEmail: propTypes.func,
  }

  static defaultProps = {
    requestSuccess: false,
    requestFailedMessage: '',

    requestLoginEmail() {},
  }

  state = {
    email: '',
    validationError: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;
    const isEmail = validator.isEmail(email);

    if (!email || !isEmail) {
      this.setState({
        validationError: 'Invalid email',
      });

      return;
    }

    this.setState({
      email,
      validationError: '',
    });

    this.props.requestLoginEmail(email);
  }

  handleInputChange = (e) => {
    this.setState({
      email: e.target.value,
      validationError: '',
    });
  }

  render() {
    const error = this.state.validationError || this.props.requestFailedMessage;

    return (
      <Segment>
        <h2>Log In</h2>

        {(() => {
          if (this.props.requestSuccess) {
            return (
              <Message success>
                A magic login link was sent to <b>{this.state.email}</b>
              </Message>
            );
          }

          return (
            <Form error={!!error}>
              <Form.Field>
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  placeholder="you@domain.com"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />
              </Form.Field>

              <Message error content={error} />

              <Button onClick={this.handleSubmit}>Continue</Button>
            </Form>
          );
        })()}
      </Segment>
    );
  }
}

export default LoginForm;
