package org.iiitb.ooad.model;

public class ItemImages {
	
	private int id;
	private int item_id;
	private String image_location;
	 
	public ItemImages(){
		
	}
	
	public ItemImages(int item_id,String image_location){
		
		this.item_id = item_id;
		this.image_location = image_location;
		
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
	public String getImage_location() {
		return image_location;
	}
	public void setImage_location(String image_location) {
		this.image_location = image_location;
	}
	
}
