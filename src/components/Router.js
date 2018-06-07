import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory } from 'react-router'

import Ingreso from './session/Ingreso'
import AppChat from './chat/AppChat'

let RouteHandler = Router.RouteHandler

class App extends React.Component {
  render () {
    return <div>
      {this.props.children}
    </div>
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Ingreso}/>
      <Route path="ingreso" component={Ingreso}/>
      <Route path="chat" component={AppChat}/>
    </Route>
  </Router>

), document.getElementById('container'))
