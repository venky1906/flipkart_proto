package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.SellerAccount;;

public class SellerAccountDAO extends HibernateDAO<SellerAccount> {

	String entity="SellerAccount";
	
	public List<SellerAccount> getAccountBySellerID(int seller_id)
	{
		List<SellerAccount> accounts = super.findAll(entity, "seller_id", seller_id);
		if (accounts.size() == 0) {
			return null;
		}
		return accounts;
	}
	public SellerAccount getAccountByAccountno(String account_no)
	{
		return super.find(entity, "accountno", account_no);
	}
	public SellerAccount getAccountByAccountID(int account_id)
	{
		return super.find(entity, "id", Integer.toString(account_id));
	}
	
	public String UpdateBalance(int account_id, float balance)
	{
		//return super.find(entity, "id", Integer.toString(account_id));
		return "success";
	}
	
	public int addSellerAccount(SellerAccount account)
	{
		try {
			return super.add(account);
		}
		catch(Exception e){
			//e.printStackTrace();
			return -1;
		}
	}

}
