jQuery(document).ready(function($) {
	
	/* warnings */
	
	$(".warning").hide();

	var id;
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
		{
			setCookie("Buyer_data",JSON.stringify(user),30);
			//$("#login-Modal").hide();
			window.location = "Homepage.html";
		}
		
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
		//console.log(user_data);
		$.ajax(
		{
		type : 'POST',
		contentType : 'application/json',
		url : "http://localhost:8080/flipkart/webapi/user/createBuyer",
		data : user_data,
		success : function(response){
			if(response==0)
				alert("Email/Mobile Number already exists");
			else
			{
				alert("Account created successfully");
				id=response;
				$("#signup-Modal").hide();
				$("#account-Modal").show();
			}
		}
		});
	}
	
	$("#signup_btn2").click(signup);
	$("#signup_btn3").click(function(event){
		
		$(".warning").hide();
		if (!$("#new_acc").val() )
		{
			$("#acc_warning").show();
			return false;
		}
		if (!$("#new_pin").val() )
		{
			$("#pin_warning").show();
			return false;
		}
		if (!$("#new_amount").val() )
		{
			$("#amount_warning").show();
			return false;
		}
		var user_data = JSON.stringify({
			"buyer_id":id,
			"accountno":$("#new_acc").val(),
			"pin":$("#new_pin").val(),
			"balance":$("#new_amount").val()
		});
		
		$.ajax(
		{
		type : 'POST',
		contentType : 'application/json',
		url : "http://localhost:8080/flipkart/webapi/user/createBuyerAccount",
		data : user_data,
		success : function(response){
			if(response==0 || response==-1)
				alert("Invalid details OR account number is already linked");
			else
			{
				alert("Account Linked successfully");
				window.location="Homepage.html";
			}
		}
		});
		
	});
});




