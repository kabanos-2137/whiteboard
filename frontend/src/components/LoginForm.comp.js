import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { ReactSession } from 'react-client-session'
import doesSesVarExist from '../doesSesVarExist'

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'dark'
    }
  }

  componentDidMount = () => {
    if(doesSesVarExist('theme')){
      this.setState({
        theme: ReactSession.get('theme')
      })
    }else{
      if(doesSesVarExist('username') && doesSesVarExist('password')){
        axios.post('/api/get_theme', {
          username: ReactSession.get('username'),
          password: ReactSession.get('password')
        }).then(response => {
          ReactSession.set('theme', response.data.theme)
          this.setState({
            theme: response.data.theme
          })
        })
      }else{
        ReactSession.set('theme', 'dark')
        this.setState({
          theme: ReactSession.get('theme')
        })
      }
    }
  }

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
          console.log('a')
          return <Redirect to='/account/user' />
        }
      })
    }

    const onCreateAccount = (event) => {
      console.log('a')
    }

    return(
      <div id='loginform' className={this.state.theme}>
        <label for='username'>Username</label>
        <input type="text" id='username' className={this.state.theme}  onKeyUp={onSubmit}></input>
        <label for='password'>Password</label>
        <input type="password" id='password' className={this.state.theme} onKeyUp={onSubmit}></input>
        <div id='submit' onClick={onSubmit} className={this.state.theme}> <p> login </p> </div>
        <div id='create_account' className={this.state.theme}> <p> You don't have an account? <u onClick={onCreateAccount}>sign up here</u> </p> </div>
      </div>
    )
  }
}

