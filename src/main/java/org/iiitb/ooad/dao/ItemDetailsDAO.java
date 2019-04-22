package org.iiitb.ooad.dao;

import java.util.List;
import org.iiitb.ooad.model.ItemDetails;

public class ItemDetailsDAO extends HibernateDAO<ItemDetails> {
	
	String entity="ItemDetails";

	public List<ItemDetails> getItemDetailsByItemId(int item_id)
	{
		return super.findAll(entity,"item_id",item_id);
	}
	
	public int addItemDetail(ItemDetails itemDetail)
	{
		try {
			
			int itemDetail_id = super.add(itemDetail);
			return itemDetail_id;
			
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			return -1;
		}
	}	
}