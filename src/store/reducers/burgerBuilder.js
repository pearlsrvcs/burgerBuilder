import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 4.00,
  error: false,
  building: false
}
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

const addIngredient = (state, action ) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient )
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState)
}

const removeIngredient = (state, action ) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient )
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState)
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ketchup: action.ingredients.ketchup,
      salad: action.ingredients.salad,
      onion: action.ingredients.onion,
      tomato: action.ingredients.tomato,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,         
      meat: action.ingredients.meat,
      mustard: action.ingredients.mustard
    },
    totalPrice: 4,
    error: false,
    building: false
  })      
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true})
    default: return state
  }
  
}

export default reducer
