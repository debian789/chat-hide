import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import './css/estilo.css'
// import Router from './components/Router.js';
import { BrowserRouter as Router, Route } from "react-router-dom";



import Ingreso from './components/session/Ingreso'
import AppChat from './components/chat/AppChat'

import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {
    render () {
      return <div>
        {this.props.children}
      </div>
    }
  }


/*
ReactDOM.render((  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Ingreso}/>
      <Route path="ingreso" component={Ingreso}/>
      <Route path="chat" component={AppChat}/>
    </Route>
  </Router>), document.getElementById('root'));
registerServiceWorker();

*/

const BasicExample = () => (
    <Router>
      <div>
          <Ingreso/>
        <Route exact path="/" component={App} />
        <Route path="/ingreso" component={Ingreso} />
        <Route path="/chat" component={AppChat} />
      </div>
    </Router>
  );
  
  ReactDOM.render(<BasicExample/>, document.getElementById('root'));
registerServiceWorker();