jQuery(document).ready(function($){
	
	$("body").on( "click", "#logo",function(){
		$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
	});
	
	$("body").on( "click", "#signup",function(){
		$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
	});
	
	var address__id = 1;
	
	$("#delivery_card").removeAttr('data-toggle');
	$("#order_card").removeAttr('data-toggle');
	$("#payment_card").removeAttr('data-toggle');
	

	var price=0;
	var no_items=0;
	var savings=0;
	var cart_data=null;
	//get buyer data from cookies
	var buyer_id = null;
	var cookie_data = getCookie("Buyer_data");
	if(cookie_data!="" && cookie_data!=null){
		var buyer_data = JSON.parse(cookie_data);
		if(buyer_data!="" && buyer_data!=null){
			buyer_id = buyer_data.id;
			$("#email_conf").text(buyer_data.email);   //Email in Order Summary
			$("#add_address_card").removeClass("d-none");
			$('#login').collapse('hide');
			$("#login_card").removeAttr('data-toggle');
			var saved_login = "<label class='col-form-label col-lg-4'>"+ buyer_data.name +"</label>"+
	          				  "<label class='col-form-label col-lg-4'>"+ buyer_data.email +"</label>";
	        $("#saved_login").append(saved_login);
			toDelivery(buyer_data.id);
			toAddAddress(buyer_data.id);
			onOrderContinue(buyer_data.id);
			$("#saved_login").show();
			getCartItems(buyer_id);
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
	        		getCartItems(data.id);
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
	
	//Check availability of the item
	function onOrderContinue(buyer_id){
		$("#order_cont").click(function() {
			
			$('#order').collapse('hide');
			$("#order_card").removeAttr('data-toggle');
			$('#payment').addClass('show');
			toPayment(buyer_id);
			/*var url="http://localhost:8080/flipkart/webapi/items/getItemByItemId/"+item_id;
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : url,
				success : function(item){
					if(!$.isEmptyObject(item)){
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
			});*/
			
		});
	}
	
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
			       		//var amt = $("#total_price").val();
			       		var amt = price;
			       		console.log(price);
			       		if(amt<=parseFloat(data)){
			       			updateBalance(buyer_id, amt, acc_no);
			       		}
			       		else{
			       			alert("Insufficient Bank Balance!")
			       			console.log("price : "+price);
			       			console.log("balance : "+data);
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
		var url="http://localhost:8080/flipkart/webapi/payment/updateBalance";
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : JSON.stringify(req_data),
			success : function(data){
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

	function placeOrder(order_items,item_number){
		
		if(no_items==item_number){
   			removeCart(buyer_id);
   		}
		
		else{
			var item = order_items[item_number];
			
			var quantity = $(item).find("div[name='Quantity']").attr('data');
			var s_id  = $(item).find("div[name='seller']").attr('id');
			var amount = $(item).find("span[name='amount']").attr('data');
			var orderItem = {
				item_id : $(item).attr('id'),
				seller_id : s_id,
				quantity : quantity,
				buyer_id : buyer_id,
				address_id : address_id,
				amount_paid : amount,
				status : "paymentdone",
			}
			console.log(orderItem);
			var url="http://localhost:8080/flipkart/webapi/order/addOrderDetails";
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : url,
				data : JSON.stringify(orderItem),
				success : function(data){
			       	if(data=="success"){
			       		placeOrder(order_items,item_number+1);
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
	}

	
	
	
	function updateOrder(buyer_id){
		var len=0;
		var order_items = $("div[name='item']");
		console.log(order_items);
		placeOrder(order_items,0);
		
		/*
		$("div[name='item']").each(function(){
			len++;
			console.log("Length " + len);
			var quantity = $(this).find("div[name='Quantity']").attr('data');
			var s_id  = $(this).find("div[name='seller']").attr('id');
			var amount = $(this).find("span[name='amount']").attr('data');
			var orderItem = {
				item_id : $(this).attr('id'),
				seller_id : s_id,
				quantity : quantity,
				buyer_id : buyer_id,
				address_id : address_id,
				amount_paid : amount,
				status : "paymentdone",
			}
			var url="http://localhost:8080/flipkart/webapi/order/addOrderDetails";
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : url,
				data : JSON.stringify(orderItem),
				success : function(data){
			       	if(data=="success"){
			       		
			       		console.log(len+ " - "+no_items);
			       		if(len==no_items)
			       		{
			       			removeCart(buyer_id);
			       		}
			       		
			       	}
			      	else{
						alert("Issue in placing order!");
					}
				},
				error: function(data) {
					alert("failed");
				}
			});
		});*/
	}
	
	 function getCartItems(buyerID)
	 {
		 $.ajax({
			 url:"http://localhost:8080/flipkart/webapi/cart/getItemsByBuyerId/"+buyer_id,
			 type : 'POST',
			 cache : false,
			 contentType : false,
			 processData : false,
			 success: function(cart){
				 if(cart!=null)
				 {
					 cart_data = cart;
					 no_items = cart.length;
					 $("#my_cart").text("MY CART("+no_items+")");
					 $("#total_items").text("Price ("+no_items+" items)");
					 $.each(cart,function(index,cart_item){
						 var item_id = cart_item.item_id;
						 var item_info = "<div class='card' name='item' id="+item_id+">"+
							 				"<div class='card-body'>"+
						 						"<div class='row'>"+
						 							"<div class='column'>";	
						 setImage(item_id,item_info,cart_item.quantity);						 
					 });
					 
					 
				 }
				 else
				 {
					 var no_order = "<div id='no_orders' align='center' style='border: 2px solid #eee;'>"+
					  "<label class='col-form-label'>You have no items in cart.</label>"+
				   "</div>";
					 $("#cart").append(no_order);
					 $("#no_orders").show();
					 $("#price_table").hide();
					 $("#place_order").hide();
				 }
			 },
			 error: function(cart) {
					alert("Failed to fetch cart details!");
			}
		 });
	 }
	 function setSeller(seller_id,itemInfo,item,quantity){
		 $.ajax({
			 url:"http://localhost:8080/flipkart/webapi/user/getSellerById/"+seller_id,
			 type : 'POST',
			 cache : false,
			 contentType : false,
			 processData : false,
			 success:function(seller){
				 if(seller!=null)
				 {
					 var disc_price = item.price-(item.price*item.discount)/100;
					 disc_price*=quantity;
					 savings+=quantity*item.price*item.discount/100;
					 price+=disc_price;
					 $("#total_price").text("₹"+price);
					 $("#pay_price").text("₹"+price);
					 $("#savings").text(savings);
					 itemInfo+= "<div class='column' style='padding-left:35px'>"+
									"<a style='font-size:16px;line-height:1' href='SingleProduct.html?itemid="+item.item_id+"'>"+ item.name+"</a>"+
									"<div class='v7-Wbf' style='margin-top: 5px;display: block;color: #878787;font-size: 12px;'>"+
										item.description + 
									"</div>"+
									"<div style='margin-top: 10px' name='seller' id="+seller.id+">"+
										"<span style='margin-top: 10px;color: #878787;font-size: 12px;'>Seller: "+ seller.name+"</span>"+
									"</div>"+
									"<span class='pMSy0p XU9vZa' name='amount' data="+disc_price+" > ₹"+disc_price+"</span>"+
									"<span class='pMSy0p LYRnr_'>₹"+item.price*quantity+"</span>"+
									"<span class='hMGTLH'>"+item.discount+"% Off</span>"+
								"</div> </div> </div> </div>";
					 $("#cart").append(itemInfo);
				 }
			 },
			 error:function(){
				 
			 }
			 
		 });
	 }
	 function setItemData(item_id,itemInfo,quantity){
		 $.ajax({
			 url:"http://localhost:8080/flipkart/webapi/items/getItemByItemId/"+item_id,
			 type : 'POST',
			 cache : false,
			 contentType : false,
			 processData : false,
			 success:function(item){
				 if(item!=null)
				 {
					 setSeller(item.seller_id,itemInfo,item,quantity);
				 }
			 },
			 error:function(){
				 
			 }
			 
		 });
	 }
	
	 function setImage(item_id,itemInfo,quantity){
		 $.ajax({
			 url:"http://localhost:8080/flipkart/webapi/items/getItemImagesByItemId/"+item_id,
			 type : 'POST',
			 cache : false,
			 contentType : false,
			 processData : false,
			 success:function(images){
				 if(images!=null)
				 {
					 itemInfo+= "<a href='SingleProduct.html?itemid="+item_id+"' > <img data-id="+item_id+" style='width:120px;height:80px'  alt='item_img' src="+images[0].image_location+"> </a>"+
					 			 "<div class='_3RkJty' style='padding-top:40px'>"+
					 			  	"<div class='_3md1dr'>";
						  	
					 	 itemInfo+= "<div name='Quantity' data="+quantity+">"+
					 						"<label>Quantity : "+quantity+" units</label>"+
					 				"</div>"+
					 				"</div>"+
					 				"</div> </div>";
					 
					 setItemData(item_id,itemInfo,quantity);
				 }
			 },
			 error:function(){
				 
			 }
			 
		 });
	 }
	 
	 function removeCart(buyer_id)
	 {
		var url="http://localhost:8080/flipkart/webapi/cart/removeItemsByBuyerId/"+buyer_id;
		$.ajax({
				type : 'GET',
				contentType : false,
				url : url,
				success : function(data){
					console.log("items removed from cart");
					alert("Successfully placed your order!");
					$(location).attr('href', "http://localhost:8080/flipkart/MyOrders.html");
		       		
				},
				error:function(){
					console.log("unable to remove items from cart")
				}
		});
	 }
	 /*
	 function removeItem(item_id){
		 var item_data = JSON.stringify({"buyer_id":buyer_id,
			 "item_id":item_id,
			});
		 $.ajax({
				 url:"http://localhost:8080/flipkart/webapi/cart/removeItem",
				 type : 'POST',
				 contentType : "application/json",
				 data:item_data,
				 success: function(response){
					 if(response==1)
					 {
					 	alert("removed from cart");
					 	window.location = "BuyCart.html";
					 	
					 }
					 else
					 {
						 alert("unable to remove from cart");
					 }
				 },
				 error:function()
				 {
					 alert("unable to remove from cart");
				 }
				 			
				});

	 }
	 
	 $("#cart").on('click','.remove',function(){
		removeItem($(this).attr('data-id')); 
	 });

	 $("#cart").on('click','button',function(){
		var item_id = $(this).attr('data-id');
		var sign = $(this).attr('sign');
		var quantity = parseInt($("input[data-id="+item_id+"]").val());
		if(sign==1)
		{
			$.ajax({
			 url:"http://localhost:8080/flipkart/webapi/items/getItemByItemId/"+item_id,
			 type : 'POST',
			 cache : false,
			 contentType : false,
			 processData : false,
			 success:function(item){
				 if(item!=null)
				 {
					 var max_quantity = item.quantity;
					 if(quantity<max_quantity)
					 {
						 var item_data = JSON.stringify({"buyer_id":buyer_id,
							 "item_id":item_id,
							 "quantity":quantity+1
							});
						 $.ajax({
							url:"http://localhost:8080/flipkart/webapi/cart/updateQuantityInCart",
							type : 'POST',	
							contentType : "application/json",
							data:item_data,
							success: function(response){
								if(response==1)
								{
									//window.location = "BuyCart.html";
									$("input[data-id="+item_id+"]").val(quantity+1);
									var total_price = $("#total_price").val();
									total_price = total_price + item.price;
									$("#total_price").val(total_price);
								}
							}
						});

					}
					 else
					 {
						 alert("Only "+ max_quantity+" are Availble");
					 }
				 }
			 },
			 error:function(){
				 alert("Unable to find Item quantity");
			 }
			 
			});
		}
		else if(sign==0)
		{
			
				quantity--;
				var item_data = JSON.stringify({"buyer_id":buyer_id,
				 "item_id":item_id,
				 "quantity":quantity
				});
				$.ajax({
				url:"http://localhost:8080/flipkart/webapi/cart/updateQuantityInCart",
				type : 'POST',	
				contentType : "application/json",
				data:item_data,
				success: function(response){
					if(response==1)
					{
						//window.location = "BuyCart.html";
						$("input[data-id="+item_id+"]").val(quantity);
						var total_price = $("#total_price").val();
						total_price = total_price - item.price;
						$("#total_price").val(total_price);
					}
				}
				});
			
		}
	 });*/
	
});
/**
 * 
 */