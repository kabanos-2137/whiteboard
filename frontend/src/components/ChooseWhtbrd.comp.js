import { Component } from 'react'
import CryptoJS from 'crypto-js'
import { ReactSession } from 'react-client-session';
import doesSesVarExist from '../doesSesVarExist'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Nav from './Nav.comp'
import ChooseWhtbrdElement from './ChooseWhtbrdElement.comp'

require('dotenv').config();

export default class ChooseWhtbrd extends Component {
  constructor (){
    super();
    this.state = {
      whiteboards: [],
      theme: 'dark'
    }
  }

  componentDidMount() {
    if(!doesSesVarExist('id')){
      window.location.href = './not_logged_in'
    }
    axios.post('/api/get_whiteboards', {
      id: ReactSession.get('id'),
    }).then(response => {
      let whiteboards = response.data
      this.setState({
        whiteboards: whiteboards
      })
    })
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
  render(){
    const onAdd = () => {
      window.location.href = './add'
    }

    return(
      <div>
        <Nav></Nav>
        <div id="whiteboards">
          {this.state.whiteboards.map (whiteboard => (
            <ChooseWhtbrdElement 
              key={whiteboard.ID_OF_WHITEBOARD} 
              profpic={whiteboard.PROFPIC}
              name={whiteboard.WHITEBOARD_NAME}
              whtbrdid={whiteboard.ID_OF_WHITEBOARD}
              dot1={whiteboard.DOT_1}
              dot2={whiteboard.DOT_2}
              dot3={whiteboard.DOT_3}
              dot4={whiteboard.DOT_4}></ChooseWhtbrdElement>
          ))}
          <div className={'button ' + this.state.theme} onClick={() => onAdd()}>Add whiteboard</div>
        </div>
      </div>
    )
  }
} 

