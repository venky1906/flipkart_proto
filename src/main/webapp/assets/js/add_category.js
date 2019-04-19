jQuery(document).ready(function($){
    
    getCategoryList("#itemCategory");
    getCategoryList("#itemExistsCategory");
    getCategoryList("#itemCategoryBrand");
    getCategoryList("#itemCategoryFixedAttribute");

    $.ajax({
            url: "http://localhost:8080/flipkart/webapi/payment/getflipkartbalance",
            type: "GET",
            success: function(data) {
                    var balance=data;
                    console.log(data);
                    $("#flipkartbalance").val(balance);
			    },

    });

    
    $('#AddC').click( function() {
    var category = {
    		
        name : $("#categoryname").val(),

    };

    console.log($("#categoryname").val());
        
    $.ajax({
        url: "http://localhost:8080/flipkart/webapi/category/addCategory",
        data: JSON.stringify(category),
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
    
    
    $('#AddS').click( function() {
    		var selected_category = $("#itemCategory").val();
    		var subcategoryname = $("#subcategoryname").val();
		    addsubCategory(selected_category,subcategoryname);
     });
    
    //
    $("#AddF").click(function(){
		var subcategory_id = $("#itemSubCategoryFixedAttribute").val();
		var attribute = $("#addFixedAttribute").val();
		var value = $("#fixedAttributeValue").val();
		console.log("Name " + attribute);
		addFixedAttribute(subcategory_id,attribute,value);
    });
    
    $('#AddB').click( function() {
    	var selected_category = $("#itemCategoryBrand").val();
		var selected_subcategory = $("#itemSubCategory").val();
		var brandname = $("#brandname").val()
	    addBrand(selected_category,selected_subcategory,brandname);
    });

     $('#editbalance').click( function() {
    	$("#flipkartbalance").prop('disabled', false);
    	$('#editbalance').text("Save");
    	$('#editbalance').click(function(){
    		$("#flipkartbalance").prop('disabled', true);
    		$('#editbalance').text("Edit Balance");
    
            var update = {
                
                accountno:334455667788,
                balance : $("#flipkartbalance").val(),
            };

        console.log($("#flipkartbalance").val());
            
        $.ajax({
            url: "http://localhost:8080/flipkart/webapi/payment/editflipkartbalance",
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
    
       
    function loadCategory(category_list,cat_list_id){
		
		$.each(category_list, function(index,category) {
			$(cat_list_id).append(
		        $("<option class='dynamic dynamic-option'></option>").val(category.category_id).html(category.name)
            );
		});	
	};
	
	$("body").on("change","#itemCategoryBrand",function(){
		
		var selected_category = $("#itemCategoryBrand").val();
		if(selected_category=="Choose Category"){
		//	$("#itemSubCategory").prop("disabled",true);
			$(".dynamic-sub-option").remove();
			$(".dynamic-brand-option").remove();
			return;
		}
		else{
			$(".dynamic-sub-option").remove();
			$(".dynamic-brand-option").remove();
			getSubCategoryList(selected_category,"#itemSubCategory"); 
			$("#itemSubCategory").prop("disabled",false);
		}
	});
	
	$("body").on("change","#itemCategoryFixedAttribute",function(){
		
		var selected_category = $("#itemCategoryFixedAttribute").val();
		if(selected_category=="Choose Category"){
			$(".dynamic-sub-option").remove();
			return;
		}
		else{
			$(".dynamic-sub-option").remove();
			getSubCategoryList(selected_category,"#itemSubCategoryFixedAttribute"); 
		}
	});
	
	$("body").on("change","#itemSubCategoryFixedAttribute",function(){	
		var selected_subcategory = $("#itemSubCategoryFixedAttribute").val();
		$("#addFixedAttribute").prop("disabled",false);
		if(selected_subcategory=="Choose SubCategory"){
			$("#addFixedAttribute").val("");
			$("#fixedAttributeValue").val("");
		}
		else{
			$("#addFixedAttribute").val("");
			$("#fixedAttributeValue").val("");
			getFixedAttributeList(selected_subcategory);
		}
	});

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
	        		var fixedAttribute = data[0].name;
	        		console.log(fixedAttribute);
	        		$("#addFixedAttribute").val(fixedAttribute);
	        		$("#addFixedAttribute").prop("disabled", true);
	        	}
	        	
	        	else{
	        		console.log("No attribute Present");
	        	}
	        },
	        
	        error : function(data){
	        	alert("failed to get fixedAttributeList !");
	        } 
		});
	};
	
	
	function loadSubCategory(sub_categories,dropdown_id){
		
		$.each(sub_categories, function(index,sub_category) {
		    $(dropdown_id).append(
		        $("<option class='dynamic-sub-option'></option>").val(sub_category.subcategory_id).html(sub_category.name)
		    );
		});
	};

    function getCategoryList(cat_list_id){    	
			$.ajax({
				url:"http://localhost:8080/flipkart/webapi/category/getAllCategoryList",
				type:"GET",
				cache:false,
				contentType:false,
				processData: false,
		        success : function(data){
		        	
		        	if(data){
		        		console.log(data)
                        category_list =  data;
		        		loadCategory(data,cat_list_id);
		        	}
		        	
		        	else
		        		alert("failed to get Categories");
		        },
		        
		        error : function(data){
		        	alert("failed to get Categories !");
		        }
		        
			});
    };
    
 // get subcategory list from backend
	function getSubCategoryList(category,dropdown_id){
		
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/category/getSubCategoryList/"+category,
			type:"POST",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data)
	        	{
	        		loadSubCategory(data,dropdown_id);
	        	}
	        	
	        	else
	        		alert("failed to get Sub Categories");
	        },
	        
	        error : function(data){
	        	alert("failed to get Sub Categories !");
	        }
	        
		});
	};
    
    function addsubCategory(categoryid, subcategoryname){
        var subcategory={
            category_id: categoryid,
            name: subcategoryname,
        };
        $.ajax({
        url: "http://localhost:8080/flipkart/webapi/category/addsubCategory",
        data: JSON.stringify(subcategory),
        type: "POST",
        contentType:'application/json',
        success: function(data) {
        	
				if(data=="success"){
				    alert("Added Successfully");
				   }
				else	{
					alert("Error");
				}
			},

    	});
    };
    
    function addBrand(categoryid,subcategoryid, brandname){
        var brand={
            subcategory_id:subcategoryid,
            brand: brandname,
        };
        $.ajax({
        url: "http://localhost:8080/flipkart/webapi/category/addBrand",
        data: JSON.stringify(brand),
        type: "POST",
        contentType:'application/json',
        success: function(data) {
        	
				if(data=="success"){
				    alert("Added Successfully");
				   }
				else	{
					alert("Error");
				}
			},

    	});
    };
    
    function addFixedAttribute(subcategoryid,fixedAttributeName,value){
        
    	var attribute={
            subcategory_id:subcategoryid,
            name : fixedAttributeName,
            value : value,
        };
        
        $.ajax({
        url: "http://localhost:8080/flipkart/webapi/items/addFixedAttributeForSubCategory",
        data: JSON.stringify(attribute),
        type: "POST",
        contentType:'application/json',
        success: function(data) {
        	
				if(data=="success"){
				    alert("Added Successfully");
				   }
				else{
					alert("Value Already Exists");
				}
			},

    	});
    };
    
    

});