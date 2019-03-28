jQuery(document).ready(function($){
    
    getCategoryList("#itemCategory");
    getCategoryList("#itemExistsCategory");

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

});