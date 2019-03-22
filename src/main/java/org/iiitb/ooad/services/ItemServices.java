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
	}
}
