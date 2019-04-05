package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.SellerAccount;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.iiitb.ooad.model.BuyerAccount;
import org.iiitb.ooad.model.SellerAccount;;

public class SellerAccountDAO extends HibernateDAO<SellerAccount> {

	String entity="SellerAccount";
	
	public SellerAccount getAccountBySellerID(int seller_id)
	{
		return super.find(entity, "seller_id", seller_id);
	}
	public SellerAccount getAccountByAccountno(String account_no)
	{
		return super.find(entity, "accountno", account_no);
	}
	public SellerAccount getAccountByAccountID(int account_id)
	{
		return super.find(entity, "id", account_id);
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
	
	public int updateBalance(SellerAccount account)
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

	public String addBalance(SellerAccount account){
		SellerAccount curr_acc = getAccountByAccountID(account.getId());
		float balance = curr_acc.getBalance();
		curr_acc.setBalance(balance+account.getBalance());
		if(updateBalance(curr_acc)==1) {
			return "success";
		}
		return "fail";
	}
	
	public SellerAccount getOneAccountBySellerID(int seller_id)
	{
		return super.find(entity, "seller_id", seller_id);
	}
	
	public int updateSellerBalance(SellerAccount account)
	{
		try {
			
			List<Field> fields = new ArrayList<Field>();
			Field balance_field = account.getClass().getDeclaredField("balance");
			balance_field.setAccessible(true);
			fields.add(balance_field);
			if(super.update(account, "seller_id", account.getSeller_id(), fields)==1)
				return 1;
			else
				return 0;
		}
		
		catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public float getBalance(int seller_id)
	{
		return super.find(entity, "seller_id",seller_id).getBalance();
		
	}
}
