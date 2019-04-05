package org.iiitb.ooad.dao;

import org.iiitb.ooad.model.BuyerAddress;
import java.util.List;

public class BuyerAddressDAO extends HibernateDAO<BuyerAddress> {
	
	String entity="BuyerAddress";
	
	public List<BuyerAddress> getAddressByBuyerID(int buyer_id)
	{
		List<BuyerAddress> addresses = super.findAll(entity, "buyer_id", buyer_id);
		if (addresses.size() == 0) {
			return null;
		}
		return addresses;
	}
	
	public int addBuyerAddress(BuyerAddress address)
	{
		try {
			return super.add(address);
		}
		catch(Exception e){
			e.printStackTrace();
			return -1;
		}
	}
	
	public BuyerAddress getAddressByid(int address_id) {
		return super.find(entity,"id",address_id);
	}
}
