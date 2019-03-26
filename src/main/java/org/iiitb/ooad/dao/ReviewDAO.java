package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.Review;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class ReviewDAO extends HibernateDAO<Review> {
	
	String entity="Review";
	
	public List<Review> getReviewsByItemID(int item_id)
	{
		List<Review> reviews = super.findAll(entity, "item_id", item_id);
		if (reviews.size() == 0) {
			return null;
		}
		return reviews;
	}
	
	public Review getReviewByOrderItemID(int id)
	{
		return super.find(entity, "orderItem_id", id);
	}
	
	public double averageRatingOfItem(int item_id)
	{
		return super.average(entity, "rating", "item_id", item_id);
	}
	
	public double averageRatingOfSeller(int seller_id)
	{
		return super.average(entity, "rating", "seller_id", seller_id);
	}
	
	public long totalItemRatings(int item_id)
	{
		return super.count(entity, "rating", "item_id", item_id);
	}
	
	public long totalItemReviews(int item_id)
	{
		return super.count(entity, "review", "item_id", item_id);
	}
	
	public int addReview(Review review)
	{
		try {
			return super.add(review);
		}
		catch(Exception e){
			e.printStackTrace();
			return -1;
		}
	}
	
	public int updateReview(Review review)
	{
		try {
			List<Field> fields = new ArrayList<Field>();
			
			Field rating_field = review.getClass().getDeclaredField("rating");
			rating_field.setAccessible(true);
			fields.add(rating_field);
			
			Field review_field = review.getClass().getDeclaredField("review");
			review_field.setAccessible(true);
			fields.add(review_field);
			if(super.update(review, "id", review.getId(), fields)==1)
				return review.getId();
			else
				return -1;
		
		}
		catch(Exception e){
			e.printStackTrace();
			return -1;
		}
	}
}
