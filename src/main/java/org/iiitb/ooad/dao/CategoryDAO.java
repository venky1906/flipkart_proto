package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.Category;

public class CategoryDAO extends HibernateDAO<Category> {
	
	String entity="Category";
	
	public List<Category> getCategories()
	{
		return super.list(new Category());
	}
	public Category getCategory(int id) {
		return super.find(entity, "category_id", id);
	}
	
}