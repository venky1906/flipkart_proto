package org.iiitb.ooad.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.iiitb.ooad.dao.BuyerDAO;
import org.iiitb.ooad.dao.DealDAO;
import org.iiitb.ooad.dao.DealItemDAO;
import org.iiitb.ooad.model.Buyer;
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
					deal_desc.put("deal_id", deal_details.getDeal_id());
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
	
	
	@Path("/getDealsForUser")
	@POST
	@Produces("application/json")
	public String getDealsForUser(String deal_item_details) throws JSONException, ParseException{
		DealItemDAO didao = new DealItemDAO();
		DealDAO ddao = new DealDAO();
		
		JSONObject details = new JSONObject(deal_item_details);
		int item_id = details.getInt("item_id");
		int buyer_id = details.getInt("buyer_id");
		
		List<DealItem> deals = didao.getDealsOfItem(item_id);
		JSONArray result = new JSONArray();
		
		if(deals!=null) {
			for(int i=0;i<deals.size();i++) {
				JSONObject deal_desc = new JSONObject();
				
				DealItem deal = deals.get(i);
				int deal_id = deal.getDeal_id();
				
				Deal deal_details = ddao.getDealDetailsByID(deal_id);
				if(deal_details!=null) {
					deal_desc.put("deal_id", deal_details.getDeal_id());
					deal_desc.put("name", deal_details.getName());
					deal_desc.put("description", deal_details.getDescription());
					deal_desc.put("deal_discount", deal_details.getDeal_discount());
					
					String[] datetime = deal_details.getDate_ended().split(" ");
					String[] date = datetime[0].split("-");
					deal_desc.put("validity", date[2]+"-"+date[1]+"-"+date[0]+" "+datetime[1].substring(0, 8));
	
					if(deal_details.getName().equals("Birthday Offer")){
						BuyerDAO buyer_dao = new BuyerDAO();
						DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
						LocalDateTime now = LocalDateTime.now();
						String [] today_datetime = dtf.format(now).split(" ");
						String today = today_datetime[0];
						Buyer buyer = buyer_dao.getUserById(buyer_id);
						if(buyer.getDob().equals(today)){
							result.put(deal_desc);
						}
					}
					else
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
	
	@Path("/getDealsNotAddedToItem/{item_id}")
	@GET
	@Produces("application/json")
	public List<Deal> getDealsNotAddedToItem(@PathParam("item_id") int item_id){
		
			DealItemDAO didao = new DealItemDAO();
			List<DealItem> item_deals = didao.getDealsOfItem(item_id);
			
			List<Deal> item_extra_deals = new ArrayList<Deal>();

			DealDAO deal_dao = new DealDAO();

			List<Integer> present_deals_ids = new ArrayList<Integer>();
			for(int i=0;i<item_deals.size();i++){	
				present_deals_ids.add(item_deals.get(i).getDeal_id());
			}
			
			if(present_deals_ids.size()==0) {
				item_extra_deals = deal_dao.getAllValidDeals();
			}
			
			else{
				item_extra_deals = deal_dao.getAllExtraValidDeals((ArrayList<Integer>) present_deals_ids);				
			}
			
			for(int i=0;i<item_extra_deals.size();i++){				
				String end_date = item_extra_deals.get(i).getDate_ended();
				String[] datetime = end_date.split(" ");
				String[] date = datetime[0].split("-");
				item_extra_deals.get(i).setDate_ended(date[2]+"-"+date[1]+"-"+date[0]+" "+datetime[1].substring(0, 8));
			}
			
			return item_extra_deals;
	}
	
	@Path("/addItemToDeals")
	@POST
	@Consumes("application/json")
	public String addItemToDeals(List<DealItem> deal_items){
		
		DealItemDAO dao = new DealItemDAO();
		
		for(int i=0;i<deal_items.size();i++){
			int id = dao.addDealItem(deal_items.get(i));
			if(id==-1){
				return "fail";
			}
		}
		return "success";
	}
	
	@Path("/removeDealItem")
	@POST
	@Consumes("application/json")
	public String deleteDealItem(DealItem dealItem){
		
		DealItemDAO dao = new DealItemDAO();
		return dao.deleteDealItem(dealItem);
	}
}
