$(document).ready(function(){

	$("#idlogoutbutton").hide();
	$("#idprofilebutton").hide();

    getCategoryList();

	$(".classR2div").hover(function () {
		var id=$(this).attr("id");
		var cat_id=(id.split("."))[1];
		var dropid="#idDIVCATEGORY"+cat_id;
		$(dropid).toggle();
	},function(){
		var id=$(this).attr("id");
		var cat_id=(id.split("."))[1];
		var dropid="#idDIVCATEGORY"+cat_id;
		$(dropid).toggle();
	});

	$(".classR2aDIVCATEGORY").click(function () {
		var a=$(this).attr("id");
		var b=a.split(".")[2];
		var link="UnderConstruction.html?"+b;
		window.location=link;

	});


	function homeR2CategoryDisplay(table){
		var N=table.length;
		if(N>5){
			N=5;
		}
		var str="";
		for(var i=0;i<N;i++){
			var addition=" <div class='classR2div' id='idR2div_"+table[i].category_id+"'style='font-size:7px !important ;'><a class='classR2a'>"+table[i].name+"</a></div> ";
			str+=addition;
		}

		var x="<div class='classR2div' style='font-size: 7px;' id='idmorebutton'><a class='classR2a'>More</a></div>"
		str+=x;
		$("#idR2divMain").append(str);

	}
    
    function homeR2SubCategoryDisplay(table,cat_id){
		var str="<div  class='classDIVCATEGORY' id='idDIVCATEGORY" +cat_id+"'>";
        
		for (var i = 0; i < table.length; i++) {
            url = "http://localhost:8080/flipkart/itemslist.html?subcat_id="+table[i].subcategory_id;
			var addition=" <a class='classR2aDIVCATEGORY' id='idDIVCATEGORY."+table[i].category_id+"."+table[i].subcategory_id+"'href = "+url+" style='font-size:12px !important ;'>"+table[i].name+"</a> ";
			str+=addition;
			getallitems(table[i].subcategory_id);
		}
		str+=" </div>";


		var parent_id="#idR2div_"+cat_id;
		$(parent_id).append(str);
	}

	function appendList(data,subcategory_id){
		var subcat_name =data[0].subcat_name;
		var subcatid=subcategory_id;
		var N=data.length;
		if(N>13){
			N=13;
		}

		var S={subcategory_id:subcatid, N:N-1};
		
		var str="";
		var width=$(window).width();
		str+='<div align ="left" class="_1GRhLX _3JslKL"> <div class="_1dPkhG"> <div> <h2 class="puxlXr"><strong>'+subcat_name+'</strong> </h2> <div class="_2Umlwf"> <a class="_2AkmmA _1eFTEo" href="http://localhost:8080/flipkart/itemslist.html?subcat_id='+subcatid+'">view all</a> </div> </div> </div> <div class="_2QUpwp required-tracking"><div class="_3BEcOp"><div class="EstLIe" ><div id="idList_'+subcatid+'" class="_2NTrR2" style="transform: translateX(0px);" >'	//'+(width-(N-1)*195)+'

		for(var i=1;i<N;i++){
			var itemid = data[i].itemid;
			var item_name = data[i].name;
			var item_price = data[i].price;
			var item_brand = data[i].brand;
			var item_discount = data[i].discount;
			var item_image = data[i].image;
			var item_offerprice=(item_price-(((item_discount)/100.0)*item_price));
			console.log(data[i].discount);
			var listitem = '<div class="_2kSfQ4" > <div> <a class="K6IBc-" href="SingleProduct.html?itemid='+itemid+'" > <div class="_2PX1l4"> <div class="_3BTv9X">  <img class="_1Nyybr  _30XEf0" alt="'+item_name+'" src="'+item_image+'"> </div> <div class="iUmrbN" id="sitemname1">'+item_name+'</div> <div class="BXlZdc">₹ '+item_offerprice+'</div> <div class="_3o3r66">'+item_brand+'</div><div class="_3e_Ruh"></div></div></a></div> </div> ';
			str+=listitem;
		}
		str+='</div></div><div id="idleft_'+subcatid+'" class="_2AEDbQ _1WxWr5 _3H3Phk"><svg width="14.6" height="24" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" class=""><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#fff" class="_32EAsf"></path></svg></div><div id="idright_'+subcatid+'" class="_2AEDbQ _1V02gy"><svg width="14.6" height="24" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" class="Hfq2pU"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#fff" class="_32EAsf"></path></svg></div></div></div></div>';

		$("body").append(str);
	}

	$("body").on("click",'div[id^="idleft_"]',function () {
		var id=$(this).attr("id");
		var num=id.split("_")[1];
		$("#idleft_"+num).removeClass("_2AEDbQ _1WxWr5").addClass("_2AEDbQ _1WxWr5 _3H3Phk");
		$("#idright_"+num).removeClass("_2AEDbQ _1V02gy _3H3Phk").addClass("_2AEDbQ _1V02gy");
		$("#idList_"+num).attr("style","transform: translateX(0px);");
	});

	$("body").on("click",'div[id^="idright_"]',function () {
		var id=$(this).attr("id");
		var num=id.split("_")[1];
		$("#idright_"+num).removeClass("_2AEDbQ _1V02gy").addClass("_2AEDbQ _1V02gy _3H3Phk");
		$("#idleft_"+num).removeClass("_2AEDbQ _1WxWr5 _3H3Phk").addClass("_2AEDbQ _1WxWr5");
		var width=$(window).width();
		$("#idList_"+num).attr("style","transform: translateX("+(width-2340)+"px);");
	});

	function getallitems(subcatid){
        console.log(subcatid);
            $.ajax({
			    url:"http://localhost:8080/flipkart/webapi/items/getItemsBySubcategoryId/"+subcatid,
			    type:"POST",
			    cache:false,
			    contentType:false,
		    	processData: false,
		 	
				success: function(data) {
                    console.log(data);
				if(data){
					console.log(data);
					appendList(data,subcatid);
	            }
            }
        });
    };

    $("#idmorebutton").click(function () {
		link="Home.html";
		window.location=link;
	})

	function getCategoryList(){
    	
			$.ajax({
				url:"http://localhost:8080/flipkart/webapi/category/getAllCategoryList",
				type:"GET",
				cache:false,
				contentType:false,
				processData: false,
		        success : function(data){
		        	
		        	if(data){
		        		category_list =  data;
                        homeR2CategoryDisplay(category_list);

		        		for (var i = 0; i < category_list.length; i++) {
		        			getSubCategoryList(category_list[i].category_id);
		        		}

		        	}
		        	
		        	else
		        		alert("failed to get Categories");
		        },
		        
		        error : function(data){
		        	alert("failed to get Categories !");
		        }
		        
			});
	};

	function getSubCategoryList(cat_id){
		
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/category/getSubCategoryList/"+cat_id,
			type:"POST",
			cache:false,
			contentType:false,
			processData: false,
	        success : function(data){
	        	
	        	if(data)
	        	{
	        		subcategory_list =  data;
                    homeR2SubCategoryDisplay(subcategory_list,cat_id);
                }
	        	
	        	else
	        		alert("failed to get Sub Categories");
	        },
	        
	        error : function(data){
	        	alert("failed to get Sub Categories !");
	        }
	        
		});
	};
});