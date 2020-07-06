angular.module('index').config([
  '$routeProvider',
  function($routeProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'modules/index/index_view_2.html'
      }).
      when('/portfolio', {
        templateUrl: 'modules/index/portfolio.html'
      }).
      when('/contact', {
        templateUrl: 'modules/index/contact.html'
      }).
      when('/project/:projectId', {
        templateUrl: 'modules/index/project_template.html'
      }).
      when('/error/403', {
        templateUrl: 'modules/index/403.html'
      }).
      otherwise({redirectTo: '/'});
  }
]);