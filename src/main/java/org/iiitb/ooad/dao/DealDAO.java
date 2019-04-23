package org.iiitb.ooad.dao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.iiitb.ooad.model.Deal;

public class DealDAO extends HibernateDAO<Deal> {
	
	String entity="Deal";
	
	public Deal getDealDetailsByID(int deal_id) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		//System.out.println(dtf.format(now));
		return super.findOn(entity, "deal_id", deal_id, "date_added", "date_ended", dtf.format(now));
	}
	
	public List<Deal> getAllValidDeals(){
		//return super.list(new Deal());
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		return super.findAllWithRange(entity, "date_added", "date_ended", dtf.format(now));
	}
	
	public List<Deal> getAllExtraValidDeals(ArrayList<Integer> present_deals_ids){
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		return super.findAllNotIn(entity,"deal_id",present_deals_ids,"date_added", "date_ended", dtf.format(now));
	}
	
		public int addDeal(Deal deal){
		return super.add(deal);
	}
	
}
