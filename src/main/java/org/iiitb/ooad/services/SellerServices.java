package org.iiitb.ooad.services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.iiitb.ooad.dao.ItemDAO;
import org.iiitb.ooad.model.Item;
import org.iiitb.ooad.dao.ItemDetailsDAO;
import org.iiitb.ooad.model.ItemDetails;
import org.iiitb.ooad.model.ItemImages;
import org.iiitb.ooad.model.Seller;
import org.iiitb.ooad.model.SellerAccount;
import org.json.JSONArray;
import org.json.*;
import org.iiitb.ooad.dao.ItemImagesDAO;
import org.iiitb.ooad.dao.SellerAccountDAO;
import org.iiitb.ooad.dao.SellerDAO;

@Path("/seller")
public class SellerServices {
	
//	private String images_folder = "/home/sravya/git/flipkart_proto/src/main/webapp/images/catalog/";
	private String images_folder = "/Users/pranithreddy/Desktop/git/flipkart-prototype/src/main/webapp/images/catalog/";
	
	@Path("/addItem")
	@POST
	@Consumes("application/json")
	public int addItem(Item item){
		
		ItemDAO dao = new ItemDAO();
		int item_id = dao.addItem(item);
		return item_id;
		
	}
	
	@Path("/addItemDetails")
	@POST
	@Consumes("application/json")
	public String addItemDetails(List<ItemDetails> itemDetails) {
			
		ItemDetailsDAO dao = new ItemDetailsDAO();
		for(int i=0;i<itemDetails.size();i++){
			int id = dao.addItemDetail(itemDetails.get(i));
			if(id==-1) {
				return "fail";
			}
		}
		return "success";
	}

	
	@Path("/addItemImage")
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.TEXT_PLAIN)
	public String addItemImage(
			@FormDataParam("image")InputStream uploadedInputStream,
			@FormDataParam("image")FormDataContentDisposition fileDetail,
			@FormDataParam("item_id") int item_id,
			@FormDataParam("img_num") int img_num)throws Exception{
		
		try {
			
			
			String images_location = images_folder + Integer.toString(item_id)+"/";
			new File(images_location).mkdir();
		
			if(fileDetail!=null) {
				
				String[] image_name_extension = fileDetail.getFileName().split("[\\.\\s]+");
				String extension = image_name_extension[image_name_extension.length-1];
				String top_image_location = images_location + Integer.toString(img_num) +"." + extension;
				String image_location = "images/catalog/" + Integer.toString(item_id)+"/"+ Integer.toString(img_num) + "." + extension;
				writeToFile(uploadedInputStream, top_image_location);
				
				ItemImagesDAO imagesDao = new ItemImagesDAO();
				ItemImages itemImage = new ItemImages(item_id,image_location);
				System.out.println(item_id);
				int id=imagesDao.addItemImage(itemImage);
				if(id!=-1) {
					return "success";
				}
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			return "fail";
		}
		return "fail";
	}

	
	private void writeToFile(InputStream uploadedInputStream, String uploadedFileLocation){
		try
            {
                    OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
                    int read = 0;
                    byte[] bytes = new byte[1024];

                    out = new FileOutputStream(new File(uploadedFileLocation));
                    while ((read = uploadedInputStream.read(bytes)) != -1)
                    {
                            out.write(bytes, 0, read);
                    }
                    out.flush();
                    out.close();
            }catch (IOException e)
            {

                    e.printStackTrace();
            }

    }
	
}
