package org.iiitb.ooad.model;

public class BuyerAccount {

	private int id;
	private int buyer_id;
	private String accountno;
	private String pin;
	private float balance;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBuyer_id() {
		return buyer_id;
	}
	public void setBuyer_id(int id) {
		this.buyer_id = id;
	}
	public String getAccountno() {
		return accountno;
	}
	public void setAccountno(String acc_no) {
		this.accountno = acc_no;
	}
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	public float getBalance() {
		return balance;
	}
	public void setBalance(float balance) {
		this.balance = balance;
	}
	
}
