package org.iiitb.ooad.services;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.iiitb.ooad.model.*;
import org.iiitb.ooad.dao.*;

@SuppressWarnings("unused")
@Path("/reviews")
public class ReviewServices {
	
	// API to get all the Reviews of the item.
	@POST
	@Path("/getAllReviewsByItemId/{id}")
	@Produces("application/json")
	public List<Review> getCategories(@PathParam("id") int item_id){
		
		ReviewDAO dao = new ReviewDAO();
		return dao.getReviewsByItemID(item_id);

	}
	
	// Average rating of the item
	@POST
	@Path("/getItemRating/{id}")
	public String getItemRating(@PathParam("id") int item_id){
		
		ReviewDAO dao = new ReviewDAO();
		return Double.toString(dao.averageRatingOfItem(item_id));

	}
	
	// Average rating of the seller
	@POST
	@Path("/getSellerRating/{id}")
	public String getSellerRating(@PathParam("id") int seller_id){
		
		ReviewDAO dao = new ReviewDAO();
		return Double.toString(dao.averageRatingOfSeller(seller_id));

	}	
	
	// Average rating of the item
	@POST
	@Path("/totalItemRatings/{id}")
	public String totalItemRatings(@PathParam("id") int item_id){
		
		ReviewDAO dao = new ReviewDAO();
		return Long.toString(dao.totalItemRatings(item_id));

	}
	
	// Average rating of the item
	@POST
	@Path("/totalItemReviews/{id}")
	public String totalItemReviews(@PathParam("id") int item_id){
		
		ReviewDAO dao = new ReviewDAO();
		return Long.toString(dao.totalItemReviews(item_id));

	}
	
	// API to add review.
	@POST
	@Path("/addReview")
	@Consumes("application/json")
	public String addReview(Review review){
		
		ReviewDAO dao = new ReviewDAO();
		System.out.println("Review:      ............."+review.getOrderItem_id());
		return Integer.toString(dao.add(review));
	}
	
	// API to update review.
	@POST
	@Path("/updateReview")
	@Consumes("application/json")
	public int updateReview(Review review){
		ReviewDAO dao = new ReviewDAO();
		return dao.updateReview(review);
	}
}
