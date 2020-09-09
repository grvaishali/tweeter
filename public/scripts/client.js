
$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

  renderTweets(data);
});


