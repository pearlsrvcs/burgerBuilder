import React, { Component } from 'react'
import Aux from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../../src/axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  ketchup: 0.00,
  salad: 0.50,
  onion: 0.10,
  tomato: 0.40,
  bacon: 0.70,
  cheese: 0.40,
  mustard: 0.00,
  meat: 1.30,  
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null, 
    totalPrice: 4.00,
    puchaseable: false,
    purchasing: false, 
    loading: false, 
    error: false
  }

    componentDidMount() {
      axios.get('https://burgerbuilder-d8506.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        })
      })
      .catch(err => {
        this.setState({
          error: true
        })
      })
    }
  updatePurchaseState (ingredients) {    
    const sum = Object.keys(ingredients).map(ingredient => {
      return ingredients[ingredient]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)
    this.setState({
      purchaseable: sum > 0
    })
  }

  addIngredientHandler = (type) => {     
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = this.state.ingredients[type] + 1
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState (updatedIngredients)
  }
  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    if (this.state.ingredients[type] <= 0) return
    updatedIngredients[type] = this.state.ingredients[type] - 1
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState (updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({ 
      purchasing: true 
    })
  }
  
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {    
    const queryParams = []
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push(`price=${this.state.totalPrice}`)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?'+queryString
    })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo )(
      disabledInfo[key] = disabledInfo[key] <= 0
    )
    let orderSummary = null         
    let burger = this.state.error ? <p style={{ margin: 'auto 900px', fontWeight: 'bold', fontSize: '1.5rem', color: 'red'}}>Ingredients can't be loaded</p> : <Spinner />
    if (this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients = {this.state.ingredients} />
          <BuildControls 
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler} 
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchaseable={!this.state.purchaseable}
            price={this.state.totalPrice} />
        </Aux>
      )
      orderSummary = <OrderSummary 
      ingredients={this.state.ingredients}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.state.totalPrice.toFixed(2)}  />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    
    return (
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>             
            {orderSummary}
          </Modal>
          {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
