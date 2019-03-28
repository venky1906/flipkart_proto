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
			$("#mobile").val(seller_data.phone_no);
			$("#fullname").text(seller_data.name);		
            $("#gst").val(seller_data.gst_info);
            //$("#balance").val(seller_data.balance);
            $("#address").val(seller_data.address);
            console.log(seller_data.id);

            $.ajax({
            url: "http://localhost:8080/flipkart/webapi/payment/getsellerbalance/"+seller_data.id,
            type: "GET",
            success: function(data) {
                    var balance=data;
                    console.log(data);
                    $("#balance").val(balance);
			    },

    	    });
			}
		
    }
    
    $("#personalinfoedit").on('click', function(){
        $("#name").prop('disabled', false);
        $("#PIsave").css("display", "block");
        $("#PIsave").click(function(){
            //$("#name").val(person);
            $("#PIsave").css("display", "none");
            $("#name").prop('disabled', true);
            
            name = $("#name").val();
            seller_data.name=name;
            $("#fullname").text(seller_data.name);
            
            var update={
                id:seller_data.id,
                name:name,
            }
            console.log(update)
            setCookie("seller_data", JSON.stringify(seller_data), 1);

            $.ajax({
            url: "http://localhost:8080/flipkart/webapi/user/editsellerdetails/"+"name",
            data: JSON.stringify(update),
            type: "POST",
            contentType:'application/json',
            success: function(data) {
        	
				    if(data=="success"){
				        alert("Added Successfully");
				        location.reload();
				    }
				    else	{
					    alert("Error");
				    }
			    },

    	    });
        });

        });

        $("#editemail").on('click', function(){
        $("#email").prop('disabled', false);
        $("#emailsave").css("display", "block");
        $("#emailsave").click(function(){
            //$("#name").val(person);
            $("#emailsave").css("display", "none");
            $("#email").prop('disabled', true);
            email = $("#name").val();
            seller_data.email=email;
            
            var update={
                id:seller_data.id,
                email:email,
            }
            console.log(update)
            setCookie("Buyer_data", JSON.stringify(seller_data), 1);

            $.ajax({
            url: "http://localhost:8080/flipkart/webapi/user/editsellerdetails/"+"email",
            data: JSON.stringify(update),
            type: "POST",
            contentType:'application/json',
            success: function(data) {
        	
				    if(data=="success"){
				        alert("Added Successfully");
				        location.reload();
				    }
				    else	{
					    alert("Error");
				    }
			    },

    	    });
        });

        });

        $("#editmobile").on('click', function(){
        $("#mobile").prop('disabled', false);
        $("#mobilesave").css("display", "block");
        $("#mobilesave").click(function(){
            //$("#name").val(person);
            $("#mobilesave").css("display", "none");
            $("#mobilesave").prop('disabled', true);
            mobile = $("#mobile").val();
            seller_data.name=name;
            
            var update={
                id:seller_data.id,
                mobile:mobile,
            }
            console.log(update)
            setCookie("Buyer_data", JSON.stringify(seller_data), 1);

            $.ajax({
            url: "http://localhost:8080/flipkart/webapi/user/editsellerdetails/"+"phone_no",
            data: JSON.stringify(update),
            type: "POST",
            contentType:'application/json',
            success: function(data) {
        	
				    if(data=="success"){
				        alert("Added Successfully");
				        location.reload();
				    }
				    else	{
					    alert("Error");
				    }
			    },

    	    });
        });

        });

        $("#editaddress").on('click', function(){
        $("#address").prop('disabled', false);
        $("#addresssave").css("display", "block");
        $("#addresssave").click(function(){
            //$("#name").val(person);
            $("#addresssave").css("display", "none");
            $("#address").prop('disabled', true);
            address = $("#address").val();
            seller_data.address=address;
            
            var update={
                id:seller_data.id,
                address:address,
            }
            console.log(update)
            setCookie("Buyer_data", JSON.stringify(seller_data), 1);

            $.ajax({
            url: "http://localhost:8080/flipkart/webapi/user/editsellerdetails/"+"address",
            data: JSON.stringify(update),
            type: "POST",
            contentType:'application/json',
            success: function(data) {
        	
				    if(data=="success"){
				        alert("Added Successfully");
				        location.reload();
				    }
				    else	{
					    alert("Error");
				    }
			    },

    	    });
        });

        });

        $("#editbalance").on('click', function(){
        $("#balance").prop('disabled', false);
        $("#balancesave").css("display", "block");
        $("#balancesave").click(function(){
            //$("#name").val(person);
            $("#balancesave").css("display", "none");
            $("#balance").prop('disabled', true);
            balance = $("#balance").val();
            seller_data.balance=balance;
            
            var update={
                seller_id:seller_data.id,
                balance:balance,
            }
            console.log(update)
            setCookie("Buyer_data", JSON.stringify(seller_data), 1);

            $.ajax({
            url: "http://localhost:8080/flipkart/webapi/payment/editsellerbalance",
            data: JSON.stringify(update),
            type: "POST",
            contentType:'application/json',
            success: function(data) {
        	
				    if(data=="success"){
				        alert("Added Successfully");
				        location.reload();
				    }
				    else	{
					    alert("Error");
				    }
			    },

    	    });
        });

        });
		 	
});
