import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Ketchup', type: 'ketchup'},
  {label: 'Salad', type: 'salad'}, 
  {label: 'Onion', type: 'onion'},
  {label: 'Tomato', type: 'tomato'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
  {label: 'Mustard', type: 'mustard'},
 
]
const buildControls = (props) => (
  <div className = {classes.BuildControls}>
    <p>CurrentPrice: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(control => (
      <BuildControl 
        key={control.label} 
        label={control.label} 
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]} />
    ))}
    <button 
      className={classes.OrderButton} 
      onClick={props.ordered}
      disabled={props.purchaseable}>
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
  </div>
)

export default buildControls