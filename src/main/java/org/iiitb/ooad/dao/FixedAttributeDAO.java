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
	
}

