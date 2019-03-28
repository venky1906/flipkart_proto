package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.BuyerAccount;
import org.iiitb.ooad.model.FlipkartAccount;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class FlipkartAccountDAO extends HibernateDAO<FlipkartAccount> {
	
	String entity="FlipkartAccount";
	
	public FlipkartAccount getFlipkartAccount()
	{
		return super.find(entity, "accountno", "334455667788");
	}
	
	public int updateBalance(FlipkartAccount account)
	{
		try {
			
			List<Field> fields = new ArrayList<Field>();
			Field balance_field = account.getClass().getDeclaredField("balance");
			balance_field.setAccessible(true);
			fields.add(balance_field);
			if(super.update(account, "accountno", account.getAccountno(), fields)==1)
				return 1;
			else
				return 0;
		}
		
		catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	public String reduceBalance(FlipkartAccount account) {
		FlipkartAccount curr_acc = getFlipkartAccount();
		float balance = curr_acc.getBalance();
		curr_acc.setBalance(balance-account.getBalance());
		//System.out.println(".........................."+curr_acc.getBalance());
		if(updateBalance(curr_acc)==1) {
			return "success";
		}
		return "fail";
	}
	
	public String addBalance(FlipkartAccount account){
		FlipkartAccount curr_acc = getFlipkartAccount();
		float balance = curr_acc.getBalance();
		//System.out.println(".........................."+curr_acc.getBalance());
		curr_acc.setBalance(balance+account.getBalance());
		if(updateBalance(curr_acc)==1) {
			return "success";
		}
		return "fail";
	}
	
	public int updateFlipkartBalance(FlipkartAccount account)
	{
		try {
			
			List<Field> fields = new ArrayList<Field>();
			Field balance_field = account.getClass().getDeclaredField("balance");
			balance_field.setAccessible(true);
			fields.add(balance_field);
			if(super.update(account, "accountno", account.getAccountno(), fields)==1) {
				return 1;
			}
			else
				return 0;
		}
		
		catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
}
