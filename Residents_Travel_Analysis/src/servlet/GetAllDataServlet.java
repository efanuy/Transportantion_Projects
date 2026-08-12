package servlet;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.alibaba.fastjson.JSON;


@WebServlet("/GetAllDataServlet")
public class GetAllDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetAllDataServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String[] data1 = new String[24];
		String[] data2 = new String[24];
		String[] data3 = new String[24];
		
		try{
			Class.forName("org.apache.hive.jdbc.HiveDriver");
			Date date = new Date();
			SimpleDateFormat dd=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			for(int i=0;i<24;i++){
	        	date = dd.parse("2017-02-26 00:00:00");
	        	Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306","nafe","zyf1210");  
				con.prepareStatement("use mobile").executeQuery();
				PreparedStatement sta = con.prepareStatement("select count(*) from mobile_26 where start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
				System.out.println("select count(*) from mobile_26 where start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            ResultSet result = sta.executeQuery();  
	            while(result.next()){
	            	data1[i] = result.getString(1);
	                System.out.println(dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + " count:" +result.getString(1));  
	            }
	             
	            date = dd.parse("2017-02-27 00:00:00");
				con.prepareStatement("use mobile").executeQuery();
				PreparedStatement sta2 = con.prepareStatement("select count(*) from mobile_27 where start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            System.out.println("select count(*) from mobile_27 where start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            ResultSet result2 = sta2.executeQuery();  
	            while(result2.next()){
	            	data2[i] = result2.getString(1);
	                System.out.println(dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + " count:" +result2.getString(1));  
	            }
	            
	            date = dd.parse("2017-02-28 00:00:00");
				con.prepareStatement("use mobile").executeQuery();
				PreparedStatement sta3 = con.prepareStatement("select count(*) from mobile_28 where start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            System.out.println("select count(*) from mobile_28 where start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            ResultSet result3 = sta3.executeQuery();  
	            while(result3.next()){
	            	data3[i] = result3.getString(1);
	                System.out.println(dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + " count:" +result3.getString(1));  
	            }
			}
                 
        } catch(SQLException | ParseException | ClassNotFoundException e) {  
               e.printStackTrace();  
        }
		
		Map<String, Object> map = new HashMap<>();
		map.put("data1", data1);
		map.put("data2",data2);
		map.put("data3", data3);
		
		response.getWriter().println(JSON.toJSONString(map));
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
