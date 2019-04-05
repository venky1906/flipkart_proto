package org.iiitb.ooad.dao;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import org.iiitb.ooad.model.Item;

public class ItemDAO extends HibernateDAO<Item> {
	
	String entity="Item";

	public List<Item> getItemsBySellerId(int seller_id)
	{
		return super.findAll(entity,"seller_id",seller_id);
	}
	
	public int addItem(Item item)
	{
		try {
			int item_id = super.add(item);
			return item_id;
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			return -1;
		}
	}
	
	public int deleteItemById(int item_id) {
		
		int return_value = super.deleteRow(entity,"item_id",item_id);
		
		if(return_value>0) {
			return 1;
		}
		
		else {
			return 0;
		}
		
	}
	
	public int updateItemQuantity(Item item,int item_id){
	
		try {
		
			List<Field> fields = new ArrayList<Field>();
			Field quantity_field = item.getClass().getDeclaredField("quantity");
			quantity_field.setAccessible(true);
			fields.add(quantity_field);
			if(super.update(item, "item_id", item_id, fields)==1)
				return 1;
			else
				return 0;
		}
		
		catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public List<Item> getItemsBySubcategoryId(int subcat_id)
	{
		return super.findAll(entity,"subcategory_id",subcat_id);
	}
	
	public Item getItemByItemId(int item_id)
	{
		return super.find(entity,"item_id",item_id);
	}
	
	public String reduceItemQuantity(Item item){
		Item curr_item = getItemByItemId(item.getItem_id());
		int qty = curr_item.getQuantity();
		curr_item.setQuantity(qty-item.getQuantity());
		System.out.println(qty-item.getQuantity()+"..............................");
		if(updateItemQuantity(curr_item, item.getItem_id())==1) {
			return "success";
		}
		return "fail";
	}
}