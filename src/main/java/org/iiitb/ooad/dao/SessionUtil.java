package org.iiitb.ooad.dao;

import org.hibernate.Cache;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class SessionUtil
{

	private static SessionUtil instance = new SessionUtil();
	private SessionFactory sessionFactory;
	private ServiceRegistry serviceRegistry;
	Cache cache;

	public static SessionUtil getInstance()
	{
		return instance;
	}

	private SessionUtil()
	{
		Configuration configuration = new Configuration();
		configuration.configure("hibernate.cfg.xml");
		serviceRegistry = new StandardServiceRegistryBuilder().applySettings(
	            configuration.getProperties()).build();
	    sessionFactory = configuration.buildSessionFactory(serviceRegistry);
	    cache = sessionFactory.getCache();
	}

	public static Session getSession()
	{
		SessionUtil s = getInstance();
		Session session = s.sessionFactory.openSession();
		if (session != null) 
		{
		    session.clear(); // internal cache clear
		}
		if (s.cache != null) 
		{
		    s.cache.evictAllRegions(); // Evict data from all query regions.
		}
		return session;
	}
}