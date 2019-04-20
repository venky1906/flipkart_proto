package org.iiitb.ooad.dao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.iiitb.ooad.model.Deal;

public class DealDAO extends HibernateDAO<Deal> {
	
	String entity="Deal";
	
	public Deal getDealDetailsByID(int deal_id) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		//System.out.println(dtf.format(now));
		return super.findOn(entity, "deal_id", deal_id, "date_added", "date_ended", dtf.format(now));
	}
}
