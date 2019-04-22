package org.iiitb.ooad.model;

public class Buyer {

	private int id;
	private String name;
	private String email;
	private String phone_no;
	private String pic_location;
	private String password;
	private String gender;
	private String dob;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	
	public String getDob() {
		return this.dob;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone_no() {
		return phone_no;
	}
	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}
	public String getPic_location() {
		return pic_location;
	}
	public void setPic_location(String pic_location) {
		this.pic_location = pic_location;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
		
}
