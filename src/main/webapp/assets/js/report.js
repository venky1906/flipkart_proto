$(document).ready(function () {
//	alert("Hi");
	
//	fromBackend();
	function addItemToList(str){
		$("#idtable").append(str);
	}

	function Adder(processedItemList,subcatMapCat){
//		alert(processedItemList.length);
		var s="<tr><th>S.No</th><th>Item id</th><th>Category Id</th><th>Sub category Id</th><th id="+'idimagecoloumn'+">Item Image</th></tr>";
		addItemToList(s);
		for (var i = 0; i < processedItemList.length; i++) {
			var itemid=processedItemList[i].itemid;
			var subcategory_id=processedItemList[i].subcategory_id;
			var image_location=processedItemList[i].image;
			console.log(image_location);
			var category_id=subcatMapCat[subcategory_id];
			str="<tr> <td>"+(i+1)+"</td><td>"+itemid+"</td><td>"+category_id+"</td><td>"+subcategory_id+"</td><td><img src="+image_location+"></td></tr>";
			addItemToList(str);
		}
	}

	function Adder2(processedItemList){
		alert(processedItemList.length);
		for (var i = 0; i < processedItemList.length; i++) {
			var itemid=processedItemList[i].itemid;
//			var subcategory_id=processedItemList[i].subcategory_id;
			var image_location=processedItemList[i].image;
			console.log(image_location);
//			var category_id=subcatMapCat[subcategory_id];
			str="<tr> <td>"+(i+1)+"</td><td>"+itemid+"</td><td>None</td><td>None</td><td><img src="+image_location+"></td></tr>";
			alert(str);
			$("#idtable").append(str);
		}
	}

	
	function fromBackend() {
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/items/getReport",
			type:"POST",
			cache:false,
			contentType:false,
		    processData: false,

		    success : function (data) {
		    	if(data){
//		    		alert(data[0]);
//		    		alert(data[1]);
//		    		alert(data[0].length);
//		    		alert(data[1].length);
		    		Adder(data[0],data[1]);
//		    		Adder(data);
//		    		alert(data.first);
//		    		alert(data.second);
//		    		Adder(data.first,data.second);
		    	}
		    	else{
		    		alert("failed to get all items");
		    	}
		    }

		});
	}


	$("#submit_btn").click(function(){
		$("#idtable").empty();
		render_data();
	});
	
	function render_data(){
		price_range = {
			"min_price" : $('#idminprice').val(),
			"max_price" : $('#idmaxprice').val()
		}
		
		url_api = "getByPrice";
//		alert(price_range);
//		alert(url_api);
		get_list(price_range,url_api);
	}
	
	function get_list(price_range,url_api){
//		alert(price_range);
//		alert(url_api);
		$.ajax({
			url:"http://localhost:8080/flipkart/webapi/items/"+url_api,
			data: JSON.stringify(price_range),
//			url:"http://localhost:8080/flipkart/webapi/items/getByPrice",
//			url:"http://localhost:8080/flipkart/webapi/items/getReport",
			type:"POST",
			dataType: "json",
			contentType: "application/json",
		    success : function (data) {
		    	if(data){
//		    		alert(data);
//		    		alert(data[0]);
//		    		alert(data[1]);
//		    		alert(data[0].length);
//		    		alert(data[1].length);
		    		Adder(data[0],data[1]);
//		    		Adder(data);
//		    		alert(data.first);
//		    		alert(data.second);
//		    		Adder(data.first,data.second);
		    	}
		    	else{
		    		alert("failed to get all items");
		    	}
		    }
		});
	}	
});
