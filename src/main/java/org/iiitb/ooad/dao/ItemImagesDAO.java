package org.iiitb.ooad.dao;

import java.util.List;
import org.iiitb.ooad.model.ItemImages;

public class ItemImagesDAO extends HibernateDAO<ItemImages> {
	
	String entity="ItemImages";

	public List<ItemImages> getItemImagesByItemId(int item_id)
	{
		return super.findAll(entity,"item_id",item_id);
	}
	
	public int addItemImage(ItemImages itemImage)
	{
		try {
			int item_id = super.add(itemImage);
			return item_id;
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			return -1;
		}
	}

}