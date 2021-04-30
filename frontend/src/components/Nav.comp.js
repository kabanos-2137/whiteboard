import React, { Component } from 'react'
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import NavButton from './NavButton.comp'
import Logo from './Logo.comp'
import doesSesVarExist from '../doesSesVarExist'

export default class Nav extends Component {
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
        axios.post('/api/get_theme').then(response => {
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
    if(!document.body.classList.contains(this.state.theme)){
      document.body.classList.remove('dark')
      document.body.classList.remove('light')
      document.body.classList.add(this.state.theme)
    }
    return(
      <nav className={this.state.theme}>
        <Logo/>
        <NavButton styled={{float: 'left'}} type='home' theme={this.state.theme}/>
        <NavButton styled={{float: 'left'}} type='app' theme={this.state.theme}/>
        <NavButton styled={{float: 'right'}} type='account' theme={this.state.theme}/>
        <NavButton styled={{float: 'right'}} type='theme' theme={this.state.theme}/>
      </nav>
    )
  }
}