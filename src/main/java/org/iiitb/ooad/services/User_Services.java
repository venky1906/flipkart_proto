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
	public String createBuyer(Buyer user)
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
			return "exists";
		 
	}
	
	// API for user to create an account as a Seller

	@POST
	@Path("/createSeller")
	@Consumes("application/json")
	public String createSeller(Seller user)
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
			return "exists";
		 
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

}
