'use strict';
import 'angular-ui-router'
import 'angular-scroll'
import mainView from '../views/main.html'
export default angular
  .module('micropostsApp', ['ui.router', 'duScroll', 'micropostsApp.services', 'micropostsApp.ctrl'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        template: mainView,
        controller: 'PostsCtrl as ctrl'
      })

  });
