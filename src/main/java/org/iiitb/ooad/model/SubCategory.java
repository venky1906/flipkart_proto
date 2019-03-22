package org.iiitb.ooad.model;

public class SubCategory {
	
	private int subcategory_id;
	private int category_id;
	private String name;
	private String subcat_img;
		
	public SubCategory() {
		
	}
	
	public int getSubcategory_id() {
		return subcategory_id;
	}
	
	public void setSubcategory_id(int subcategory_id) {
		this.subcategory_id = subcategory_id;
	}
	
	public int getCategory_id() {
		return category_id;
	}
	
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getSubcat_img() {
		return subcat_img;
	}
	
	public void setSubcat_img(String subcat_img) {
		this.subcat_img = subcat_img;
	}

}
