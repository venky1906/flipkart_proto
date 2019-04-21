package org.iiitb.ooad.model;

public class Item {
	
	private int item_id;
	private String id;
	private String name;
	private int subcategory_id;
	private int quantity;
	private float price;
	private String brand;
	private String description;
	private String manufacture_date;
	private String color;
	//private String added_date;
	private float discount;
	private int seller_id;
	private String attribute1;

	public Item(){
		
	}
	
	public Item(String name,int subcategory_id,int quantity,float price,String brand,String description,String manufacture_date,
			String color,float discount,int seller_id,String id)
	{
		
		setBrand(brand);
		setColor(color);
		setDescription(description);
		setDiscount(discount);
		setManufacture_date(manufacture_date);
		setName(name);
		setPrice(price);
		setQuantity(quantity);
		setSeller_id(seller_id);
		setSubcategory_id(subcategory_id);
		setId(id);
	}	

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public int getItem_id() {
		return item_id;
	}

	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getSubcategory_id() {
		return subcategory_id;
	}

	public void setSubcategory_id(int subcategory_id) {
		this.subcategory_id = subcategory_id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getManufacture_date() {
		return manufacture_date;
	}

	public void setManufacture_date(String manufacture_date) {
		this.manufacture_date = manufacture_date;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	/*public String getAdded_date() {
		return added_date;
	}

	public void setAdded_date(String addeddate) {
		this.added_date = addeddate;
	}*/

	public float getDiscount() {
		return discount;
	}

	public void setDiscount(float discount) {
		this.discount = discount;
	}

	public int getSeller_id() {
		return seller_id;
	}

	public void setSeller_id(int seller_id) {
		this.seller_id = seller_id;
	}
	
	public String getAttribute1() {
		return attribute1;
	}

	public void setAttribute1(String attribute1) {
		this.attribute1 = attribute1;
	}

}
