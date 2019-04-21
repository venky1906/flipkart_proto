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
@Path("/cart")
public class CartServices {
	
	@POST
	@Path("/getItemsByBuyerId/{id}")
	@Produces("application/json")
	public List<Cart> getItemsByBuyerId(@PathParam("id") int buyer_id){
		
		CartDAO dao = new CartDAO();
		List<Cart> cart_data = dao.getCartByBuyer_id(buyer_id);
		if(cart_data!=null)
		{
			return cart_data;
		}
		return null;
		
	}
	
	@GET
	@Path("/removeItemsByBuyerId/{id}")
	public int removeItemsByBuyerId(@PathParam("id") int buyer_id){
		
		CartDAO dao = new CartDAO();
		return dao.removeCart(buyer_id);
		
	}
	
	@POST
	@Path("/addItemToCart")
	@Consumes("application/json")
	public int addItemToCart(Cart cart)
	{
		CartDAO dao = new CartDAO();
		return dao.add(cart);
	}
	
	@POST
	@Path("/updateQuantityInCart")
	@Consumes("application/json")
	public int updateQuantityInCart(Cart cart) 
	{
		CartDAO dao = new CartDAO();
		return dao.updateQuantityInCart(cart);
	}
	
	
	@POST
	@Path("/removeItem")
	@Consumes("application/json")
	public int removeItem(Cart cart)
	{
		CartDAO dao = new CartDAO();
		return dao.removeItem(cart);
	}
	
	@POST
	@Path("/checkItemInCart")
	@Consumes("application/json")
	public int checkItemInCart(Cart cart)
	{
		CartDAO dao = new CartDAO();
		return dao.checkItem(cart);
	}

}
