jQuery(document).ready(function($){
	
	var buyer_id=null;
	var price=0;
	var no_items=0;
	var savings=0;
	var cookie_data = getCookie("Buyer_data");
	if(cookie_data!="" && cookie_data!=null){
		var buyer_data = JSON.parse(cookie_data);
		if(buyer_data!="" && buyer_data!=null){
			buyer_id = buyer_data.id;
			$("#profile_btn").text(buyer_data.name);
		}
		else
		{
			$("#profile_btn").text("Login & Signup");
		}
	}	 
	else
	 {
		$("#profile_btn").text("Login & Signup");
	 }
	 getCartItems(buyer_id);
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
	 
	 function dealsAvailable(item_id, buyer_id,item_info){
			var data = JSON.stringify({
				item_id : parseInt(item_id),
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
						item_info+=	"<div><select class='col-lg-8' style='color: green;' name='Deals' id='deals' data-id="+item_id+">"+
						"<option value='select'>Select Deal</option>"; 
	 						for(var i=0;i<deals.length;i++){
							item_info += "<option value='"+deals[i].deal_id+"_"+deals[i].deal_discount+"'>"+deals[i].name+" : "+ deals[i].deal_discount +"% Off</option>";
						}
	 					item_info +="</select></div>";
					}
					else{
						item_info += "<li style='color:green'>No deals available on the item.</li>";
					}
					item_info+="</div> </div> </div> </div>";
 					$("#cart").append(item_info);
				
				},
				error: function(desc) {
					alert("failed");
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
					 disc_price = disc_price;
					 savings+=quantity*item.price*item.discount/100;
					 savings = savings;
					 console.log(savings);
					 price+=disc_price;
					 $("#total_price").text("₹"+price);
					 $("#pay_price").text("₹"+price);
					 $("#savings").text(savings);
					 itemInfo+= "<div class='column' style='padding-left:35px'>"+
									"<a style='font-size:16px;line-height:1' href='SingleProduct.html?itemid="+item.item_id+"'>"+ item.name+"</a>"+
									"<div class='v7-Wbf' style='margin-top: 5px;display: block;color: #878787;font-size: 12px;'>"+
										item.description + 
									"</div>"+
									"<div style='margin-top: 10px'>"+
										"<span style='margin-top: 10px;color: #878787;font-size: 12px;'>Seller: "+ seller.name+"</span>"+
									"</div>"+
									"<span class='pMSy0p XU9vZa' name='disc_price' data="+disc_price+"> ₹"+disc_price+"</span>"+
									"<span class='pMSy0p LYRnr_' name='orig_price' data="+item.price*quantity+">₹"+item.price*quantity+"</span>"+
									"<span class='hMGTLH' name='discount' data="+item.discount+">"+item.discount+"% Off</span>";
				
					 dealsAvailable(item.item_id,buyer_id,itemInfo);
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
					 if(quantity>1)
					 {
						 itemInfo+= "<button class='wNrY5O' sign='0' data-id="+item_id+" > – </button>";
					 }
					 else
					 {
					 	 itemInfo+=	"<button class='wNrY5O' disabled sign='0' data-id="+item_id+" > – </button>";
					 }		  	
					 	 itemInfo+= "<div class='_2zH4zg'>"+
					 						"<input type='text' value="+quantity+" data-id="+item_id+" class='_2csFM9'>"+
					 				"</div>"+
					 				"<button class='wNrY5O'  sign='1' data-id="+item_id+"> + </button>"+
					 				"<div class='gdUKd9' tabindex='13' style='padding-left:40px'>"+
					 						"<span class='remove' data-id="+item_id+">Remove</span>"+
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
					 	window.location = "Cart.html";
					 	
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
	 $("#cart").on('change','select',function(){
		 	var id = $(this).val();
			var item_id = $(this).attr('data-id');
			console.log(" Item "+ item_id);
			if(id!="select"){
				var discount = id.split("_")[1];
				var item = $("div[name='item'][id="+item_id+"]");
				var item_price = $(item).find("span[name='orig_price']").attr('data');
				var item_savings = ((discount/100.0)*(item_price));
				
				var offer_price = (item_price-item_savings);
				$(item).find("span[name='discount']").text(discount+"% Off");
				$(item).find("span[name='discount']").attr('data',discount);
				$(item).find("span[name='disc_price']").text("Rs. "+offer_price);
				$(item).find("span[name='disc_price']").attr('data',offer_price);
				
				priceSummary();
			}
			else
			{
				window.location = "Cart.html";
			}
		});
	 function priceSummary(){
		 var items = $("div[name='item']");
		 var total_price = 0;
		 total_price = parseInt(total_price);
		 var total_savings = 0;
		 for(var i=0;i<no_items;i++)
		 {
			 var item = items[i];
			 total_price+= parseInt($(item).find("span[name='disc_price']").attr('data'));
			 total_savings += $(item).find("span[name='discount']").attr('data')*$(item).find("span[name='orig_price']").attr('data')/100;
		 }
		 total_price = parseInt(total_price);
		 $("#total_price").text("₹"+total_price);
		 $("#pay_price").text("₹"+total_price);
		 $("#savings").text(total_savings);
	 }

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
									window.location = "Cart.html";
								 
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
						window.location = "Cart.html";
					}
				}
				});
			
		}
	 });
	 
	 function place_order(items,item_number){
		 	
		 	if(item_number==items.length){
		 		window.location = "BuyCart.html";
		 		return;
		 	}
		 	var item = items[item_number];
			var item_id = $(item).attr('id');
			console.log(" ID " + item);
			var id = $(item).find("select").val();
			var deal_id = parseInt(id.split("_")[0]);
			if(id!='select')
			{
				var item_data = JSON.stringify({"buyer_id":buyer_id,
					"item_id":item_id,
					"deal_id":deal_id
				});
				$.ajax({
					url:"http://localhost:8080/flipkart/webapi/cart/updateDealInCart",
					type:'POST',
					contentType : "application/json",
					data:item_data,
					success: function(response){
						place_order(items,item_number+1);
					}
				});
			}
			else{
				var item_data = JSON.stringify({"buyer_id":buyer_id,
					"item_id":item_id,
					"deal_id":0
				});
				$.ajax({
					url:"http://localhost:8080/flipkart/webapi/cart/updateDealInCart",
					type:'POST',
					contentType : "application/json",
					data:item_data,
					success: function(response){
						place_order(items,item_number+1);
					}
				});
			}
	 }
	 
	 
	$("#place_order").click(function(){
		
		var items = $("div[name='item']");
		if(items.length>0)
		place_order(items,0);
		for(var i=0;i<no_items;i++)
		{
			
		}
	});
})