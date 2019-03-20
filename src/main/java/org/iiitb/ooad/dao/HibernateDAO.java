package org.iiitb.ooad.dao;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unused")
public class HibernateDAO<E> {

	protected Class<? extends E> daoType;
	Session session;
	Transaction tx;
	
	
	public void add(E entity)
	{
		session = SessionUtil.getSession();
		tx = session.beginTransaction();
		session.persist(entity);
		session.flush();
		tx.commit();
		session.close();
	}
	
	@SuppressWarnings("unchecked")
	public E find(String entity_name, String param, String val)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from "+ entity_name + " where "+param+" = :val";
		Query query = session.createQuery(hql);
		query.setParameter("val", val);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		if (entity.size() == 0)
			return null;
		return entity.get(0);
	}

}
