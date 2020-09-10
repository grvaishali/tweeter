$(document).ready(function() {
  $(".new-tweet textarea").on('keyup', function() {
    let l = $('#tweet-text').val().length;
    $('.counter').val(`${140 - l}`);

    if (l > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'inherit');
    }
  });
});