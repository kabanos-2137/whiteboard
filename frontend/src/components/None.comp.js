import { Component } from 'react'
import ReactDOM from 'react-dom';
import doesSesVarExist from '../doesSesVarExist'
import axios from 'axios'
import { ReactSession } from 'react-client-session'

import DrawInside from './DrawInside.comp'

class NoneButton extends Component {
  constructor(props){
    super(props)
    
    this.onNoneButtonClick = this.onNoneButtonClick.bind(this)

    this.state = {
      theme: 'dark'
    }
  }

  onNoneButtonClick(number, type){
    axios.post('/api/change_dot_theme', {
      id: ReactSession.get('id'),
      whtbrd_id: this.props.whtbrd_id,
      dot_number: number,
      dot_target_type: type.toUpperCase()
    }).then(response => {

    })

    let dot = document.querySelector('.current_dot');
    if(type == 'draw'){
      dot.src = '../dots/draw.png'
    }
    

    let currentWhtbrd = document.getElementById(`${number}_whtbrd`);
    ReactDOM.render(<DrawInside></DrawInside>, currentWhtbrd)
  }

  componentWillMount() {
    if(doesSesVarExist('theme')){
      this.setState({
        theme: ReactSession.get('theme'),
      })
    }else{
      if(doesSesVarExist('id')){
        axios.post('/api/get_theme', {
          id: ReactSession.get('id'),
        }).then(response => {
          ReactSession.set('theme', response.data.theme)
          this.setState({
            theme: response.data.theme
          })
        })
      }else{
        ReactSession.set('theme', 'dark')
        this.setState({
          theme: ReactSession.get('theme')
        })
      }
    }
  }

  render(){
    if(this.props.type === 'draw'){
      return(
        <div className={"none-draw none-btn " + this.state.theme} onClick={() => this.onNoneButtonClick(this.props.dot_number, 'draw')}>
          <p>Whiteboard</p>
          <i className="icon-pencil"></i>
        </div>
      )
    }else if (this.props.type === 'calc'){
      return(
        <div className={"none-calc none-btn " + this.state.theme} onClick={() => this.onNoneButtonClick(this.props.dot_number, 'calc')}>
          <p>Calculator</p>
          <i className="icon-calc"></i>
        </div>
      )
    }else if(this.props.type === 'snak'){
      return(
        <div className={"none-snak none-btn " + this.state.theme} onClick={() => this.onNoneButtonClick(this.props.dot_number, 'snak')}>
          <p>Snake</p>
          <i className="icon-gamepad"></i>
        </div>
      )
    }else if(this.props.type === 'text'){
      return(
        <div className={"none-text none-btn " + this.state.theme} onClick={() => this.onNoneButtonClick(this.props.dot_number, 'text')}>
          <p>Text editor</p>
          <i className="icon-doc-text-inv"></i>
        </div>
      )
    }
  }
}

export default class None extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.current === true){
      return(
        <div className="window current" id={this.props.dot_number + '_whtbrd'}>
          <NoneButton type="draw" dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></NoneButton>
          <NoneButton type="calc" dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></NoneButton>
          <NoneButton type="snak" dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></NoneButton>
          <NoneButton type="text" dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></NoneButton>
        </div>
      )
    }else{
      return(
        <div className="window not-current" id={this.props.dot_number + '_whtbrd'}>
          <NoneButton type="draw" dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></NoneButton>
          <NoneButton type="calc" dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></NoneButton>
          <NoneButton type="snak" dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></NoneButton>
          <NoneButton type="text" dot_number={this.props.dot_number} whtbrd_id={this.props.whtbrd_id}></NoneButton>
        </div>
      )
    }
  }
}

