package org.iiitb.ooad.model;

public class Review {

	private int id;
	private int orderItem_id;
	private int buyer_id;
	private int item_id;
	private int seller_id;
	private String rating;
	private String review;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOrderItem_id() {
		return orderItem_id;
	}
	public void setOrderItem_id(int id) {
		this.orderItem_id = id;
	}
	public int getBuyer_id() {
		return buyer_id;
	}
	public void setBuyer_id(int id) {
		this.buyer_id = id;
	}
	public int getItem_id() {
		return item_id;
	}
	public void setItem_id(int id) {
		this.item_id = id;
	}
	public int getSeller_id() {
		return seller_id;
	}
	public void setSeller_id(int id) {
		this.seller_id = id;
	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	
}
