package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.Review;
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
}
