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
      $scope.alldata = data;
    });

    $scope.search = {
      session: undefined,
      author: undefined,
      keyword: undefined,
      affiliation: undefined,
      association: undefined
    };

    $scope.filterOrder = [];

    // Filter the papers and only display sessions that contain papers after filtering
    $scope.filterPapers = function(filterType) {

      // Choosing a session will cause the author and keywords selection options to shrink
      // Choosing an author will not change the session selection option
      // Choosing a keyword will not change

      $scope.sessions = $scope.alldata.research;

      // Define the order of the filtering
      if (!($scope.filterOrder.includes(filterType))) {
        $scope.filterOrder.push(filterType);
      }

      // @TODO: If filter set to "Show All", then splice from filterOrder
      //
      if ($scope.search.author === undefined || $scope.search.author === "") {
        let idx = $scope.filterOrder.find(function)
      }


      console.log($scope.filterOrder);
      console.log($scope.search);

      // Execute the filtering in the right order
      for (let i=0;i<$scope.filterOrder.length;i++) {

        if ($scope.filterOrder[i] === "session") {
          // Filter by session
          $scope.sessions = $scope.sessions.filter($scope.sessionmatch);
        }
        else if ($scope.filterOrder[i] === "author") {
          if ($scope.search.author !== undefined) {
            if ($scope.search.author !== "") {
              // Filter by author
              $scope.sessions = $scope.sessions.map(function(s) {
                s.papers = s.papers.filter($scope.authormatch);
                return s;
              });
              $scope.sessions = $scope.sessions.filter(function(s) {
                return s.papers.length > 0;
              });
            }
          }
        }
        else if ($scope.filterOrder[i] === "keyword") {
          // Filter by keyword
          $scope.session = $scope.sessions.map(function(s) {
            s.papers = s.papers.filter($scope.keywordmatch);
            return s;
          });
          $scope.sessions = $scope.sessions.filter(function(s) {
            return s.papers.length > 0;
          });
        }
      }
    };

    let checkDefined = function(x,y) {
      if (!angular.isDefined(x) ||
          !angular.isDefined($scope.search) ||
          !angular.isDefined($scope.search[y])) {
        return true;
      }
      if ($scope.search[y] === "") {
        return true;
      }
      return false;
    }

    // Return boolean dependent on finding author of paper
    $scope.authormatch = function (paper) {
      if (checkDefined(paper,"author")) {
        return true;
      }
      for (let i=0; i<paper.authors.length; i++) {
        if (paper.authors[i].authorLastFirst === $scope.search.author) {
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

    // Return boolean dependent on finding keyword associated with paper
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

    // Return boolean dependent on finding affiliation associated with paper
    $scope.affiliationmatch = function(paper) {
      if (!angular.isDefined(paper) ||
          !angular.isDefined($scope.search) ||
          !angular.isDefined($scope.search.affiliation)) {
        return true;
      }
      if ($scope.search.affiliation === "") {
        return true;
      }
      for (let i=0; i<paper.authors.length; i++) {
        if (paper.authors[i].affiliation === $scope.search.affiliation) {
          return true;
        }
      }
    }

    // Return boolean dependent on finding affiliation associated with paper
    $scope.associationmatch = function(paper) {
      if (!angular.isDefined(paper) ||
          !angular.isDefined($scope.search) ||
          !angular.isDefined($scope.search.association)) {
        return true;
      }
      if ($scope.search.keyword === "") {
        return true;
      }
      return $scope.search.association === paper.Association;
    }

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

  }
]);
