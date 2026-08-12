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
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.alibaba.fastjson.JSON;


@WebServlet("/GetAllDataServlet_bar1")
public class GetAllDataServlet_bar1 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetAllDataServlet_bar1() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String[] data1 = new String[24];
		String[] data2 = new String[24];
		String[] data3 = new String[24];
		try {
			Class.forName("com.mysql.jdbc.Driver");// 动态加载mysql驱动
            System.out.println("成功加载MySQL驱动程序");
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
		} catch (SQLException | ClassNotFoundException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		
        
		
		/*销量*/
		//Integer[] salesVolume = {200,100,200,100,200,100};
		/*营业额*/
		//double[] bussinessVolume = {10*10,100*8.5,20*9.5,56*9,35*9.5,80*9};
		/*横轴, 月份数据*/
		//String[] months = {"2","4","6","7","9","11"};
		
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
