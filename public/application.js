// Defines the name of the AngularJS main application module
var mainApplicationModuleName = 'stites';

// Defines the AngularJS main application module with all top-level direct injection (DI) dependencies
var mainApplicationModule = angular.module(mainApplicationModuleName, [
  'ngResource',
  'ngRoute',
  'ngMessages',
  'index'
]);

// Solve Facebook redirect bug
if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});


