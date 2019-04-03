package org.iiitb.ooad.model;

public class Brand  implements java.io.Serializable{
	
	private static final long serialVersionUID = 1L;

	private String brand;
	private int subcategory_id;
	private String brand_img;
	
	public Brand() {
		
	}
	
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public int getSubcategory_id() {
		return subcategory_id;
	}
	public void setSubcategory_id(int subcategory_id) {
		this.subcategory_id = subcategory_id;
	}
	public String getBrand_img() {
		return brand_img;
	}
	public void setBrand_img(String brand_img) {
		this.brand_img = brand_img;
	}
	
}
