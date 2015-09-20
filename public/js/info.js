$(document).ready(function(){
			$('#user-form').on('keyup keypress', function(e) {
			  var code = e.keyCode || e.which;
			  if (code == 13) { 
			    e.preventDefault();
			    return false;
			  }
			});
			$("#zipinput").keyup(function(event) {
		    if (event.which == 13) {
				$('.info').hide();
				$('.issues').show();		        
		    }
		    console.log($('#zipinput').val());
		    if($('#zipinput').val().length == 5){
		    	$('#next-1').fadeTo(200,1);
		    }
		    else{
		    	$('#next-1').fadeTo(200,0);
		    }
		});
		$('#next-1').click(function(){
			$('.info').hide();
			$('.issues').show();
		})
		$("#issues-input").keyup(function(event) {
		    if (event.which == 13) {
		    	prep = $('#issues-input').val()
        		$( "#issues-selection" ).prepend( "<p class='issue-selected'>"+prep+"</p>" );
    				var issues = []
					$('.issue-selected').each(function(i, obj) {
					   issues.push($(this).val())
					});
					ret = issues.join([separator = ','])
					$('#issuesjson').val(ret)
		    }

		});
		$('#issues-selection').on('click', 'p', function(){
			$(this).toggleClass('issue-selected');
			var numItems = $('.issue-selected').length
			if(numItems > 0){
				$('#next-2').fadeTo(200,1);
			}
			else{
				$('#next-2').fadeTo(200,0);
			}
			var issues = []
			$('.issue-selected').each(function(i, obj) {
				console.log($(this))
			   issues.push($(this).text())
			});
			console.log(issues)
			ret = issues.join([separator = ','])
			console.log(ret)
			$('#issuesjson').val(ret)
			
		})
		$('#next-2').click(function(){
			$('.area').hide();

			$( "form" ).submit();
		})


})



