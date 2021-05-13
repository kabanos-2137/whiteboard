import { Component } from 'react'
import DoesSesVarExist from '../doesSesVarExist'
import Nav from './Nav.comp'

export default class ChooseWhtbrd extends Component {
  componentDidMount() {
    if(!DoesSesVarExist('username') && !DoesSesVarExist('password')){
      window.location.href = './not_logged_in'
    }
  }
  render(){
    return(
      <div>
        <Nav></Nav>
      </div>
    )
  }
} 

