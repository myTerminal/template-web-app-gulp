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

const $ = global.jQuery;
const Bootstrap = require('bootstrap');

class App extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <div>
                <Banner />
                <div className="navigation">
                    <NavLink to="/" exact className="navigation-button" activeClassName="active">
                        (<span className="fa fa-home" />) Home
                    </NavLink>
                    <NavLink to="/about" className="navigation-button" activeClassName="active">
                        (<span className="fa fa-info" />) About
                    </NavLink>
                </div>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
            </div>
        );
    }
}

ReactDOM.render((
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>
), document.getElementById('page'));
