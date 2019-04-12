package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.SubCategory;

public class SubCategoryDAO extends HibernateDAO<SubCategory> {
	
	String entity="SubCategory";

	public List<SubCategory> getSubCategoryByCategoryId(int category_id)
	{
		return super.findAll(entity,"category_id",category_id);
	}
	
	public SubCategory getSubCategory(int id) {
		return super.find(entity, "subcategory_id", id);
	}

	public List<SubCategory> getSubCategoryTable(){		//RETURNS FULL TABLE
		return super.list(new SubCategory());
	}
	
	public void addSubCategory(SubCategory subcategory)
	{
		try {
			int subcategory_id = super.add(subcategory);
			//return item_id;
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			//return -1;
		}
	}
}
