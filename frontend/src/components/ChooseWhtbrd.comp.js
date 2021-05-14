import { Component } from 'react'
import { ReactSession } from 'react-client-session';
import DoesSesVarExist from '../doesSesVarExist'
import axios from 'axios'
import Nav from './Nav.comp'
import ChooseWhtbrdElement from './ChooseWhtbrdElement.comp'

export default class ChooseWhtbrd extends Component {
  constructor (){
    super();
    this.state = {
      whiteboards: []
    }
  }

  componentDidMount() {
    if(!DoesSesVarExist('username') && !DoesSesVarExist('password')){
      window.location.href = './not_logged_in'
    }
    axios.post('/api/get_whiteboards', {
      username: ReactSession.get('username'),
      password: ReactSession.get('password')
    }).then(response => {
      let whiteboards = response.data
      this.setState({
        whiteboards: whiteboards
      })
    })
  }
  render(){
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
        </div>
      </div>
    )
  }
} 

