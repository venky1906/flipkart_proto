package org.iiitb.ooad.services;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.iiitb.ooad.dao.ItemDAO;
import org.iiitb.ooad.dao.ItemImagesDAO;
import org.iiitb.ooad.dao.ReviewDAO;
import org.iiitb.ooad.dao.WishlistItemDAO;
import org.iiitb.ooad.model.Item;
import org.iiitb.ooad.model.ItemImages;
import org.iiitb.ooad.model.WishlistItem;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@Path("/wishlist")
public class WishlistServices {
	

	@Path("/getWishlistByBuyerID/{id}")
	@GET
	@Produces("application/json")
	public String getWishlistByBuyerID(@PathParam("id") int buyer_id) throws JSONException{
		WishlistItemDAO wdao = new WishlistItemDAO();
		ItemDAO idao = new ItemDAO();
		ItemImagesDAO imdao = new ItemImagesDAO();
		ReviewDAO rdao = new ReviewDAO();
		
		List<WishlistItem> wishlist = wdao.getWishlistByBuyerID(buyer_id);
		
		if(wishlist!=null) {
			JSONArray result = new JSONArray();
			for(int i=0;i<wishlist.size();i++) {
				JSONObject wishlist_item = new JSONObject();
				
				wishlist_item.put("id", wishlist.get(i).getId());
				wishlist_item.put("item_id", wishlist.get(i).getItem_id());
				
				Item item = idao.getItemByItemId(wishlist.get(i).getItem_id());
				
				wishlist_item.put("itemid", item.getId());
				wishlist_item.put("name", item.getName());
				wishlist_item.put("price", item.getPrice());
				wishlist_item.put("discount", item.getDiscount());
				
				ItemImages image = imdao.getItemImagesByItemId(wishlist.get(i).getItem_id()).get(0);
				wishlist_item.put("pic_location", image.getImage_location());
				wishlist_item.put("rating", Double.toString(rdao.averageRatingOfItem(wishlist.get(i).getItem_id())));
				wishlist_item.put("numrating", rdao.totalItemRatings(wishlist.get(i).getItem_id()));
				
				result.put(wishlist_item);
			}
			return result.toString();
		}
		return "fail";
	}
	
	@Path("deleteWishlistItemByID/{id}")
	@POST
	public String deleteWishlistItemByID(@PathParam("id") int id) {
		WishlistItemDAO wdao = new WishlistItemDAO();
		return wdao.deleteByID(id);
	}
	
	@POST
	@Path("/checkItemInWishlist")
	@Consumes("application/json")
	public int checkItemInWishlist(WishlistItem item)
	{
		WishlistItemDAO dao = new WishlistItemDAO();
		return dao.checkItem(item);
	}
	
	@POST
	@Path("/addItemToWishlist")
	@Consumes("application/json")
	public int addItemToWishlist(WishlistItem item)
	{
		WishlistItemDAO dao = new WishlistItemDAO();
		return dao.addWishlistItem(item);
	}
	
	@POST
	@Path("/removeFromWishlist")
	@Consumes("application/json")
	public int removeFromWishlist(WishlistItem item)
	{
		WishlistItemDAO dao = new WishlistItemDAO();
		return dao.removeItem(item);
	}
}