import { Component } from 'react'
import Nav from './Nav.comp'
import Articles from './Articles.comp'

export default class Home extends Component {
  render() {
    return(
      <div>
        <Nav/>
        <Articles/>
      </div>
    )
  }
}

