angular.module('index').controller('IndexController', [
  '$scope',
  '$routeParams',
  '$location',
  '$http',
  function($scope, $routeParams, $location, $http) {

    $http.get('/data').success(function(data) {
      $scope.sessions = data.research;
      $scope.teaching = data.teaching;
    });

    $scope.search = {
      author: undefined
    };

    // Return boolean dependent on finding author in paper
    $scope.authormatch = function (paper) {
      if (!angular.isDefined(paper) ||
          !angular.isDefined($scope.search) ||
          !angular.isDefined($scope.search.author)) {
        return true;
      }
      let authorMatch = false;
      for (let i=0; i<paper.authors.length; i++) {
        if (paper.authors[i].author.toLowerCase().includes($scope.search.author.toLowerCase())) {
          authorMatch = true;
        }
      }
      return authorMatch;
    }

    //$scope.currentPath = $location.path();

    // Create a list of featured projects
    // Use filter to search for papers
    //$scope.featuredProjects = $scope.projects.filter(function(x) { return x.featured; });

  }
]);
