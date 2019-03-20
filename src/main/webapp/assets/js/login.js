
jQuery(document).ready(function($) {
	
	/* warnings */
	
	$(".warning").hide();	
	function validate(){
		$(".warning").hide();
		var user = $("#email_or_mobile").val();
		var len = user.length;
		var pass = $("#password").val();
		if(!user)
		{
			$("#validEmail_warning").show();
			return false;
	
		}
		
		if(user.match(/^[0-9]/))
		{
			if (len!=10 || !user.match(/^[0-9]{10}$/))
			{
				$("#validEmail_warning").show();
				return false;
			}
		}
		else if (!user.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
		{
				$("#validEmail_warning").show();
				return false;
		}
		if(!pass)
		{
			$("#password_warning").show();
			return false;
		}
		else
		{
			finduser();
		}
	}
	$("#login_btn1").click(validate);
	function render(user){
		if($.isEmptyObject(user))
			$("#registerEmail_warning").show();
		else if(user.id==0)
			$("#password_warning").show();
		else
			window.location = "http://localhost:8080/flipkart/UnderConstruction.html";

		
	}
	function finduser(){
		var email = $("#email_or_mobile").val();
		var password = $("#password").val();
		var userData = JSON.stringify({
	    	"email":email,
	    	"password":password
	    	});
		$.ajax({
			type:'POST',
			contentType : 'application/json',
			url: "http://localhost:8080/flipkart/webapi/user/authenticateBuyerEmail",
			data : userData,
			success : render
			
		});
	}
	
	function signup() 
	{	
		$(".warning").hide();
		if (!$("#f_name").val() )
		{
			$("#fname_warning").show();
			return false;
		}
		if (!$("#l_name").val() )
		{
			$("#lname_warning").show();
			return false;
		}
		var email = $("#new_email").val();
		var phone = $("#new_phone").val();
		if ( !phone.match(/^[0-9]{10}$/))
		{
			$("#mobile_warning").show();
			return false;
		}
		if (!email )
		{
			$("#email_warning").show();
			return false;
		}
		else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
		{
			$("#email_warning").show();
			return false;
		}
			
		if (!$("#new_password").val() )
		{
			$("#new_password_warning").show();
			return false;
		}
		var user_data = JSON.stringify({
			"name": $("#f_name").val()+$("#l_name").val(),
			"email":email,
			"password":$("#new_password").val(),
			"phone_no":phone,
			"gender":"M"
			
		});
		console.log(user_data);
		$.ajax(
		{
		type : 'POST',
		contentType : 'application/json',
		url : "http://localhost:8080/flipkart/webapi/user/createBuyer",
		data : user_data,
		success : function(response){
			if(response=="exists")
				alert("Email already exists");
			else
				alert("account created successfully");
		}
		});
	}
	$("#signup_btn2").click(signup);
});




