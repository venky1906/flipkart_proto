package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.DealItem;
import org.iiitb.ooad.model.ItemDetails;

public class DealItemDAO extends HibernateDAO<DealItem> {
	
	String entity="DealItem";

	public List<DealItem> getDealsOfItem(int item_id){
		
		//List<DealItem> deals = super.findAllOn(entity, "item_id", item_id, "date_ended", dtf.format(now));
		List<DealItem> deals = super.findAll(entity, "item_id", item_id);
		if(deals!=null) {
			return deals;
		}
		return null;
	}
	
	public int addDealItem(DealItem dealItem)
	{
		try {
			int dealItem_id = super.add(dealItem);
			return dealItem_id;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return -1;
		}
	}
	
	public String deleteDealItem(DealItem dealItem){
		int rows = super.deleteRow(entity,"deal_id",dealItem.getDeal_id(),"item_id",dealItem.getItem_id());
		if(rows>0)
			return "success";
		else
			return "fail";
	}
	
	public List<Integer> getItemIdByDealId(int deal_id) {
		return getAllDistinctInteger(entity,"item_id","deal_id",deal_id);
	}
}
