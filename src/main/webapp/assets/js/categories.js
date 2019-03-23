var catname="Sports Equipment"
$(document).ready(function () {
/*
	var C1={name:"C1",category_id:"1"};
	var C2={name:"C2",category_id:"2"};
	var C3={name:"C3",category_id:"3"};
	var C4={name:"C4",category_id:"4"};
	var S1={name:"S1",subcategory_id:"1",category_id:"1"};
	var S2={name:"S2",subcategory_id:"2",category_id:"1"};
	var S3={name:"S3",subcategory_id:"3",category_id:"1"};
	var S4={name:"S4",subcategory_id:"4",category_id:"1"};
	var S5={name:"S1",subcategory_id:"5",category_id:"2"};
	var S6={name:"S2",subcategory_id:"6",category_id:"2"};
	var S7={name:"S3",subcategory_id:"7",category_id:"3"};
	var S8={name:"S4",subcategory_id:"8",category_id:"3"};



	var Table1=[C1,C2,C3,C4];
	var Table11=[S1,S2,S3,S4];
	var Table21=[S5,S6];
	var Table31=[S7,S8];
	
	displayCategoryList(Table1);
	displaySubcategoryList(Table11,"1");
	displaySubcategoryList(Table21,"2");
	displaySubcategoryList(Table31,"3");
*/
	getCategoryList();

/*
	function displayCategoryList(table){	//Adding Categories to html
		for (var i = 0; i < table.length; i++) {
			var addition="<li class='litem' id='L"+table[i].category_id+"'> <button class='catblock' id="+ table[i].category_id +" > "+table[i].name+" </li>"
			$("ul").append(addition);
		}
	}
*/
	
//	getCategoryList();

	function displayCategoryList(table){	//Adding Categories to html
		for (var i = 0; i < table.length; i++) {
			var addition="<li class='litem' id='LISTITEMCATEGORY"+table[i].category_id+"'> <button class='catblock' id='CATEGORY"+ table[i].category_id +"' > "+table[i].name+" </button></li>";
			$("#catul").append(addition);
		}
	}

	function displaySubcategoryList(table,cat_id){	//Adding Subcategories to html
		var ul="<div id='ULCATEGORY" +cat_id+" hidden'> <ul>";

		$("#LISTITEMCATEGORY"+cat_id).append(ul);

		for (var i = 0; i < table.length; i++) {
			url = "http://localhost:8080/flipkart/itemslist.html?subcat_id="+table[i].subcategory_id;
			var addition="<li class='litem' id='LISTITEMSUBCATEGORY"+table[i].subcategory_id+"'> <button  class='subcatblock'  id= '"+table[i].category_id+"_"+table[i].subcategory_id+"'> <a href="+url+" >"+table[i].name+"</a></button></li>";
//			alert(addition);
			$("#LISTITEMCATEGORY"+cat_id).append(addition);
		}
		$("#LISTITEMCATEGORY"+cat_id).append("</ul> </div>");

	}

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
		        		displayCategoryList(category_list);

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
	        		displaySubcategoryList(subcategory_list,cat_id);
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