import { Component } from 'react'
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
        }
      })
    }

    const onCreateAccount = (event) => {
      
    }

    return(
      <div id='loginform' onKeyUp={onSubmit} className={this.state.theme}>
        <input type="text" id='username' placeholder={'username'} className={this.state.theme}></input>
        <input type="password" id='password' placeholder={'password'} className={this.state.theme}></input>
        <div id='submit' onClick={onSubmit} className={this.state.theme}> <p> submit </p> </div>
        <div id='create_account' onClick={onCreateAccount} className={this.state.theme}> <p> create account </p> </div>
      </div>
    )
  }
}

