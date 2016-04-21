$(document).ready(function () { //when page is loaded do the following.
	
	//iniatiate timeago 
	prepareDynamicDates();
	$(".timeago").timeago();
	
	
	var realName = $('#name').text();
	var username = $('#username').text();
	var tweetCompose = $('.tweet-compose');
	var tweetControls = $("#tweet-controls");
	var charCount = $('#char-count');
	var submitTweet = $('#tweet-submit');
	var tweetContent = $('.tweet');
	

	//hide these elements immediately
	tweetControls.hide();
	$('.tweet-actions').hide();
	$('.stats').hide();
	$('.reply').hide();



	//when element with class of tweet-compose is clicked do the following.
	tweetCompose.on('click', function () {
		tweetControls.show(); //show tweet controls
		$(this).css('height', '5em'); //element we click will have css property of height with val of 5em. which is double its current size

	})


	//when tweet-compose looses focus && it has no value apply the following.
	tweetCompose.blur('click', function () {
		var tweet = $('.tweet-compose').val();
		if (!tweet) {
			tweetCompose.css({
				height: '2.5em'
			});
			tweetControls.hide();
		}
	});



	var maxTweetLength = 140;
	//any time there is a change to tweet-compose's value we'll run this.
	tweetCompose.on('input', function () {
		var tweet = $('.tweet-compose').val();
		//length is now equal to character length in tweet-compose 
		var tweetLength = tweet.length;
		
		//remCharCount now stores the difference of max length and the length of tweet-compose
		var remCharCount = maxTweetLength - tweetLength;

		//sets text found in char-count element to val of remCharCount
		charCount.text(remCharCount);
		if (remCharCount <= 20 && remCharCount >= 11) {
			charCount.css('color', '#813A3E');
		} else if (remCharCount <= 10) {
			charCount.css('color', '#D41116');
		} else {
			charCount.css('color', '#999');
		}

		//if remChars is < 0 disable the submit button. otherwise leave it on.
		if (remCharCount < 0) {
			submitTweet.attr('disabled', true);
		} else {
			submitTweet.attr('disabled', false);
		}

	});
	
	//runs when submit button is clicked
	submitTweet.on('click', function () {
		
		var tweet = $('.tweet-compose').val();
		var userAvatar = "src='img/alagoon.jpg'";
		var posted = new Date();
		var displayTimestamp = posted.toISOString();
		
		
		//assign newTweet  to a clone of the entire tweet element and its children elements as well as styles
		var newTweet = '<div class="tweet">\
							<div class="content">\
								<img class="avatar"' + userAvatar + '" />\
								<strong class="fullname">'+ realName + ' ' + '</strong>\
								<span class="username">'+ username +' ' + '</span>\
								<p class="tweet-text">'+ tweet +'</p>\
								<div class="tweet-actions">\
									<ul>\
										<li><span class="icon action-reply"></span> Reply</li>\
										<li><span class="icon action-retweet"></span> Retweet</li>\
										<li><span class="icon action-favorite"></span> Favorite</li>\
										<li><span class="icon action-more"></span> More</li>\
									</ul>\
								</div>\
								<div class="stats">\
									<div class="retweets">\
										<p class="num-retweets">0</p>\
										<p>RETWEETS</p>\
									</div>\
									<div class="favorites">\
										<p class="num-favorites">0</p>\
										<p>FAVORITES</p>\
									</div>\
									<div class="users-interact">\
										<div class="retweetPics">\
										</div>\
									</div>\
									<time class="timeago" datetime="' + displayTimestamp + '"></time>\
								</div>\
								<div class="reply">\
									<img class="avatar"' + userAvatar + ' />\
									<textarea class="tweet-compose" placeholder="Reply to' + " " + username  + '"/></textarea>\
								</div>\
							</div>\
						</div>'
						
//		tweetContent.find('.timeago').text($.timeago('update', new Date()));

		//adds newTweet to timeline as top tweet.
		if(tweetCompose.val()){
			$('#stream').prepend(newTweet);
			$('.timeago').timeago();
		}
		
	

		tweetCompose.val(''); //reset tweet-compose val to nothing.

		charCount.text(140); //resets char count

		tweetCompose.css('height', '2.5em')//change tweet-compose height back to normal

		tweetControls.hide(); 
		
		$('.tweet-actions').hide();
		$('.reply').hide();
		$('.stats').hide();
		
		$('.tweet').hover(function () {
			$('.tweet-actions', this).show()
		}, function () {
			$('.tweet-actions', this).hide('slow');
		});
		
		$('.tweet').each(function () {
			var show = false
			$(this).on('click',function() {
				if(show === false){
					$('.stats', this).show();
					$('.reply', this).show();
					show = true
				} else {
					$('.stats', this).hide();
					$('.reply', this).hide();
					show = false;
				}
			})

		});

		
	});

	
	$('.tweet').hover(function () {
		$('.tweet-actions', this).show()
	}, function () {
		$('.tweet-actions', this).hide('slow');
	});

	
	var toggleShow = $(function() {
		$('.tweet').each(function () {
			var show = false;
			$(this).on('click',function() {
				if(show === false){
					$('.stats', this).show();
					$('.reply', this).show();
					show = true
				}	else if(this === '.reply') {
					console.log('true')
				}
				
				else {
					$('.stats', this).hide();
					$('.reply', this).hide();
					show = false;
				}
			})
		
		})
	});
	
});
