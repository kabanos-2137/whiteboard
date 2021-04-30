import { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home.comp'
import Login from './components/Login.comp'
import { ReactSession } from 'react-client-session'

export default class App extends Component {
  render(){
    ReactSession.setStoreType('localStorage')
    ReactSession.set('username', 'Admin')
    ReactSession.set('password', 'AdminPass')
    return(
      <div>
        <BrowserRouter>
          <Switch>  
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route exact path='/account/login'>
              <Login></Login>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

