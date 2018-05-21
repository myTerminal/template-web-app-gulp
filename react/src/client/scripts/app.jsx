/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    NavLink
} from 'react-router-dom';

import './service-worker-starter.js';

import Banner from './components/banner.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';

global.jQuery = require('jquery');
const $ = global.jQuery,
    Bootstrap = require('bootstrap');

class App extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div>
                <Banner />
                <span className="fa fa-thumbs-o-up fa-lg" />
                <NavLink to="/" exact activeClassName="active">Home</NavLink>
                <NavLink to="/about" activeClassName="active">About</NavLink>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
            </div>
        );
    }
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('page'));
