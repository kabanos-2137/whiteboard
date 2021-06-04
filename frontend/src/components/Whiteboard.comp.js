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

  componentDidMount() {
    const id = this.props.id
    axios.post('/api/get_dots', {
      whiteboardId: id,
      id: ReactSession.get('id'),
    }).then(response => {
      this.setState({
        whtbrdData: response.data
      })
    })
  }

  render(){
    return(
      <div class="whiteboard">
        <Window id={this.props.id} dot_number={1} dot_inside={this.state.whtbrdData.DOT_1} current={true}></Window>
        <Window id={this.props.id} dot_number={2} dot_inside={this.state.whtbrdData.DOT_2} current={false}></Window>
        <Window id={this.props.id} dot_number={3} dot_inside={this.state.whtbrdData.DOT_3} current={false}></Window>
        <Window id={this.props.id} dot_number={4} dot_inside={this.state.whtbrdData.DOT_4} current={false}></Window>
      </div>
    )
  }
}

