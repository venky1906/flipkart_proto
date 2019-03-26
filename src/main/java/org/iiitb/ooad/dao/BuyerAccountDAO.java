package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.BuyerAccount;

import java.lang.reflect.Field;
import java.util.ArrayList;
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
	
	public BuyerAccount getAccountByAccountID(int account_id)
	{
		return super.find(entity, "id", account_id);
	}
	
	public int updateBalance(BuyerAccount account)
	{
		try {
			
			List<Field> fields = new ArrayList<Field>();
			Field balance_field = account.getClass().getDeclaredField("balance");
			balance_field.setAccessible(true);
			fields.add(balance_field);
			if(super.update(account, "id", account.getId(), fields)==1)
				return 1;
			else
				return 0;
		}
		
		catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public String reduceBalance(BuyerAccount account) {
		BuyerAccount curr_acc = getAccountByAccountID(account.getId());
		float balance = curr_acc.getBalance();
		curr_acc.setBalance(balance-account.getBalance());
		if(updateBalance(curr_acc)==1) {
			return "success";
		}
		return "fail";
	}
	
	public String addBalance(BuyerAccount account){
		BuyerAccount curr_acc = getAccountByAccountID(account.getId());
		float balance = curr_acc.getBalance();
		curr_acc.setBalance(balance+account.getBalance());
		if(updateBalance(curr_acc)==1) {
			return "success";
		}
		return "fail";
	}
	
	public int addBuyerAccount(BuyerAccount account)
	{
		try {
			return super.add(account);
		}
		catch(Exception e){
			e.printStackTrace();
			return -1;
		}
	}
	
	public BuyerAccount getAccountByAccountno(String account_no)
	{
		return super.find(entity, "accountno", account_no);
	}
}
