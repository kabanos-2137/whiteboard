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
    console.log(this.props.dot_number)
    if(this.props.dot_number == undefined){
      console.log('a')
      return (
        <None current={this.props.current}></None>
      )
    }
  }
}

