$(document).ready(function(){
	$('#product-upload-btn').click(function(){
		var prodID =    $('input[id="prodID"]').val();
		var prodTittle =$('input[id="prodTittle"]').val();
		var summary =   $('input[id="summary"]').val();
		var listoflinks=$('input[id="listoflinks"]').val();
		var category =  $('input:radio:checked[name="category"]').val();
		var contacts =  $('input[id="contacts"]').val();
		var refs =      $('input[id="refs"]').val();
		var bigheader = $('input[id="bigheader"]').val();
		var subheader = $('input[id="subheader"]').val();
		var descr =     $('textarea[id="descr"]').val();
		var listItems = $('textarea[id="listItems"]').val();
		$.ajax({
			url: "admin-form-handler.php",
			method:"post",
			data: {prodID:prodID,prodTittle:prodTittle,summary:summary,listoflinks:listoflinks,category:category,contacts:contacts,
				refs:refs,bigheader:bigheader,subheader:subheader,descr:descr,listItems:listItems
			},
			beforeSend: function(){
				$('#formfeedback-box').css({'display':'block'});
			},
			success: function(data){
				$('#formfeedback-box').css({'display':'block'});
				$('#formfeedback-box').html(data);
			}
		});
		 
	});
	$(document).on('click','#addescrption-section-btn1',function(){
		var parentHtml = $("#hidden-section1").html();
		$(this).parent().parent().append(parentHtml);
	});
	$(document).on('hover','#delete-descr-section1',function(){
		$(this).parent().css({'border':'2px dashed red'});
	});
	$(document).on('click','#delete-descr-section1',function(){ 
		$(this).parent().css({'border':'2px dashed red'});
		//setTimeout(function{
		$(this).parent().html('').css({'border':'0'});;
		//},100);
	});
	
	$('#addescrption-section-btn2').click(function(){
		
	});
	var fixmeTop = $('#right-sidebar').offset().top;// get initial position of the element 
	$(window).scroll(function(){                    // assign scroll event listener 
		if(($(window).width())>700){
		var currentScroll = $(window).scrollTop();   // get current position 
		if (currentScroll >= fixmeTop) {             // apply position: fixed if you scroll above it
			$('#right-sidebar').css({position:'fixed',top:'0',right:'7%',width:'29%',marginTop:'20px'});
		} else {                                     // apply position: static
			$('#right-sidebar').css({                 // 
				position: 'static'
			});
		} }
	});
	
	$('#contact-messages-link').click(function(){
		$.ajax({
			url: "admin-form-handler.php", method:"post",
			data: {ViewContactMessages:'dont-care' },
			beforeSend: function(){
				$('#contact-messages-div').html('<center> <img src="images/AjaxLoader.gif" width="40px"/> </center>');
			},
			success: function(data){
				$('#contact-messages-div').html(data);
			}
		});
	}); 
});




