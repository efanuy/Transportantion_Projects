package servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.sf.json.JSONArray;

@Controller  
@RequestMapping("/user") 
public class UserController {
	
		public static String DATABASE;
		public static String TABLENAME;
		public static String USERNAME;
		public static String PASSWORD;
		public static String POI;
		
	    @RequestMapping(value="/sqlPOI.do")
	    @ResponseBody
	    public JSONArray sqlPOI(HttpServletRequest req){
	    	
	    	JSONArray jsonArray=new JSONArray() ;
	        List<Map<String, Object>> list= new ArrayList<Map<String,Object>>();
	        Connection conn = null;
	        String sql;
	        String url = "jdbc:mysql://" + "localhost:3306" + "/information_schema?"
	                + "user=nafe&password=zyf1210&useUnicode=true&characterEncoding=GBK&useSSL=true";

	        
	        try{
	            Class.forName("com.mysql.jdbc.Driver");// 动态加载mysql驱动
	            System.out.println("成功加载MySQL驱动程序");
	            conn = DriverManager.getConnection(url);
	            conn.prepareStatement("use mobile").executeQuery();
	            Statement stmt = conn.createStatement();
	            ResultSet rs=null;
	        	sql = "select NAME from poi limit 10";
	        	
	        	rs = stmt.executeQuery(sql);
	        	while(rs.next()){
	        		Map<String,Object> map=new HashMap<String,Object>(); 
	        		map.put("POI_NAME", rs.getString(1));
	        		list.add(map);
	        	}
	        	 
	    	   jsonArray = JSONArray.fromObject(list);
	    	   System.out.println(jsonArray);
	    	   
	       		
	    		}catch(Exception e){
	    	   e.printStackTrace();
	    		}
	    
	    return jsonArray;
	}
	    
	    /** 
		    * POI与聚集分析中的“环状”按钮，此处把全局变量POI的值放到数据库中查询
		    */
		    @RequestMapping(value="/calendar1_POI.do")
		    @ResponseBody
		    public void calendar1_POI(HttpServletRequest req) {
		        if(req.getParameter("comboboxPoi") != null){
			        POI = req.getParameter("comboboxPoi");
			        System.out.println("POI:"+req.getParameter("comboboxPoi"));
		        }	
		    }
		    
		    /** 
			    * POI与聚集分析中的“日历”按钮，此处把全局变量POI的值放到数据库中查询
			    */
			    @RequestMapping(value="/calendar2_POI.do")
			    @ResponseBody
			    public void calendar2_POI(HttpServletRequest req) {
			        if(req.getParameter("comboboxPoi") != null){
				        POI = req.getParameter("comboboxPoi");
				        System.out.println("POI:"+req.getParameter("comboboxPoi"));
			        }	
			    }
			    
			    /** 
				    * POI与聚集分析中的“3D”按钮，此处把全局变量POI的值放到数据库中查询
				    */
				    @RequestMapping(value="/bar3d_POI.do")
				    @ResponseBody
				    public void bar3d_POI(HttpServletRequest req) {
				        if(req.getParameter("comboboxPoi") != null){
					        POI = req.getParameter("comboboxPoi");
					        System.out.println("POI:"+req.getParameter("comboboxPoi"));
				        }	
				    }
	    
}
