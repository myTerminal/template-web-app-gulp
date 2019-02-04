/* global module require __dirname */

const appName = 'template-web';

const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs');

module.exports = function (url) {
    const app = express(),
        baseUrl = path.join(__dirname, '../../');

    app.use(express.static(path.join(baseUrl, 'public')));
    app.use(bodyParser.json());

    app.listen(url, () => {
        console.log(appName, 'started on', url);
    });

    app.get('*', (req, res) => {
        res.send(fs.readFileSync(`${baseUrl}/public/index.html`, 'utf8'));
    });
};
