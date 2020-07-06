angular.module('index').controller('IndexController', [
  '$scope',
  '$routeParams',
  '$location',
  '$http',
  function($scope, $routeParams, $location, $http) {

    $http.get('/data').success(function(data) {
      $scope.sessions = data;
    });

    //$scope.currentPath = $location.path();

    // Create a list of featured projects
    // Use filter to search for papers
    //$scope.featuredProjects = $scope.projects.filter(function(x) { return x.featured; });

  }
]);
