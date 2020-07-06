angular.module('index').directive('sketchSlideshow', function () {
  return {
    restrict: 'AC',
    link: function (scope, element, attrs) {
      var config = angular.extend({
        sketches: '.slide'
      }, scope.$eval(attrs.sketchSlideshow));

      setTimeout(function () {
        element.cycle(config);
      }, 0);
    }
  };
});

angular.module('index').directive('starchTestimonial', function() {
  return {
    restrict: 'A',
    templateUrl: 'modules/index/partials/testimonialTemplate1.html',
    link: function (scope, el, attrs) {
      scope.text = attrs.testimonialText;          // the testimonial (if undefined, then don't display)
      scope.name = attrs.testimonialAuthor;        // name of author (first name and last initial)
      scope.subtitle = attrs.testimonialSubtitle;  // sub-title that "links" testimonial to a project
      scope.img = attrs.testimonialImage;          // headshot of author
    }
  }
});