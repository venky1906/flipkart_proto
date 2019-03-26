$(document).ready(function(){

	$("#idlogoutbutton").hide();
	$("#idprofilebutton").hide();

    getCategoryList();
/*
	$("#idlogoutbutton").hide();
	$("#idprofilebutton").hide();
	$("#idloginbutton").show();	
*/
/*
	var cook = JSON.parse(getCookie("buyer_data"));
*/	
/*
	var cook=document.cookie;


	if(cook == ""){
		$("#idprofilebutton").hide();
		$("#idloginbutton").show();	
	}
	else{
		$("#idloginbutton").hide();	
		$("#idprofilebutton").show();
	}

	var C1={name:"C1",category_id:"1"};
	var C2={name:"C2",category_id:"2"};
	var C3={name:"C3",category_id:"3"};
	var C4={name:"C4",category_id:"4"};
	var C5={name:"C5",category_id:"5"};
	var S1={name:"S1",subcategory_id:"1",category_id:"1"};
	var S2={name:"S2",subcategory_id:"2",category_id:"1"};
	var S3={name:"S3",subcategory_id:"3",category_id:"1"};
	var S4={name:"S4",subcategory_id:"4",category_id:"1"};
	var S5={name:"S5",subcategory_id:"5",category_id:"2"};
	var S6={name:"S6",subcategory_id:"6",category_id:"2"};
	var S7={name:"S7",subcategory_id:"7",category_id:"3"};
	var S8={name:"S8",subcategory_id:"8",category_id:"3"};



	var Table1=[C1,C2,C3,C4,C5];
	var Table11=[S1,S2,S3,S4];
	var Table21=[S5,S6];
	var Table31=[S7,S8];
*/
	//homeR2CategoryDisplay(Table1);
	//homeR2SubCategoryDisplay(Table11,"1");
	//homeR2SubCategoryDisplay(Table21,"2");
	//homeR2SubCategoryDisplay(Table31,"3");


	$(".classR2div").hover(function () {
		var id=$(this).attr("id");
//		alert(id);
		var cat_id=(id.split("."))[1];
//		alert(cat_id);
		var dropid="#idDIVCATEGORY"+cat_id;
		$(dropid).toggle();
	},function(){
		var id=$(this).attr("id");
//		alert(id);
		var cat_id=(id.split("."))[1];
//		alert(cat_id);
		var dropid="#idDIVCATEGORY"+cat_id;
		$(dropid).toggle();
	});

	/*$("#idprofilebutton").hover(function () {
		$("#idlogoutbutton").toggle();
		$("#idprofilebutton").toggle();

	},function(){
		$("#idlogoutbutton").toggle();
		$("#idprofilebutton").toggle();

	});*/


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
		}
		str+=" </div>";


		var parent_id="#idR2div_"+cat_id;

//		$(parent_id).append("<h1> HELOO</h1>");
//		alert(str);
		$(parent_id).append(str);

//		$(".classR2div").append(str);
	}



/*						//USING ONLY LIST ITEMS
	function homeR2CategoryDisplay(table){
		var N=table.length;
		if(N<=5){
			for(var i=0;i<N;i++){
				var addition="<li class='classR2li' id='idR2li."+table[i].category_id+"'> "+table[i].name+" </li>";
				$("#idR2ul").append(addition);
			}
		}
	}
*/
/*						//USING BUTTONS WITH LIST ITEMS
	function homeR2CategoryDisplay(table){
		var N=table.length;
		if(N<=5){
			for(var i=0;i<N;i++){
				var addition="<li display='inline'> <button class='classR2Button' id='idR2Button."+table[i].category_id+"'> "+table[i].name+" </button></li>";
				$("#idR2ul").append(addition);
			}
		}
	}
*/


/*
	function homeR2SubCategoryDisplay(table,cat_id){
		var str="<div id='ULCATEGORY" +cat_id+"'>";

		for (var i = 0; i < table.length; i++) {
			var addition=" <a class='classR2a' id='"+table[i].category_id+"."+table[i].subcategory_id+"'>"+table[i].name+"</a> ";
			str+=addition;
		}
		str+="</div>";


		$("#idR2li"+cat_id).append(str);		
	}
*/
/*

	function homeR2SubCategoryDisplay(table,cat_id){
		var str="<div id='ULCATEGORY" +cat_id+"'><ul>";

		for (var i = 0; i < table.length; i++) {
			var addition=" <li class='classR2a' id='"+table[i].category_id+"."+table[i].subcategory_id+"'>"+table[i].name+"</li> ";
			str+=addition;
		}
		str+="</ul></div>";

		alert(str);

		$("#idR2li"+cat_id).append(str);		
	}

*/
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
//		        		displayCategoryList(category_list);
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
//	        		displaySubcategoryList(subcategory_list,cat_id);
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