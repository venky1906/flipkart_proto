jQuery(document).ready(function($){
		
	var cookie_data = getCookie("seller_data");
	if(cookie_data!="" && cookie_data!=null){
		var seller_data = JSON.parse(cookie_data);
		console.log(seller_data.id);
		//var buyer_id;
		
		if(seller_data!="" && seller_data!=null){
			$("#email").val(seller_data.email);   //Email in Order Summary
			$("#name").val(seller_data.name);
			$("#radio").val(seller_data.gender);
			$("#mobilenumber").val(seller_data.phone_no);
			$("#fullname").text(seller_data.name);		
			$("#gst").val(seller_data.gst_info)
			}
		
	}
		 	
});
