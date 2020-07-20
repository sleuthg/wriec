angular.module('index').config([
  '$routeProvider',
  function($routeProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'modules/index/index.html'
      }).
      when('/rs', {
        templateUrl: 'modules/index/research_sessions.html'
      }).
      when('/ts', {
        templateUrl: 'modules/index/teaching_session.html'
      }).
      when('/rf', {
        templateUrl: 'modules/index/research_forum.html'
      }).
      // when('/s', {
      //   templateUrl: 'modules/index/sponsors.html'
      // }).
      when('/p', {
        templateUrl: 'modules/index/plenaries.html'
      }).
      when('/a', {
        templateUrl: 'modules/index/awards.html'
      }).
      // when('/t', {
      //   templateUrl: 'modules/index/team.html'
      // }).
      when('/error/403', {
        templateUrl: 'modules/index/403.html'
      }).
      otherwise({redirectTo: '/'});
  }
]);