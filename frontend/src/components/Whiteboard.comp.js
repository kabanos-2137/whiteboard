import { Component } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ReactSession } from 'react-client-session'
import Window from './Window.comp'

export default class WhiteboardPage extends Component {
  constructor(props){
    super(props);

    this.onDotClick = this.onDotClick.bind(this);

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

  onDotClick(number){
    let currentFirst = document.querySelector('.current');
    let currentNew = document.getElementById(`${number}_whtbrd`)
    currentFirst.classList.toggle('not-current')
    currentFirst.classList.toggle('current')
    currentNew.classList.toggle('current')
    currentNew.classList.toggle('not-current')

    let currentFirstDot = document.querySelector('.current_dot');
    let currentNewDot = document.getElementById(`dot_${number}`)
    currentFirstDot.classList.toggle('current_dot')
    currentNewDot.classList.toggle('current_dot')


  }

  render(){
    let srcdot1;
    let srcdot2;
    let srcdot3;
    let srcdot4;
    if(this.state.whtbrdData.DOT_1 == 'NONE'){
      srcdot1 = '../dots/none.png'
    }else if(this.state.whtbrdData.DOT_1 == 'DRAW'){
      srcdot1 = '../dots/draw.png'
    }
    if(this.state.whtbrdData.DOT_2 == 'NONE'){
      srcdot2 = '../dots/none.png'
    }else if(this.state.whtbrdData.DOT_2 == 'DRAW'){
      srcdot2 = '../dots/draw.png'
    }
    if(this.state.whtbrdData.DOT_3 == 'NONE'){
      srcdot3 = '../dots/none.png'
    }else if(this.state.whtbrdData.DOT_3 == 'DRAW'){
      srcdot3 = '../dots/draw.png'
    }
    if(this.state.whtbrdData.DOT_4 == 'NONE'){
      srcdot4 = '../dots/none.png'
    }else if(this.state.whtbrdData.DOT_4 == 'DRAW'){
      srcdot4 = '../dots/draw.png'
    }
    return(
      <div className="whiteboard">
        <Window id={this.props.id} dot_number={1} dot_inside={this.state.whtbrdData.DOT_1} current={true}></Window>
        <Window id={this.props.id} dot_number={2} dot_inside={this.state.whtbrdData.DOT_2} current={false}></Window>
        <Window id={this.props.id} dot_number={3} dot_inside={this.state.whtbrdData.DOT_3} current={false}></Window>
        <Window id={this.props.id} dot_number={4} dot_inside={this.state.whtbrdData.DOT_4} current={false}></Window>
        <img className={'dots'} id={"dot_4"} src={srcdot4} onClick={() => this.onDotClick(4)}></img>
        <img className={'dots'} id={"dot_3"} src={srcdot3} onClick={() => this.onDotClick(3)}></img>
        <img className={'dots'} id={"dot_2"} src={srcdot2} onClick={() => this.onDotClick(2)}></img>
        <img className={'dots current_dot'} id={"dot_1"} src={srcdot1} onClick={() => this.onDotClick(1)}></img>
      </div>
    )
  }
}

