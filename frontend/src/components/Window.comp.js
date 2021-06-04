import { Component } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ReactSession } from 'react-client-session'

import None from './None.comp'

export default class Window extends Component {
  constructor(props){
    super(props);

    this.state = {
      whtbrdData: undefined
    }
  }

  render(){
    console.log(this.props.dot_inside)
    if(this.props.dot_inside === 'NONE'){
      console.log('a')
      return (
        <None current={this.props.current} dot_number={this.props.dot_number}></None>
      )
    }else{
      console.log('b')
      return (
        <None current={this.props.current} dot_number={this.props.dot_number}></None>
      )
    }
  }
}

