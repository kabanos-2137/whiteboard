import { Component } from 'react'
import Nav from './Nav.comp'
import Info from './Info.comp'

export default class User extends Component {
  render() {
    return(
      <div>
        <Nav />
        <Info />
      </div>
    )
  }
}

