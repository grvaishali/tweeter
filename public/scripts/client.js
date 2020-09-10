
$(document).ready(function () {

  const renderTweets = function (tweets) {
    const tweetsContainer = $("#tweets");

    for (const tweet of tweets) {
      tweetsContainer.prepend(createTweetElement(tweet));
    }
  }

  const createTweetElement = function (tweet) {
    let tweetEl = $("<article>").addClass("tweet");

    let headerEl = $("<header>");
    headerEl.append($(`<img src="${tweet.user.avatars}">`));
    headerEl.append($("<span>").addClass("name").text(tweet.user.name));
    headerEl.append($("<span>").addClass("handle").text(tweet.user.handle));
    tweetEl.append(headerEl);

    tweetEl.append($("<div>").addClass("body").text(tweet.content.text));

    let footerEl = $("<footer>");
    footerEl.append($("<div>").addClass("timestamp").text(moment(new Date(tweet.created_at)).fromNow()));
    let linksContainer = $("<div>").addClass("flags");
    linksContainer.append($("<span>").addClass("fas").addClass("fa-flag"));
    linksContainer.append($("<span>").addClass("fas").addClass("fa-retweet"));
    linksContainer.append($("<span>").addClass("fas").addClass("fa-heart"));
    footerEl.append(linksContainer);
    tweetEl.append(footerEl);

    return tweetEl;
  }

  $("form").on('submit', function (event) {
    const $form = $(this);
    const tweetText = $($form.children("textarea")[0]);

    resetValidation();

    if (tweetText.val() === "") {
      setValidationErrorMessage("Tweet must contain some text.");
    } else if (tweetText.val().length > 140) {
      setValidationErrorMessage("Tweet cannot be longer than 140 characters.");
    } else {
      $.ajax($form.attr('action'), {
        method: $form.attr('method'),
        data: $form.serialize()
      }).then(() => {
        $("#tweets").empty();
        loadTweets();
      });
      $form.trigger('reset');
      $(".new-tweet .counter").text("140");
    }
    event.preventDefault();
  });

  const loadTweets = () => {
    $.ajax("/tweets").then(data => renderTweets(data));
  };

  const setValidationErrorMessage = (message) => {
    $("section.new-tweet .validation-error .message").text(message);
    $("section.new-tweet .validation-error").slideDown();
  };

  const resetValidation = () => {
    $("section.new-tweet .validation-error").hide();
  };

  loadTweets();
});


