import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burgerbuilder-d8506.firebaseio.com'
})

export default instance
