/* global document */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app.jsx';

import './service-worker-starter.js';

global.jQuery = require('jquery');

const $ = global.jQuery,
    Bootstrap = require('bootstrap');

render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>,
    document.getElementById('page')
);
