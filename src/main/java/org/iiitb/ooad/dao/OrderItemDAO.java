package org.iiitb.ooad.dao;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.iiitb.ooad.model.OrderItem;

public class OrderItemDAO extends HibernateDAO<OrderItem> {
	
	String entity="OrderItem";
	
	public OrderItem getOrderItemByOrderID(int id)
	{
		return super.find(entity, "order_id", id);
	}
	
	public List<OrderItem> getOrderItemByItemID(int id)
	{
		List<OrderItem> orderItems = super.findAll(entity, "item_id", id);
		if (orderItems.size() == 0) {
			return null;
		}
		return orderItems;
	}
	
	public List<OrderItem> getOrderItemBySellerID(int id)
	{
		List<OrderItem> orderItems = super.findAll(entity, "seller_id", id);
		if (orderItems.size() == 0) {
			return null;
		}
		return orderItems;
	}
	
	public List<OrderItem> getOrderByBuyerID(int buyer_id)
	{
		List<OrderItem> orderItems = super.findAll(entity, "buyer_id", buyer_id);
		if (orderItems.size() == 0) {
			return null;
		}
		return orderItems;
	}
	
	public int addOrderItem(OrderItem orderItem)
	{
		try {
			return super.add(orderItem);
		}
		catch(Exception e){
			e.printStackTrace();
			return -1;
		}
	}
	
	public OrderItem getOrderItemByID(int id)
	{
		return super.find(entity, "order_id", id);
	}
	
	public String updateStatus(OrderItem orderItem){
		
		try {
		
			List<Field> fields = new ArrayList<Field>();
			Field status_field = orderItem.getClass().getDeclaredField("status");
			status_field.setAccessible(true);
			fields.add(status_field);
			if(super.update(orderItem, "order_id", orderItem.getOrder_id(), fields)==1)
				return "success";
			else
				return "fail";
		}
		
		catch(Exception e) {
			e.printStackTrace();
			return "fail";
		}
	}

}
