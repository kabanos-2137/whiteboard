import { Component } from 'react'
import doesSesVarExist from '../doesSesVarExist'
import axios from 'axios'
import { ReactSession } from 'react-client-session'

import DrawInside from './DrawInside.comp'

export default class Draw extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.current === true){
      return(
        <div className="window current" id={this.props.dot_number + '_whtbrd'}>
          <DrawInside></DrawInside>
        </div>
      )
    }else{
      return(
        <div className="window not-current" id={this.props.dot_number + '_whtbrd'}>
          <DrawInside></DrawInside>
        </div>
      )
    }
  }
}