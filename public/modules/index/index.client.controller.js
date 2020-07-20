angular.module('index').controller('IndexController', [
  '$scope',
  '$routeParams',
  '$location',
  '$http',
  function($scope, $routeParams, $location, $http) {

    $http.get('/data').success(function(data) {
      $scope.sessions = data.research;
      $scope.teaching = data.teaching;
      $scope.authors = data.authors;
      $scope.keywords = data.keywords;
    });

    $scope.search = {
      author: undefined,
      session: undefined,
      keyword: undefined
    };

    // // Return boolean dependent on finding author snippet in paper
    // $scope.authormatch = function (paper) {
    //   if (!angular.isDefined(paper) ||
    //       !angular.isDefined($scope.search) ||
    //       !angular.isDefined($scope.search.author)) {
    //     return true;
    //   }
    //   let authorMatch = false;
    //   for (let i=0; i<paper.authors.length; i++) {
    //     if (paper.authors[i].author.toLowerCase().includes($scope.search.author.toLowerCase())) {
    //       authorMatch = true;
    //     }
    //   }
    //   return authorMatch;
    // }

    // Return boolean dependent on finding author of paper
    $scope.authormatch = function (paper) {
      if (!angular.isDefined(paper) ||
          !angular.isDefined($scope.search) ||
          !angular.isDefined($scope.search.author)) {
        return true;
      }
      if ($scope.search.author === "") {
        return true;
      }
      for (let i=0; i<paper.authors.length; i++) {
        if (paper.authors[i].author === $scope.search.author) {
          return true;
        }
      }
      return false;
    }

    // Return boolean dependent on finding session title in paper
    $scope.sessionmatch = function(session) {
      if (!angular.isDefined(session) ||
          !angular.isDefined($scope.search) ||
          !angular.isDefined($scope.search.session)) {
        return true;
      }
      if ($scope.search.session === "") {
        return true;
      }
      return session.Title === $scope.search.session;
    }

    // Return boolean dependent on finding session title in paper
    $scope.keywordmatch = function(paper) {
      if (!angular.isDefined(paper) ||
          !angular.isDefined($scope.search) ||
          !angular.isDefined($scope.search.keyword)) {
        return true;
      }
      if ($scope.search.keyword === "") {
        return true;
      }
      const re = /\s*(?:,|$)\s*/
      return paper.Keywords.split(re).map(x => x.toLowerCase()).includes($scope.search.keyword);
    }

  }
]);
