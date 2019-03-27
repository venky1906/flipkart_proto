package org.iiitb.ooad.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.iiitb.ooad.model.*;
import org.json.JSONObject;
import org.json.JSONArray;
import org.iiitb.ooad.dao.*;

@SuppressWarnings("unused")
@Path("/order")
public class OrderServices {
	
	// Verify PIN
	@POST
	@Path("/addOrderDetails")
	@Consumes("application/json")
	public String addOrderDetails(OrderItem orderItem)
	{
		//Update quantity
		ItemDAO dao = new ItemDAO();
		Item item = new Item();
		item.setItem_id(orderItem.getItem_id());
		item.setQuantity(orderItem.getQuantity());
		
		if(dao.reduceItemQuantity(item)=="success") {
			
			//Current time
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			LocalDateTime now = LocalDateTime.now();
			orderItem.setOrder_date(dtf.format(now));
			
			//Add items in order
			OrderItemDAO ordItemdao = new OrderItemDAO();
			if(ordItemdao.addOrderItem(orderItem)>=0) {
				return "success";
			}
		}
		return "fail";
	}
	
	//Get all orders by buyer id
	@POST
	@Path("/getOrdersByBuyerID/{id}")
	@Produces("application/json")
	public String getOrdersByBuyerID(@PathParam("id") int buyer_id) throws Exception
	{
		OrderItemDAO dao = new OrderItemDAO();
		List<OrderItem> ordItems = dao.getOrderByBuyerID(buyer_id);
		JSONArray orders = new JSONArray();
		if(ordItems!=null) {
			for(int i=0; i<ordItems.size();i++) {
				JSONObject ordItem = new JSONObject();
				ordItem.put("order_id", ordItems.get(i).getOrder_id());
				ordItem.put("item_id", ordItems.get(i).getItem_id());
				
				ItemDAO itemdao = new ItemDAO();
				Item item = itemdao.getItemByItemId(ordItems.get(i).getItem_id());
				ordItem.put("id", item.getId());
				ordItem.put("item_name", item.getName());
				ordItem.put("item_brand", item.getBrand());
				
				ItemImagesDAO imgdao = new ItemImagesDAO();
				ItemImages itemimg = imgdao.getItemImagesByItemId(ordItems.get(i).getItem_id()).get(0);
				ordItem.put("item_img", itemimg.getImage_location());
				
				ordItem.put("seller_id", ordItems.get(i).getSeller_id());
				
				SellerDAO selldao = new SellerDAO();
				Seller seller = selldao.getSellerByID(ordItems.get(i).getSeller_id());
				ordItem.put("seller_name", seller.getName());
				
				ordItem.put("buyer_id", ordItems.get(i).getBuyer_id());
				ordItem.put("quantity", ordItems.get(i).getQuantity());
				ordItem.put("amount_paid", ordItems.get(i).getAmount_paid());
				ordItem.put("status", ordItems.get(i).getStatus());
				ordItem.put("order_date", ordItems.get(i).getOrder_date());
				
				ReviewDAO reviewdao = new ReviewDAO();
				Review review = reviewdao.getReviewByOrderItemID(ordItems.get(i).getOrder_id());
				if(review!=null) {
					JSONObject review_json = new JSONObject(review);
					ordItem.put("review", review_json);
				}
				
				orders.put(ordItem);
			}
			return orders.toString();
		}
		return null;
	}
	
	//Buyer updated delivered
	@Path("/updateDelivered/{id}")
	@POST
	public String updateDelivered(@PathParam("id") int order_id) {
			
		OrderItemDAO dao = new OrderItemDAO();
		OrderItem orderItem = new OrderItem();
		orderItem.setOrder_id(order_id);
		orderItem.setStatus("delivered");
		
		if(dao.updateStatus(orderItem)=="success") {
			
			OrderItem order_item = dao.getOrderItemByID(order_id);

			//Reduce Flipkart's balance
			FlipkartAccountDAO faccdao = new FlipkartAccountDAO();
			FlipkartAccount flipkart_acc = faccdao.getFlipkartAccount();
			flipkart_acc.setBalance(order_item.getAmount_paid());
			//System.out.println(".................................................."+flipkart_acc.getBalance()+"Bal.................");
			if(faccdao.reduceBalance(flipkart_acc)=="success") {
				SellerAccountDAO sellerAccDao = new SellerAccountDAO();	
				//Add to seller's account
				SellerAccount account = sellerAccDao.getAccountBySellerID(order_item.getSeller_id());
				if(account!=null) {
					account.setBalance(order_item.getAmount_paid());
					return sellerAccDao.addBalance(account);
				}
			}
		}
		
		return "fail";
	}
	
	//Seller updated shipped
	@Path("/shipOrder/{id}")
	@POST
	public String shipOrder(@PathParam("id") int order_id) {
			
		OrderItemDAO dao = new OrderItemDAO();
		OrderItem orderItem = new OrderItem();
		orderItem.setOrder_id(order_id);
		orderItem.setStatus("shipped");
		return dao.updateStatus(orderItem);
	}
	
	//Seller cancelled
	@Path("/cancelOrder/{id}")
	@POST
	public String cancelOrder(@PathParam("id") int order_id) {
			
		OrderItemDAO dao = new OrderItemDAO();
		OrderItem orderItem = new OrderItem();
		orderItem.setOrder_id(order_id);
		orderItem.setStatus("cancelled");
		
		if(dao.updateStatus(orderItem)=="success"){
			OrderItem order_item = dao.getOrderItemByID(order_id);
			//Reduce Flipkart's balance
			FlipkartAccountDAO faccdao = new FlipkartAccountDAO();
			FlipkartAccount flipkart_acc = faccdao.getFlipkartAccount();
			flipkart_acc.setBalance(order_item.getAmount_paid());
			
			if(faccdao.reduceBalance(flipkart_acc)=="success") {
				
				//Add money to buyer account
				BuyerAccountDAO buyerAccDao = new BuyerAccountDAO();	
				BuyerAccount account = buyerAccDao.getAccountByBuyerID(order_item.getBuyer_id()).get(0);
				account.setBalance(order_item.getAmount_paid());
				return buyerAccDao.addBalance(account);
			}
		}
		return "fail";
	}
	
	//Get all the seller orders
	@Path("/getSellerOrders/{id}")
	@GET
	@Produces("application/json")
	public String getOrdersBySellerId(@PathParam("id") int seller_id){
			
		OrderItemDAO OrderDao = new OrderItemDAO();
		
		List<OrderItem> orderItems = OrderDao.getOrderItemBySellerID(seller_id);	
		
		JSONArray allOrders = new JSONArray();
			
		try {
			
			ItemDAO itemDao = new ItemDAO();
			BuyerDAO buyerDao = new BuyerDAO();
			BuyerAddressDAO buyerAddDao = new BuyerAddressDAO();
			ItemImagesDAO itemImageDao = new ItemImagesDAO();
			
			if(orderItems!=null) {
				for(int i=0;i< orderItems.size();i++) {
				
					OrderItem orderItem =orderItems.get(i); 
					
					JSONObject order = new JSONObject(orderItem);
				
					int item_id = orderItem.getItem_id();
					int order_id = orderItem.getOrder_id();
					int buyer_id = orderItem.getBuyer_id();
					int address_id = orderItem.getAddress_id();
					
					
					Item item = itemDao.getItemByItemId(item_id);	
					order.put("item_id",item.getId());
					order.put("item_name",item.getName());
					
					Buyer buyer = buyerDao.getUserById(buyer_id);
					order.put("buyer_name",buyer.getName());
				
					BuyerAddress buyerAddress = buyerAddDao.getAddressByid(address_id);
					order.put("buyer_address",buyerAddress.getAddress());
					
					List<ItemImages> itemImages = itemImageDao.getItemImagesByItemId(item_id);
					order.put("image_location",itemImages.get(0).getImage_location());
					
					allOrders.put(order);
				}
			
				return allOrders.toString();
			}
		}
		
		catch(Exception e) {	
			e.printStackTrace();
		}
		return null;
	}
}
