jQuery(document).ready(function($){
	
	var image_count = 0;
	
	var seller_data = JSON.parse(getCookie("seller_data"));
	
	console.log(seller_data.id);
	var seller_id;
	
	if(seller_data=="" || seller_data==null){
			seller_id = null;
	}
	
	else{
		seller_id = seller_data.id;
	}
	
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
	
	if(nav_ref=="home"){
		
		active_page = "#manageAllItems";
		active_button = "#home";
		getAllSellerItems(seller_id);
	}
	
	else if(nav_ref=="orders"){
		
		active_page = "#viewOrders";
		active_button = "#orders";
		$("#viewOrders").load("UnderConstruction.html");
	}
	
	else if(nav_ref=="profile"){
		
		active_page = "#viewProfile";
		active_button = "#profile";
		$("#viewProfile").load("UnderConstruction.html");
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

	$(active_button).addClass("nav-item-active");
		
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
	
	
	$("body").on("change","#itemCategory",function(){
		
		var selected_category = $("#itemCategory").val();
		if(selected_category=="Choose Category"){
			$("#itemSubCategory").prop("disabled",true);
			$(".dynamic-sub-option").remove();
			return;
		}
		
		else{	
			$(".dynamic-sub-option").remove();
			getSubCategoryList(selected_category); 
			$("#itemSubCategory").prop("disabled",false);
		}
	});
	
	
	function loadCategory(category_list){
		
		$.each(category_list, function(index,category) {
			$("#itemCategory").append(
		        $("<option class='dynamic dynamic-option'></option>").val(category.category_id).html(category.name)
		    );
		});	
	};
	
	function loadSubCategory(sub_categories){
		
		$.each(sub_categories, function(index,sub_category) {
		    $("#itemSubCategory").append(
		        $("<option class='dynamic dynamic-sub-option'></option>").val(sub_category.subcategory_id).html(sub_category.name)
		    );
		});
	};
	
	
	$("body").on("click","#addImageButton",function(event){
		$("#uploadImage").click();
	});
	
	$("body").on("change","#uploadImage",function(){
		
		if(this.files && this.files[0]){
			
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
			reader.readAsDataURL(this.files[0]);
		}
	});
	
	$('body').on("click","#removeBtn",function(){
		console.log("removed Parent");
	    $(this).parent('div').remove();
	});
	
	$("body").on("click","#addKeyValue",function(){
		
			var new_division = "<div id='keyValuePair' class='row dynamic' style='padding-bottom:5px'>" +
									"<div id='keyDiv'>" +
										"<input type='text' class='form-control' id='key' placeholder='KEY' style='width:150px'>" +
									"</div>" +
									"<div style='margin-left:15px' id='valDiv'>" +
										"<input type='text' class='form-control' id='value' placeholder='VALUE' style='width:150px'>"+
									"</div>"+
									"<button type='button' id='removeBtn' class='remove-btn' >X</button>"+
								"</div>";
			
			$("#keyValuePairs").append(new_division);
	});
	
	
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
	
	$("body").on("click","#submitItem",function(){
		
		if(validate_add_item_form()){
			
			
			var file = $('input[type="file"]').get(0).files[0];
			var formData = new FormData();
		    formData.append("image",file);
		    
		    var itemObject = {
		    		
		    		name : $('#itemName').val(),
		    		subcategory_id :$("#itemSubCategory").val(),
		    		quantity : $("#itemQuantity").val(),
		    		price : $('#itemPrice').val(),
		    		brand : $('#itemBrand').val(),
		    		description : $('#itemDescription').val(),
		    		manufacture_date : $('#itemManufactureDate').val(),
		    		color : $('#itemColor').val(),
		    		addeddate : "NOW()",
		    		pic_location : "",
		    		discount : $("#itemDiscount").val(),
		    		seller_id : seller_id,
		    };
		    		    
		    formData.append("item",JSON.stringify(itemObject));
		 
		    var keyValuePairs = [];
		    
		    $("div[id=keyValuePair]").each(function(){
		    	
		    	keyValuePair = {};
			    
		    	var key = $(this).children("#keyDiv").children("#key").val();
		    	var value = $(this).children("#valDiv").children("#value").val();
		    	
		    	keyValuePair["key"]=key;
		    	keyValuePair["value"]= value;
		    	
		    	keyValuePairs.push(keyValuePair);
		    	
		    });
		    
		    console.log($("#itemCategory").val());
		    formData.append("keyValuePairs",JSON.stringify(keyValuePairs));
		    
		    
			$.ajax({
				url:"http://localhost:8080/flipkart/webapi/seller/addItem",
				type:"POST",
				data: formData,
				cache:false,
				contentType:false,
				processData: false,
		        success : function(data){
		        	
		        	if(data=="success")
		        	{
		        		// Added Successfully
		        		alert("Added Successfully. Redirecting to Home Page");
		        		window.location = "SellerPage.html?nav_ref=home";
		        	}
		        	else
		        		alert("failed to add Item");
		        },
		        error : function(data){
		        	alert("failed to add Item!");
		        }
		        
			});
		}
	
	});
	
	function validate_add_item_form(){
		return true;
		//TODO
	}
	
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
	
	function viewAllSellerItems(data){
		
		for(var i=0;i<data.length;i++){
			
				var item_details = data[i];
				var item = item_details.item[0];
				var item_images = item_details.item_images[0][0]; //TODO MULTIPLE IMAGES
				var variable_details = item_details.variable_details[0];
		
				var new_division = 
					"<div class='form-group row singleProduct dynamic' style='margin-top:20px;margin-left:150px' id="+item.item_id+">" +
							"<!-- Image Pagination -->"+
								"<div class ='form-group' style='margin-left:30px;margin-top:20px'>"+
									"<div>"+
										"<img class='medium_img' src="+ item_images.image_location+" style='margin-left: 30px;'></img>"+
									"</div>"+
							"</div>"+
							"<!-- Details of the item -->"+
							
							"<div class='form-group' style='margin-left:100px'>"+
								"<div class='row'>"+
									"<label> Name : "+ item.name +"</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label > Price : "+ item.price + "</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label> Quantity :"+ item.quantity +"</label>"+
								"</div>"+	
								"<div class='row'>"+
									"<label>Discount :" + item.discount +"</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label>Description :"+ item.description +"</label>"+
								"</div>"+
								"<div class='row'>"+
									"<label>Sub Category :" + item_details.subcategory_name + "</label>"+
								"</div>";
				
				
				for(var j=0;j<variable_details.length;j++){
					
					new_division = new_division +
					
					"<div class='row'>"+
						"<label>" + variable_details[j].item_key + " : " + variable_details[j].item_value + "</label>"+
					"</div>";	
				}				
								
			 var div_end	= "</div>";
				        //Buttons division
			 var button_division = "<div class='form-group' style='margin-left:100px'>"+
							"<div class='form-group row'  style='padding-top:80%'>"+
								"<button type='button' class='btn btn-primary my_button_remove' id='deleteItem'>DELETE</button>"+
							"</div>"+
							"<div class='form-group row' style='padding-top:10%' align='center'>"+
								"<button type='button' class='btn btn-primary my_button' id='editItem'>EDIT</button>"+
							"</div>"+
						"</div>"+	
					"</div>";
			
			new_division = new_division + div_end + button_division;
				
			$("#manageAllItems").append(new_division);
		}
	}
	
	$('body').on("click","#deleteItem",function(){
		console.log("removed Parent");
	    var item_div = $(this).parent('div').parent('div').parent('div');
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
	};
	
	$("body").on("click","#editItem",function(){
		window.location = "UnderConstruction.html";
	});
	
});
		