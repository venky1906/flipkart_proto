package org.iiitb.ooad.services;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.iiitb.ooad.model.*;
import org.iiitb.ooad.dao.*;

@SuppressWarnings("unused")
@Path("/payment")
public class PaymentServices {
	
	// API to get all the Items By a Seller.
	@POST
	@Path("/getAccountDetails/{id}")
	@Produces("application/json")
	public List<BuyerAccount> getAccountDetails(@PathParam("id") int buyer_id){
		BuyerAccountDAO dao = new BuyerAccountDAO();
		return dao.getAccountByBuyerID(buyer_id);
	}
	
	// Verify PIN
	@POST
	@Path("/verifyPIN")
	@Consumes("application/json")
	public String verifyPIN(BuyerAccount account)
	{
		BuyerAccountDAO dao = new BuyerAccountDAO();
		BuyerAccount curr_account = dao.getAccountByAccountID(account.getId());
		
		if(curr_account != null)
		{
			if(account.getPin().equals(curr_account.getPin()))
				return Float.toString(curr_account.getBalance());
			else {
				return "incorrect";
			}
		}
		else {
			return "fail";
		}
	}
	
	//Update Bank Balance
	@POST
	@Path("/updateBalance")
	@Consumes("application/json")
	public String updateBalance(BuyerAccount account) {
		BuyerAccountDAO dao = new BuyerAccountDAO();
		return dao.reduceBalance(account);
	}
}