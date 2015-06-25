$(function () {
  $('[data-toggle="popover"]').popover();
  $('body').on('click', function (e) {
    //only buttons
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('.popover.in').length === 0) { 
        $('[data-toggle="popover"]').popover('hide');
    }
  });
  $('[data-toggle="popover"]').click(function() {
    $('[data-toggle="popover"]').not(this).popover('hide'); //all but this
  });
})
