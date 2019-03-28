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
		float amt = account.getBalance();
		if(dao.reduceBalance(account)=="success") {
			//Add Flipkart's balance
			FlipkartAccountDAO faccdao = new FlipkartAccountDAO();
			FlipkartAccount flipkart_acc = faccdao.getFlipkartAccount();
			//System.out.println(".................................................."+flipkart_acc.getBalance()+"Ba.............");
			flipkart_acc.setBalance(amt);
			return faccdao.addBalance(flipkart_acc);
		}
		return "fail";
	}
	
	@POST
	@Path("/editbuyerbalance")
	@Consumes("application/json")
	public String editBuyerBalance(BuyerAccount account) {
		BuyerAccountDAO dao=new BuyerAccountDAO();
		dao.updateBuyerBalance(account);
		return "success";
	}
	
	@POST
	@Path("/editsellerbalance")
	@Consumes("application/json")
	public String editSellerDetails(SellerAccount account) {
		SellerAccountDAO dao=new SellerAccountDAO();
		dao.updateSellerBalance(account);
		return "success";
	}
	
	@GET
	@Path("/getbuyerbalance/{buyer_id}")
	public  float getBuyerBalance(@PathParam("buyer_id") int buyer_id) {
		BuyerAccountDAO dao=new BuyerAccountDAO();
		System.out.println("Buyer Id : " + buyer_id);
		return dao.getBalance(buyer_id);
	}
	
	@GET
	@Path("/getsellerbalance/{seller_id}")
	public float getSellerBalance(@PathParam("seller_id") int seller_id) {
		SellerAccountDAO dao=new SellerAccountDAO();
		System.out.println("Seller Id : "+seller_id);
		return dao.getBalance(seller_id);
	}
	
	@GET
	@Path("/getflipkartbalance")
	public float getFlipkartBalance() {
		FlipkartAccountDAO dao=new FlipkartAccountDAO();
		FlipkartAccount fa = dao.getFlipkartAccount();
		return fa.getBalance();
	}
	
	@POST
	@Path("/editflipkartbalance")
	public String editBuyerBalance(FlipkartAccount account) {
		FlipkartAccountDAO dao=new FlipkartAccountDAO();
		dao.updateFlipkartBalance(account);
		return "success";
	}
	
	
}