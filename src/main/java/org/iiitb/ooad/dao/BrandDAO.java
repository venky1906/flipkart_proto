package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.Brand;

public class BrandDAO extends HibernateDAO<Brand> {
	
	String entity="Brand";

	public List<Brand> getBrandsBySubcategoryId(int subcategory_id)
	{
		return super.findAll(entity,"subcategory_id",subcategory_id);
	}
	
}