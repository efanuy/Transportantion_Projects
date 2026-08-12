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
import servlet.UserController;


@WebServlet("/GetAllDataServlet_calendar1")
public class GetAllDataServlet_calendar1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	public static String LON;
	public static String LAT;
	
	public GetAllDataServlet_calendar1() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			Class.forName("com.mysql.jdbc.Driver");// 动态加载mysql驱动
            System.out.println("成功加载MySQL驱动程序");
            Date date = new Date();
			SimpleDateFormat dd=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Map<String, Object> map = new HashMap<>();
			
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306","nafe","zyf1210");  
            con.prepareStatement("use mobile").executeQuery();
            Statement stmt = con.createStatement();
            ResultSet rs=null;
            String sql = "select LON,LAT from poi where NAME = '" + UserController.POI + "'";
        	rs = stmt.executeQuery(sql);
        	while(rs.next()){
        		LON = rs.getString(1);LAT = rs.getString(2);
            	System.out.println("lon=" + LON + ", lat=" + LAT);
        	}
        	
        	
	        
	        for(int i=0;i<24;i++){
	        	date = dd.parse("2017-02-26 00:00:00");
				con.prepareStatement("use mobile").executeQuery();
				PreparedStatement sta = con.prepareStatement("select count(*) from mobile_26 where 2 * asin(sqrt(pow(sin((" + LAT + "*3.14/180-latitude*3.14/180)/ 2), 2)+ cos(" + LAT + "*3.14/180) * cos(latitude*3.14/180)* pow(sin((" + LON + "*3.14/180-longitude*3.14/180) / 2), 2)))*6378137<=1000 and start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
				System.out.println("select count(*) from mobile_26 where 2 * asin(sqrt(pow(sin((" + LAT + "*3.14/180-latitude*3.14/180)/ 2), 2)+ cos(" + LAT + "*3.14/180) * cos(latitude*3.14/180)* pow(sin((" + LON + "*3.14/180-longitude*3.14/180) / 2), 2)))*6378137<=1000 and start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            ResultSet result = sta.executeQuery();  
	            while(result.next()){
	            	if(i==0){
	            		int data00[] = {0,12,result.getInt(1)};
	            		map.put("data00", data00);
	            	}
	            	if(i==1){
	            		int data01[] = {0,11,result.getInt(1)};
	            		map.put("data01", data01);
	            	}
	            	if(i==2){
	            		int data02[] = {0,10,result.getInt(1)};
	            		map.put("data02", data02);
	            	}
	            	if(i==3){
	            		int data03[] = {0,9,result.getInt(1)};
	            		map.put("data03", data03);
	            	}
	            	if(i==4){
	            		int data04[] = {0,8,result.getInt(1)};
	            		map.put("data04", data04);
	            	}
	            	if(i==5){
	            		int data05[] = {0,7,result.getInt(1)};
	            		map.put("data05", data05);
	            	}
	            	if(i==6){
	            		int data06[] = {0,6,result.getInt(1)};
	            		map.put("data06", data06);
	            	}
	            	if(i==7){
	            		int data07[] = {0,5,result.getInt(1)};
	            		map.put("data07", data07);
	            	}
	            	if(i==8){
	            		int data08[] = {0,4,result.getInt(1)};
	            		map.put("data08", data08);
	            	}
	            	if(i==9){
	            		int data09[] = {0,3,result.getInt(1)};
	            		map.put("data09", data09);
	            	}
	            	if(i==10){
	            		int data010[] = {0,2,result.getInt(1)};
	            		map.put("data010", data010);
	            	}
	            	if(i==11){
	            		int data011[] = {0,1,result.getInt(1)};
	            		map.put("data011", data011);
	            	}
	            	if(i==12){
	            		int data012[] = {0,0,result.getInt(1)};
	            		map.put("data012", data012);
	            	}
	            	if(i==13){
	            		int data013[] = {0,23,result.getInt(1)};
	            		map.put("data013", data013);
	            	}
	            	if(i==14){
	            		int data014[] = {0,22,result.getInt(1)};
	            		map.put("data014", data014);
	            	}
	            	if(i==15){
	            		int data015[] = {0,21,result.getInt(1)};
	            		map.put("data015", data015);
	            	}
	            	if(i==16){
	            		int data016[] = {0,20,result.getInt(1)};
	            		map.put("data016", data016);
	            	}
	            	if(i==17){
	            		int data017[] = {0,19,result.getInt(1)};
	            		map.put("data017", data017);
	            	}
	            	if(i==18){
	            		int data018[] = {0,18,result.getInt(1)};
	            		map.put("data018", data018);
	            	}
	            	if(i==19){
	            		int data019[] = {0,17,result.getInt(1)};
	            		map.put("data019", data019);
	            	}
	            	if(i==20){
	            		int data020[] = {0,16,result.getInt(1)};
	            		map.put("data020", data020);
	            	}
	            	if(i==21){
	            		int data021[] = {0,15,result.getInt(1)};
	            		map.put("data021", data021);
	            	}
	            	if(i==22){
	            		int data022[] = {0,14,result.getInt(1)};
	            		map.put("data022", data022);
	            	}
	            	if(i==23){
	            		int data023[] = {0,13,result.getInt(1)};
	            		map.put("data023", data023);
	            	}
	                System.out.println(dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + " count:" +result.getInt(1));  
	            }
	             
	            
	            date = dd.parse("2017-02-27 00:00:00");
				con.prepareStatement("use mobile").executeQuery();
				PreparedStatement sta2 = con.prepareStatement("select count(*) from mobile_27 where 2 * asin(sqrt(pow(sin((" + LAT + "*3.14/180-latitude*3.14/180)/ 2), 2)+ cos(" + LAT + "*3.14/180) * cos(latitude*3.14/180)* pow(sin((" + LON + "*3.14/180-longitude*3.14/180) / 2), 2)))*6378137<=1000 and start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            System.out.println("select count(*) from mobile_27 where 2 * asin(sqrt(pow(sin((" + LAT + "*3.14/180-latitude*3.14/180)/ 2), 2)+ cos(" + LAT + "*3.14/180) * cos(latitude*3.14/180)* pow(sin((" + LON + "*3.14/180-longitude*3.14/180) / 2), 2)))*6378137<=1000 and start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            ResultSet result2 = sta2.executeQuery();  
	            while(result2.next()){
	            	if(i==0){
	            		int data10[] = {1,12,result2.getInt(1)};
	            		map.put("data10",data10);
	            	}
	            	if(i==1){
	            		int data11[] = {1,11,result2.getInt(1)};
	            		map.put("data11",data11);
	            	}
	            	if(i==2){
	            		int data12[] = {1,10,result2.getInt(1)};
	            		map.put("data12",data12);
	            	}
	            	if(i==3){
	            		int data13[] = {1,9,result2.getInt(1)};
	            		map.put("data13",data13);
	            	}
	            	if(i==4){
	            		int data14[] = {1,8,result2.getInt(1)};
	            		map.put("data14",data14);
	            	}
	            	if(i==5){
	            		int data15[] = {1,7,result2.getInt(1)};
	            		map.put("data15",data15);
	            	}
	            	if(i==6){
	            		int data16[] = {1,6,result2.getInt(1)};
	            		map.put("data16",data16);
	            	}
	            	if(i==7){
	            		int data17[] = {1,5,result2.getInt(1)};
	            		map.put("data17",data17);
	            	}
	            	if(i==8){
	            		int data18[] = {1,4,result2.getInt(1)};
	            		map.put("data18",data18);
	            	}
	            	if(i==9){
	            		int data19[] = {1,3,result2.getInt(1)};
	            		map.put("data19",data19);
	            	}
	            	if(i==10){
	            		int data110[] = {1,2,result2.getInt(1)};
	            		map.put("data110",data110);
	            	}
	            	if(i==11){
	            		int data111[] = {1,1,result2.getInt(1)};
	            		map.put("data111",data111);
	            	}
	            	if(i==12){
	            		int data112[] = {1,0,result2.getInt(1)};
	            		map.put("data112",data112);
	            	}
	            	if(i==13){
	            		int data113[] = {1,23,result2.getInt(1)};
	            		map.put("data113",data113);
	            	}
	            	if(i==14){
	            		int data114[] = {1,22,result2.getInt(1)};
	            		map.put("data114",data114);
	            	}
	            	if(i==15){
	            		int data115[] = {1,21,result2.getInt(1)};
	            		map.put("data115",data115);
	            	}
	            	if(i==16){
	            		int data116[] = {1,20,result2.getInt(1)};
	            		map.put("data116",data116);
	            	}
	            	if(i==17){
	            		int data117[] = {1,19,result2.getInt(1)};
	            		map.put("data117",data117);
	            	}
	            	if(i==18){
	            		int data118[] = {1,18,result2.getInt(1)};
	            		map.put("data118",data118);
	            	}
	            	if(i==19){
	            		int data119[] = {1,17,result2.getInt(1)};
	            		map.put("data119",data119);
	            	}
	            	if(i==20){
	            		int data120[] = {1,16,result2.getInt(1)};
	            		map.put("data120",data120);
	            	}
	            	if(i==21){
	            		int data121[] = {1,15,result2.getInt(1)};
	            		map.put("data121",data121);
	            	}
	            	if(i==22){
	            		int data122[] = {1,14,result2.getInt(1)};
	            		map.put("data122",data122);
	            	}
	            	if(i==23){
	            		int data123[] = {1,13,result2.getInt(1)};
	            		map.put("data123",data123);
	            	}
	                System.out.println(dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + " count:" +result2.getInt(1));  
	            }
	            
	            
	            date = dd.parse("2017-02-28 00:00:00");
				con.prepareStatement("use mobile").executeQuery();
				PreparedStatement sta3 = con.prepareStatement("select count(*) from mobile_28 where 2 * asin(sqrt(pow(sin((" + LAT + "*3.14/180-latitude*3.14/180)/ 2), 2)+ cos(" + LAT + "*3.14/180) * cos(latitude*3.14/180)* pow(sin((" + LON + "*3.14/180-longitude*3.14/180) / 2), 2)))*6378137<=1000 and start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            System.out.println("select count(*) from mobile_28 where 2 * asin(sqrt(pow(sin((" + LAT + "*3.14/180-latitude*3.14/180)/ 2), 2)+ cos(" + LAT + "*3.14/180) * cos(latitude*3.14/180)* pow(sin((" + LON + "*3.14/180-longitude*3.14/180) / 2), 2)))*6378137<=1000 and start_time BETWEEN " + "'" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + "'" + " AND '" + dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L + (59 * 60 + 59) * 1000L) + "'");
	            ResultSet result3 = sta3.executeQuery();  
	            while(result3.next()){
	            	if(i==0){
	            		int data20[] = {2,12,result3.getInt(1)};
	            		map.put("data20",data20);
	            	}
	            	if(i==1){
	            		int data21[] = {2,11,result3.getInt(1)};
	            		map.put("data21",data21);
	            	}
	            	if(i==2){
	            		int data22[] = {2,10,result3.getInt(1)};
	            		map.put("data22",data22);
	            	}
	            	if(i==3){
	            		int data23[] = {2,9,result3.getInt(1)};
	            		map.put("data23",data23);
	            	}
	            	if(i==4){
	            		int data24[] = {2,8,result3.getInt(1)};
	            		map.put("data24",data24);
	            	}
	            	if(i==5){
	            		int data25[] = {2,7,result3.getInt(1)};
	            		map.put("data25",data25);
	            	}
	            	if(i==6){
	            		int data26[] = {2,6,result3.getInt(1)};
	            		map.put("data26",data26);
	            	}
	            	if(i==7){
	            		int data27[] = {2,5,result3.getInt(1)};
	            		map.put("data27",data27);
	            	}
	            	if(i==8){
	            		int data28[] = {2,4,result3.getInt(1)};
	            		map.put("data28",data28);
	            	}
	            	if(i==9){
	            		int data29[] = {2,3,result3.getInt(1)};
	            		map.put("data29",data29);
	            	}
	            	if(i==10){
	            		int data210[] = {2,2,result3.getInt(1)};
	            		map.put("data210",data210);
	            	}
	            	if(i==11){
	            		int data211[] = {2,1,result3.getInt(1)};
	            		map.put("data211",data211);
	            	}
	            	if(i==12){
	            		int data212[] = {2,0,result3.getInt(1)};
	            		map.put("data212",data212);
	            	}
	            	if(i==13){
	            		int data213[] = {2,23,result3.getInt(1)};
	            		map.put("data213",data213);
	            	}
	            	if(i==14){
	            		int data214[] = {2,22,result3.getInt(1)};
	            		map.put("data214",data214);
	            	}
	            	if(i==15){
	            		int data215[] = {2,21,result3.getInt(1)};
	            		map.put("data215",data215);
	            	}
	            	if(i==16){
	            		int data216[] = {2,20,result3.getInt(1)};
	            		map.put("data216",data216);
	            	}
	            	if(i==17){
	            		int data217[] = {2,19,result3.getInt(1)};
	            		map.put("data217",data217);
	            	}
	            	if(i==18){
	            		int data218[] = {2,18,result3.getInt(1)};
	            		map.put("data218",data218);
	            	}
	            	if(i==19){
	            		int data219[] = {2,17,result3.getInt(1)};
	            		map.put("data219",data219);
	            	}
	            	if(i==20){
	            		int data220[] = {2,16,result3.getInt(1)};
	            		map.put("data220",data220);
	            	}
	            	if(i==21){
	            		int data221[] = {2,15,result3.getInt(1)};
	            		map.put("data221",data221);
	            	}
	            	if(i==22){
	            		int data222[] = {2,14,result3.getInt(1)};
	            		map.put("data222",data222);
	            	}
	            	if(i==23){
	            		int data223[] = {2,13,result3.getInt(1)};
	            		map.put("data223",data223);
	            	}
	                System.out.println(dd.format(date.getTime() + ((i==0)?0:i) * 60 * 60 * 1000L) + " count:" +result3.getInt(1));  
	            }
			}
	        response.getWriter().println(JSON.toJSONString(map));
		} catch (SQLException | ClassNotFoundException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
