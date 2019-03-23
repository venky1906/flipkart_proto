jQuery(document).ready(function($){

	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null) {
	       return null;
	    }
	    return decodeURI(results[1]) || 0;
	}
	getallitems();
    
    function getallitems(){
        var subcat_id = $.urlParam("subcat_id");
        //var subcat_id=1;
        console.log(subcat_id);
            $.ajax({
			    url:"http://localhost:8080/flipkart/webapi/items/getAllItemsBySubcategoryId/"+subcat_id,
			    type:"POST",
			    cache:false,
			    contentType:false,
		    	processData: false,
		 	
				success: function(data) {
                    console.log(data);
				if(data){
					console.log(data);
                    //var itemslist = data.items;
                    var subcat_name =data[0].subcat_name;
					for(var i=1;i<data.length;i++){
						var itemid = data[i].itemid;
						var item_name = data[i].name;
						var item_price = data[i].price;
						var item_brand = data[i].brand;
						var item_discount = data[i].discount;
						var item_image = data[i].image;
                        var item_offerprice=(item_price-(((item_discount)/item_price)*100));
                        console.log(data[i].discount);            
                        var item = //"<div class='bhgxx2 col-12-12'>"+
                                     //   "<div class='_3O0U0u _288RSE'>"+
                                            "<div id="+itemid+" style='width: 25%;'>"+
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
                                                                        "<div class='_3AqcXr'>"+
                                                                        "</div>"+
                                                                        "<div class='_1uv9Cb'>"+
                                                                            "<div class='_1vC4OE' style=' margin-right:5px;' id="+item_offerprice+">Rs."+item_offerprice+"</div>"+
                                                                            "<del class='_1vC4OE' style=' margin-right:5px;' id="+item_price+">Rs."+item_price+"</del>"+
                                                                            "<div class='_1vC4OE' style=' margin-right:5px;' id="+item_discount+">"+item_discount+"% off</div>"+
                                                                        "</div>"+
                                                                        "<div class='_3V_vUN'>"+
                                                                        "</div>"+
                                                            "</div>"+
                                            "</div>"+
                                        "</div>" 
                                    //"</div>"+
                                //"</div>" 
							 	$("#single_item").append(item);				   
                }
            }
            }
        });
    };


});
