jQuery(document).ready(function($){
	
	// Check if seller is logged in and redirect the page accordingly
	
	var seller_data = checkCookie("seller_data");
	
	var seller_id=null;
	var seller_name="";
	
	if(seller_data==null){
		window.location = "SellerHub.html";
	}
	
	else{
		seller_id = seller_data.id;
		seller_name=seller_data.name;
	}
		
	//Function to get the nav-element from url
	
	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null) {
	       return null;
	    }
	    return decodeURI(results[1]) || 0;
	}
	
	//$("#header").load("SellerNavBar.html");
	
	var nav_ref = $.urlParam("nav_ref");
	
	var active_page = "";
	var active_button = "";
	

	if(seller_id==null){
		window.location = "SellerHub.html";
	}
	
	else if(nav_ref=="home"){
		
		active_page = "#manageAllItems";
		active_button = "#home";
		getAllSellerItems(seller_id);
	}
	
	else if(nav_ref=="orders"){
		
		active_page = "#viewOrders";
		active_button = "#orders";
		getSellerOrders(seller_id);
	}
	
	else if(nav_ref=="profile"){
		
		active_page = "#viewProfile";
		active_button = "#profile";
		$("#viewProfile").load("SellerProfile.html");
	}
	
	else if(nav_ref="addItem"){		
		active_page = "#addItemForm";
		active_button = "#addItem";
		$("#addItemForm").load("SellerAddItem.html");
		$("#itemSubCategory").prop('disabled',true);
		getCategoryList();
	}
	
	else{
		window.location = "SellerHub.html";
	}

	$("#profile_name").text(seller_name);

	$(active_button).addClass("nav-item-active"); //Set the active nav-button to orange color.
		
	//Nav-buttons on click functions
	
	$("body").on("click","#addItem",function(){
		window.location = "SellerPage.html?nav_ref=addItem";
	});
	
	$("body").on("click","#home",function(){
		window.location = "SellerPage.html?nav_ref=home";
	});
	
	$("body").on("click","#orders",function(){
		window.location = "SellerPage.html?nav_ref=orders";
	});
	
	$("body").on("click","#profile",function(){
		window.location = "SellerPage.html?nav_ref=profile";
	});
	
	//logout
	$("body").on("click","#logout",function(){
		
		deleteCookie("seller_data");
		location.reload();
	});
	
	
	
// Add Item form Functions
	
	//Put the dynamic category list as dropdown
	function loadCategory(category_list){
		
		$.each(category_list, function(index,category) {
			$("#itemCategory").append(
		        $("<option class='dynamic-option'></option>").val(category.category_id).html(category.name)
		    );
		});	
	};
	
	//Get the category list from backend
	function getCategoryList(){
    	
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/category/getAllCategoryList",
			type:"GET",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data){
	        		console.log(data);
	        		category_list =  data;
	        		loadCategory(data);
	        	}
	        	
	        	else
	        		alert("failed to get Categories");
	        },
	        
	        error : function(data){
	        	alert("failed to get Categories !");
	        }
	        
		});
	};
	
	// To show sub-categories for chosen category;
	$("body").on("change","#itemCategory",function(){
		
		var selected_category = $("#itemCategory").val();
		if(selected_category=="Choose Category"){
		//	$("#itemSubCategory").prop("disabled",true);
			$(".dynamic-sub-option").remove();
			$(".dynamic-brand-option").remove();
			return;
		}
		
		else{	
			$(".dynamic-sub-option").remove();
			$(".dynamic-brand-option").remove();
			getSubCategoryList(selected_category); 
			$("#itemSubCategory").prop("disabled",false);
		}
	});
	
	// append the subcategory list to html
	function loadSubCategory(sub_categories){
		
		$.each(sub_categories, function(index,sub_category) {
		    $("#itemSubCategory").append(
		        $("<option class='dynamic-sub-option'></option>").val(sub_category.subcategory_id).html(sub_category.name)
		    );
		});
	};
	//get subcategory list from backend - getSubCategoryList();
	
	
	//get All brand List from backend
	function getBrandList(sub_category_id){
    	
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/category/getAllBrandsForASubCategory/"+sub_category_id,
			type:"GET",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data){
	        		console.log(data);
	        		loadBrands(data);
	        	}
	        	
	        	else
	        		alert("failed to get Brands");
	        },
	        
	        error : function(data){
	        	alert("failed to get Brands !");
	        }
	        
		});
	};
		
	//append the brands corresponding to the given sub-category.
	function loadBrands(brands){
		
		$.each(brands, function(index,brand) {
		    $("#itemBrand").append(
		        $("<option class='dynamic-brand-option'></option>").val(brand.brand).html(brand.brand)
		    );
		});
	};
	
	
	$("body").on("change","#itemSubCategory",function(){
		
		var selected_subcategory = $("#itemSubCategory").val();
		if(selected_subcategory=="Choose SubCategory"){
		//	$("#itemBrand").prop("disabled",true);
			$(".dynamic-brand-option").remove();
			return;
		}
		
		else{	
			$(".dynamic-brand-option").remove();
			getBrandList(selected_subcategory); 
		}
	});
	
	
	$("body").on("click","#addImageButton",function(event){
		$("#uploadImage").click();
	});

	// Upload Images
	$("body").on("change","#uploadImage",function(){
		
		$(".dynamic").remove();  //removing the previous selected images.
		$("#enlargedImage").attr("src","images/sellerHub/AddImages.png");
		
		if(this.files){
			
			for(var i=0;i<this.files.length;i++){
				
				var image_count = 0;
				
				if(this.files[i]){
					
					var reader = new FileReader();
					reader.onload = function(e){				
						image_count = image_count+1;
					
						$('#enlargedImage').attr('src',e.target.result);
					
						var image_div_id = 'image_div_' + image_count; 
						var new_division = "<div id="+image_div_id+" class='dynamic'>" +									
												"<img class='small_img' id="+'image_'+image_count+" src='#' style='margin-left:30px;'></img>"
											+"</div>";
					
						$("#allImages").append(new_division);
						$("#image_"+image_count).attr('src',e.target.result);
					}
					reader.readAsDataURL(this.files[i]);
				}
			}
		}
	});
	
	//show enlarged image on hover of small image.
	$('#addItemForm').on("mouseenter",".small_img",function(){
		var image = $(this).attr("src");
		$("#enlargedImage").attr("src",image);
	});
	
	
	// show the enlarged image of small image.
	$('#addItemForm').on("click",".small_img",function(){
		var image = $(this).attr("src");
		$("#enlargedImage").attr("src",image);
	});
	
	// Delete key value
	$('body').on("click","#removeBtn",function(){
		console.log("removed Parent");
	    $(this).parent('div').remove();
	});
	
	// append single value division
	$("body").on("click","#addKeyValue",function(){
		
			var new_division = "<div id='keyValuePair' class='row dynamic' style='padding-bottom:5px'>" +
									"<div id='keyDiv'>" +
										"<input type='text' class='form-control' id='key' placeholder='KEY' style='width:150px'>" +
									"</div>" +
									"<div style='margin-left:15px' id='valDiv'>" +
										"<input type='text' class='form-control' id='value' placeholder='VALUE' style='width:150px'>"+
									"</div>"+
									"<button type='button' id='removeBtn' class='remove-btn'>X</button>"+
								"</div>";
			
			$("#keyValuePairs").append(new_division);
	});
	
	
    
	// get subcategory list from backend
	function getSubCategoryList(category){
		
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/category/getSubCategoryList/"+category,
			type:"POST",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data)
	        	{
	        		loadSubCategory(data);
	        	}
	        	
	        	else
	        		alert("failed to get Sub Categories");
	        },
	        
	        error : function(data){
	        	alert("failed to get Sub Categories !");
	        }
	        
		});
	};
	
	
	// submit the new Item Form with only fixed Item Details.
	$("body").on("click","#submitItem",function(){
		
		$(".warning").hide();
		if(validate_add_item_form()){
			
		    var itemObject = {
		    		
		    		"id" : $("#itemId").val(),
		    		"name" : $('#itemName').val(),
		    		"subcategory_id" :$("#itemSubCategory").val(),
		    		"quantity" : $("#itemQuantity").val(),
		    		"price" : $('#itemPrice').val(),
		    		"brand" : $('#itemBrand').val(),
		    		"description" : $('#itemDescription').val(),
		    		"manufacture_date" : $('#itemManufactureDate').val(),
		    		"color" : $('#itemColor').val(),
		    		"discount" : $("#itemDiscount").val(),
		    		"seller_id" : seller_id,
		    };
		    
		    console.log($("#itemCategory").val());
		    
			$.ajax({
				url:"http://localhost:8080/flipkart/webapi/seller/addItem",
				type:"POST",
				data: JSON.stringify(itemObject),
				contentType: 'application/json',
				success : function(data){
		        	
		        	if(data!=-1)
		        	{
		        		// Added Successfully
		        		// Now add ItemDetails and Images
		        		sendExtraItemInformation(data);
		        		uploadAllImages(data,0);
		        	}
		        	else{
		        		$("#warning_invalid_id").show();
		        	}
		        },
		        error : function(data){
		        	alert("failed to add Item!");
		        }
		        
			});
		}
	
	});
	
	
	// Upload All Images of item.
	function uploadAllImages(item_id,img_num){	
		
			if(img_num==$('input[type="file"]').get(0).files.length){
				alert("Added Successfully. Redirecting to Home Page");
       			window.location = "SellerPage.html?nav_ref=home";
       			return 0;
   			}
			
			var file = $('input[type="file"]').get(0).files[img_num];
			var formData = new FormData();
			formData.append("image",file);
			formData.append("item_id",item_id);
			formData.append("img_num",img_num);
				    
			$.ajax({
					url:"http://localhost:8080/flipkart/webapi/seller/addItemImage",
					type:"POST",
					data: formData,
					cache:false,
					contentType:false,
					processData: false,
				    success : function(data){
				        	
				    if(data=="success"){
				        uploadAllImages(item_id,img_num+1);
				   	}
				    else
				    	alert("failed to add Item");
				     },
				     error : function(data){
				    	 alert("failed to add Item!");
				      }
				        
			});
	};
	
	// Send all the key value pairs to the backend.
	function sendExtraItemInformation(item_id){
		
		var keyValuePairs = [];
	    
		$("div[id=keyValuePair]").each(function(){
	    	
	    	keyValuePair = {};
		    
	    	var key = $(this).children("#keyDiv").children("#key").val();
	    	var value = $(this).children("#valDiv").children("#value").val();
	    	
	    	keyValuePair["item_key"]=key;
	    	keyValuePair["item_value"]= value;
	    	keyValuePair["item_id"] = item_id;
	    	keyValuePairs.push(keyValuePair);
	    	
	    });
		
		if(keyValuePairs.length>0){
		
			$.ajax({
				url:"http://localhost:8080/flipkart/webapi/seller/addItemDetails",
				type:"POST",
				data: JSON.stringify(keyValuePairs),
				contentType: 'application/json',
				success : function(data){
		        	
		        	if(data=="success"){
		        
		        	}
		        	else
		        		alert("failed to add Item");
		        },
		        error : function(data){
		        	alert("failed to add Item!");
		        }
		        
			});
			
		}
	}
	
	// Validate the item Form
	function validate_add_item_form(){
		
		var count = 0;
			
		console.log("Entered Validation");
			
		if($("#itemId").val()==""){
			count++;
			$("#warning_enter_id").show();
		}
			
		if(!$("#itemName").val()){
			count++;
			$("#warning_name").show();
		}
		
			
		if(!$("#itemPrice").val()){
			count++;
			$("#warning_price").show();
		}
		
		else{
			
			if($("#itemPrice").val()<0){
				count++;
				$("#warning_valid_price").show();
			}
			
		}
		
		if(!$("#itemColor").val()){
			count++;
			$("#warning_color").show();
		}
			
		if($("#itemBrand").val()=="Choose Brand"){
			count++;
			$("#warning_brand").show();
		}
			
		if(!$("#itemQuantity").val()){
			count++;
			$("#warning_quantity").show();
		}
		
		else{
			
			if($("#itemQuantity").val()<0){
				count++;
				$("#warning_valid_quantity").show();
			}
			
		}
				
		if(!$("#itemDiscount").val()){
			count++;
			$("#warning_discount").show();
		}
		
		else{
			
			if($("#itemDiscount").val() < 0 || $("#itemDiscount").val()>100){
				count++;
				$("#warning_valid_discount").show();
			}
			
		}
			
		if(!$("#itemDescription").val()){
			count++;
			$("#warning_description").show();
		}
			
		if(!$("#itemManufactureDate").val()){
			count++;
			$("#warning_date").show();
		}
			
		if($("#itemCategory").val()=="Choose Category"){
			count++;
			$("#warning_category").show();
		}
		
		if($("#itemSubCategory").val()=="Choose SubCategory"){
			count++;
			$("#warning_subcategory").show();
		}
		
		if($('input[type="file"]').get(0).files[0] == null){
			count++;
			$("#warning_add_image").show()
		}
	
		if(count > 0){
			return false;
		}
			
		else{
			return true;
		}
			
	}
	
	
// Seller Home - List all the seller Items functions.
	
	function getAllSellerItems(sellerId){
		
		$.ajax({
			url: "http://localhost:8080/flipkart/webapi/items/getAllItemsBySellerId/" + sellerId,
			type:"GET",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data)
	        	{
	        		viewAllSellerItems(data);
	        	}
	        	
	        	else
	        		alert("failed to get Items");
	        },
	        
	        error : function(data){
	        	alert("failed to get Items !");
	        }
	        
		});	
	}
	
	//Append Seller Item to the html
	function viewAllSellerItems(data){
		
		for(var i=0;i<data.length;i++){
			
				var item_details = data[i];
				var item = item_details.item[0];
				var item_images = item_details.item_images[0]; //TODO MULTIPLE IMAGES
				var variable_details = item_details.variable_details[0];
		
				var new_division = 
					" <div class='card' style='margin-left:50px; margin-right:50px;border-radius: 0 !important;' >" +
						"<div class='form-group row singleProduct dynamic' style='margin-top:20px;margin-left:10px;' id="+item.item_id+">";
					
				var all_images = "<div class ='form-group' style='margin-left:10px' id='allSmalImages'>";
				
				var j =0;
				for(j=0;j<item_images.length;j++){
					var item_image = item_images[j];
						
					all_images = all_images +
								"<div>" +
									"<img class='small_img small_image' src="+item_image.image_location+" style='margin-left: 30px;'></img>" +
								"</div>";
				}
				
				all_images = all_images + "</div>";
			
				new_division = new_division + all_images +
							"<div class ='form-group' id='my_form' style='margin-left:20px;'>"+
									//Big Image division
									"<div id='big_img_div'>"+
										"<img class='medium_img' src="+ item_images[j-1].image_location+" id='enlargedImage' style='margin-left: 30px;'></img>"+
									"</div>"+
									 //Buttons division	
							    "<div class='form-group' style='margin-left:60px'>"+
									"<div class='form-group row'  style='margin-top:20px;'>"+
										"<label style='margin-top:10px;margin-right:10px;font-weight:bold;'>Quantity</label>"+
										"<input type='number' class='form-control quantity_input' style='width:70px;' id='itemQuantityInput_"+ item.item_id +"' placeholder="+ item.quantity +" required>" +
										"<button type='button' class='btn btn-primary save_btn' id='saveQuantity_"+ item.item_id +"' style='margin-left:20px;'>SAVE</button>"+
										"<button type='button' class='btn btn-primary edit_btn' id='editQuantity_"+ item.item_id +"' style='margin-left:20px;'>EDIT</button>"+
									"</div>"+	
								"</div>"+
							"</div>";
							
							
				var label_division = "<!-- Details of the item -->"+
							"<div class='form-group' style='margin-left:100px'>"+
								"<div class='row'>"+
									"<label style='font-weight:bold;'> ID </label>"+
								"</div>"+
								"<div class='row'>"+
									"<label style='font-weight:bold;'>Name</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label style='font-weight:bold;'>Price</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label style='font-weight:bold;'>Discount</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label style='font-weight:bold;'>Category</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label style='font-weight:bold;'>Sub Category</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label style='font-weight:bold;'>Brand</label>"+
								"</div>";
										
				
							
				label_value_division = "<div class='form-group' style='margin-left:100px'>"+
								"<div class='row'>"+
									"<label>: "+ item.id +"</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label>: "+ item.name +"</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label>: "+ item.price + "</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label>: " + item.discount +"</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label>: " + item_details.category_name + "</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label>: " + item_details.subcategory_name + "</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label>: " + item.brand + "</label>"+
								"</div>";
				
				
				for(var j=0;j<variable_details.length;j++){
					
					label_division = label_division + 
						"<div class='row'>"+
							"<label style='font-weight:bold;'>" + variable_details[j].item_key+ "</label>"+
						"</div>";
					label_value_division = label_value_division +
						"<div class='row'>"+
							"<label '> : " + variable_details[j].item_value+ "</label>"+
						"</div>";		
				}
				
			label_division = label_division +
				"<div class='row'>"+
					"<label style='font-weight:bold;'>Description</label>"+
				"</div>"+
			"</div>";
			label_value_division = label_value_division +
				"<div class='row'>"+
					"<label>: "+ item.description +"</label>"+
				"</div>"+
			"</div>";
			 
			var div_end	= "</div>";
			  
			
			new_division = new_division + label_division + label_value_division + div_end + "</div>";
				
			$("#manageAllItems").append(new_division);
			$(".save_btn").hide();
			$("#itemQuantityInput_"+item.item_id).prop('disabled', true);
			
		}
	}
	
	
	//show enlarged image on hover of small image.
	$('body').on("mouseenter",".small_image",function(){
		var image = $(this).attr("src");
		var big_img = $(this).parent('div').parent('div').parent('div').children('.form-group')[1];
		$('img',big_img).attr("src",image);
	});
	
	
	// show the enlarged image of small image.
	$('body').on("click",".small_image",function(){
		var image = $(this).attr("src");
		var big_img = $(this).parent('div').parent('div').parent('div').children('.form-group')[1];
		$('img', big_img).attr('src', image);
	});
	
	// Onclick for Edit Quantity Button
	$("body").on("click",".edit_btn",function(){
		var item_div = $(this).parent('div').parent('div').parent('div').parent('div');
	    var item_id = item_div.attr('id');
	    $(this).hide();
	    $("#itemQuantityInput_"+item_id).prop('disabled',false);
	    $("#saveQuantity_"+item_id).show();
	});
	
	// On click save quantity button
	$("body").on("click",".save_btn",function(){
		var item_div = $(this).parent('div').parent('div').parent('div').parent('div');
	    var item_id = item_div.attr('id');
	    $(this).hide();
	    $("#itemQuantityInput_"+item_id).prop('disabled',true);
	    $("#editQuantity_"+item_id).show();
	    console.log($("#itemQuantityInput_"+item_id).val());
	    var quantity = $("#itemQuantityInput_"+item_id).val();
	    
	    if(quantity<0){
	    	alert("quantity should be greater than zero");
	    }
	    
	    else{
	    	updateQuantity(item_id,quantity);
	    }
	    
	 });
	
	function updateQuantity(item_id,quantity){
		
		var item = {
			
			"item_id" : item_id,
			"quantity" : quantity,	
			
		};
		
		$.ajax(
				{
				type : 'POST',
				contentType : 'application/json',
				url : "http://localhost:8080/flipkart/webapi/items/updateQuantity",
				data : JSON.stringify(item),
				success : function(response){
					if(response=="success")
						alert("Updated Quantity");
					else
					{
						alert("Couldnt Update Quantity");
					}
				},
				 error : function(data){
			        	alert("Couldnt Update Quantity !");
			     }
			});
	};
	
	/*
	// Onclick function for delete Item
	$('body').on("click","#deleteItem",function(){
		console.log("removed Parent");
	    var item_div = $(this).parent('div').parent('div').parent('div').parent('div');
	    var item_id = item_div.attr('id');
	    removeItem(item_id);
	    item_div.remove();
	});
	
	function removeItem(item_id){
		
		$.ajax({
			url: "http://localhost:8080/flipkart/webapi/items/delete/" + item_id,
			type:"POST",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data=="success")
	        	{
	        		location.reload();
	        	}
	        	
	        	else
	        		alert("failed to delete Item");
	        },
	        
	        error : function(data){
	        	alert("failed to delete Item !");
	        }
	        
		});
	};*/
	
	

// Seller Order Functions
	
	//Get all the Seller Orders
	function getSellerOrders(seller_id){
		
		$.ajax({
			url: "http://localhost:8080/flipkart/webapi/order/getSellerOrders/" + seller_id,
			type:"GET",
			cache:false,
			contentType:false,
			processData: false,
	        success :function(data){
	        	
	        	if(data)
	        	{
	        		viewAllOrders(data);
	        	}
	        	
	        	else
	        		alert("No orders to show!");
	        },
	        
	        error : function(data){
	        	alert("failed to get Orders !");
	        }
	        
		});
	};
	
	function viewAllOrders(orders){
		
		for(var i=0;i<orders.length;i++){
				
			var order_details = orders[i];
			
			var color = 'orange';
			
			if(order_details.status=='paymentdone'){
				order_details.status='paid';
			}
			
			else if(order_details.status=='payementsent' || order_details.status=='delivered'){
				order_details.status='amount recieved';
				color = 'green';
			}
			
			else if(order_details.status=='shipped'){
				color = 'green';
			}
			
			else if(order_details.status=='cancelled'){
				color = 'red';
			}
			
			var order_division = 
			"<div id='allOrders' class='card' style='margin-left:150px; margin-right:150px;margin-top:10px;border-radius: 0 !important;'>" +
			  "<div id="+ order_details.order_id +" style='border: 2px solid #eee'>"+
			    "<div style='border-bottom: 2px solid #eee'>"+
			      "<h4 id='order_id' class='col-form-label' style='font-size: 20px; margin-left: 40px;'>ORDER ID : "+ order_details.order_id +"</h4>"+
			    "</div>"+
				"<div class='form-group row'>" +				    
				  "<div style='padding: 5px; margin-left: 40px;'>"+
					 "<img id='sel_prod' src='"+ order_details.image_location +"' alt='Card image' style='width:150px;height:150px;float:left;'/>"+
				  "</div>"+  
				  "<div>"+
					"<div class='form-group' style='margin-left:40px'>"+
					  "<div><label id='prod_name' class='col-form-label' style='font-size: 20px;'>"+ order_details.item_name+"</label></div>"+
					  "<div><label id='prod_id' class='col-form-label' style='font-size: 12px; color: gray;'>Item Id : "+ order_details.item_id+"</label></div>"+
					  "<div><label id='prod_quantity' class='col-form-label' style='font-size: 12px; color: gray;'>Quantity : "+order_details.quantity+"</label></div>"+
					  "<div><label id='buyer_address' class='col-form-label' style='font-size: 12px; color: gray;'>Deliver To : "+order_details.buyer_name+","+order_details.buyer_address+"</label></div>"+
				    "</div>"+
		          "</div>"+
			  	 "<div>"+
					"<div class='form-group' style='margin-left:120px'>"+
					  "<div style='margin-top:50px'><label id='order_status' class='col-form-label' style='font-size: 15px;color:"+color+";'>Status : "+order_details.status+"</label></div>"+
					"</div>"+
		          "</div>";
			 
			 var buttons_division = "</div>"; 
			   
		     if(order_details.status=='paid'){
		    	 
		    	 buttons_division =
				        "<div>"+
							"<div class='form-group' style='margin-left:100px;margin-top:30px'>"+
							    "<div class='row' style='margin-top:5px;'>"+
							    	"<button type='button' class='btn btn-primary' id='shipOrder' style='width:100px'>Ship</button>"+
							    "</div>"+
							   "<div class='row' style='margin-top:5px;'>"+
									"<button type='button' class='btn btn-primary my_button_remove' id='cancelOrder' style='width:100px'>Cancel</button>"+
								"</div>"+
							"</div>"+
				          "</div>"+  	 
					   "</div>";
		     }

			
		     var ordered_date = order_details.order_date;
		     var order_date = ordered_date.split(" ")[0];
		     
		     var date = order_date.split("-");
		     order_date = date[2] + "-" +date[1] + "-"+date[0];	     
		     
		     var bottom_div =
				"<div style='border-top: 2px solid #eee'>"+	   
			      "<div class='form-inline' style='font-size: 16px; margin-left: 40px;'>"+
			           "<label class='col-form-label' style='color: gray;'>Ordered On </label>"+
				       "<label id='order_date' class='col-form-label' style='margin-left: 8px;'>"+order_date+"</label>"+
			           "<label class='col-form-label' style='margin-left: 570px; color: gray;'>Order Total</i></label>"+
				       "<label id='order_date' class='col-form-label' style='margin-left: 8px;'>Rs."+order_details.amount_paid+"</label>"+
				   "</div>"+
			   "</div>";
						  
			  order_division = order_division + buttons_division + bottom_div +"</div>";
		     
		     $('#viewOrders').append(order_division);
		}
	
	};
	
	
	// Mark the status shipped
	$('body').on("click",'#shipOrder',function(){
		var order_id = $(this).parent('div').parent('div').parent('div').parent('div').parent('div').attr('id');
		
		$.ajax({
			url: "http://localhost:8080/flipkart/webapi/order/shipOrder/" + order_id,
			type:"POST",
			cache:false,
			contentType:false,
			processData: false,
	        success :function(data){
	        	
	        	if(data=="success")
	        	{
	        		location.reload(); // Change the status
	        	}
	        	
	        	else
	        		alert("failed to get update Status");
	        },
	        
	        error : function(data){
	        	alert("failed to get update status !");
	        }
	        
		});
		
	});
	
	//Mark the status cancelled and transfer money to buyer
	$('body').on("click",'#cancelOrder',function(){
		var order_id = $(this).parent('div').parent('div').parent('div').parent('div').parent('div').attr('id');
		$.ajax({
			url: "http://localhost:8080/flipkart/webapi/order/cancelOrder/" + order_id,
			type:"POST",
			cache:false,
			contentType:false,
			processData: false,
	        success :function(data){
	        	
	        	if(data=="success")
	        	{
	        		location.reload();
	        	}
	        	
	        	else
	        		alert("failed to get update Status");
	        },
	        
	        error : function(data){
	        	alert("failed to get update status !");
	        }
	        
		});
	});
	
	
	
});
		