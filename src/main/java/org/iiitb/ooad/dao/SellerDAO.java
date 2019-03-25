package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.Buyer;
import org.iiitb.ooad.model.Seller;

public class SellerDAO extends HibernateDAO<Seller> {
	
	String entity="Seller";
	
	public Seller getUserByEmail(Seller user)
	{
		return super.find(entity, "email", user.getEmail());
	}
	public Seller getUserByMobile(Seller user)
	{
		return super.find(entity, "mobile", user.getPhone_no());
	}
	
	public boolean searchUserByEmail(Seller user)
	{
		if(super.find(entity, "email", user.getEmail())==null)
			return false;
		else
			return true;
	}
	
	public boolean searchUserByMobile(Seller user)
	{
		if(super.find(entity, "phone_no", user.getPhone_no())==null)
			return false;
		else
			return true;
	}
	public int addSeller(Seller user)
	{
		try {
		return super.add(user);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return -1;
		}
	}
	
	public Seller getSellerByID(int id)
	{
		return super.find(entity, "seller_id", id);
	}
}
