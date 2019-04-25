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
	
	$("body").on( "click", "#logo",function(){
		$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
	});
	
	$("body").on( "click", "#signup",function(){
		$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
	});
	
	var item_id = $.urlParam("itemid");
	var address__id = 1;
	var seller_id = 0;
	var item_price,item_discount;
	console.log(item_id);
	$("#delivery_card").removeAttr('data-toggle');
	$("#order_card").removeAttr('data-toggle');
	$("#payment_card").removeAttr('data-toggle');
	
	//get item details
	var url="http://localhost:8080/flipkart/webapi/items/getItemByItemId/"+item_id;
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		success : function(item){

			if(!$.isEmptyObject(item)){
				//console.log(item);
				item_price = item.price;
				item_discount = item.discount;
				priceSummary(item.price, item.discount, 1);
				toOrderDetails(item);
				setSellerInfo(item.seller_id);
				setItemImage(item_id);
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
		var savings = ((discount/100.0)*(price)*1.0).toFixed(2);
		var total_price = (price-savings).toFixed(2);
		//console.log(total_price);
		$("#offer_price").text("Rs. "+total_price);
		$("#total_price").text(total_price);
		$("#savings").text("Your Total Savings on this order Rs. "+savings);
	}
	
	//For order Summary
	function toOrderDetails(item){
		$("#prod_name").text(item.name);
		$("#prod_id").text("ITEM ID : " + item.id);
		$("#prod_desc").text(item.brand+" (Color: "+item.color+")");
		//$("#prod_seller").text("Seller: "+seller);
		var offer_price = item.price - (item.price*item.discount/100.0);
		$("#prod_offer_price").text("Rs. "+offer_price.toFixed(2));
		$("#prod_orig_price").text("Rs. "+item.price);
		$("#prod_discount").text(item.discount+"% Off");
		seller_id = item.seller_id;
		//toDealsAvailable(item.item_id);
		//console.log(seller_id+"...........");
		
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
	
	//get buyer data from cookies
	var cookie_data = getCookie("Buyer_data");
	if(cookie_data!="" && cookie_data!=null){
		var buyer_data = JSON.parse(cookie_data);
		console.log(buyer_data.id);
		//var buyer_id;
		
		if(buyer_data!="" && buyer_data!=null){
			$("#email_conf").text(buyer_data.email);   //Email in Order Summary
			$("#add_address_card").removeClass("d-none");
			$('#login').collapse('hide');
			$("#login_card").removeAttr('data-toggle');
			var saved_login = "<label class='col-form-label col-lg-4'>"+ buyer_data.name +"</label>"+
	          				  "<label class='col-form-label col-lg-4'>"+ buyer_data.email +"</label>";
	        $("#saved_login").append(saved_login);
			toDelivery(buyer_data.id);
			toAddAddress(buyer_data.id);
			toDealsAvailable(item_id, buyer_data.id);
			onOrderContinue(buyer_data.id);
			$("#saved_login").show();
		}
		
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
	        	if(data.id>=1){
	        		setCookie("Buyer_data", JSON.stringify(data), 1);
	        		$("#email_conf").text(data.email);   //Email in Order Summary
					$("#add_address_card").removeClass("d-none");
					$('#login').collapse('hide');
					$("#login_card").removeAttr('data-toggle');
					var saved_login = "<label class='col-form-label col-lg-4'>"+ data.name +"</label>"+
			          				  "<label class='col-form-label col-lg-4'>"+ data.email +"</label>";
			        $("#saved_login").append(saved_login);
					toDelivery(data.id);
					toAddAddress(data.id);
					toDealsAvailable(item_id, data.id);
					onOrderContinue(data.id);
					$("#saved_login").show();
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
		$('#delivery').addClass('show');
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
						//"<div id='add_"+add_no+"' class='form-check' style='border-top: 1px solid;'>"+
						var address =    "<input type='radio' class='form-check-input' id='radio' value='"+add_no+"'>"+
										  "<div>"+
										  	"<h5 id='addname_"+add_no+"'>College</h5>"+
										  	"<p id='address_"+add_no+"'>IIIT Bangalore-560100</p>"+
										  "</div>"+
										  "<div>"+
										     "<button type='button' style='margin-bottom: 10px;' class='btn btln-lg flipkart_button' id='delivhere_"+add_no+"'>DELIVER HERE</button>"+
										  "</div>";
									   //"</div>";
						
					    $("#deliv_radio").append(address);
					    $("#addname_"+add_no).text(data[i].name);
					    $("#address_"+add_no).text(data[i].address);
					    $("#delivhere_"+add_no).hide();
					    $("#add_"+add_no).show();
						$("#no_address").hide();
					}
					
					$("#deliv_radio").show();
					onAddressClick(buyer_id);
				}
				else{
					var no_address = "<label id='no_address' class='col-form-label' align='center'>No saved addresses.</label>";
					$("#deliv_details").append(no_address);
					$("#no_address").show();
				}
			},
			error: function(data) {
				alert("failed");
			}
		});
	}
	
	//On clicking delivery 
	function onAddressClick(buyer_id){
		$("body").on( "click", "#radio",function(){
			//location.reload();
			var add_no = $(this).val(); 
			$("#delivhere_"+add_no).show();
			$("#delivhere_"+add_no).click(function() {
				//console.log("Address: "+add_no);
				address_id = add_no;
				$('#delivery').collapse('hide');
				$("#delivery_card").removeAttr('data-toggle');
				$('#order').addClass('show');
				$("#add_address_card").addClass("d-none");
			});
		});
	}
	
	function toAddAddress(buyer_id){
		
		$("#save").click(function() {
			var name = $("#nameaddress").val();
			var addr = $("#new_address").val();
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
						//console.log(data);
						//"<div id='add_"+data+"' class='form-check' style='border-top: 1px solid;'>"+
						var address =  "<input type='radio' class='form-check-input' id='radio' value="+data+">"+
										  "<div>"+
											  	"<h5 id='addname_"+data+"'>College</h5>"+
										  	"<p id='address_"+data+"'>IIIT Bangalore-560100</p>"+
										  "</div>"+
										  "<div>"+
										     "<button type='button' style='margin-bottom: 10px;' class='btn btln-lg flipkart_button' id='delivhere_"+data+"'>DELIVER HERE</button>"+
										  "</div>";
									   //"</div>";
						
						$("#deliv_radio").append(address);
						$("#addname_"+data).text(name);
						$("#address_"+data).text(addr);
						$("#delivhere_"+data).hide();
						$("#no_address").hide();
						
						$("#nameaddress").val("");
						$("#new_address").val("");
						
						$('#newaddress').collapse('hide');
						//$("#new_address_card").removeAttr('data-toggle');
						$('#delivery').addClass('show');
						
						$("#deliv_radio").show();
						onAddressClick(buyer_id);
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

	$("#cancel").click(function() {
		$('#newaddress').collapse('hide');
		//$("#new_address_card").removeAttr('data-toggle');
		$('#delivery').addClass('show');
	});
	
	$("#prod_remove").click(function() {
		alert("Removed the product!");
		$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
	});
	
	//Check availability of the item
	function onOrderContinue(buyer_id){
		$("#order_cont").click(function() {
			var req_qty = $("#prod_qt").val();
			var url="http://localhost:8080/flipkart/webapi/items/getItemByItemId/"+item_id;
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : url,
				success : function(item){
					if(!$.isEmptyObject(item)){
						//console.log(item);
						//priceSummary(item.price, item.discount, req_qty);
						
						toOrderDetails(item);
						var qty = item.quantity;
						if(qty==0){
							alert("The item is no longer available!!");
							$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
						}
						else if(qty<req_qty){
							alert("Only "+qty+" unit(s) is/are available!!");
						}
						else{
							$('#order').collapse('hide');
							$("#order_card").removeAttr('data-toggle');
							$('#payment').addClass('show');
							
							toPayment(buyer_id);
							//alert("done");
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
		});
	}
	
	function toDealsAvailable(item_id, buyer_id){
		var data = JSON.stringify({
			item_id : item_id,
			buyer_id : buyer_id,
		});
		var url="http://localhost:8080/flipkart/webapi/deal/getDealsForUser";
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : data,
			success : function(deals){

				//console.log(deals);	
				if(!$.isEmptyObject(deals)){
					$("#deals").show();
					for(var i=0;i<deals.length;i++){
						var deal = "<option value='"+deals[i].deal_id+"_"+deals[i].deal_discount+"_"+deals[i].name+"'>"+deals[i].name+" : "+ deals[i].deal_discount +"% Off</option>";
						$("#deals").append(deal);
					}
				}
				else{
					//var point = "<li>No deals available on the item.</li>";
					//$("#deals").append(point);
					$("#deals").hide();
				}
			},
			error: function(desc) {
				alert("failed");
			}
		});
	}
	
	 function roundToTwo(num) {    
		    return +(Math.round(num + "e+2")  + "e-2");
	 }
	//Apply Deal
	$("#deals").change(function(){
		var id = $("#deals").val();
		if(id!="select"){
			var deal_name = id.split("_")[2];
			var discount = id.split("_")[1];
			var quantity = $("#prod_qt").val();
			var price = $("#prod_orig_price").text().split(" ")[1];
			if(deal_name=="Buy 1 Get 1")
			{
				if(quantity==1)
				{
					 alert("Atleast two items should be bought!");
					 	quantity = $("#prod_qt").val();
						price = quantity*item_price;
						discount = item_discount;
						var savings = ((discount/100.0)*(price)).toFixed(2);
						var offer_price = (price-savings).toFixed(2);
						$("#prod_discount").text(discount+"% Off");
						$("#prod_orig_price").text("Rs. "+price);
						$("#prod_offer_price").text("Rs. "+offer_price);
						$("#deals").val('select');
						priceSummary(price, discount, quantity);
	            	 return;
				}
	            else if(quantity%2==0)
	            {
	            	  discount = 50;
	            } 
	            else{
	            	discount = roundToTwo((quantity-1)*100/(quantity*2));
	            }
			}
			var savings = ((discount/100.0)*(price)).toFixed(2);
			var offer_price = (price-savings).toFixed(2);
			$("#prod_discount").text(discount+"% Off");
			$("#prod_offer_price").text("Rs. "+offer_price);
			priceSummary(price, discount, quantity);
		}
		else
		{
			window.location = "BuyingPortal.html?itemid="+item_id;
		}
	});
	$("#prod_qt").change(function(){
		var quantity = $("#prod_qt").val();
		var price = quantity*item_price;
		var discount = item_discount;
		var savings = ((discount/100.0)*(price)).toFixed(2);
		var offer_price = (price-savings).toFixed(2);
		$("#prod_discount").text(discount+"% Off");
		$("#prod_orig_price").text("Rs. "+price);
		$("#prod_offer_price").text("Rs. "+offer_price);
		$("#deals").val('select');
		priceSummary(price, discount, quantity);

	});
	function toPayment(buyer_id){
		//$('#delivery').collapse('hide');
		var url="http://localhost:8080/flipkart/webapi/payment/getAccountDetails/"+buyer_id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(accounts_list){
				if(!$.isEmptyObject(accounts_list)){
					
					for(var i=0;i<accounts_list.length;i++){
						acc_no = accounts_list[i].id;
						
						var account = "<div id='account_"+acc_no+"' class='form-check' style='border-top: 1px solid;'>"+
										"<input style='border-top: 5px solid;' type='radio' class='form-check-input' id='pay_radio' value='"+acc_no+"'>"+
									  "<div>"+
									    "<h5 id='pay_acc_"+acc_no+"'>45XX XXXX 2947</h5>"+
									    "<div>"+
									      "<form class='form-group' action='/action_page.php'>"+
									  	   "<div class='form-group row'>"+
										     "<label class='col-form-label col-lg-2' id='pin_display_"+acc_no+"'>PIN:</label>"+
										     "<input type='password' class='form-control col-lg-3' id='pin_pay_"+acc_no+"' maxlength='4' placeholder='Enter your PIN'>"+
										     "<button style='margin-left: 50px;' type='button' class='btn btln-lg col-lg-3 flipkart_button' id='pay_cont_"+acc_no+"'>CONTINUE</button>"+
										   "</div>"+
									      "</form>"+
									    "</div>"+
									  "</div>"+
									 "</div>";
						
						$("#accounts").append(account);
						var acnumber = accounts_list[i].accountno[0]+accounts_list[i].accountno[1]+"XX XXXX "+accounts_list[i].accountno[8]+
						accounts_list[i].accountno[9]+accounts_list[i].accountno[10]+accounts_list[i].accountno[11];
						$("#pay_acc_"+acc_no).text(acnumber);
						$("#pin_display_"+acc_no).hide();
						$("#pin_pay_"+acc_no).hide();
						$("#pay_cont_"+acc_no).hide();
					}
					onPaymentContinue(buyer_id);
			    }
				else{
					var no_account = "<label id='no_account' class='col-form-label' align='center'>No saved accounts.</label>";
					$("#accounts").append(no_account);
					$("#no_account").show();
				}
			},
			error: function(accounts_list) {
				alert("failed");
			}
		});
	}
	
	//On clicking Payment
	function onPaymentContinue(buyer_id){
		$("body").on( "click", "#pay_radio",function(){
			var acc_no = $(this).val(); 
			$("#pin_display_"+acc_no).show();
			$("#pin_pay_"+acc_no).show();
			$("#pay_cont_"+acc_no).show();
			verifyPIN(buyer_id, acc_no);
		});
	}
	
	function verifyPIN(buyer_id, acc_no){
		$("#pay_cont_"+acc_no).click(function() {
			var pin = $("#pin_pay_"+acc_no).val();
			var buyerAcc = {
				pin : pin,
				buyer_id : buyer_id,
				id : acc_no,
			};
			var url="http://localhost:8080/flipkart/webapi/payment/verifyPIN";
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : url,
				data : JSON.stringify(buyerAcc),
				success : function(data){
			       	if(data!="incorrect"){
			       		var amt = parseFloat($("#total_price").text());
			       		if(amt<=parseFloat(data)){
			       			updateBalance(buyer_id, amt, acc_no);
			       		}
			       		else{
			       			alert("Insufficient Bank Balance!")
			       		}
			       	}
			       	else{
						alert("Incorrect PIN, try again!!");
					}
				},
				error: function(data) {
					alert("failed");
				}
			});
		});
	}
	
	function updateBalance(buyer_id, amt, acc_no){
		var req_data = {
			id : acc_no,
			balance : amt,
		};
		//console.log(req_data);
		var url="http://localhost:8080/flipkart/webapi/payment/updateBalance";
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : JSON.stringify(req_data),
			success : function(data){
		      	console.log(data);
		       	if(data=="success"){
		       		updateOrder(buyer_id);
		       	}
		       	else{
					alert("Bank issue!!");
				}
			},
			error: function(data) {
				alert("failed");
			}
		});
	}
	
	function updateOrder(buyer_id){
		var quantity = $("#prod_qt").val();;
		var amount_paid = $("#total_price").text();
		var orderItem = {
			seller_id : seller_id,
			item_id : item_id,
			buyer_id : buyer_id,
			address_id : address_id,
			quantity : quantity,
			amount_paid : amount_paid,
			status : "paymentdone",
		};
		//console.log(orderItem);
		var url="http://localhost:8080/flipkart/webapi/order/addOrderDetails";
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : JSON.stringify(orderItem),
			success : function(data){
		      	//console.log(data);
		       	if(data=="success"){
		       		alert("Successfully placed your order!");
		       		$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
		       	}
		      	else{
					alert("Issue in placing order!");
				}
			},
			error: function(data) {
				alert("failed");
			}
		});
	}
	
});
