import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import { browserHistory } from 'react-router';

class AuthForm extends React.Component {

  constructor(){
    super();
    this.state={
      email:"",
      password:""
    }
    this.setEmail=this.setEmail.bind(this);
    this.setPassword=this.setPassword.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  setEmail(e){
    this.setState({email:e.target.value});
  }

  setPassword(e){
    this.setState({password:e.target.value});
  }

  handleSubmit = event => {

    event.preventDefault();
    fetch(process.env.REACT_APP_BACKEND_API+'/login/admin', {
      method: 'POST',
      body: JSON.stringify(this.state),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
    
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4 loginform_text">
            <span>
              <b>TOURMED</b> UK
            </span>
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} value={this.state.email} onChange={this.setEmail} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} value={this.state.password} onChange={this.setPassword} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="border-0 button_login"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        
        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default withRouter(AuthForm);
