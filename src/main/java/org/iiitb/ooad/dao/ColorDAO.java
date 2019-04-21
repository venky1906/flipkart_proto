package org.iiitb.ooad.dao;

import java.util.List;

import org.iiitb.ooad.model.Color;

public class ColorDAO extends HibernateDAO<Color>{
	
	String entity="Color";

	public List<Color> getColorsBySubcategoryId(int subcategory_id)
	{
		return super.findAll(entity,"subcategory_id",subcategory_id);
	}
	
	public void addColor(Color color) {
		try {
			super.add(color);
		}
		
		catch(Exception e)
		{
			e.printStackTrace();
			//return -1;
		}
	}
	
}