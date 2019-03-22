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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.iiitb.ooad.dao.ItemDAO;
import org.iiitb.ooad.model.Item;
import org.iiitb.ooad.dao.ItemDetailsDAO;
import org.iiitb.ooad.model.ItemDetails;
import org.iiitb.ooad.model.ItemImages;
import org.iiitb.ooad.dao.ItemImagesDAO;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.Date;

@Path("/seller")
public class SellerServices {

	@Path("/addItem")
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.TEXT_PLAIN)
	public String addItem(
			@FormDataParam("image")InputStream uploadedInputStream,
			@FormDataParam("image")FormDataContentDisposition fileDetail,
			@FormDataParam("keyValuePairs") JSONArray keyValuePairs,
			@FormDataParam("item") JSONObject item
			)throws Exception{
		
		try {
					
			//Adding item to item table
			
			Item new_item = new Item(item.getString("name"),item.getInt("subcategory_id"),item.getInt("quantity"),
					(float)item.getDouble("price"),item.getString("brand"),item.getString("description"),
					item.getString("manufacture_date"),item.getString("color"),
					(float)item.getDouble("discount"),item.getInt("seller_id"));
								
			ItemDAO dao = new ItemDAO();
			int item_id = dao.addItem(new_item);
			
			if(item_id==-1)
				return "fail";
			
			
			// Adding images to image table with obtained item id and organize to folders.
			
//			String images_folder = "/home/sravya/git/flipkart_proto/src/main/webapp/images/catalog/" + Integer.toString(item_id)+"/";
			
			String images_folder = "/Users/pranithreddy/Desktop/git/flipkart-prototype/src/main/webapp/images/catalog/"+Integer.toString(item_id)+"/";
			
			try {
				new File(images_folder).mkdir();
			}
			
			catch(Exception e) {
				
				System.out.println(e.getMessage());
				
			}
			
			// TODO extra images to images Table.
			
			if(fileDetail!=null) {
			
				String[] image_name_extension = fileDetail.getFileName().split("[\\.\\s]+");
				String extension = image_name_extension[image_name_extension.length-1];
				String image_location = "images/catalog/" + Integer.toString(item_id)+"/" + "1" + "." + extension;
				String top_image_location = images_folder + "1." + extension;
				writeToFile(uploadedInputStream, top_image_location);
				
				ItemImagesDAO imagesDao = new ItemImagesDAO();
				ItemImages itemImage = new ItemImages(item_id,image_location);
				
				System.out.println(item_id);
				
				imagesDao.addItemImage(itemImage);
				
			}
				
			if(keyValuePairs != null && keyValuePairs.length() > 0 ) {
			
				ItemDetailsDAO itemDetailsDao = new ItemDetailsDAO(); 
				for(int i=0;i<keyValuePairs.length();i++) {
						
					ItemDetails itemDetail = new ItemDetails(item_id,keyValuePairs.getJSONObject(i).getString("key"),keyValuePairs.getJSONObject(i).getString("value"));
					itemDetailsDao.addItemDetail(itemDetail);
					
				}
			}
			
			return "success";
			
		}
		
		catch(Exception e){
			e.printStackTrace();
			return "fail";
		}
	}
	
	
	private void writeToFile(InputStream uploadedInputStream, String uploadedFileLocation)
    {
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
