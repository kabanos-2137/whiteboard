import { Component } from 'react'
import doesSesVarExist from '../doesSesVarExist'
import axios from 'axios'
import { ReactSession } from 'react-client-session'

export default class DrawInside extends Component {
  render(){
    return(
      <div>
        <DrawingPlace></DrawingPlace>
        <SettingsPlace></SettingsPlace>
      </div>
    )
  }
}

class DrawingPlace extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div></div>
    )
  }
}

class SettingsPlace extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div></div>
    )
  }
}