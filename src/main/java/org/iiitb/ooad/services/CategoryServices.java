package org.iiitb.ooad.services;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.iiitb.ooad.model.*;
import org.iiitb.ooad.dao.*;

import org.json.JSONObject;
import org.json.JSONArray;

@SuppressWarnings("unused")
@Path("/category")
public class CategoryServices {
	
	// API to get all the Categories.
	@GET
	@Path("/getAllCategoryList")
	@Produces("application/json")
	public List<Category> getCategories(){
		
		CategoryDAO dao = new CategoryDAO();
		List<Category> categories = dao.getCategories();
		return categories;

	}
	
	@POST
	@Path("/getSubCategoryList/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public List<SubCategory> getSubCategories(@PathParam("id") int category_id){
		
		SubCategoryDAO dao = new SubCategoryDAO();
		List<SubCategory> subcategory = dao.getSubCategoryByCategoryId(category_id);
		if(subcategory==null)
			return null;
		else
			return subcategory;
	}
	
}
