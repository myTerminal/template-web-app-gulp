# template-web-gulp

[![Code Climate](https://codeclimate.com/github/myTerminal/template-web-gulp.png)](https://codeclimate.com/github/myTerminal/template-web-gulp)
[![bitHound Overall Score](https://www.bithound.io/github/myTerminal/template-web-gulp/badges/score.svg)](https://www.bithound.io/github/myTerminal/template-web-gulp)
[![bitHound Code](https://www.bithound.io/github/myTerminal/template-web-gulp/badges/code.svg)](https://www.bithound.io/github/myTerminal/template-web-gulp)  
[![Dependency Status](https://david-dm.org/myTerminal/template-web-gulp.svg)](https://david-dm.org/myTerminal/template-web-gulp)
[![devDependency Status](https://david-dm.org/myTerminal/template-web-gulp/dev-status.svg)](https://david-dm.org/myTerminal/template-web-gulp#info=devDependencies)
[![peer Dependency Status](https://david-dm.org/myTerminal/template-web-gulp/peer-status.svg)](https://david-dm.org/myTerminal/template-web-gulp#info=peerDependencies)  
[![License](https://img.shields.io/badge/LICENSE-GPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/gpl.html)
[![Gratipay](http://img.shields.io/gratipay/myTerminal.svg)](https://gratipay.com/myTerminal)  

A template to create web applications on [Node.js](https://nodejs.org/) with [Gulp.js](https://www.npmjs.com/package/gulp) as the task-runner

## Technologies

### Server

[Express](https://www.npmjs.com/package/express) as the web server with [body parser](https://www.npmjs.com/package/body-parser) to serve static resources.

### Client

#### Web Application

 - [AngularJS](https://angularjs.org/)
 - [Angular UI Router](https://ui-router.github.io/)
 - [Bootstrap 3](https://getbootstrap.com/docs/3.3/)
 - [Font Awesome](http://fontawesome.io/)
 - [jQuery](https://jquery.com/) as a dependency for Bootstrap
 - [ES2015](http://es6-features.org/)
 - [Less CSS](http://lesscss.org/)

#### Task Runner: Gulp

##### Plugins

 - [gulp-clean](https://www.npmjs.com/package/gulp-clean) to clean up the output directory at the start of every build
 - [gulp-sync](https://www.npmjs.com/package/gulp-sync) to be able to run tasks synchronously
 - [gulp-concat](https://www.npmjs.com/package/gulp-concat) to concat files
 - [gulp-copy](https://www.npmjs.com/package/gulp-copy) to copy static resources to the output directory
 - [gulp-less](https://www.npmjs.com/package/gulp-less) to transpile LESS stylesheets into CSS
 - [gulp-cleancss](https://www.npmjs.com/package/gulp-cleancss) to minify CSS
 - [browserify](https://www.npmjs.com/package/browserify) to `require` JavaScript libraries from within the web browser
 - [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer) and [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream) to work with browserify
 - [babelify](https://www.npmjs.com/package/babelify) and [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) for ES2015 transpilation
 - [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) to minify JavaScript files
 - [gulp-angular-templatecache](https://www.npmjs.com/package/gulp-angular-templatecache) to compile AngularJS templates
 - [gulp-jshint](https://www.npmjs.com/package/gulp-jshint) to find and report JSHint issues in JavaScript
 - [gulp-jscs](https://www.npmjs.com/package/gulp-jscs) to find and report code styling issues in JavaScript
 - [gulp-watch-now](https://www.npmjs.com/package/gulp-watch-now) to watch over source files and run appropriate tasks
 - [jshint](https://www.npmjs.com/package/jshint) as a dependency for gulp-jshint
 - [jshint-stylish](https://www.npmjs.com/package/jshint-stylish) as a reporter for jshint

##### Tasks

 - build (default)
   - clean to clean the output directory
   - copy
     - copy-bootstrap-css to copy Bootstrap CSS Stylesheets to the output directory
     - copy-bootstrap-fonts to copy Bootstrap fonts to the output directory
     - copy-html to copy all html entry-points to the output directory
     - copy-others to copy data, fonts, images and favicon to the output directory
   - templates to compile AngularJS templates
   - styles to transpile Less CSS stylesheets into CSS stylesheets for the output directory
   - scripts to concatenate, transpile & minify all JavaScript to the output directory
 - debug
   - clean to clean the output directory
   - copy
     - copy-bootstrap-css to copy Bootstrap CSS Stylesheets to the output directory
     - copy-bootstrap-fonts to copy Bootstrap fonts to the output directory
     - copy-html to copy all html entry-points to the output directory
     - copy-others to copy data, fonts, images and favicon to the output directory
   - templates to compile AngularJS templates
   - styles to transpile Less CSS stylesheets into CSS stylesheets for the output directory
   - scripts-debug to concatenate and transpile all JavaScript to the output directory
   - lint to run JSHint and JSCS over JavaScript files
 - lint
   - run JSHint over JavaScript files
   - run JSCS over JavaScript files
 - develop to watch over the source files and run tasks related to the changed files
