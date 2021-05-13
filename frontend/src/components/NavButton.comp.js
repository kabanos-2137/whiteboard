import React, { Component } from 'react'
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import { Link } from 'react-router-dom'
import doesSesVarExist from '../doesSesVarExist'

export default class NavButton extends Component{
  render() {
    const changeTheme = () => {
      Array.prototype.forEach.call(document.getElementsByTagName('*'), (element, index) => {
        if(element.classList.contains('light') || element.classList.contains('dark')){
          element.classList.toggle('dark')
          element.classList.toggle('light')
        }
        if(element.classList.contains('light')){
          ReactSession.set('theme', 'light')
        }else if(element.classList.contains('dark')){
          ReactSession.set('theme', 'dark')
        }
      })
      if(doesSesVarExist('username') && doesSesVarExist('password')){
        console.log({
          theme: ReactSession.get('theme'),
          username: ReactSession.get("username"),
          password: ReactSession.get("password")
        })
        axios.post('/api/set_theme', {
          theme: ReactSession.get('theme'),
          username: ReactSession.get("username"),
          password: ReactSession.get("password")
        }).then(response => {
          console.log(response.data)
        })
      }
    }

    if(this.props.type === 'home'){
      return(
        <Link to={'/'} className={'navLink ' + this.props.theme}>
          <div className={'navbutton ' + this.props.theme} style={this.props.styled}>
            <i className="icon-home"></i>
            <span>Home</span>
          </div>
        </Link>
      )
    }else if(this.props.type === 'app'){
      return(
        <Link to={'/app/open'} className={'navLink ' + this.props.theme}>
          <div className={'navbutton ' + this.props.theme} style={this.props.styled}>
            <i className="icon-th"></i>
            <span>App</span>
          </div>
        </Link>
      )
    }else if(this.props.type === 'account'){
      return(
        <Link to={'/account/open'} className={'navLink ' + this.props.theme}>
          <div className={'navbutton ' + this.props.theme} style={this.props.styled}>
            <i className="icon-user"></i>
            <span>Account</span>
          </div>
        </Link>
      )
    }else if(this.props.type === 'theme'){
      return(
        <div className={'navbutton ' + this.props.theme} style={this.props.styled} onClick={() => changeTheme()}>
          <i className="icon-circle"></i>
          <span>Theme</span>
        </div>
      )
    }
  }
}