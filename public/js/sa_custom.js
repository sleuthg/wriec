
// JQuery to add/remove "active" bootstrap class to navbar links
$(document).ready(function(){
  $('nav ul li').click(function(){
    $('nav li').removeClass("active");
    $(this).addClass("active");
  });
});