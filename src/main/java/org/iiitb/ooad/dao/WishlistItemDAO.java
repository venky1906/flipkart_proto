package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.WishlistItem;

public class WishlistItemDAO extends HibernateDAO<WishlistItem>{
	
	String entity="WishlistItem";
	
	public List<WishlistItem> getWishlistByBuyerID(int buyer_id){
		List<WishlistItem> wishlist = super.findAll(entity, "buyer_id", buyer_id);
		if(wishlist!=null) {
			return wishlist;
		}
		return null;
	}
	
	public String deleteByID(int id) {
		int rows = super.deleteRow(entity, "id", id);
		if(rows==1) {
			return "success";
		}
		return "fail";
	}
	
	public String deleteItem(WishlistItem item) {
		int rows = super.deleteRow(entity, "item_id", item.getItem_id(), "buyer_id", item.getBuyer_id());
		if(rows==1) {
			return "success";
		}
		return "fail";
	}
	
	public int checkItem(WishlistItem item)
	{
		WishlistItem val= super.find(entity, "buyer_id", item.getBuyer_id(), "item_id", item.getItem_id());
		if(val!=null)
			return 1;
		else
			return 0;
	}
	
	public int addWishlistItem(WishlistItem item)
	{
		try {
			return super.add(item);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return -1;
		}
	}
	public int removeItem(WishlistItem item)
	{
		int val=super.deleteRow(entity, "buyer_id", item.getBuyer_id(),"item_id", item.getItem_id());
		
		if(val>0) {
			return 1;
		}
		
		else {
			return 0;
		}

	}
}	
