$(document).ready(function(){
	$('#contact-submit-btn').click(function(){
		var name =    $('input[id="name"]').val();
		var email =   $('input[id="email"]').val();
		var subject = $('input[id="subject"]').val();
		var message = $('textarea[id="message"]').val(); 
		$.ajax({
			url: "admin-form-handler.php",
			method:"post",
			data: {name:name,email:email,subject:subject,message:message },
			beforeSend: function(){
				$('#formfeedback-box').css({'display':'block'});
			},
			success: function(data){
				$('#formfeedback-box').css({'display':'block'});
				$('#formfeedback-box').html(data);
			}
		});
		 
	}); 
	  
});




