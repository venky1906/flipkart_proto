package org.iiitb.ooad.dao;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.iiitb.ooad.model.Category;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unused")
public class HibernateDAO<E> {

	protected Class<? extends E> daoType;
	Session session;
	Transaction tx;
	
	
	public int add(E entity)
	{
		session = SessionUtil.getSession();
		tx = session.beginTransaction();
		int id = (int)session.save(entity);
		session.flush();
		tx.commit();
		session.close();
		return id;
	}
	
	public void no_id_add(E entity)
	{
		session = SessionUtil.getSession();
		tx = session.beginTransaction();
		session.save(entity);
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
	
	@SuppressWarnings("unchecked")
	public E find(String entity_name, String param, int val)
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
	
	@SuppressWarnings("unchecked")					
	public E findOn(String entity_name, String param1, int val1, String param2, String  param3, String val2)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from " + entity_name + " where " + param1 + "= :val1 "+ " and " + param2 + " <= :val2 " + " and " + param3 + " >= :val3 ";
		Query query = session.createQuery(hql);
		query.setParameter("val1", val1);
		query.setParameter("val2", val2);
		query.setParameter("val3", val2);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		if (entity.size() == 0)
			return null;
		return entity.get(0);
	}
	
	@SuppressWarnings("unchecked")					
	public List<E> findAllWithRange(String entity_name, String param1, String  param2, String val)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from " + entity_name + " where " + param1 + " <= :val1 " + " and " + param2 + " >= :val2 ";
		Query query = session.createQuery(hql);
		query.setParameter("val1", val);
		query.setParameter("val2", val);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		return entity;
	}
	
	@SuppressWarnings("unchecked")					
	public List<E> findAllNotIn(String entity_name,String param1,ArrayList<Integer> values,String param2, String  param3, String val2)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from " + entity_name + " where " + param1 + " not in :val1 " + " and " + param2 + " <= :val2 " + " and " + param3 + " >= :val3 ";
		Query query = session.createQuery(hql);
		query.setParameterList("val1", values);
		query.setParameter("val2", val2);
		query.setParameter("val3", val2);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		return entity;
	}

	@SuppressWarnings("unchecked")
	public List<E> list(E ent)
	{

		session = SessionUtil.getSession();
		session.flush();
		Query query = session.createQuery("from "+ ent.getClass().getName());
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		return entity;
	}
	
	@SuppressWarnings("unchecked")
	public List<E> findAll(String entity_name, String param, int val)
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
		return entity;
	}

	//Filter condition with one string and one int 
	@SuppressWarnings("unchecked")
	public List<E> findAllWithTwoConditions(String entity_name, String param1, String val1,String param2, int val2)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from "+ entity_name + " where "+param1+" = :val1 "+ " and " + param2 + " = :val2 ";
		Query query = session.createQuery(hql);
		query.setParameter("val1", val1);
		query.setParameter("val2", val2);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		return entity;
	}

	
	@SuppressWarnings("unchecked")					//GET ELEMENTS WIHTIN RANGE
	public List<E> findAllWithRange(String entity_name, String param, float val1, float val2)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from " + entity_name + " where " + param + " >= :val1 "  + " and "  + param + " <= :val2 ";
//		String hql = "from "+ entity_name + " where "+param+" = :val";
		Query query = session.createQuery(hql);
		query.setParameter("val1", val1);
		query.setParameter("val2", val2);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		return entity;
	}
	
	
	@SuppressWarnings("unchecked")					//GET ELEMENTS WIHTIN RANGE and val3 = subcatid
	public List<E> findAllWithRangeAndSubCategory(String entity_name, String param, float val1, float val2,String param2,int val3)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from " + entity_name + " where "+ param2 + " = :val3 "+ " and " + param + " >= :val1 "  + " and "  + param + " <= :val2 ";
//		String hql = "from "+ entity_name + " where "+param+" = :val";
		Query query = session.createQuery(hql);
		query.setParameter("val3", val3);
		query.setParameter("val1", val1);
		query.setParameter("val2", val2);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		return entity;
	}	

	@SuppressWarnings("unchecked")
	public List<E> findAllNotEqualCondition(String entity_name, String param1, int val1,String param2,int val2)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from "+ entity_name + " where "+param1+" = :val1" + " and " + param2 + "<> :val2";
		Query query = session.createQuery(hql);
		query.setParameter("val1", val1);
		query.setParameter("val2", val2);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		return entity;
	}
	
	public int deleteRow(String entity_name, String param,int val)
	{
		session = SessionUtil.getSession();
		tx = session.beginTransaction();
		session.flush();
		String hql = "delete from "+entity_name+" where " + param + "= :val";
		Query query = session.createQuery(hql);
		query.setInteger("val", val);
		int rows = query.executeUpdate();
		tx.commit();
		session.flush();
		session.close();
		return rows;
	}
	
	public int update(E entity, String param_id,int id_val, List<Field> fields)
	{
		try
		{
			session = SessionUtil.getSession();
			tx = session.beginTransaction();
			String conjunction = "";
			String set_clause = "";
			String hql ="";
			int i=0;
			for(Field p :fields)
			{
				set_clause += conjunction+p.getName() +" = :param"+i;
				i++;
				conjunction=", ";
			}
			hql = "update " + entity.getClass().getName() + " set "+set_clause+" where " + param_id + "= :id_val";
			session.flush();
			Query query = session.createQuery(hql);
			i=0;
			for(Field p :fields)
			{
				query.setParameter("param"+i, p.get(entity));
				i++;
			}
			query.setParameter("id_val", id_val);
			query.executeUpdate();

			tx.commit();
			session.flush();
			session.close();
			
			return 1;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		

		tx.commit();
		session.flush();
		session.close();
		
		return 0;
	}
	
	public int update(E entity, String param_id,String id_val, List<Field> fields)
	{
		try
		{
			session = SessionUtil.getSession();
			tx = session.beginTransaction();
			String conjunction = "";
			String set_clause = "";
			String hql ="";
			int i=0;
			for(Field p :fields)
			{
				set_clause += conjunction+p.getName() +" = :param"+i;
				i++;
				conjunction=", ";
			}
			hql = "update " + entity.getClass().getName() + " set "+set_clause+" where " + param_id + "= :id_val";
			session.flush();
			Query query = session.createQuery(hql);
			i=0;
			for(Field p :fields)
			{
				query.setParameter("param"+i, p.get(entity));
				i++;
			}
			query.setParameter("id_val", id_val);
			query.executeUpdate();

			tx.commit();
			session.flush();
			session.close();
			
			return 1;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		

		tx.commit();
		session.flush();
		session.close();
		
		return 0;
	}
	
	@SuppressWarnings("rawtypes")
	public double average(String entity_name, String attr, String param, int val) {
		session = SessionUtil.getSession();
		session.flush();
		String hql = "select avg("+attr+") from "+ entity_name + " where "+param+" = :val";
		Query query = session.createQuery(hql);
		query.setParameter("val", val);
		List list = query.list();
		session.clear();
		session.flush();
		session.close();
		if(list.get(0)==null) {
			return 0;
		}
		return (double)list.get(0);
	}
	
	@SuppressWarnings("rawtypes")
	public long count(String entity_name, String attr, String param, int val) {
		session = SessionUtil.getSession();
		session.flush();
		String hql = "select count("+attr+") from "+ entity_name + " where "+param+" = :val" + " and " + param + " is not null";
		Query query = session.createQuery(hql);
		query.setParameter("val", val);
		List list = query.list();
		session.clear();
		session.flush();
		session.close();
		if(list.get(0)==null) {
			return 0;
		}
		return (long)list.get(0);
	}
	
	@SuppressWarnings("unchecked")
	public E find(String entity_name, String param1, int val1,String param2, int val2)
	{
		session = SessionUtil.getSession();
		session.flush();
		String hql = "from "+ entity_name + " where "+param1+" = :val1 and "+param2+" = :val2";
		Query query = session.createQuery(hql);
		query.setParameter("val1", val1);
		query.setParameter("val2", val2);
		List<E> entity = query.list();
		session.clear();
		session.flush();
		session.close();
		if (entity.size() == 0)
			return null;
		return entity.get(0);
	}
	
	public int deleteRow(String entity_name, String param1,int val1,String param2,int val2)
	{
		session = SessionUtil.getSession();
		tx = session.beginTransaction();
		session.flush();
		String hql = "delete from "+entity_name+" where " + param1 + "= :val1 and "+ param2 + "= :val2";
		Query query = session.createQuery(hql);
		query.setInteger("val1", val1);
		query.setInteger("val2", val2);
		int rows = query.executeUpdate();
		tx.commit();
		session.flush();
		session.close();
		return rows;
	}
	
	@SuppressWarnings("unchecked")
	public List<String> getAllDistinct(String entity_name,String attr,String param, int val) {
		session = SessionUtil.getSession();
		session.flush();
		String hql = "select distinct "+ attr+" from " + entity_name + " where "+param+" = :val";
		Query query = session.createQuery(hql);
		query.setParameter("val", val);
		
		List<String> list = query.list();
		System.out.println(list);
		session.clear();
		session.flush();
		session.close();
		return list;
	}

}