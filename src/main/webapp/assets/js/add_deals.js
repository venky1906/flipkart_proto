jQuery(document).ready(function($){
	$("#file-upload-image").hide();
});

function readURL(input) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    console.log(reader)
	    reader.onload = function(e) {
	      $('#file-upload-image').attr('src', e.target.result);
	      $("#file-upload-image").show();
	    };
	    reader.readAsDataURL(input.files[0]);
	  }
	  
	  function alertMessage(){
		  alert("Added Deal");
	  }
}
