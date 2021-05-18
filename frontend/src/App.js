import { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home.comp'
import Login from './components/Login.comp'
import User from './components/User.comp'
import Open from './components/Open.transition'
import ChooseWhtbrd from './components/ChooseWhtbrd.comp'
import NotLoggedIn from './components/NotLoggedIn.comp'
import AddWhiteboard from './components/AddWhiteboard.comp'
import { ReactSession } from 'react-client-session'

export default class App extends Component {
  render(){
    ReactSession.setStoreType('localStorage')
    return(
      <BrowserRouter>
        <Switch>  
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/account/open'>
            <Open></Open>
          </Route>
          <Route exact path='/account/login'>
            <Login></Login>
          </Route>
          <Route exact path='/account/user'>
            <User></User>
          </Route>
          <Route exact path='/app/open'>
            <ChooseWhtbrd></ChooseWhtbrd>
          </Route>
          <Route exact path='/app/not_logged_in'>
            <NotLoggedIn></NotLoggedIn>
          </Route>
          <Route exact path='/app/add'>
            <AddWhiteboard></AddWhiteboard>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

