import React, { Component } from 'react'
import axios from 'axios';
import { ReactSession } from 'react-client-session';

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
    return(
      <nav>
        <Logo/>
        <NavButton styled={{float: 'left'}} type='home' theme={this.state.theme}/>
        <NavButton styled={{float: 'left'}} type='app' theme={this.state.theme}/>
        <NavButton styled={{float: 'right'}} type='account' theme={this.state.theme}/>
        <NavButton styled={{float: 'right'}} type='theme' theme={this.state.theme}/>
      </nav>
    )
  }
}

class Logo extends Component {
  render() {
    return(
      <p>.whiteboard</p>
    )
  }
}

class NavButton extends Component{
  render() {
    const changeTheme = () => {
      let theme;
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
        <div className={'navbutton ' + this.props.theme} style={this.props.styled}>
          <i className="icon-home"></i>
          <span>Home</span>
        </div>
      )
    }else if(this.props.type === 'app'){
      return(
        <div className={'navbutton ' + this.props.theme} style={this.props.styled}>
          <i className="icon-th"></i>
          <span>App</span>
        </div>
      )
    }else if(this.props.type === 'account'){
      return(
        <div className={'navbutton ' + this.props.theme} style={this.props.styled}>
          <i className="icon-user"></i>
          <span>Account</span>
        </div>
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

const doesSesVarExist = (sesVar) => {
  if(ReactSession.get(sesVar) != undefined){
    return true;
  }else{
    return false;
  }
}