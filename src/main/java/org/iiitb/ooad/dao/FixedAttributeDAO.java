package org.iiitb.ooad.dao;

import java.util.ArrayList;
import java.util.List;
import org.iiitb.ooad.model.FixedAttribute;

public class FixedAttributeDAO extends HibernateDAO<FixedAttribute> {
	
	String entity="FixedAttribute";

	public List<FixedAttribute> getFixedAttributeValuesBySubcatId(int subcategory_id)
	{
		return super.findAll(entity,"subcategory_id",subcategory_id);
	}
	
	public int addFixedAttribute(FixedAttribute fixedAttribute)
	{
		try {
			super.add(fixedAttribute);
			return 1;
		}
		
		catch(Exception e){
	//		e.printStackTrace();
			return -1;
		}
	}
	
}

