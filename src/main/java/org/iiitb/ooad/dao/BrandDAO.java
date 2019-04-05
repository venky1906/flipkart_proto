package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.Brand;

public class BrandDAO extends HibernateDAO<Brand> {
	
	String entity="Brand";

	public List<Brand> getBrandsBySubcategoryId(int subcategory_id)
	{
		return super.findAll(entity,"subcategory_id",subcategory_id);
	}
	
	public void addBrand(Brand brand) {
		try {
			super.no_id_add(brand);
			//return item_id;
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			//return -1;
		}
	}
	
}