import { Component } from 'react'
import Nav from './Nav.comp'

export default class Home extends Component {
  render() {
    const onLogInClick = () => {
      console.log('a')
      window.location.href = '../../account/open'
    }
    return(
      <div>
        <Nav/>
        <div id="not_logged">
          <p id='text'>You're not logged in</p>
          <p id='small_text'>Click here to <u onClick={onLogInClick}>log in</u></p>
        </div>
      </div>
    )
  }
}

