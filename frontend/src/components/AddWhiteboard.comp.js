import { Component } from 'react'
import doesSesVarExist from '../doesSesVarExist'
import Nav from './Nav.comp'
import AddWhiteboardForm from './AddWhiteboardForm.comp'

export default class AddWhiteboard extends Component {
  componentDidMount() {
    if(!doesSesVarExist('id')){
      window.location.href = './not_logged_in'
    }
  }

  render(){
    return(
      <div>
        <Nav></Nav>
        <AddWhiteboardForm></AddWhiteboardForm>
      </div>
    )
  }
}

