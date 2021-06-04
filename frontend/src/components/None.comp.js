import { Component } from 'react'
import doesSesVarExist from '../doesSesVarExist'
import axios from 'axios'
import { ReactSession } from 'react-client-session'

class NoneButton extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      theme: 'dark'
    }
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
        <div className={"none-draw none-btn " + this.state.theme}>
          <p>Whiteboard</p>
          <i className="icon-pencil"></i>
        </div>
      )
    }else if (this.props.type === 'calc'){
      return(
        <div className={"none-calc none-btn " + this.state.theme}>
          <p>Calculator</p>
          <i className="icon-calc"></i>
        </div>
      )
    }else if(this.props.type === 'snak'){
      return(
        <div className={"none-snak none-btn " + this.state.theme}>
          <p>Snake</p>
          <i className="icon-gamepad"></i>
        </div>
      )
    }else if(this.props.type === 'text'){
      return(
        <div className={"none-text none-btn " + this.state.theme}>
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
        <div className="window current">
          <NoneButton type="draw"></NoneButton>
          <NoneButton type="calc"></NoneButton>
          <NoneButton type="snak"></NoneButton>
          <NoneButton type="text"></NoneButton>
        </div>
      )
    }else{
      return(
        <div className="window not-current">
          <NoneButton type="draw"></NoneButton>
          <NoneButton type="calc"></NoneButton>
          <NoneButton type="snak"></NoneButton>
          <NoneButton type="text"></NoneButton>
        </div>
      )
    }
  }
}

