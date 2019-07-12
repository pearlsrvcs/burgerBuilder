import React, {Component} from 'react'
import Aux from '../../../hoc/Auxilary'
import classes from '../../UI/Button/Button.css'

class OrderSummary extends Component {  
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingredient => {
      return (<li key={ingredient}>
          <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {this.props.ingredients[ingredient]}
          </li>
      )
    })
    return (
      <Aux>
        <h3>Your Order:</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <button className={classes.Danger} onClick={this.props.purchaseCanceled}>CANCEL</button>
        <button className={classes.Success} onClick={this.props.purchaseContinued}>CONTINUE</button>
      </Aux>
    )
  }
} 

export default OrderSummary