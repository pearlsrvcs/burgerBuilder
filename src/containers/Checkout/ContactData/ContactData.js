import React, { Component } from 'react'
import axios from '../,../../../../axios-orders'

import Spinner from '../../../components/UI/Spinner/Spinner'
import buttonClasses from '../../../components/UI/Button/Button.css'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your full name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Address'
        },
        value: '',
        validation: {
          required: true          
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
          valid: false,
          touched: false
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone Number'
        },
        value: '',
        validation: {
          required: true,
          minLength: 10
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    loading: false,
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault()    
      this.setState({ 
        loading: true
      })
      const formData = {}
      for (let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
      }
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData    
      }
      axios.post('/orders.json', order)
      .then(res => {
        this.setState({
          loading: false
        })
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false,        
        })
      })
  }

  checkValidity (value, rules) {
    if (!rules) return true
    let isValid = true
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    } 
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid=value.length <= rules.maxLength && isValid
    }
    if (rules.regex) {
      isValid=rules.regex.test(String(value).toLowerCase()) && isValid
    }
    return isValid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = { 
        ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement
    
    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    this.setState({
      orderForm: updatedOrderForm, 
      formIsValid: formIsValid})
  }

  render() {
    const formElementsArray =[]
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler} >
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} 
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          ))}                  
          <button className={[buttonClasses.Success, buttonClasses.Button].join(' ')} disabled={!this.state.formIsValid}>ORDER</button>
        </form>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData