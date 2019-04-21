jQuery(document).ready(function($){

	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null) {
	       return null;
	    }
	    return decodeURI(results[1]) || 0;
	}
	
	var allItems = null;
	var present_items = null;
	var subcat_id=null;
	getallitems();
	displaybrands();
	displaycolors();
    
    function getallitems(){
        subcat_id = $.urlParam("subcat_id");
            $.ajax({
			    url:"http://localhost:8080/flipkart/webapi/items/getAllItemsBySubcategoryId/"+subcat_id,
			    type:"POST",
			    cache:false,
			    contentType:false,
		    	processData: false,
		 	
				success: function(data) {
                
					if(data){
						allItems = data;
						var subcat_name =allItems.subcat_name;
		                var subcat = "<a class='_1KHd47' id="+subcat_id+" href='/flipkart/itemslist.html?subcat_id="+subcat_id+"'>"+subcat_name+"</a>"
		                $("#subcategory").append(subcat);
		                allItems = data.items[0];
		                present_items = data.items[0];
		                display(present_items);
		            }
					else{
						allItems=null;
					}
				}
            });
    };
    
    function displaybrands(){
    	subcat_id = $.urlParam("subcat_id");
    	console.log(subcat_id)
        $.ajax({
		    url:"http://localhost:8080/flipkart/webapi/category/getAllBrandsForASubCategory/"+subcat_id,
		    type:"GET",
		    cache:false,
		    contentType:false,
	    	processData: false,
	 	
			success: function(data){
	            console.log(data);
				if(data){
					var allBrands = data;
					console.log(allBrands)
	                for(var i=0;i<allBrands.length;i++){
	                	var brands = "<input type='checkbox' class='brands'  id="+allBrands[i].brand+">"+allBrands[i].brand+"<br>"	                	
	                	$("#brand_filter").append(brands);
	                }    
				}
				else{
				}
			}
        });
    };
    
    $("body").on('click',".brands",function(){
    	$('input[type="checkbox"]').not(this).prop('checked', false);
    	brand=$(this).attr('id');
    	console.log(brand)
    	var selected_brand_items=[];
    	for(var j=0; j<allItems.length; j++){
    		if(allItems[j].brand == brand){
    			//console.log("sdjvhdfkkdjv")
    			selected_brand_items.push(allItems[j]);
    		}
    	}
    	present_items = selected_brand_items;
    	console.log(selected_brand_items);
    	display(selected_brand_items);
    });
    
    function displaycolors(){
    	subcat_id = $.urlParam("subcat_id");
    	console.log(subcat_id)
        $.ajax({
		    url:"http://localhost:8080/flipkart/webapi/category/getAllColorsForASubCategory/"+subcat_id,
		    type:"GET",
		    cache:false,
		    contentType:"application/json",
	 	
			success: function(data) {
                console.log(data);
				if(data){
					data = data.substring(1,data.length-1);
					console.log(data);
					var allColors = data.split(', ');
					//var allColors = data;
					console.log(allColors)
	                for(var i=0;i<allColors.length;i++){
	                	var colors = "<input type='checkbox' class='colors'  id="+allColors[i]+">"+allColors[i]+"<br>"; 
	                	$("#color_filter").append(colors);
	                }
				}
				else{
					console.log("Colors are null");
				}
			}
        });
    };
     
    $("body").on('click',".colors",function(){
    	$('input[type="checkbox"]').not(this).prop('checked', false);
    	color=$(this).attr('id');
    	//console.log(color)
    	var selected_color_items=[];
    	for(var j=0; j<allItems.length; j++){
    		//console.log(allItems[j].color);
    		if(allItems[j].color == color){
    			//console.log("sdjvhdfkkdjv")
    			selected_color_items.push(allItems[j]);
    		}
    	}
    	present_items = selected_color_items;
    	console.log(selected_color_items);
    	display(selected_color_items);
    });
		
    
	function display(items_list){
		$(".dynamic-item").remove();
		//console.log("Display " + items_list);
		var allItems = items_list;
                for(var i=0;i<allItems.length;i++){
					var itemid = allItems[i].itemid;
					var item_name = allItems[i].name;
					var item_price = allItems[i].price;
					var item_brand = allItems[i].brand;
					var item_discount = allItems[i].discount;
					var item_image = allItems[i].image;
					var item_rating=allItems[i].rating;
					var item_ratingcount=allItems[i].rating_count;
                    var item_offerprice=Math.round((item_price-(((item_discount)/100)*item_price)));
                    
                    
                    var item = "<div id="+itemid+" style='width: 25%;padding:10px' class='dynamic-item'>"+
                                            "<div class='IIdQZO _1R0K0g _1SSAGr'>"+
                                                "<a class='_3dqZjq' target='_blank' ></a>"+
                                                    "<div>"+
                                                        "<div class='_3JlYXy' style='padding-top: 120%;'>"+
                                                            "<div class='_3ZJShS _31bMyl' style='padding-top: 120%;'>"+
                                                                "<img class='_3togXc' id="+item_image+" alt='' src="+item_image+">"+
                                                            "</div>"+
                                                        "</div>"+
                                                    "</div>"+
                                                    "<div class='_3gDSOa _2HqUcN _2RN9ef'>"+
                                                        "<div class='DsQ2eg'>"+
                                                            "<svg xmlns='http://www.w3.org/2000/svg' class='_2oLiqr' width='28' height='28' viewBox='0 0 20 16'><path d='M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z' fill='#2874F0' class='_35Y7Yo' stroke='#FFF' fill-rule='evenodd' opacity='.9'></path>"+
                                                            "</svg>"+
                                                        "</div>"+
                                                    "</div>"+
                                                    "<div class='_2DOcq6'></div>"+
                                                        "<div class='_2LFGJH' style='transform: translate3d(0px, 0px, 0px);'>"+    
                                                            "<div class='_2B_pmu' id="+item_brand+">"+item_brand+"</div>"+
                                                                "<a class='_2mylT6' id="+item_name+" target='_blank' href='SingleProduct.html?itemid="+itemid+"'>"+item_name+"</a>"+
                                                                    "<div><span class='fa fa-star' style='background-color:green;color:white;' id="+item_rating+">"+item_rating+"</span>"+"<span>"+" ("+item_ratingcount+")"+"</span></div>"+
                                                                    "<div class='_1uv9Cb'>"+
                                                                        "<div class='_1vC4OE' style=' margin-right:5px; font-size: 14px;' id="+item_offerprice+">Rs."+item_offerprice+"</div>"+
                                                                        "<del class='_1vC4OE' style=' margin-right:5px; font-size: 12px; color: gray;' id="+item_price+">Rs."+item_price+"</del>"+
                                                                        "<div class='_1vC4OE' style=' margin-right:5px; font-size: 14px; color: green;' id="+item_discount+">"+item_discount+"% off</div>"+
                                                                    "</div>"+
                                                                    "<div class='_3V_vUN'>"+
                                                                    "</div>"+
                                                        "</div>"+
                                        "</div>"+
                                    "</div>"
						 	$("#single_item").append(item);				   
            }         
	};

    $("#price_low_to_high").click(function(){
    	
    	$("#price_low_to_high").addClass("xufquN");
		$("#price_high_to_low").removeClass("xufquN");
		$("#newest_first").removeClass("xufquN");
		$("#popularity").removeClass("xufquN");
    	$(".dynamic-item").remove();
		if(present_items){
			present_items.sort(comparebyPrice_low_to_high);
			display(present_items);
		}	
	});
	
	$("#price_high_to_low").click(function(){
		$("#price_low_to_high").removeClass("xufquN");
		$("#price_high_to_low").addClass("xufquN");
		$("#newest_first").removeClass("xufquN");
		$("#popularity").removeClass("xufquN");
		$(".dynamic-item").remove();
		if(present_items){
			present_items.sort(comparebyPrice_high_to_low);
			display(present_items);
		}
	});
	
	$("#newest_first").click(function(){
		$("#price_low_to_high").removeClass("xufquN");
		$("#price_high_to_low").removeClass("xufquN");
		$("#newest_first").removeClass("xufquN");
		$("#popularity").addClass("xufquN");
		$(".dynamic-item").remove();
		if(present_items){
			present_items.sort(comparebyNewest_First);
			display(present_items);
		}
	});
	
	$("#popularity").click(function(){
		$("#price_low_to_high").removeClass("xufquN");
		$("#price_high_to_low").removeClass("xufquN");
		$("#newest_first").removeClass("xufquN");
		$("#popularity").addClass("xufquN");
		$(".dynamic-item").remove();
		if(present_items){
			present_items.sort(comparebyPopularity);
			display(present_items);
		}
	});
    
    function comparebyPrice_low_to_high(a,b){
    	console.log("------------------------")
    	if (Math.round((a.price-(((a.discount)/100)*a.price)))< Math.round((b.price-(((b.discount)/100)*b.price))))
            return -1;
        if (Math.round((a.price-(((a.discount)/100)*a.price)))> Math.round((b.price-(((b.discount)/100)*b.price))))
            return 1;
        return 0;
    };
    
    function comparebyPrice_high_to_low(a,b){
    	console.log("------------------------")
    	if (Math.round((b.price-(((b.discount)/100)*b.price)))< Math.round((a.price-(((a.discount)/100)*a.price))))
            return -1;
        if (Math.round((b.price-(((b.discount)/100)*b.price)))> Math.round((a.price-(((a.discount)/100)*a.price))))
            return 1;
        return 0;
    };
    
    function comparebyNewest_First(a,b){
    	
    	if (b.manufacture_date > a.manufacture_date)
            return -1;
        if (b.manufacture_date< a.manufacture_date)
            return 1;
        return 0;
    };
    
    function comparebyPopularity(a,b){
    	if (b.ratingcount> a.ratingcount)
            return -1;
        if (b.ratingcount< a.ratingcount)
            return 1;
        return 0;
    };
});