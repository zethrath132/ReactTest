import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import userInstance from '../../axios-base';
import Input from '../UI/Inputs.js';

class SignUpPage extends Component {

  state = {
    signUpForm: {
      user: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'email@email.com'
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
          type: 'password'
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 8
        },
        valid: false,
        touched: false
      },
      fName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'John'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      lName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Doe'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      // pPic: {
      //   elementType: 'input',
      //   elementConfig: {
      //     type: "file"
      //   },
      //   validation: {
      //     required: true
      //   },
      //   valid: false,
      //   touched: false
      // }
    }
  }

  signUpHandler = (event) => {
    debugger;
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.signUpForm)
    {
        formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
    }
    console.log(formData);
    userInstance.post( '/users/signup', formData )
      .then(response => {
        this.setState( { loading: false } );
        this.props.history.push('/');
      })
      .catch( error => {
        this.setState( { loading: false } );
        alert("User already exists!");
      });
  }

  checkValidity(value, rules)
  {
    let isValid = true;
    if(!rules)
    {
      return true;
    }

    if( rules.required)
    {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength)
    {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength)
    {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.isEmail)
    {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric)
    {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedSignUpForm = {
      ...this.state.signUpForm
    };
    const updatedFormElement = {
      ...updatedSignUpForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedSignUpForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedSignUpForm)
    {
      formIsValid = updatedSignUpForm[inputIdentifier];
    }
    this.setState({signUpForm: updatedSignUpForm, formIsValid: formIsValid});
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.signUpForm)
    {
      formElementsArray.push({
        id: key,
        config: this.state.signUpForm[key]
      });
    }
    let form = (
      <form onSubmit={this.signUpHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key = {formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.validation}
            shouldValidate = {formElement.config.validation}
            touched = {formElement.config.touched}
            onChange = {(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))}
        <button btntype = "Success" disabled={!this.state.formIsValid}>Sign Up!</button>
      </form>
    );
    return(
      <div>
      <img id="logo" src={require('../images/JL.png')} />
      <p id="motto">Building Product Selection Platform</p>
        {form}
      </div>
    );
  }
}

export default SignUpPage;
