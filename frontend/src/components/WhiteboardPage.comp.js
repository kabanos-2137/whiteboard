import { Component } from 'react'
import Nav from './Nav.comp'
import { useParams } from 'react-router-dom'
import Whiteboard from './Whiteboard.comp'
import axios from 'axios'
import { ReactSession } from 'react-client-session'

export default class WhiteboardPage extends Component {
  render(){
    return(
      <div>
        <Nav></Nav>
        <Whiteboard id={this.props.match.params.id}/>
      </div>
    )
  }
}

