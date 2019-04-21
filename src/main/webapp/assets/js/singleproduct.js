/**
 * 
 */
jQuery(document).ready(function($){
	var buyer_id=null;
	//var inCart = false;
	var cookie_data = getCookie("Buyer_data");
	if(cookie_data!="" && cookie_data!=null){
		var buyer_data = JSON.parse(cookie_data);
		if(buyer_data!="" && buyer_data!=null){
			buyer_id = buyer_data.id;
			$("#profile_btn").text(buyer_data.name);
		}
		else
		{
			$("#add_to_cart").text("ADD TO CART");
			$("#profile_btn").text("Login & Signup");
		}
	}	 
	else
	 {
		$("#profile_btn").text("Login & Signup");
	 }
	
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
	
	$("#add_to_cart").click(function(){
		if(buyer_id!=null)
		{
			if($("#add_to_cart").text()!="GO TO CART")
			{
				addToCart(buyer_id,item_id);
			}
			window.location = "Cart.html";
			
		}
	});
	function checkCart(buyerId,itemId)
	{
		var item_data = JSON.stringify({"buyer_id":buyerId,
			 "item_id":itemId,
			 "quantity":1
			});
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/cart/checkItemInCart",
			type : 'POST',	
			contentType : "application/json",
			data:item_data,
			success: function(response){
				if(response==1)
				{
					//inCart=true;
					$("#add_to_cart").text("GO TO CART");
				}
			}
		});
	}
	function addToCart(buyerId, itemId)
	{
		
		var item_data = JSON.stringify({"buyer_id":buyerId,
						 "item_id":itemId,
						 "quantity":1
						});
		$.ajax({
			 url:"http://localhost:8080/flipkart/webapi/cart/addItemToCart",
			 type : 'POST',
			 contentType : "application/json",
			 data:item_data,
			 success: function(response){
				 if(response!=-1)
				 {
				 	alert("added to cart");
				 	
				 }
				 else
				 {
					 alert("unable to add to cart");
				 }
			 },
			 error:function()
			 {
				 alert("unable to add to cart");
			 }
			 			
		});
	}
	
	$("#wishlist").click(function(){
		if(buyer_id!=null)
		{
			if($("#wishlist").val()!='1')
			{
				addToWishlist(buyer_id,item_id);
			}
			else{
				removeFromWishlist(buyer_id, item_id);
			}
			//window.location = "MyWishlist.html";
		}
	});
	function checkWishlist(buyerId,itemId)
	{
		var item_data = JSON.stringify({"buyer_id":buyerId,
			 "item_id":itemId,
			});
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/wishlist/checkItemInWishlist",
			type : 'POST',	
			contentType : "application/json",
			data:item_data,
			success: function(response){
				if(response==1)
				{
					$("#wishlist").val("1");
					$("#wishlist").removeClass("fa-heart-o").addClass("fa-heart");
				}
			}
		});
	}
	function removeFromWishlist(buyerId, itemId)
	{
		
		var item_data = JSON.stringify({"buyer_id":buyerId,
						 "item_id":itemId,
						});
		$.ajax({
			 url:"http://localhost:8080/flipkart/webapi/wishlist/removeFromWishlist",
			 type : 'POST',
			 contentType : "application/json",
			 data:item_data,
			 success: function(response){
				 if(response!=-1)
				 {
				 	alert("removed from wishlist");
				 	$("#wishlist").val("0");
					$("#wishlist").removeClass("fa-heart").addClass("fa-heart-o");
				 	
				 }
				 else
				 {
					 alert("unable to removed from wishlist");
				 }
			 },
			 error:function()
			 {
				 alert("unable to removed from wishlist");
			 }
		});
	}
	function addToWishlist(buyerId, itemId)
	{
		
		var item_data = JSON.stringify({"buyer_id":buyerId,
						 "item_id":itemId,
						});
		$.ajax({
			 url:"http://localhost:8080/flipkart/webapi/wishlist/addItemToWishlist",
			 type : 'POST',
			 contentType : "application/json",
			 data:item_data,
			 success: function(response){
				 if(response!=-1)
				 {
				 	alert("added to wishlist");
				 	$("#wishlist").val("1");
					$("#wishlist").removeClass("fa-heart-o").addClass("fa-heart");
				 	
				 }
				 else
				 {
					 alert("unable to add to wishlist");
				 }
			 },
			 error:function()
			 {
				 alert("unable to add to wishlist");
			 }
		});
	}
	
	$("body").on( "click", "#logo",function(){
		$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
	});
		
	//Initial page setting
	var url="http://localhost:8080/flipkart/webapi/items/getItemByItemId/"+item_id;
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		success : function(item){

			if(!$.isEmptyObject(item)){
				//console.log(item);
				$("#path_curr").text(item.name);
				$("#name").text(item.name);
				var id_str = "ITEM ID : "+item.id;
				$("#item_id").text(id_str);
				var qt_str = "Available Stock : "+item.quantity+" unit(s)";
				$("#quantity").text(qt_str);
				var offer_price = (item.price-(item.price*item.discount*1.0/100.0)).toFixed(2);
				$("#prod_offer_price").text("Rs. "+offer_price);
				$("#prod_orig_price").text("Rs. "+item.price);
				$("#discount").text(item.discount+"% off");
				if(item.quantity==0){
					$('#buy_now').attr('disabled','disabled');
					$('#go_to_cart').attr('disabled','disabled');
				}
				else{
					$("#availablity").hide();
				}
				
				setSubCategory(item.subcategory_id);
				setItemImages(item.item_id)
				setRating(item.item_id);
				setTotalRatings(item.item_id);
				setTotalReviews(item.item_id);
				
				$("#desc").append("<li>"+"- Brand: "+item.brand+"</li>");
				$("#desc").append("<li>"+"- Color: "+item.color+"</li>");
				$("#desc").append("<li>"+"- Description: "+item.description+"</li>");
				$("#desc").append("<li>"+"- Manufactured on: "+item.manufacture_date+"</li>");
				
				setDeals(item.item_id);
				setDescription(item.item_id);
				setSellerInfo(item.seller_id);
				setSellerRating(item.seller_id);
				checkCart(buyer_id,item.item_id);
				checkWishlist(buyer_id,item.item_id);
				onClickBuy(item.item_id);
				onClickAddtoCart(item.item_id);
			}
			else{
				alert("Problem occured3!!");
			}
		},
		error: function(item) {
			alert("failed here");
		}
	});
	
	//Set Sub-category in the path
	function setSubCategory(id){
		var url="http://localhost:8080/flipkart/webapi/category/getSubCategoryById/"+id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(subcat){

				if(!$.isEmptyObject(subcat)){
					$("#path_subcat").text(subcat.name);
					//Change url
					$("#path_subcat").attr("href", "http://localhost:8080/flipkart/itemslist.html?subcat_id="+subcat.subcategory_id);
					setCategory(subcat.category_id);
				}
				else{
					alert("Problem occured!!");
				}
			},
			error: function(subcat) {
				alert("failed");
			}
		});
	}
	
	//Set Category in the path
	function setCategory(id){
		var url="http://localhost:8080/flipkart/webapi/category/getCategoryById/"+id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(cat){

				if(!$.isEmptyObject(cat)){
					$("#path_cat").text(cat.name);
					//Change url
					$("#path_cat").attr("href", "http://localhost:8080/flipkart/UnderConstruction.html?="+cat.category_id);
				}
				else{
					alert("Problem occured!!");
				}
			},
			error: function(cat) {
				alert("failed");
			}
		});
	}
	
	//Set Item images
	function setItemImages(item_id){
		var url="http://localhost:8080/flipkart/webapi/items/getItemImagesByItemId/"+item_id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(imgs_list){
				//console.log(imgs_list);	
				if(!$.isEmptyObject(imgs_list)){
					var img_no;
					for(var i=0;i<imgs_list.length;i++){
						//$("#sel_prod").attr("src", itemimg[i].image_location);
						img_no=imgs_list[i].id;
						var image = "<div id='img_"+img_no+"' style='margin-top: 15px;'>"+
				     					"<img class='small_img' id='prod_img_"+img_no+"' src='#'></img>"+
				     				"</div>";
						$("#small_imgs").append(image);
						$("#prod_img_"+img_no).attr("src",imgs_list[i].image_location);
						$("#img_"+img_no).show();
						
						if(i==0){
							$("#prod_big_img").attr("src", imgs_list[i].image_location);
							
							//On hover property of the big image
							onHover_bigimg(imgs_list[i].image_location);
						}
						
						//On hover property of the image
						onHover_smallimg(img_no, imgs_list[i].image_location);
					}
					
				}
				else{
					alert("Problem occured!!");
				}
			},
			error: function(imgs_list) {
				alert("failed");
			}
		});
	}
	
	//Item Rating
	function setRating(id){
		var url="http://localhost:8080/flipkart/webapi/reviews/getItemRating/"+id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(rating){
				//console.log("Rating: "+rating);
				var rtg = "<label class='col-form-label font-weight-bold'>"+rating+
		          			"<span class='fa fa-star'></span>"
		          		  "</label>" 
				$("#prod_rating").append(rtg);
			},
			error: function(rating) {
				alert("failed");
			}
		});
	}
	
	//No. of item ratings
	function setTotalRatings(id){
		var url="http://localhost:8080/flipkart/webapi/reviews/totalItemRatings/"+id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(ratings){
				$("#rating_no").text(ratings);
			},
			error: function(ratings) {
				alert("failed");
			}
		});
	}
	
	//No. of item ratings
	function setTotalReviews(id){
		var url="http://localhost:8080/flipkart/webapi/reviews/totalItemReviews/"+id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(reviews){
				//console.log("Rating: "+reviews);
				$("#review_no").text(reviews);
			},
			error: function(reviews) {
				alert("failed");
			}
		});
	}
	
	//Deals on the item
	function setDeals(item_id){
		var url="http://localhost:8080/flipkart/webapi/deal/getDealsOfItem/"+item_id;
		$.ajax({
			type : 'GET',
			contentType : 'application/json',
			url : url,
			success : function(deals){

				//console.log(deals);	
				if(!$.isEmptyObject(deals)){
					for(var i=0;i<deals.length;i++){
						var point = "<li>- "+
										"<label style='color: green; font-weight: bold; margin-right: 5px;'>"+deals[i].name+" </label>"+
										"<label style='color: gray;'>"+deals[i].deal_discount+" % Off</label>"+
										"<li style='color: blue; margin-left: 25px;'> Valid till "+deals[i].validity+" only!</li>"+
									"</li>";
						$("#deals").append(point);
					}
				}
				else{
					var point = "<li>No deals available on the item.</li>";
					$("#deals").append(point);
				}
			},
			error: function(desc) {
				alert("failed");
			}
		});
	}
	
	//Item Description
	function setDescription(item_id){
		var url="http://localhost:8080/flipkart/webapi/items/getItemDetailsByItemId/"+item_id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(desc){

				//console.log(desc);	
				if(!$.isEmptyObject(desc)){
					for(var i=0;i<desc.length;i++){
						var point = "<li>- "+desc[i].item_key+": "+desc[i].item_value+"</li>";
						$("#desc").append(point);
					}
				}
				else{
					//alert("Problem occured1!!");
				}
			},
			error: function(desc) {
				alert("failed");
			}
		});
	}
	
	//Set the Seller Info
	function setSellerInfo(id){
		var url="http://localhost:8080/flipkart/webapi/user/getSellerById/"+id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(seller){
				//console.log(seller);
				if(!$.isEmptyObject(seller)){
					$("#seller_name").text(seller.name);
				}
				else{
					alert("Problem occured2!!");
				}
			},
			error: function(seller) {
				alert("failed");
			}
		});
	}
	
	//Set seller's rating
	function setSellerRating(id){
		var url="http://localhost:8080/flipkart/webapi/reviews/getSellerRating/"+id;
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url,
			success : function(rating){
				var rtg = "<label class='col-form-label font-weight-bold'>"+rating+
      						"<span class='fa fa-star'></span>"
        		  		  "</label>" 
				$("#seller_rating").append(rtg);
			},
			error: function(rating) {
				alert("failed");
			}
		});
	}

	//Hover on small image
	function onHover_smallimg(img_no, img_location){
		$('#prod_img_'+img_no).hover(function() {
			$("#prod_big_img").attr("src", img_location);
			//$("#prod_big_img").show();
		});
	}
	
	//Hover on big image
	function onHover_bigimg(img_location){
		/*$('#prod_big_img').hover(function() {
			//TODO
			var pre = $("#zoom_img");
			pre.style.visibility = "visible";
	        var img = $("#prod_big_img");
			pre.style.backgroundImage = img_location;
		});*/
	}
	
	//buy now
	function onClickBuy(item_id){
		$('#buy_now').click(function() {
			var url = "http://localhost:8080/flipkart/BuyingPortal.html?itemid=" + item_id;
			$(location).attr('href', url);
		});
	}
	
	//Go to cart
	function onClickAddtoCart(item_id){
		$('#go_to_cart').click(function() {
			//TODO
			alert("Under construction!!");
			//$(location).attr('href', 'http://localhost:8080/flipkart/Cart.html');
		});
	}
});
