import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
configure({
  adapter: new Adapter()
})
  
  describe('<MavigationItems /> ', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<NavigationItems />)
    })

    test('should render two <NavigationItem /> elements if not authenticated', () => {
      it('test', () => {      
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
      })
    })
    test('should render three <NavigationItem /> elements if authenticated', () => {
      it('test', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
      })
    })
    test('should render an Authenticate <NavigationItem /> elements if not authenticated', () => {
      it('test', () => {        
        expect(wrapper.contains(<NavigationItem link="/auth">>Authenticate</NavigationItem>)).toEqual(True)
      })
    })
    test('should render a Logout <NavigationItem /> elements if authenticated', () => {
      it('test', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(True)
      })
    })
    test('should not render a Authenticate <NavigationItem /> elements if authenticated', () => {
      it('test', () => {        
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/auth">>Authenticate</NavigationItem>)).toEqual(False)
      })
    })
    test('should render a Logout <NavigationItem /> elements if authenticated', () => {
      it('test', () => {        
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(False)
      })
    })
  })
  
