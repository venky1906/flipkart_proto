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
	
	// API to get the su-category with id
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
	
	// API to get the category with id.
	@POST
	@Path("/getCategoryById/{id}")
	public Category getCategoryById(@PathParam("id") int id){
			
		CategoryDAO dao = new CategoryDAO();
		Category cat = dao.getCategory(id);
				
		return cat;
	}
	
	// API to get the sub-category with id.
	@POST
	@Path("/getSubCategoryById/{id}")
	public SubCategory getSubCategoryById(@PathParam("id") int id){
			
		SubCategoryDAO dao = new SubCategoryDAO();
		SubCategory subcat = dao.getSubCategory(id);
				
		return subcat;
	}
		
	@POST
	@Path("/addCategory")
	@Consumes("application/json")
	@Produces(MediaType.TEXT_PLAIN)
	public String addCategory(Category category) {
		CategoryDAO dao = new CategoryDAO();
		dao.addCategory(category);
		return "success";
	}
	
	@POST
	@Path("/addsubCategory")
	@Consumes("application/json")
	@Produces(MediaType.TEXT_PLAIN)
	public String addSubCategory(SubCategory subcategory) {
		SubCategoryDAO dao = new SubCategoryDAO();
		dao.addSubCategory(subcategory);
		return "success";
	}
	
	@GET
	@Path("/getAllBrandsForASubCategory/{id}")
	@Produces("application/json")
	public List<Brand> getAllBrandsForASubCategory(@PathParam("id") int subcategory_id){
		
		BrandDAO dao= new BrandDAO();
		List<Brand> brands = dao.getBrandsBySubcategoryId(subcategory_id);
		if(brands==null)
			return null;
		else
			return brands;
		
	}
	
	@POST
	@Path("/addBrand")
	@Consumes("application/json")
	@Produces(MediaType.TEXT_PLAIN)
	public String addBrand(Brand brand) {
		BrandDAO dao = new BrandDAO();
		dao.addBrand(brand);
		return "success";
	}
	
	@GET
	@Path("/getAllColorsForASubCategory/{id}")
	@Produces("application/json")
	public  List<Color> getAllColorsForASubCategory(@PathParam("id") int subcategory_id){
		ColorDAO dao= new ColorDAO();
		List<Color> colors = dao.getColorsBySubcategoryId(subcategory_id);
			
		if(colors==null)
			return null;
		else
			return colors;
	}
	
}
