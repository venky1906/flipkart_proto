/**
 * 
 */
jQuery(document).ready(function($){
	//Get the url parameters
	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null) {
	       return null;
	    }
	    return decodeURI(results[1]) || 0;
	}
	
	var item_id = $.urlParam("itemid");
	console.log(item_id);
	
	//get item details
	var url="http://localhost:8080/flipkart/webapi/items/getItemByItemId/"+item_id;
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		success : function(item){

			if(!$.isEmptyObject(item)){
				//console.log(item);
				priceSummary(item.price, item.discount, 1);
				toOrderDetails(item);
		    }
			else{
				alert("Problem occured!!");
			}
		},
		error: function(data) {
			alert("failed");
		}
	});
	
	//For price summary card
	function priceSummary(price, discount, quantity){
		$("#no_of_items").text(quantity);
		var savings = (discount/100.0)*(price)*(quantity)*1.0;
		var total_price = (price*quantity)-savings;
		console.log(total_price);
		$("#offer_price").text(total_price);
		$("#total_price").text(total_price);
		$("#savings").text("Your Total Savings on this order Rs. "+savings);
	}
	
	//For order Summary
	function toOrderDetails(item){
		$("#prod_name").text(item.name);
		$("#prod_desc").text(item.brand+" (Color: "+item.color+")");
		//$("#prod_seller").text("Seller: "+seller);
		var offer_price = item.price - (item.price*item.discount/100.0);
		$("#prod_offer_price").text("Rs. "+offer_price);
		$("#prod_orig_price").text("Rs. "+item.price);
		$("#prod_discount").text(item.discount+"% Off");
		
		setSellerInfo(item.seller_id);
		setItemImage(item_id);
		//onOrderContinue(item.price, item.discount, item.quantity);
	}
	
	//Seller info in order summary
	function setSellerInfo(id){
		var url="http://localhost:8080/flipkart/webapi/user/getSellerById/"+id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(seller){

				if(!$.isEmptyObject(seller)){
					$("#prod_seller").text("Seller: "+seller.name);
				}
				else{
					alert("Problem occured!!");
				}
			},
			error: function(seller) {
				alert("failed");
			}
		});
	}
	
	//Item image in order summary
	function setItemImage(item_id){
		var url="http://localhost:8080/flipkart/webapi/items/getItemImagesByItemId/"+item_id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(itemimg){

				//console.log(itemimg[0]);	
				if(!$.isEmptyObject(itemimg)){
					$("#sel_prod").attr("src", itemimg[0].image_location);
				}
				else{
					alert("Problem occured!!");
				}
			},
			error: function(itemimg) {
				alert("failed");
			}
		});
	}
	
	//Continue in Login
	$("#continue").click(function() {
		var buyer;
		var url;
		var login_id = $("#email").val();
		var pwd = $("#pwd").val();
		if(login_id.search('@')!=-1){
			buyer = {
				email : login_id,
				password : pwd,
			};
			url = "http://localhost:8080/flipkart/webapi/user/authenticateBuyerEmail";
		}
		else{
			buyer = {
				phone_no : login_id,
				password : pwd,
			};
			url = "http://localhost:8080/flipkart/webapi/user/authenticateBuyerMobile";
		}
		//console.log(buyer);
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : JSON.stringify(buyer),
			success : function(data){
	        	//console.log(data);
	        	if(!$.isEmptyObject(data)){
	        		$("#email_conf").text(data.email);   //Email in Order Summary
					$("#add_address_card").removeClass("d-none");
					toDelivery(data.id);
					toAddAddress(data.id);
			    }
				else{
					alert("Invalid Login!!");
				}
			},
			error: function(data) {
				alert("failed!")
			}
		});
	});
	
	function toDelivery(buyer_id){
		var url="http://localhost:8080/flipkart/webapi/user/getAllAddresses/"+buyer_id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(data){

				if(!$.isEmptyObject(data)){
					for(var i=0;i<data.length;i++){
						add_no = data[i].id;
						//console.log(data[i].buyer_id);
						var address =  "<div id='add_"+add_no+"' class='form-check' style='border-top: 1px solid;'>"+
										  "<input type='radio' class='form-check-input' name='radio'>"+
										  "<div>"+
										  	"<h5 id='addname_"+add_no+"'>College</h5>"+
										  	"<p id='address_"+add_no+"'>IIIT Bangalore-560100</p>"+
										  "</div>"+
										  "<div>"+
										     "<button type='button' style='margin-bottom: 10px;' class='btn btln-lg flipkart_button d-none' id='delivhere_"+add_no+"'>DELIVER HERE</button>"+
										  "</div>"+
									   "</div>";
						
					    $("#deliv_details").append(address);
					    $("#addname_"+add_no).text(data[i].name);
					    $("#address_"+add_no).text(data[i].address);
					    
					    if(data[i].type=="DEFAULT"){
					    	$("#radio").prop("checked", true);
					    	$("#delivhere_"+add_no).removeClass("d-none");
					    }
					    $("#add_"+add_no).show();
					}
			    }
				else{
					alert("Problem occured!!");
				}
			},
			error: function(data) {
				alert("failed");
			}
		});
	}
	
	function toAddAddress(buyer_id){
		$("#save").click(function() {
			var name = $("#nameaddress").val();
			var addr = $("#new_address").val()
			var buyer_address = {
				buyer_id : buyer_id,
				name : name,
				address : addr,
			};
			var url="http://localhost:8080/flipkart/webapi/user/addAddress";
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : url,
				data : JSON.stringify(buyer_address),
				success : function(data){
	
					if(data!=-1){
						console.log(data);
						var address =  "<div id='add_"+data+"' class='form-check' style='border-top: 1px solid;'>"+
										  "<input type='radio' class='form-check-input' name='radio'>"+
										  "<div>"+
											  	"<h5 id='addname_"+data+"'>College</h5>"+
										  	"<p id='address_"+data+"'>IIIT Bangalore-560100</p>"+
										  "</div>"+
										  "<div>"+
										     "<button type='button' style='margin-bottom: 10px;' class='btn btln-lg flipkart_button' id='delivhere_"+data+"'>DELIVER HERE</button>"+
										  "</div>"+
									   "</div>";
						
						$("#deliv_details").append(address);
						$("#addname_"+data).text(name);
						$("#address_"+data).text(addr);
					  	//$("#radio").prop("checked", true);
						$("#add_"+data).show();
					}
					else{
						alert("Problem occured!!");
					}
				},
				error: function(data) {
					alert("failed");
				}
			});
		});
	}
	
	//Check availability of the item
	function onOrderContinue(buyer_id, qty){
		$("#order_cont").click(function() {
			var req_qty = $("#prod_qt").val();
			if(qty<req_qty){
				alert("Only "+qty+" unit(s) is/are available!!");
			}
			else{
				//toPayment(buyer_id, qty);
				alert("done");
			}
		});
	}
	
	function toPayment(buyer_id, qty){
		
		var url="http://localhost:8080/flipkart/webapi/payment/getAccountDetails/"+buyer_id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : JSON.stringify(buyer_account),
			success : function(data){
				if(data.status=="success"){
					var accounts_list = data.accounts;
					var acc_no;
					
					for(var i=0;i<accounts_list.length;i++){
						acc_no = accounts_list[i].id;
						
						var account = "<div id='account_"+acc_no+"' class='form-check' style='border-top: 1px solid;'>"+
										"<input style='border-top: 5px solid;' type='radio' class='form-check-input' name='pay_radio'>"+
									  "<div>"+
									    "<h5 id='pay_acc_"+acc_no+"'>45XX XXXX 2947</h5>"+
									  "</div>"+
									 "</div>";
						
						$("#accounts").append(account);
						var acnumber = data.accountno[0]+data.accountno[1]+"XX XXXX "+data.accountno[8]+
							data.accountno[9]+data.accountno[10]+data.accountno[11];
						$("#pay_acc_"+acc_no).text(acnumber);
					}
					verifyPIN(buyer_id, acc_no);
					
			    }
				else{
					alert("Sorry no such product!!");
				}
			},
			error: function(data) {
				alert("failed");
			}
		});
	}
	
	function verifyPIN(buyer_id, acc_no){
		$("#pay_cont1").click(function() {
			var pin = $("#pin_pay_"+acc_no).val();
			var req_data = {
				pin : pin,
				buyer_id : buyer_id,
				id : acc_no,
			};
			$.ajax({url:"http://localhost:8080/ooad/webapi/myresource/verifyPIN", type:"POST",
				data: JSON.stringify(req_data),
				dataType: "json",
			 	async: true,
			 	
				success: function(data) {
					if(data.status=="success"){
						//alert("payment done!!");
						
						updateOrder();
				    }
					else{
						alert("Incorrect PIN, transaction failed!");
					}
				},
				error: function(data) {
					alert("failed");
				}
			});
		});
	}
	
	function updateOrder(){
		var req_data = {
			buyer_id : buyer_id,
			address : "address",
			item_id : "id",
			quantity : "quantity",
			amount_paid : "amount_paid",
		};
		$.ajax({url:"http://localhost:8080/ooad/webapi/myresource/addOrderDetails", type:"POST",
			data: JSON.stringify(req_data),
			dataType: "json",
		 	async: true,
		 	
			success: function(data) {
				if(data.status=="success"){
					alert("payment done!!");
					//Transfer money
			    }
				else{
					alert("Something went wrong!");
				}
			},
			error: function(data) {
					alert("failed");
			}
		});
	}
	
});
