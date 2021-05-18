import { Component } from 'react'
import doesSesVarExist from '../doesSesVarExist'
import { ReactSession } from 'react-client-session'
import axios from 'axios'
import { Redirect } from 'react-router';

require('dotenv').config();

export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      theme: 'dark'
    }
  }
  
  componentDidMount() {
    if(doesSesVarExist('theme')){
      this.setState({
        theme: ReactSession.get('theme'),
      })
    }else{
      if(doesSesVarExist('id')){
        axios.post('/api/get_theme', {
          id: ReactSession.get('id'),
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
    let srcdot1;
    let srcdot2;
    let srcdot3;
    let srcdot4;
    if(this.props.dot1 == 'NONE'){
      srcdot1 = '../dots/none.png'
    }else if(this.props.dot1 == 'DRAW'){
      srcdot1 = '../dots/draw.png'
    }
    if(this.props.dot2 == 'NONE'){
      srcdot2 = '../dots/none.png'
    }else if(this.props.dot2 == 'DRAW'){
      srcdot2 = '../dots/draw.png'
    }
    if(this.props.dot3 == 'NONE'){
      srcdot3 = '../dots/none.png'
    }else if(this.props.dot3 == 'DRAW'){
      srcdot3 = '../dots/draw.png'
    }
    if(this.props.dot4 == 'NONE'){
      srcdot4 = '../dots/none.png'
    }else if(this.props.dot4 == 'DRAW'){
      srcdot4 = '../dots/draw.png'
    }

    const onGo = (id) => {
      window.location.href = id
    }

    const onDelete = (id) => {
      axios.post('/api/delete_whtbrd', {
        whtbrdid: id,
        id: ReactSession.get('id'),
      }).then(response => {
        let div = document.getElementById(id)
        div.classList.add('deletewhtbrd')
        setTimeout(() => div.parentNode.removeChild(div), 2000)
        
      })
    }

    return(
      <div className="whiteboardElement" id={this.props.whtbrdid}>
        <img src={this.props.profpic}></img>
        <p id="name">{this.props.name}</p>
        <span id="whtbrdid">{this.props.whtbrdid}</span>
        <div className={'button ' + this.state.theme} onClick={() => onGo('../whtbrd/' + this.props.whtbrdid)}>Go</div>
        <div className={'button ' + this.state.theme} onClick={() => onDelete(this.props.whtbrdid)}>Delete</div>
        <img className={'dots'} src={srcdot4}></img>
        <img className={'dots'} src={srcdot3}></img>
        <img className={'dots'} src={srcdot2}></img>
        <img className={'dots'} src={srcdot1}></img>
      </div>
    )
  }
}

