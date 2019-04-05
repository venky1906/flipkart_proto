$.noConflict();
jQuery(document).ready(function($) {
	
	$('#Login').click(function() {
    		
    	var user_name = $("#userName").val();
    	var pwd = $("#pwd").val();
    		
    if(user_name=="admin" && pwd=="1234"){
    	
		window.location = "add_category.html";
	}
	else{
		alert("Invalid login or password")
	}
	});
});