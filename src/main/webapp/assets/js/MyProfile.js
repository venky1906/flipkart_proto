jQuery(document).ready(function($){
		
	var cookie_data = getCookie("Buyer_data");
	if(cookie_data!="" && cookie_data!=null){
		var buyer_data = JSON.parse(cookie_data);
		console.log(buyer_data.id);
		//var buyer_id;
		
		if(buyer_data!="" && buyer_data!=null){
			$("#email").val(buyer_data.email);   //Email in Order Summary
			$("#name").val(buyer_data.name);
			$("#radio").val(buyer_data.gender);
			$("#mobilenumber").val(buyer_data.phone_no);
			$("#fullname").text(buyer_data.name);		
			
			}
		
	}
		 	
});
