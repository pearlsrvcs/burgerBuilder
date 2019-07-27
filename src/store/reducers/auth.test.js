import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer ', () => { 
  let initialState 
  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }
  })

  test('should return the initial state', () => {
    expect(reducer(undefined, {type: ''}), {}).toEqual(initialState)
  })
   
  test('should store the token upon login', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'someToken',
      userId: 'someId'
    })).toEqual({
      token: 'someToken',
      userId: 'someId',
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
})
