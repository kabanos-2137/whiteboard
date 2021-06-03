import { Component } from 'react'
import doesSesVarExist from '../doesSesVarExist'
import { Redirect } from 'react-router-dom'
import { ReactSession } from 'react-client-session'
import axios from 'axios'

require('dotenv').config();

export default class AddWhiteboardForm extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    // this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      theme: 'dark'
    }
  }

  componentDidMount() {
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

  onClick(){
    document.forms[0].submit()
  }

  onSubmit(e){
    axios.post('/api/create_whiteboard', {
      name: this.state.text,
      id: ReactSession.get('id'),
    }).then(response => {

    })
  }

  // onChangeFile(e){
  //   this.setState({ profpic: e.target.files[0] })
  // }

  onChangeText(e){
    this.setState({ text: e.target.value })
  }

  render(){
    if(window.location.href.includes('?')){
      window.location.href = './open'
    }
    return(
      <form action="" id="addWhiteboard" onSubmit={this.onSubmit}>
        <label>Whiteboard name</label>
        <input onKeyUp={this.onChangeText} id="name" name="name" className={this.state.theme} type="text" required></input>
        <button onClick={this.onClick} className={this.state.theme} id="addButton"><p>Submit</p></button>
      </form>
    )
  }
}

