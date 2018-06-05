/* global global require */

require('./service-worker-starter');

global.jQuery = require('jquery');

var angular = require('angular'),
    uiRouter = require('angular-ui-router'),
    bootstrap = require('bootstrap'),
    $ = global.jQuery,
    templates;

angular.module('templateWeb', ['ui.router'])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/home',
                    controller: 'homeController',
                    controllerAs: 'home',
                    templateUrl: 'scripts/templates/home.html'
                })
                .state('about', {
                    url: '/about',
                    controller: 'aboutController',
                    controllerAs: 'about',
                    templateUrl: 'scripts/templates/about.html'
                });
        }
    ])

    .controller('homeController',
        [
            '$scope',
            '$http',
            function ($scope, $http) {
                var self = this;

                self.message = 'This is home';
            }
        ])

    .controller('aboutController',
        [
            '$scope',
            '$http',
            function ($scope, $http) {
                var self = this;

                self.message = 'This is about';
            }
        ]);

templates = require('../../../public/scripts/templates');