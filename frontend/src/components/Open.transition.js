import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import doesSesVarExist from '../doesSesVarExist';

export default class User extends Component {
  render() {
    if(doesSesVarExist('username') && doesSesVarExist('password')){
      return <Redirect to='/account/user'></Redirect>
    }else{
      return <Redirect to='/account/login'></Redirect>
    }
  }
}

