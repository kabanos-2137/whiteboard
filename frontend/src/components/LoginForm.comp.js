import { Component } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import { ReactSession } from 'react-client-session'
import doesSesVarExist from '../doesSesVarExist'

require('dotenv').config();

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'dark'
    }
  }

  componentDidMount = () => {
    if(doesSesVarExist('id')){
      return <Redirect to='/account/user'></Redirect>
    }
    if(doesSesVarExist('theme')){
      this.setState({
        theme: ReactSession.get('theme')
      })
    }else{
      if(doesSesVarExist('id')){
        return <Redirect to='/account/user'></Redirect>
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
        if(response.data.valid){
          ReactSession.set('id', response.data.id)
          window.location.href = './user'
        }else{
          document.getElementById('submit').style = ``;
          document.getElementById('submit').style = `
            animation: incorrectanimation 0.75s;
          `;
          setTimeout(() => {
            document.getElementById('submit').style = ``;
          }, 1100)
        }
      })
    }

    const onCreateAccount = (event) => {
      console.log('a')
    }

    if(doesSesVarExist('id')){
      return <Redirect to='/account/user'></Redirect>
    }else{
      return(
        <div id='loginform' className={this.state.theme}>
          <label>Username</label>
          <input type="text" id='username' className={this.state.theme}  onKeyUp={onSubmit}></input>
          <label>Password</label>
          <input type="password" id='password' className={this.state.theme} onKeyUp={onSubmit}></input>
          <div id='submit' onClick={onSubmit} className={this.state.theme}> <p> login </p> </div>
          <div id='create_account' className={this.state.theme}> <p> You don't have an account? <u onClick={onCreateAccount}>sign up here</u> </p> </div>
        </div>
      )
    }
  }
}

