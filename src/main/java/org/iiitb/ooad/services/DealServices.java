package org.iiitb.ooad.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.iiitb.ooad.dao.DealDAO;
import org.iiitb.ooad.dao.DealItemDAO;
import org.iiitb.ooad.model.Deal;
import org.iiitb.ooad.model.DealItem;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@Path("/deal")
public class DealServices {
	

	@Path("/getDealsOfItem/{id}")
	@GET
	@Produces("application/json")
	public String getDealsOfItem(@PathParam("id") int item_id) throws JSONException, ParseException{
		DealItemDAO didao = new DealItemDAO();
		DealDAO ddao = new DealDAO();
		
		List<DealItem> deals = didao.getDealsOfItem(item_id);
		JSONArray result = new JSONArray();
		
		if(deals!=null) {
			for(int i=0;i<deals.size();i++) {
				JSONObject deal_desc = new JSONObject();
				
				DealItem deal = deals.get(i);
				int deal_id = deal.getDeal_id();
				
				Deal deal_details = ddao.getDealDetailsByID(deal_id);
				if(deal_details!=null) {
					deal_desc.put("name", deal_details.getName());
					deal_desc.put("description", deal_details.getDescription());
					deal_desc.put("deal_discount", deal_details.getDeal_discount());
					
					//System.out.println("The Original date is : " + deal_details.getDate_ended());
					//Check Number of days available
					//System.out.println("The date is : " + format.parse(deal_details.getDate_ended()));
					String[] datetime = deal_details.getDate_ended().split(" ");
					String[] date = datetime[0].split("-");
					//System.out.println("Date: " + time[0]);
					deal_desc.put("validity", date[2]+"-"+date[1]+"-"+date[0]+" "+datetime[1].substring(0, 8));
					result.put(deal_desc);
				}
			}
			return result.toString();
		}
		return "fail";
	}
	
	public String getValidity(String date) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-mm-dd HH:mm:ss");

		Date d1 = new Date();
		Date d2 = null;

		try {
			d2 = format.parse(date);

			//in milliseconds
			long diff = d1.getTime() - d2.getTime();
			//System.out.println("......................."+diff);

			long ss = diff / 1000 % 60;
			long mm = diff / (60 * 1000) % 60;
			long hh = diff / (60 * 60 * 1000) % 24;
			long dd = diff / (24 * 60 * 60 * 1000);

			String validity = "";
			
			if(dd>0) {
				validity+=dd+" day(s) ";
			}
			if(hh>0) {
				validity+=hh+" hour(s) ";
			}
			if(mm>0) {
				validity+=mm+" minute(s) ";
			}
			if(ss>0) {
				validity+=ss+" second(s) ";
			}
			
			return validity;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "fail";
	}
		

}
