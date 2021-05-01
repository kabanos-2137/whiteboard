import { Component } from 'react'
import axios from 'axios';
import { ReactSession } from 'react-client-session'

export default class LoginForm extends Component {
  render() {
    const onSubmit = (event) => {
      if(!(event._reactName === 'onClick' || (event._reactName === 'onKeyUp' && event.key === 'Enter'))){
        return
      }
      axios.post('/api/login', {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      }).then(response => {
        if(response.data){
          ReactSession.set('username', document.getElementById('username').value)
          ReactSession.set('password', document.getElementById('password').value)
        }
      })
    }

    return(
      <div id='loginform' onKeyUp={onSubmit}>
        <input type="text" id='username'></input>
        <input type="password" id='password'></input>
        <div id='submit' onClick={onSubmit}>Submit </div>
      </div>
    )
  }
}

