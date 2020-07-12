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
      when('/error/403', {
        templateUrl: 'modules/index/403.html'
      }).
      otherwise({redirectTo: '/'});
  }
]);