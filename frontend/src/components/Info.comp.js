import { Component } from 'react'
import doesSesVarExist from '../doesSesVarExist'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { ReactSession } from 'react-client-session';

export default class Info extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'dark',
      profpic: '../profpic/default.png'
    }
  }

  componentDidMount() {
    if(!doesSesVarExist('username') || !doesSesVarExist('password')){
      window.location.href = 'http://localhost:3000/account/login'
    }
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

    axios.post('/api/get_profpic', {
      username: ReactSession.get('username'),
      password: ReactSession.get('password')
    }).then(response => {
      this.setState({ 
        profpic: response.data
      })
    })
  }

  render() {
    if(!document.body.classList.contains(this.state.theme)){
      document.body.classList.remove('dark')
      document.body.classList.remove('light')
      document.body.classList.add(this.state.theme)
    }

    const onLogoutClick = () => {
      ReactSession.set('username', undefined)
      ReactSession.set('password', undefined)
      window.location.href = 'http://localhost:3000/account/login'
    }

    return(
      <div id="userinfo">
        <img src={'../' + this.state.profpic}></img>
        <p>{ReactSession.get('username')}</p>
        <div class={this.state.theme} onClick={() => onLogoutClick()}>Log out</div>
      </div>
    )
  }
}

