$(document).ready(function() { //when page is loaded do the following.
	
	
	prepareDynamicDates();
	$(".timeago").timeago();
	
	var tweetCompose = $('.tweet-compose');
	var tweetControls = $("#tweet-controls");
	var charCount = $('#char-count');
	var submitTweet = $('#tweet-submit');
	var tweet = $('.tweet');
	
	
	tweetControls.hide(); //hides element immediately
	$('.tweet-actions').hide();
	$('.stats').hide();
	$('.reply').hide();
	
	
	
	//when element with class of tweet-compose is clicked do the following.
	tweetCompose.on('click', function(){
		tweetControls.show(); //show the element
		$(this).css('height', '5em') //element we click will have css property of height with val of 5em. which is double its current size
		
	})

		
	//when tweet-compose looses focus and it has no value apply the following.
	tweetCompose.blur('click', function() {
		if (!tweetCompose.val()) {
			tweetCompose.css({height: '2.5em'});
			tweetControls.hide();
		}
	});
	
	
	
	var maxTweetLength = 140;
	//any time there is a change to tweet-compose we'll run this.
	tweetCompose.on('input', function() {
		//length is now equal to character length in tweet-compose 
		var length = $(this).val().length
		
		//remCharCount now stores the difference of max length and the length of tweet-compose
		var remCharCount = maxTweetLength - length;
		
		//sets text found in char-count element to val of remCharCount
		charCount.text(remCharCount);
		if(remCharCount <= 20 && remCharCount >= 11) {
			charCount.css('color', '#813A3E');
		} else if (remCharCount <= 10) {
			charCount.css('color', '#D41116');
		} else {
			charCount.css('color', '#999');
		}
		
		//if remChars is < 0 disable the submit button. otherwise leave it on.
		if(remCharCount < 0) {
			submitTweet.attr('disabled', true);
		} else {
			$('#tweet-submit').attr('disabled', false);
		}
		
	});
	
	//runs when submit button is clicked
	$('#tweet-submit').on('click', function() {
		
		
		//assign newTweet  to a clone of the entire tweet element and its children elements as well as styles
		var newTweet = tweet.clone(true).eq(0); //needs true inside of clone so that it will also have event listeners.
		//user tweet is = to tweet-compose value
		var userTweet = tweetCompose.val();
		//avatar is a ref to img dir and an img there called alagoon
		var avatar = "img/alagoon.jpg";
		//sets username and fullname
		var username = "@ScottTPete";
		var fullName = "Scott Peterson";	
		
		
		//if there is a value in tweet-compose do this
		if(tweetCompose.val()) {
			//finds elements in newTweet and changes/adds either html or attrbs based on specified variables
			newTweet.find(".tweet-text").html(userTweet);
			newTweet.find('.avatar').attr('src', avatar);
			newTweet.find(".username").html(username);
			newTweet.find('.fullname').html(fullName);
			newTweet.find('.num-retweets').html('0');
			newTweet.find('.num-favorites').html('0');
			newTweet.find('.reply > .tweet-compose').attr('placeholder', 'Reply to @ScottTPete');
//			console.log(newTweet.find('.timeago'))
			newTweet.find('.timeago').text($.timeago('update', new Date()));
			
			//adds newTweet to timeline as top tweet.
			$('#stream').prepend(newTweet);
			
			tweetCompose.val(''); //reset tweet-compose val to nothing.
			
			charCount.text(140); //resets char count
			
			tweetCompose.css('height', '2.5em')//change tweet-compose height back to normal
		
			tweetControls.hide(); //hides tweet controls
			
			newTweet.find('.tweet-actions').hide();
			newTweet.find('.stats').hide();
			newTweet.find('.reply').hide();
		};
		$(".timeago").timeago();
	});
	
	////////////////////////////////////////////////////////////////
	////Used to toggle elements showing/hiding on hover/on click////
	////////////////////////////////////////////////////////////////
	tweet.hover( function(){
		if(!$('.tweet-actions', this).hasClass('clicked')) {
		   $('.tweet-actions',this).show();
		}
		
	}, function(){
		if(!$('.tweet-actions', this).hasClass('clicked')) {
			$('.tweet-actions',this).toggle();
		
		   
		} 
	});
	
	tweet.click(function() {
		
		$('.tweet-actions',this).toggleClass('clicked');
		$('.reply',this).toggleClass('clicked');
		$('.stats',this).toggleClass('clicked');
		$('.stats', this).toggle();
		$('.reply', this).toggle();
		
	});
	////////////////////////////////////////////////////////////////
	
	
	
	
	
})