jQuery(document).ready(function($){
	
	// Check if seller is logged in and redirect the page accordingly
	
	var seller_data = checkCookie("seller_data");
	
	var seller_id=null;
	var seller_name="";
	
	//Used for add item page;
	var fixedAttribute = null;
	
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
	
	else if(nav_ref=="addItem"){		
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
			$(".dynamic-fixedattribute-option").remove();
			$(".dynamic-color-option").remove();
			return;
		}
		
		else{	
			$(".dynamic-sub-option").remove();
			$(".dynamic-brand-option").remove();
			$(".dynamic-fixedattribute-option").remove();
			$(".dynamic-color-option").remove();
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
	
	
	//get All Colors List from backend
	function getColorList(sub_category_id){
    	
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/category/getAllColorsForASubCategory/"+sub_category_id,
			type:"GET",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data){
	        		console.log(data);
	        		loadColors(data);
	        	}
	        	
	        	else
	        		alert("failed to get Colors");
	        },
	        
	        error : function(data){
	        	alert("failed to get Colors !");
	        }
	        
		});
	};
		
	//append the colors corresponding to the given sub-category.
	function loadColors(colors){	
		$.each(colors, function(index,color) {
		    $("#itemColor").append(
		        $("<option class='dynamic-color-option'></option>").val(color.color).html(color.color)
		    );
		});
	};
	
	$("body").on("change","#itemSubCategory",function(){
		
		var selected_subcategory = $("#itemSubCategory").val();
		if(selected_subcategory=="Choose SubCategory"){
			$(".dynamic-brand-option").remove();
			$(".dynamic-fixedattribute-option").remove();
			$(".dynamic-color-option").remove();
			return;
		}
		
		else{	
			$(".dynamic-brand-option").remove();
			$(".dynamic-fixedattribute-option").remove();
			$(".dynamic-color-option").remove();
			getBrandList(selected_subcategory);
			getFixedAttributeList(selected_subcategory);
			getColorList(selected_subcategory);
		}
	});
	
	// Show the FixedAttribute Dropdown in html
	function loadFixedAttributeDropDown(fixedAttributeList){
		fixedAttribute = fixedAttributeList[0].name;
		console.log("Fixed Attribute : " + fixedAttribute);
		var fixedAttributeDropDown = "<label for='fixedAttribute' class='col-sm-4 col-form-label dynamic-fixedattribute-option'>"+fixedAttribute+"</label>"
									+ "<div class='col-sm-8 dynamic-fixedattribute-option'>"
										+ "<select class='custom-select mr-sm-3' id='fixedAttribute'>"
											+ "<option selected>" + "Choose " + fixedAttribute + "</option>"
										+ "</select>"
									+ "</div>";
		
		$("#fixedSubCatAttribute").append(fixedAttributeDropDown);
		
		
		$.each(fixedAttributeList, function(index,attribute){
			$("#fixedAttribute").append(
		        $("<option class='dynamic-fixedatribute-option'></option>").val(attribute.value).html(attribute.value)
		    );
		});
		
	};
	
	//Get the fixed Attribute for a given subcategory
	function getFixedAttributeList(subcategory_id){
		
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/items/getFixedAttributeListBySubcatId/"+subcategory_id,
			type:"GET",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data){
	        		console.log(data);
	        		loadFixedAttributeDropDown(data);
	        	}
	        	
	        	else{
	        		console.log("No attribute Present");
	        		fixedAttribute = null;
	        	}
	        },
	        
	        error : function(data){
	        	alert("failed to get fixedAttributeList !");
	        }
	        
		});
		
		
		
	};
	
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
			
			var fixedAttribute_val = null;
			if(fixedAttribute){
				fixedAttribute_val = $("#fixedAttribute").val();
				if(fixedAttribute_val=="Choose " + fixedAttribute){
					fixedAttribute = null;
				}
			}
			
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
		    		"attribute1" : fixedAttribute,
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
		
		var fixedKeyValue = {};
		if(fixedAttribute){
			fixedKeyValue["item_key"] = fixedAttribute;
			fixedKeyValue["item_value"] = $("#fixedAttribute").val();
			fixedKeyValue["item_id"] = item_id;
			keyValuePairs.push(fixedKeyValue);
		}
		
		$("#itemDiscount").val()
		
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
		
		if($("#itemColor").val()=="Choose Color"){
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
								"<div class='form-group' style='margin-left:40px'>"+
									"<div class=form-group row' style='margin-top:10px;'>"+
										"<button type='button' class='btn btn-success active_deal_button' id='active_deals_"+ item.item_id +"' item_id="+ item.item_id +" data-toggle='modal' data-target='#ActiveDealsModal'>ACTIVE DEALS</button>"+
										"<button type='button' style='margin-left:20px;' class='btn btn-primary add_deal_button' id='active_deals_"+ item.item_id +"' item_id="+ item.item_id +" data-toggle='modal' data-target='#ExtraDealsModal'>ADD DEALS</button>"+
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
								"</div>"+
								"<div class='row'>"+
									"<label style='font-weight:bold;'>Color</label>"+
								"</div>";
										
				
							
				label_value_division = 
					"<div class='form-group' style='margin-left:100px'>"+
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
								"</div>"+
								"<div class='row'>"+
									"<label>: " + item.color + "</label>"+
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
			  
			
			new_division = new_division + label_division + label_value_division  + div_end + "</div>";
				
			$("#manageAllItems").append(new_division);
			$(".save_btn").hide();
			$("#itemQuantityInput_"+item.item_id).prop('disabled', true);
			
		}
	}
	
	//Modal for Active Deals
	$('body').on("click",".active_deal_button",function(){
		
		$('.dynamic-modal').remove();
		var item_id = $(this).attr('item_id');
		console.log("Item Id " + item_id);
		showActiveDealsModal(item_id);
	
	});
	
	function showActiveDealsModal(item_id){
		
		console.log("Entered Modal Function");
		
		var modal = 
			"<div class='modal fade dynamic-modal' id='ActiveDealsModal'>"+
				"<div class='modal-dialog modal-lg modal-dialog-centered'>"+
					"<div class='modal-content'>"+
						"<div class='modal-header'>"+
							"<h5 class='modal-title' style='color: black; font-weight: bold;'>ACTIVE DEALS FOR THE ITEM</h5>"+
							"<button type='button' class='close' data-dismiss='modal'>&times;</button>"+
						"</div>"+
						"<div class='modal-body' id='deals' align='center'>"+
							"<form class='form-group'>"+
								"<div class='form-group row' align='center' id='noActiveDeals'>"+
									"<label class='col-form-label col-lg-4' style='color: gray;'>No Deals Active For This Item</label>"+
								"</div>"+
							"</form>"+
						"</div>"+
						"<div class='modal-footer'>"+
							"<button id='close' type='button' class='col-lg-3 btn btn-danger btn-lg' data-dismiss='modal'>CLOSE</button>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>";
		
		$("#manageAllItems").append(modal);
		$("#ActiveDealsModal").show();		
		getActiveDealsOfItem(item_id);
	}
	
	// Modal for Active Modal
	function getActiveDealsOfItem(item_id){
		
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/deal/getDealsOfItem/"+item_id,
			type:"GET",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data){
	        		console.log(data);
	        		if(data.length==0){
	        			return;
	        		}
	        		$("#noActiveDeals").hide();
	        		
	        		for(var i=0;i<data.length;i++){
	        			var deal = data[i];
	        			var deal_div =
	        				"<div class='row' style='margin-left:20px;' id="+ "deal_" + deal.deal_id  +" >"+
	        						"<li> "+
			        					"<label style='color: green; font-weight: bold; margin-right: 5px;'>"+deal.name+" </label>"+
			        					"<label style='color: gray;'>"+deal.deal_discount+" % Off</label>"+
			        					"<button type='button' item_id="+ item_id + " deal_id="+deal.deal_id+" id='removeDeal' class='close' aria-label='Close'>"+
			        					  "<span aria-hidden='true'>&times;</span>"+
			        					"</button>"+
			        					"<div class='row' style='margin-left:40px'>"+
			        						"<label style='color: blue; margin-left:25px;'> - Valid till "+deal.validity+"</label>"+
			        					"</div>"+
			        				"</li>"+	
	        				"</div>";
	        			
	        			$("#deals").append(deal_div);
	        		}
	        	}
	        	else{
	        		alert("failed to get Colors");	
	        	}
	        },
	        
	        error : function(data){
	        	alert("failed to get Colors !");
	        }        
		});
	}
	
	$('body').on('click','#removeDeal',function(){
		
		var item_id = $(this).attr('item_id');
		var deal_id = $(this).attr('deal_id');
	
		console.log(item_id + " " + deal_id);
		
		dealItem = {
				"item_id" : item_id,
				"deal_id" : deal_id,
		};
		
		
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/deal/removeDealItem",
			type:"POST",
			data: JSON.stringify(dealItem),
			contentType: 'application/json',
			success : function(data){
	        	
	        	if(data=="success"){
	        		$("#deal_"+deal_id).remove();
	        	}
	        	else
	        		alert("failed to Delete Deal");
	        },
	        error : function(data){
	        	alert("failed to Delete Deals to Item!");
	        }
		});
	});
	
	//Modal for Add Deals
	$('body').on("click",".add_deal_button",function(){
		
		$('.dynamic-modal').remove();
		var item_id = $(this).attr('item_id');
		console.log("Item Id " + item_id);
		showAddDealsModal(item_id);
	
	});
	
	function showAddDealsModal(item_id){
		
		console.log("Entered Modal Function");
		
		var modal = 
			"<div class='modal fade dynamic-modal' id='ExtraDealsModal'>"+
				"<div class='modal-dialog modal-lg modal-dialog-centered'>"+
					"<div class='modal-content'>"+
						"<div class='modal-header'>"+
							"<h5 class='modal-title' style='color: black; font-weight: bold;'>ADD DEALS</h5>"+
							"<button type='button' class='close' data-dismiss='modal'>&times;</button>"+
						"</div>"+
						"<div class='modal-body' id='deals' align='center'>"+
							"<form class='form-group'>"+
								"<div class='form-group row' align='center' id='noNewDeals'>"+
									"<label class='col-form-label col-lg-4' style='color: gray;'>No Deals Present</label>"+
								"</div>"+
							"</form>"+
						"</div>"+
						"<div class='modal-footer'>"+
							"<button id='done' type='button' class='col-lg-3 btn btn-success btn-lg' data-dismiss='modal'>DONE</button>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>";
		
		$("#manageAllItems").append(modal);
		$("#ExtraDealsModal").show();		
		getExtraDealsOfItem(item_id);
	}
	
	$("body").on("click","#done",function(){
		
		var dealItems = [];
	    
		$("input[type='checkbox']:checked").each(function(){
	    	
	    	dealItem = {};
		    
	    	var item_id = $(this).attr('item_id');
	    	var deal_id = $(this).val();
	    	
	    	dealItem["item_id"]=item_id;
	    	dealItem["deal_id"]= deal_id;
	    	dealItems.push(dealItem);	
	    });
		
		if(dealItems.length>0){
			addItemToDeals(dealItems);
		}
		
	});
	
	function addItemToDeals(dealItems){
		
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/deal/addItemToDeals",
			type:"POST",
			data: JSON.stringify(dealItems),
			contentType: 'application/json',
			success : function(data){
	        	
	        	if(data=="success"){
	        		alert("Deals Added Successfully");
	        	}
	        	else
	        		alert("failed to add Some Deals to Item");
	        },
	        error : function(data){
	        	alert("failed to add Deals to Item!");
	        }       
		});	
	}
	
	// Modal for Add Deal Modal
	function getExtraDealsOfItem(item_id){
		
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/deal/getDealsNotAddedToItem/"+item_id,
			type:"GET",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data){
	        		console.log(data);
	        		if(data.length==0){
	        			return;
	        		}
	        		$("#noNewDeals").hide();
	        		
	        		for(var i=0;i<data.length;i++){
	        			var deal = data[i];
	        			var deal_div =
	        				"<div class='row' style='margin-left:20px;' id="+ "deal_" + deal.deal_id  +" >"+
	        							"<label style='color: green; font-weight: bold; margin-right:5px;'><input style='margin-right:5px' type='checkbox' name='add_deal_item' item_id="+ item_id +" value="+deal.deal_id +" >"+deal.name+"</label>"+ 
	        							"<label style='color: gray;'>"+deal.deal_discount+" % Off</label>"+
			        					"<div class='row' style='margin-left:40px'>"+
			        						"<label style='color: blue; margin-left:25px;'> - Valid till "+deal.date_ended+"</label>"+
			        					"</div>"+	
	        				"</div>";
	        			
	        			$("#deals").append(deal_div);
	        		}
	        	}
	        	else{
	        		alert("failed to get Colors");	
	        	}
	        },
	        
	        error : function(data){
	        	alert("failed to get Colors !");
	        }
	        
		});
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
		