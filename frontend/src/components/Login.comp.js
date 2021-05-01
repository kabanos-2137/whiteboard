import { Component } from 'react'
import Nav from './Nav.comp'
import LoginForm from './LoginForm.comp'

export default class Home extends Component {
  render() {
    return(
      <div>
        <Nav />
        <LoginForm />
      </div>
    )
  }
}

