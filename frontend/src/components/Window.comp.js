import { Component } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ReactSession } from 'react-client-session'

import None from './None.comp'
import Draw from './Draw.comp'

export default class Window extends Component {
  constructor(props){
    super(props);

    this.state = {
      whtbrdData: undefined
    }
  }

  render(){
    if(this.props.dot_inside === 'NONE'){
      console.log('a')
      return (
        <None current={this.props.current} dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></None>
      )
    }else if(this.props.dot_inside === 'DRAW'){
      console.log('b')
      return (
        <Draw current={this.props.current} dot_number={this.props.dot_number}></Draw>
      )
    }else{
      console.log('c')
      return (
        <None current={this.props.current} dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></None>
      )
    }
  }
}

