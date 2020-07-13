
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