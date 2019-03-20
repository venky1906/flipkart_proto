package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.Buyer;

public class BuyerDAO extends HibernateDAO<Buyer> {
	
	String entity="Buyer";
	
	public Buyer getUserByEmail(Buyer user)
	{
		return super.find(entity, "email", user.getEmail());
	}
	
	public Buyer getUserByMobile(Buyer user)
	{
		return super.find(entity, "phone_no", user.getPhone_no());
	}
	
	public boolean searchUserByEmail(Buyer user)
	{
		if(super.find(entity, "email", user.getEmail())==null)
			return false;
		else
			return true;
	}
	
	public boolean searchUserByMobile(Buyer user)
	{
		if(super.find(entity, "phone_no", user.getPhone_no())==null)
			return false;
		else
			return true;
	}
	public String addBuyer(Buyer user)
	{
		try {
		super.add(user);
		return "true";
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return "false";
		}
	}
}
