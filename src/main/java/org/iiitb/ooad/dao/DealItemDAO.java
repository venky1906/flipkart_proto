package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.DealItem;

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
}
