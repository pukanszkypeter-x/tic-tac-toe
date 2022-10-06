import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Particles from 'particlesjs';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {Game} from './components/Game';
import {Login} from './components/Login';
import {Error} from './components/Error';

class App extends Component {
    constructor() {
      super();
      this.state = {
        isUserAuthenticated: false
      };
    }
  
    render() {
        window.onload = function() {
            Particles.init({
                selector: '.background',
                color: 'white'
            });
        };

        return (
        <div>
          <Router>
              <Routes>
                  <Route exact path="/" element={ this.state.isUserAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" /> }/>
                  <Route exact path="/home" element={ this.state.isUserAuthenticated ? <Game/> : <Navigate to="/login" /> } />
                  <Route exact path="/login" element={ this.state.isUserAuthenticated ? <Navigate to="/home" /> : <Login /> } />
                  <Route exact path="/*" element={ <Error/> } />
              </Routes>
          </Router>
          <canvas className="background"></canvas>
          <script src="path/to/particles.min.js"></script>
        </div>
      );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
