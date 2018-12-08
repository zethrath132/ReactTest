import React, { Component } from 'react';
import { Link, Browser as Router, Route } from 'react-router-dom';
import userInstance from '../../axios-base';
import Input from '../UI/Inputs.js';
import styles from './loginPage.css';

class LoginPage extends Component {

  state = {
    loginForm: {
      user: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'email@email.com',
          id: 'username'
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          id: 'password',
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
    }
  }

  loginHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for(let formElementIdentifier in this.state.loginForm)
    {
      formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
    }
    console.log(formData);
    userInstance.post( '/users/login', formData )
    .then(response => {
      this.setState( { loading: false } );
      this.props.history.push('/displayPage');
    })
    .catch( error => {
      this.setState( { loading: false } );
      alert("Username or Password is incorrect.");
    });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedLoginForm = {
      ...this.state.loginForm
    };
    const updatedFormElement = {
      ...updatedLoginForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedLoginForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm)
    {
      formIsValid = updatedLoginForm[inputIdentifier];
    }
    this.setState( {loginForm: updatedLoginForm, formIsValid: formIsValid});
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.loginForm)
    {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }
    let form = (
      <form onSubmit={this.loginHandler}>
        {formElementsArray.map(formElement => (
          <Input
            class = {formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            invalid = {!formElement.config.validation}
            shouldValidate = {formElement.config.touched}
            touched = {formElement.config.touched}
            onChange = {(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))}
        <button btntype = "Success" disabled={!this.state.formIsValid}>Login</button>
      </form>
    );
    return(
      <div>
      <Link to="/signup" id="signup">Sign Up!</Link>
      <img id="logo" src={require('../images/JL.png')} />
      <p id="motto">Building Product Selection Platform</p>
        {form}
      </div>
    );
  }
}

export default LoginPage;
