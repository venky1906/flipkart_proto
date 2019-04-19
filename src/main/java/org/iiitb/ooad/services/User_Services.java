package org.iiitb.ooad.services;

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.iiitb.ooad.model.*;
import org.iiitb.ooad.dao.*;

@SuppressWarnings("unused")
@Path("/user")
public class User_Services {
	
	
	// API for Buyer to authenticate for flipkart service via email
	
	@POST
	@Path("/authenticateBuyerEmail")
	@Consumes("application/json")
	@Produces("application/json")
	public Buyer getUserByEmail(Buyer user)
	{
		BuyerDAO dao = new BuyerDAO();
		Buyer user_data = dao.getUserByEmail(user);
		
		if(user_data != null)
		{
			if(!user.getPassword().equals(user_data.getPassword()))
				return user;
			else
				return user_data;
		}
		else
			return null;
	}

	// API for Buyer to authenticate for flipkart service via mobile number
	
	@POST
	@Path("/authenticateBuyerMobile")
	@Consumes("application/json")
	@Produces("application/json")
	public Buyer getUserByMobile(Buyer user)
	{
		BuyerDAO dao = new BuyerDAO();
		Buyer user_data = dao.getUserByMobile(user);
		if(user_data==null)
			return null;
		if(!user.getPassword().equals(user_data.getPassword()))
			return user;
		else
			return user_data;
	}
	
	// API for user to create an account as a Buyer
	
	@POST
	@Path("/createBuyer")
	@Consumes("application/json")
	public int createBuyer(Buyer user)
	{
		user.setEmail(user.getEmail());
		user.setGender(user.getGender());
		user.setName(user.getName());
		user.setPassword(user.getPassword());
		user.setPhone_no(user.getPhone_no());
		BuyerDAO dao=new BuyerDAO();
		if(!dao.searchUserByEmail(user) && !dao.searchUserByMobile(user))
			return dao.addBuyer(user);
		else
			return 0;
		 
	}
	
	@POST
	@Path("/createBuyerAccount")
	@Consumes("application/json")
	public int createBuyerAccount(BuyerAccount user)
	{
		user.setAccountno(user.getAccountno());
		user.setBalance(user.getBalance());
		user.setBuyer_id(user.getBuyer_id());
		user.setPin(user.getPin());
		
		BuyerAccountDAO dao=new BuyerAccountDAO();
		if(dao.getAccountByBuyerID(user.getBuyer_id())==null && dao.getAccountByAccountno(user.getAccountno())==null)
			return dao.addBuyerAccount(user);
		else
			return 0;
		 
	}

	// API for user to create an account as a Seller

	@POST
	@Path("/createSeller")
	@Consumes("application/json")
	public int createSeller(Seller user)
	{
		user.setEmail(user.getEmail());
		user.setGender(user.getGender());
		user.setName(user.getName());
		user.setPassword(user.getPassword());
		user.setPhone_no(user.getPhone_no());
		user.setGst_info(user.getGst_info());
		user.setAddress("iiitb");
		SellerDAO dao=new SellerDAO();
		if(!dao.searchUserByEmail(user) && !dao.searchUserByMobile(user))
			return dao.addSeller(user);
		else
			return 0;
		 
	}
	
	@POST
	@Path("/createSellerAccount")
	@Consumes("application/json")
	public int createSellerAccount(SellerAccount user)
	{
		user.setAccountno(user.getAccountno());
		user.setBalance(user.getBalance());
		user.setSeller_id(user.getSeller_id());
		user.setPin(user.getPin());
		
		SellerAccountDAO dao=new SellerAccountDAO();
		if(dao.getAccountBySellerID(user.getSeller_id())==null && dao.getAccountByAccountno(user.getAccountno())==null)
			return dao.addSellerAccount(user);
		else
			return 0;
		 
	}

	
	// API for Seller to authenticate for flipkart service via email
	
		@POST
		@Path("/authenticateSellerEmail")
		@Consumes("application/json")
		@Produces("application/json")
		public Seller getUserByEmail(Seller user)
		{
			SellerDAO dao = new SellerDAO();
			Seller user_data = dao.getUserByEmail(user);
			
			if(user_data != null)
			{
				if(!user.getPassword().equals(user_data.getPassword()))
					return user;
				else
					return user_data;
			}
			else
				return null;
		}
		
		
		//API to get buyer addresses
		
		@POST
		@Path("/getAllAddresses/{id}")
		@Produces("application/json")
		public List<BuyerAddress> getAllAddresses(@PathParam("id") int buyer_id){
			BuyerAddressDAO dao = new BuyerAddressDAO();
			//System.out.println(address.getBuyer_id());
			List<BuyerAddress> address_data = dao.getAddressByBuyerID(buyer_id);
			
			if(address_data != null){
				return address_data;
			}
				
			else {
				return null;
			}
		}
				
		
		// API for buyer to add a new address

		@POST
		@Path("/addAddress")
		@Consumes("application/json")
		public int addAddress(BuyerAddress address){
		
			address.setAddress(address.getAddress());
			address.setName(address.getName());
			address.setBuyer_id(address.getBuyer_id());
			address.setType("GENERAL");
			BuyerAddressDAO dao=new BuyerAddressDAO();
			return dao.addBuyerAddress(address);
					 
		}
		
		// API to get the Seller with id.
		@POST
		@Path("/getSellerById/{id}")
		@Produces("application/json")
		public Seller getSellerById(@PathParam("id") int seller_id){
					
			SellerDAO dao = new SellerDAO();
			Seller seller = dao.getSellerByID(seller_id);
			
			return seller;
		}
		

		@POST
		@Path("/editbuyerdetails/{attribute}")
		@Consumes("application/json")
		public String editBuyerDetails(@PathParam ("attribute") String attribute, Buyer user) {
			System.out.println(user.getId());
			BuyerDAO dao=new BuyerDAO();
			dao.updateProfile(user, attribute);
			return "success";
		}
		
		@POST
		@Path("/editsellerdetails/{attribute}")
		@Consumes("application/json")
		public String editSellerDetails(@PathParam ("attribute") String attribute, Seller seller) {
			SellerDAO dao=new SellerDAO();
			dao.updateProfile(seller,attribute);
			return "success";
		}
		
		

}
