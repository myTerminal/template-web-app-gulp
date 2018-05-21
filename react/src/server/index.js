/* global module require __dirname */

module.exports = function (url) {
    var appName = 'template-web',
        path = require('path'),
        express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        fs = require('fs'),
        baseUrl = path.join(__dirname, '../../');

    app.use(express.static(path.join(baseUrl, 'public')));
    app.use(bodyParser.json());

    app.listen(url, function () {
        console.log(appName, 'started on', url);
    });

    app.get('*', function (req, res) {
        res.send(fs.readFileSync(baseUrl + '/public/index.html', 'utf8'));
    });
};
