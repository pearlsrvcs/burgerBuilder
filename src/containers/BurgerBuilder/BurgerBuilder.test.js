import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { burgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({
  adapter: new Adapter()
})  
  
  describe('<BurgerBuilder /> ', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<burgerBuilder onInitIngredients={() => {}}/>)
    })

    test('should render <BuildControls /> when receiving ingredients', () => {
      it('test', () => {      
        wrapper.setProps({ings: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
      })
    }) 
    test('should render two <BuildControls /> when receiving two ingredients', () => {
      it('test', () => {      
        wrapper.setProps({ings: {salad: 1, bacon: 1}})
        expect(wrapper.find(BuildControls)).toHaveLength(2)
      })
    })    
  })
  
