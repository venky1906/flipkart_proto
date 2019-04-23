package org.iiitb.ooad.model;

public class Deal {
	private int deal_id;
	private String name;
	private String description;
	private float deal_discount;
	private String date_added;
	private String date_ended;
	private String deal_img;
	
	public Deal(){
		
	}
	
	public int getDeal_id() {
		return deal_id;
	}
	public void setDeal_id(int deal_id) {
		this.deal_id = deal_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public float getDeal_discount() {
		return deal_discount;
	}
	public void setDeal_discount(float deal_discount) {
		this.deal_discount = deal_discount;
	}
	public String getDate_added() {
		return date_added;
	}
	public void setDate_added(String date_added) {
		this.date_added = date_added;
	}
	public String getDate_ended() {
		return date_ended;
	}
	public void setDate_ended(String date_ended) {
		this.date_ended = date_ended;
	}
	public String getDeal_img() {
		return deal_img;
	}
	public void setDeal_img(String deal_img) {
		this.deal_img = deal_img;
	}
	public Deal(String name,String description, float deal_discount, String date_added, String date_ended, String deal_img) {
		this.date_added=date_added;
		this.date_ended=date_ended;
		this.deal_discount = deal_discount;
		this.deal_img = deal_img;
		this.description=description;
		this.name=name;
	}
}
