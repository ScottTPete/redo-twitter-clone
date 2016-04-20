$(document).ready(function() { //when page is loaded do the following.
	
	
	$('#tweet-controls').hide(); //hides element immediately
	
	//when element with class of tweet-compose is clicked do the following.
	$('.tweet-compose').on('click', function(){
		$('#tweet-controls').show(); //show the element
		$(this).css('height', '5em') //element we click will have css property of height with val of 5em. which is double its current size
	});
	
	
	var maxTweetLength = 140;
	//any time there is a change to tweet-compose we'll run this.
	$('.tweet-compose').on('input', function() {
		//length is now equal to character length in tweet-compose 
		var length = $(this).val().length
		
		//remCharCount now stores the difference of max length and the length of tweet-compose
		var remCharCount = maxTweetLength - length;
		console.log(remCharCount)
		//sets text found in char-count element to val of remCharCount
		$('#char-count').text(remCharCount);
		if(remCharCount <= 20 && remCharCount >= 11) {
			$('#char-count').css('color', '#813A3E');
		} else if (remCharCount <= 10) {
			$('#char-count').css('color', '#D41116');
		} else {
			$('#char-count').css('color', '#999');
		}
		
		//if remChars is < 0 disable the submit button. otherwise leave it on.
		if(remCharCount < 0) {
			$('#tweet-submit').attr('disabled', true);
		} else {
			$('#tweet-submit').attr('disabled', false);
		}
		
	});
	
	$('#tweet-submit').on('click', function() {
		if($('.tweet-compose'))
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})