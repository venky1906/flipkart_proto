package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.Seller;

public class SellerDAO extends HibernateDAO<Seller> {
	
	public Seller getUserByEmail(Seller user)
	{
		return super.find("User", "email", user.getEmail());
	}
	public Seller getUserByMobile(Seller user)
	{
		return super.find("User", "mobile", user.getPhone_no());
	}

}
