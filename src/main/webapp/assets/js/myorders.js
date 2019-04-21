/**
 * 
 */
jQuery(document).ready(function($){
	
	var buyer_id=0;
	//get buyer data from cookies
	var cookie_data = getCookie("Buyer_data");
	if(cookie_data!="" && cookie_data!=null){
		var buyer_data = JSON.parse(cookie_data);
		//console.log(buyer_data.id);
		
		if(buyer_data!="" && buyer_data!=null){
			buyer_id = buyer_data.id;
		}
	}
	console.log(buyer_id);
	
	$("#logo").click(function(){
		$(location).attr('href', "http://localhost:8080/flipkart/Homepage.html");
	});
	
	//Initial page setting
	var url="http://localhost:8080/flipkart/webapi/order/getOrdersByBuyerID/"+buyer_id;
	$.ajax({
		type : 'POST',
		cache : false,
		contentType : false,
		processData : false,
		url : url,
		success : function(orders){
			//console.log(orders);
			if(orders!=null){
				//orders = JSON.parse(data);
				for(var i=0;i<orders.length;i++){
					
					//console.log(orders[i]);
					var ord_id = orders[i].order_id;
					var color = "";
					var status = "";
					if(orders[i].status=='paymentdone'){
						status='PAID';
						color = "orange";
					}
					
					else if(orders[i].status=='delivered' || orders[i].status=='paymentsent'){
						status='DELIVERED';
						color = 'green';
					}
					
					else if(orders[i].status=='shipped'){
						status="SHIPPED";
						color = 'green';
					}
					else if(orders[i].status=='cancelled'){
						status = "CANCELLED";
						color = 'red';
					}
					var ordered_date = orders[i].order_date.split(" ")[0].split("-");
					//console.log(ordered_date);
				    var date = ordered_date[2]+"-"+ordered_date[1]+"-"+ordered_date[0];
					var order_card = 
						"<div id='order_"+ord_id+"' stylequalse='border: 2px solid #eee;'>"+
							"<div style='border-bottom: 2px solid #eee'>"+
								"<h4 id='order_id_"+ord_id+"' class='col-form-label' style='font-size: 20px; margin-left: 40px;'>ORDER ID : "+orders[i].order_id+"</h4>"+
							"</div>"+
							"<div class='form-group row'>"+
								"<div style='padding: 5px; margin-left: 40px;'>"+
									"<img id='sel_prod_"+ord_id+"' src='"+orders[i].item_img+"' alt='Card image' style='margin-top:30px;width:120px;height:120px;float:left;' />"+
								"</div>"+
								"<div>"+
									"<div class='form-group' style='margin-left:40px;'>"+
										"<div><label id='prod_name_"+ord_id+"' class='col-form-label' style='font-size: 18px;'>"+orders[i].item_name+"</label></div>"+
										"<div><label id='prod_id_"+ord_id+"' class='col-form-label' style='font-size: 12px; color: gray;'>ITEM ID : "+orders[i].id+"</label></div>"+
										"<div><label id='prod_brand_"+ord_id+"' class='col-form-label' style='font-size: 12px; color: gray;'>Brand : "+orders[i].item_brand+"</label></div>"+
										"<div><label id='prod_seller_"+ord_id+"' class='col-form-label' style='font-size: 12px; color: gray;'>Seller :"+orders[i].seller_name+"</label></div>"+
										"<div><label id='prod_qty_"+ord_id+"' class='col-form-label' style='font-size: 12px; color: gray;'>Quantity : "+orders[i].quantity+"</label></div>"+
									"</div>"+
								"</div>"+
								"<div style='margin-top: 65px; margin-left: 100px;'>"+
									"<label id='order_status_"+ord_id+"' class='col-form-label' style='font-size: 15px; color: "+color+";'>Status : "+status+"</label>"+
								"</div>"+
								"<div style='margin-top: 65px; margin-left: 150px;'>"+
									"<button id='order_review_"+ord_id+"' class='btn btn-link' data-toggle='modal' data-target='#ratingModal_"+ord_id+"' style='font-size: 16px;'>RATE &amp; REVIEW PRODUCT</button>"+
									"<button id='order_delivered_"+ord_id+"' class='btn btn-success' style='font-size: 16px;'>I RECEIVED THE ORDER</button>"+
								"</div>"+
							"</div>"+
							"<div style='border-top: 2px solid #eee; border-bottom: 2px solid #eee'>"+	   
								"<div class='form-inline' style='font-size: 16px; margin-left: 40px;'>"+
									"<label class='col-form-label' style='color: gray;'>Ordered On </label>"+
									"<label id='order_date_"+ord_id+"' class='col-form-label' style='margin-left: 8px;'>"+date+"</label>"+
									"<label class='col-form-label' style='margin-left: 570px; color: gray;'>Order Total</label>"+
									"<label id='order_amt_"+ord_id+"' class='col-form-label' style='margin-left: 8px;'>Rs."+orders[i].amount_paid.toFixed(2)+"</label>"+
								"</div>"+
							"</div>"+
						"</div>";
					$("#myorders").append(order_card);
					$("#order_id_"+ord_id).show();
					if(status=="SHIPPED"){
						$('#order_review_'+ord_id).hide();
						$("#order_delivered_"+ord_id).show();
						onClickDelivered(ord_id);
					}
					else if(status!="DELIVERED"){
						$('#order_review_'+ord_id).hide();
						$("#order_delivered_"+ord_id).hide();
					}
					else{
						$("#order_delivered_"+ord_id).hide();
						var curr_review;
						if(orders[i].review!=null){
							curr_review = orders[i].review;
						}
						else{
							curr_review = {
								orderItem_id : ord_id, 
								buyer_id : orders[i].buyer_id,
								item_id : orders[i].item_id,
								seller_id : orders[i].seller_id,
							};
							//console.log(curr_review);
						}
						ratingModal(curr_review);
					}
				}
			}
			else{
				var no_order = "<div id='no_orders' align='center' style='border: 2px solid #eee;'>"+
								  "<label class='col-form-label'>You have no orders placed.</label>"+
							   "</div>";
				$("#myorders").append(no_order);
				$("#no_orders").show();
			}
			
		},
		error: function(orders) {
			alert("Failed to fetch order details!");
		}
	});
	
	function onClickDelivered(ord_id){
		$("#order_delivered_"+ord_id).click(function(){
			var url="http://localhost:8080/flipkart/webapi/order/updateDelivered/"+ord_id;
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : url,
				success : function(data){
			      	//console.log(data);
			       	if(data=="success"){
			       		alert("Updated status!");
			       		location.reload();
			       	}
			      	else{
						alert("Issue updating the status!");
					}
				},
				error: function(data) {
					alert("failed");
				}
			});
		});
	}
	
	function ratingModal(review){
		var ord_id = review.orderItem_id;
		$("#order_review_"+ord_id).click(function(){
			//console.log(ord_id);
			var modal = 
				"<div class='modal fade' id='ratingModal_"+ord_id+"'>"+
					"<div class='modal-dialog modal-lg modal-dialog-centered'>"+
						"<div class='modal-content'>"+
							"<div class='modal-header'>"+
								"<h5 class='modal-title' style='color: gray;'>RATE &amp; REVIEW PRODUCT</h5>"+
								"<button type='button' class='close' data-dismiss='modal'>&times;</button>"+
							"</div>"+
							"<div class='modal-body' align='center'>"+
								"<form class='form-group' action='/action_page.php'>"+
									"<div class='form-group row'>"+
										"<label class='col-form-label col-lg-4' style='color: gray;'>RATE THIS PRODUCT :</label>"+
										"<div class='star-rating' style='margin-left: 7px; color: gray;'>"+
											"<span id='star1_"+ord_id+"' class='fa fa-star-o' data-rating='1'></span>"+
											"<span id='star2_"+ord_id+"' class='fa fa-star-o' data-rating='2'></span>"+
											"<span id='star3_"+ord_id+"' class='fa fa-star-o' data-rating='3'></span>"+
											"<span id='star4_"+ord_id+"' class='fa fa-star-o' data-rating='4'></span>"+
											"<span id='star5_"+ord_id+"' class='fa fa-star-o' data-rating='5'></span>"+
											"<input type='hidden' id='rating_value_"+ord_id+"' class='rating-value' value='0'>"+
										"</div>"+
									"</div>"+
									"<div class='form-group row'>"+
										"<label class='col-form-label col-lg-4' style='color: gray;'>REVIEW THIS PRODUCT :</label>"+
										"<input type='text' class='form-control col-lg-6' id='review_"+ord_id+"' placeholder='Review'>"+
									"</div>"+
								"</form>"+
							"</div>"+
							"<div class='modal-footer'>"+
								"<button id='sumbit_"+ord_id+"' type='button' class='flipkart_button col-lg-3 btn btn-lg' data-dismiss='modal'>SUBMIT</button>"+
							"</div>"+
						"</div>"+
					"</div>"+
				"</div>";
					
			$("#myorders").append(modal);
			$("#ratingModal_"+ord_id).show();
			
			//For the star rating
			starRating(ord_id);
			
			//console.log(review.id);
			if(review.id!=undefined){
				//console.log(review);
				$("#rating_value_"+ord_id).val(review.rating);
				setStarRating(ord_id);
				if(review.review!=null){
					$('#review_'+ord_id).val(review.review);
				}
			}
			onSubmitReview(review, ord_id);
		});
	}
	
	function starRating(id){
		$("#star"+1+"_"+id).click(function() {
			$("#rating_value_"+id).val(1);
			//console.log($("#rating_value_"+id).val());
			setStarRating(id);
		});
		
		$("#star"+2+"_"+id).click(function() {
			$("#rating_value_"+id).val(2);
			//console.log($("#rating_value_"+id).val());
			setStarRating(id);
		});
		
		$("#star"+3+"_"+id).click(function() {
			$("#rating_value_"+id).val(3);
			//console.log($("#rating_value_"+id).val());
			setStarRating(id);
		});
		
		$("#star"+4+"_"+id).click(function() {
			$("#rating_value_"+id).val(4);
			//console.log($("#rating_value_"+id).val());
			setStarRating(id);
		});
		
		$("#star"+5+"_"+id).click(function() {
			$("#rating_value_"+id).val(5);
			//console.log($("#rating_value_"+id).val());
			setStarRating(id);
		});
		
	}
	
	function setStarRating(ord_id){
		var rating = $("#rating_value_"+ord_id).val();
		//console.log(rating+": rating");
		for(var i=1;i<=5;i++){
			if(i>rating){
				//console.log("white");
				$("#star"+i+"_"+ord_id).removeClass('fa-star').addClass('fa-star-o');
			}
			else{
				//console.log("yekkow");
				$("#star"+i+"_"+ord_id).removeClass('fa-star-o').addClass('fa-star');
			}
		}
	}
	
	function onSubmitReview(review, ord_id){
		$("#sumbit_"+ord_id).click(function(){	
			review["rating"] = $("#rating_value_"+ord_id).val();
			review["review"] = $('#review_'+ord_id).val();
			console.log(review);
			
			var url="http://localhost:8080/flipkart/webapi/reviews/";
			if(review.id!=undefined){
				url+="updateReview";
			}
			else{
				url+="addReview";
			}
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : url,
				data : JSON.stringify(review),
				success : function(data){
			      	console.log(data);
			       	if(data!=-1){
			       		//alert("Thank you for reviewing the product!");
			       		location.reload();
			       	}
			      	else{
						alert("Issue reviewing the product!");
					}
				},
				error: function(data) {
					alert("failed");
				}
			});
		});
	}

});