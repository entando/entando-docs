// choose different icons from fontAwesome for the expand/collapse button
// or insert whatever you want :)
$(document).ready(function(){

  $('#toc').toggleOpenClose({
    expandButtonText: '<i class="fas fa-angle-right"></i>',
    collapseButtonText: '<i class="fas fa-angle-down"></i>'
  },
  function(){
    console.log('Callback')
  });

});
