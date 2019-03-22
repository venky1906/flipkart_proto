package org.iiitb.ooad.model;

public class ItemDetails {
	
	private int id;
	private int item_id;
	private String item_key;
	private String item_value;
	
	public ItemDetails() {
		
	}
	
	public ItemDetails(int item_id,String key,String value){
		
		this.item_id = item_id;
		this.item_key = key;
		this.item_value = value;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getItem_id() {
		return item_id;
	}
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	public String getItem_key() {
		return item_key;
	}
	public void setItem_key(String key) {
		this.item_key = key;
	}
	public String getItem_value() {
		return item_value;
	}
	public void setItem_value(String value) {
		this.item_value = value;
	}

}
