package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.BuyerAccount;
import java.util.List;

public class BuyerAccountDAO extends HibernateDAO<BuyerAccount> {
	
	String entity="BuyerAccount";
	
	public List<BuyerAccount> getAccountByBuyerID(int buyer_id)
	{
		List<BuyerAccount> accounts = super.findAll(entity, "buyer_id", buyer_id);
		if (accounts.size() == 0) {
			return null;
		}
		return accounts;
	}
	public BuyerAccount getAccountByAccountno(String account_no)
	{
		return super.find(entity, "accountno", account_no);
	}
	public BuyerAccount getAccountByAccountID(int account_id)
	{
		return super.find(entity, "id", Integer.toString(account_id));
	}
	
	public String UpdateBalance(int account_id, float balance)
	{
		//return super.find(entity, "id", Integer.toString(account_id));
		return "success";
	}
	
	public int addBuyerAccount(BuyerAccount account)
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
