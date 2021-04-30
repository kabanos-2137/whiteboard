import { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Home from './components/Home.comp'
import About from './components/About.comp'
import { ReactSession } from 'react-client-session'

export default class App extends Component {
  render(){
    ReactSession.setStoreType('localStorage')
    ReactSession.set('username', 'Admin')
    ReactSession.set('password', 'AdminPass')
    return(
      <div>
      <BrowserRouter>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
      </BrowserRouter>
      </div>
    )
  }
}

