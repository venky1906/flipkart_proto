jQuery(document).ready(function($){
    
    getCategoryList("#itemCategory");
    getCategoryList("#itemExistsCategory");
    getCategoryList("#itemCategoryBrand");

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
    		var subcategoryname = $("#subcategoryname").val()
		    addsubCategory(selected_category,subcategoryname);
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
			getSubCategoryList(selected_category); 
			$("#itemSubCategory").prop("disabled",false);
		}
	});
	
	function loadSubCategory(sub_categories){
		
		$.each(sub_categories, function(index,sub_category) {
		    $("#itemSubCategory").append(
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

});