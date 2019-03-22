package org.iiitb.ooad.model;

public class Category {
	
	private int category_id;
	private String name;
	private String cat_img;
	
	public Category() {
		
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
	public String getCat_img() {
		return cat_img;
	}
	public void setCat_img(String cat_img) {
		this.cat_img = cat_img;
	}

}
