package org.iiitb.ooad.services;

import java.util.ArrayList;

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
import org.json.JSONException;

@SuppressWarnings("unused")
@Path("/items")
public class ItemServices {
	
	// API to get all the Items By a Seller.
	@GET
	@Path("/getAllItemsBySellerId/{id}")
	@Produces("application/json")
	public String getItemsBySellerId(@PathParam("id") int seller_id){
		
		ItemDAO ItemDao = new ItemDAO();
		ItemDetailsDAO itemDetailsDao = new ItemDetailsDAO();
		ItemImagesDAO itemImagesDao = new ItemImagesDAO();
		
		List<Item> items = ItemDao.getItemsBySellerId(seller_id);
		
		
		JSONArray allItems = new JSONArray();
			
		try {
			
			for(int i=0;i< items.size();i++) {
			
				Item item = items.get(i);
				
				JSONObject item_details= new JSONObject();
				
				item_details.append("item",new JSONObject(item));
				
				int item_id = item.getItem_id();
				
				System.out.println("Item_id: " + item_id);
				
				SubCategoryDAO subcat_dao = new SubCategoryDAO();
				SubCategory sub_cat = subcat_dao.getSubCategory(item.getSubcategory_id());
				
				String subcategory_name = sub_cat.getName();
				item_details.put("subcategory_name",subcategory_name);
				
				CategoryDAO category_dao = new CategoryDAO();
				Category category = category_dao.getCategory(sub_cat.getCategory_id());
				
				item_details.put("category_name",category.getName());
				//Get the list of variable details
				
				List<ItemDetails> key_value_pairs = itemDetailsDao.getItemDetailsByItemId(item_id);
				JSONArray key_value_array = new JSONArray();
				
				for(int j=0;j<key_value_pairs.size();j++)
					key_value_array.put(new JSONObject(key_value_pairs.get(j)));
				
				item_details.append("variable_details",key_value_array);
				
				List<ItemImages> itemImages = itemImagesDao.getItemImagesByItemId(item_id);
				JSONArray allImages = new JSONArray();
				
				for(int j=0;j<itemImages.size();j++)
					allImages.put(new JSONObject(itemImages.get(j)));
				item_details.append("item_images",allImages);
				
				allItems.put(item_details);
				
			}
			
			System.out.println(allItems);
			return allItems.toString();
		}
		
		catch(Exception e) {	
			e.printStackTrace();
			return null;
		}
		
	}
	
	/*
	@POST
	@Path("delete/{id}")
	public String deleteItemById(@PathParam("id") int item_id){
		
		ItemDAO dao = new ItemDAO();
		Item item=new Item();
		item.setItem_id(item_id);
		item.setQuantity(0);
		
		int isSuccess = dao.updateItemQuantity(item,item_id);
		
		if(isSuccess==1){
			return "success";
		}
		
		else {
			return "fail";
		}
	}*/
	
	@POST
	@Path("/getAllItemsBySubcategoryId/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public String getItemsBySubcategoryId(@PathParam("id")int subcat_id) throws JSONException
	{

		ItemDAO dao = new ItemDAO();
		ItemImagesDAO itemImagesDao = new ItemImagesDAO();
		SubCategoryDAO subcategoryDao = new SubCategoryDAO();
		List<Item> items = dao.getItemsBySubcategoryId(subcat_id);
		SubCategory subcat=subcategoryDao.getSubCategory(subcat_id);
		
		JSONObject getItems = new JSONObject();
		JSONArray allItems = new JSONArray();
		

		getItems.append("subcat_name",subcat.getName());
		
		JSONObject items_as_object= new JSONObject();
		try {
			
			for(int i=0;i< items.size();i++) {
			
				Item item = items.get(i);
				
				JSONObject item_details= new JSONObject();
				item_details.append("itemid",item.getItem_id());
				item_details.append("name",item.getName());
				item_details.append("price",item.getPrice());
				item_details.append("brand",item.getBrand());
				item_details.append("discount",item.getDiscount());
				item_details.append("manufacture_date",item.getManufacture_date());
				item_details.append("color",item.getColor());
				
				int item_id = item.getItem_id();
				ReviewDAO reviewdao = new ReviewDAO();
				
				Double rating = reviewdao.averageRatingOfItem(item_id);
				item_details.append("rating",rating);
				
				long count = reviewdao.totalItemRatings(item_id);
				item_details.append("rating_count",count);
				
				System.out.println("Item_id: " + item_id);
				
				ItemImages itemImage = itemImagesDao.getItemImagesByItemId(item_id).get(0);
				item_details.append("image",itemImage.getImage_location());
				
				allItems.put(item_details);
				
			}
			
			getItems.append("items",allItems);
			System.out.println(getItems);
			return getItems.toString();
		}
		
		catch(Exception e) {	
			e.printStackTrace();
			return null;
		}
		
	}
	
	@POST
	@Path("/getItemsBySubcategoryId/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public String getAllItemsBySubcategoryId(@PathParam("id")int subcat_id) throws JSONException
	{

		ItemDAO dao = new ItemDAO();
		ItemImagesDAO itemImagesDao = new ItemImagesDAO();
		SubCategoryDAO subcategoryDao = new SubCategoryDAO();
		List<Item> items = dao.getItemsBySubcategoryId(subcat_id);
		SubCategory subcat=subcategoryDao.getSubCategory(subcat_id);
		
		JSONArray allItems = new JSONArray();
		JSONObject subcat_details= new JSONObject();
		subcat_details.append("subcat_name",subcat.getName());
		allItems.put(subcat_details);
		try {
			
			for(int i=0;i< items.size();i++) {
			
				Item item = items.get(i);
				
				JSONObject item_details= new JSONObject();
				item_details.append("itemid",item.getItem_id());
				item_details.append("name",item.getName());
				item_details.append("price",item.getPrice());
				item_details.append("brand",item.getBrand());
				item_details.append("discount",item.getDiscount());
				int item_id = item.getItem_id();
				
				System.out.println("Item_id: " + item_id);
				
				ItemImages itemImage = itemImagesDao.getItemImagesByItemId(item_id).get(0);
				item_details.append("image",itemImage.getImage_location());
				
				allItems.put(item_details);
				
			}
			
			System.out.println(allItems);
			return allItems.toString();
		}
		
		catch(Exception e) {	
			e.printStackTrace();
			return null;
		}
		
	}

	//API to get Items in price range
	@POST
	@Path("/getByPrice")
	@Consumes("application/json")
	@Produces("application/json")
	public String getReportByMRP(String data) throws JSONException{
		JSONObject price_range = new JSONObject(data);
		float minprice = (float)price_range.getDouble("min_price");
		float maxprice = (float)price_range.getDouble("max_price");

		System.out.println(minprice);
		
		ItemDAO dao = new ItemDAO();
		ItemImagesDAO itemImagesDao = new ItemImagesDAO();
		SubCategoryDAO subcategoryDao = new SubCategoryDAO();
		List<Item> items = dao.getItemTableByPrice(minprice,maxprice);
		List<SubCategory> subcats=subcategoryDao.getSubCategoryTable();
		
//		JSONObject two = new JSONObject();
		JSONArray two2 = new JSONArray();
		JSONArray first = new JSONArray();
		JSONObject subcatobject= new JSONObject();
		
		
		try {
			for(int i=0;i<subcats.size();i++) {
				SubCategory subcat=subcats.get(i);
				subcatobject.append(Integer.toString(subcat.getSubcategory_id()), subcat.getCategory_id());
			}
		}catch(Exception e) {	
			e.printStackTrace();
			return null;
		}
		
		try {
			for (int i=0;i<items.size();i++) {
				Item item=items.get(i);
	
				JSONObject item_details= new JSONObject();
				item_details.append("itemid",item.getItem_id());
				item_details.append("name",item.getName());
				item_details.append("price",item.getPrice());
	//			item_details.append("brand",item.getBrand());
				item_details.append("discount",item.getDiscount());
				item_details.append("subcategory_id", item.getSubcategory_id());
				int item_id = item.getItem_id();
				
				System.out.println("Item_id: " + item_id);
				
				ItemImages itemImage = itemImagesDao.getItemImagesByItemId(item_id).get(0);
				item_details.append("image",itemImage.getImage_location());
				
				first.put(item_details);
				
			}
			
//			two.append("first",first.toString());
//			two.append("second",subcatobject.toString());
			
			two2.put(first);
			two2.put(subcatobject);
			return two2.toString();
		}catch(Exception e) {	
			e.printStackTrace();
			return null;
		}

	}
	
	
	//API to get all Items
	@POST
	@Path("/getReport")
	@Consumes("application/json")
	@Produces("application/json")
	public String getReport() throws JSONException{
		ItemDAO dao = new ItemDAO();
		ItemImagesDAO itemImagesDao = new ItemImagesDAO();
		SubCategoryDAO subcategoryDao = new SubCategoryDAO();
		List<Item> items = dao.getItemTable();
		List<SubCategory> subcats=subcategoryDao.getSubCategoryTable();
		
		JSONArray two2 = new JSONArray();
		JSONArray first = new JSONArray();
		JSONObject subcatobject= new JSONObject();
//		JSONObject two = new JSONObject();
		
		
		try {
			for(int i=0;i<subcats.size();i++) {
				SubCategory subcat=subcats.get(i);
				subcatobject.append(Integer.toString(subcat.getSubcategory_id()), subcat.getCategory_id());
			}
		}catch(Exception e) {	
			e.printStackTrace();
			return null;
		}
		
		try {
			for (int i=0;i<items.size();i++) {
				Item item=items.get(i);
	
				JSONObject item_details= new JSONObject();
				item_details.append("itemid",item.getItem_id());
				item_details.append("name",item.getName());
				item_details.append("price",item.getPrice());
				item_details.append("brand",item.getBrand());
				item_details.append("discount",item.getDiscount());
				item_details.append("subcategory_id", item.getSubcategory_id());
				int item_id = item.getItem_id();
				
				System.out.println("Item_id: " + item_id);
				
				ItemImages itemImage = itemImagesDao.getItemImagesByItemId(item_id).get(0);
				item_details.append("image",itemImage.getImage_location());
				
				first.put(item_details);
				
			}
			
//			two.append("first",first.toString());
//			two.append("second",subcatobject.toString());
			
			two2.put(first);
			two2.put(subcatobject);
			return two2.toString();
		}catch(Exception e) {	
			e.printStackTrace();
			return null;
		}
	}
	
	// API to get the Item with item id.
	@POST
	@Path("/getItemByItemId/{id}")
	@Produces("application/json")
	public Item getItemByItemId(@PathParam("id") int item_id){
		//System.out.println("hey");
		ItemDAO dao = new ItemDAO();
		Item item =  dao.getItemByItemId(item_id);
		
		return item;
	}
	
	// API to get the item images with item id.
	@POST
	@Path("/getItemImagesByItemId/{id}")
	@Produces("application/json")
	public List<ItemImages> getItemImagesByItemId(@PathParam("id") int item_id){
		
		ItemImagesDAO dao = new ItemImagesDAO();
		List<ItemImages> itemimgs = dao.getItemImagesByItemId(item_id);
			
		if(itemimgs!=null) {
			return itemimgs;
		}
		return null;
	}
	
	// API to get the item details with item id.
	@POST
	@Path("/getItemDetailsByItemId/{id}")
	@Produces("application/json")
	public List<ItemDetails> getItemDetailsByItemId(@PathParam("id") int item_id){
		
		ItemDetailsDAO dao = new ItemDetailsDAO();
		List<ItemDetails> itemdetails = dao.getItemDetailsByItemId(item_id);
			
		if(itemdetails!=null && itemdetails.size()>0) {
			return itemdetails;
		}
		return null;
	}
	
	@POST
	@Path("/updateQuantity")
	@Consumes("application/json")
	public String updateQuantity(Item item) {
		
		ItemDAO dao = new ItemDAO();
		if(dao.updateItemQuantity(item,item.getItem_id())==1)
				return "success";
		return "fail";
	}
	
	@GET
	@Path("/getFixedAttributeListBySubcatId/{subcategory_id}")
	@Produces("application/json")
	public List<FixedAttribute> getFixedAttribute(@PathParam("subcategory_id") int subcategory_id){
		
		FixedAttributeDAO dao = new FixedAttributeDAO();
		List<FixedAttribute> list = dao.getFixedAttributeValuesBySubcatId(subcategory_id);
		
		if(list == null || list.isEmpty()){
			return null;
		}	
		return list;
	}
	
	@POST
	@Path("addFixedAttributeForSubCategory")
	@Consumes("application/json")
	public String addFixedAttributeForSubCategory(FixedAttribute fixedAttribute){
			FixedAttributeDAO dao = new FixedAttributeDAO();
			if(dao.addFixedAttribute(fixedAttribute)!=-1) {
				return "success";
			}
			return "fail";
	}

}
