import { Component } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ReactSession } from 'react-client-session'
import Window from './Window.comp'

export default class WhiteboardPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      whtbrdData: {},
    }
  }

  render(){
    return(
      <div class="whiteboard">
        <Window id={this.props.id} dot_number={this.state.whtbrdData.DOT_1} current={true}></Window>
        <Window id={this.props.id} dot_number={this.state.whtbrdData.DOT_2} current={false}></Window>
        <Window id={this.props.id} dot_number={this.state.whtbrdData.DOT_3} current={false}></Window>
        <Window id={this.props.id} dot_number={this.state.whtbrdData.DOT_4} current={false}></Window>
      </div>
    )
  }
}

