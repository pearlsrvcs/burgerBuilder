import React from 'react'

import Burger from '../../Burger/Burger'
import butttonClasses from '../../UI/Button/Button.css'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you enjoy your burger!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <button className={butttonClasses.Danger} onClick={props.checkoutCancelled}>CANCEL</button>
      <button className={butttonClasses.Success} onClick={props.checkoutContinued}>CONTINUE</button>
    </div>
  )
}
export default checkoutSummary