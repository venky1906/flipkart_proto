package org.iiitb.ooad.dao;


import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.iiitb.ooad.model.Cart;

public class CartDAO extends HibernateDAO<Cart> {
	
	String entity="Cart";
	
	public List<Cart> getCartByBuyer_id(int buyer_id)
	{
		List<Cart>  cart= super.findAll(entity, "buyer_id", buyer_id);
		if(cart.size()==0)
			return null;
		return cart;
	}
	public Cart getItemFromCartByBuyerId(int buyer_id, int item_id)
	{
		Cart cart = super.find(entity, "buyer_id", buyer_id, "item_id", item_id);

		return cart;
	}
	public int addCart(Cart cart)
	{
		try {
			return super.add(cart);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return -1;
		}
	}
	
	public int updateQuantity(Cart cart)
	{
		try {
			
			List<Field> fields = new ArrayList<Field>();
			Field quantity_field = cart.getClass().getDeclaredField("quantity");
			quantity_field.setAccessible(true);
			fields.add(quantity_field);
			if(super.update(cart, "id", cart.getId(), fields)==1)
				return 1;
			else
				return 0;
		}
		
		catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public int updateDeal(Cart cart)
	{
		try {
			
			List<Field> fields = new ArrayList<Field>();
			Field quantity_field = cart.getClass().getDeclaredField("deal_id");
			quantity_field.setAccessible(true);
			fields.add(quantity_field);
			if(super.update(cart, "id", cart.getId(), fields)==1)
				return 1;
			else
				return 0;
		}
		
		catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	public int updateDealInCart(Cart cart)
	{
		Cart curr_cart = getItemFromCartByBuyerId(cart.getBuyer_id(),cart.getItem_id());
		curr_cart.setDeal_id(cart.getDeal_id());
		if(updateDeal(curr_cart)==1) {
			return 1;
		}
		return 0;
	}
	
	public int updateQuantityInCart(Cart cart)
	{
		Cart curr_cart = getItemFromCartByBuyerId(cart.getBuyer_id(),cart.getItem_id());
		curr_cart.setQuantity(cart.getQuantity());
		if(updateQuantity(curr_cart)==1) {
			return 1;
		}
		return 0;
	}

	public int checkItem(Cart cart)
	{
		Cart val= super.find(entity, "buyer_id", cart.getBuyer_id(), "item_id", cart.getItem_id());
		if(val!=null)
			return 1;
		else
			return 0;
	}
	
	public int removeCart(int buyer_id)
	{
		int val = super.deleteRow(entity, "buyer_id", buyer_id);
		if(val>0) {
			return 1;
		}
		
		else {
			return 0;
		}

	}
	public int removeItem(Cart cart)
	{
		int val=super.deleteRow(entity, "buyer_id", cart.getBuyer_id(),"item_id", cart.getItem_id());
		
		if(val>0) {
			return 1;
		}
		
		else {
			return 0;
		}

	}

}
