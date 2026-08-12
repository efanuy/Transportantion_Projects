package com.efancn.DataAq.domain;

import java.io.Serializable;  

/** 
 * 用户实体 
 * @author Administrator 
 * 
 */  
public class User implements Serializable{  
    private static final long serialVersionUID = 1L;  
    private String name;  
    private String time;  
    private String status;  
    private String angle;  
    private String segid;  
    private String roadname;  
    private String mmlon;  
    private String mmlat; 
    private String geohash;
    private String tablename;
    
    
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
  
    public String getAngle() {  
        return angle;  
    }  
    public void setAngle(String angle) {  
        this.angle = angle;  
    }  
    public String getStatus() {  
        return status;  
    }  
    public void setStatus(String status) {  
        this.status = status;  
    }  
    public String getTime() {  
        return time;  
    }  
    public void setTime(String time) {  
        this.time = time;  
    }  
    public String getSegid() {  
        return segid;  
    }  
    public void setSegid(String segid) {  
        this.segid = segid;  
    }  
    public String getRoadname() {  
        return roadname;  
    }  
    public void setRoadname(String roadname) {  
        this.roadname = roadname;  
    }  
    public String getMmlon() {  
        return mmlon;  
    }  
    public void setMmlon(String mmlon) {  
        this.mmlon = mmlon;  
    }  
   
   public String getMmlat() {  
       return mmlat;  
   }  
  public void setMmlat(String mmlat) {
	   this.mmlat = mmlat;  
   }
  
  public String getGeohash() {  
      return geohash;  
  }  
  public void setGeohash(String geohash) {
	   this.geohash = geohash;  
  }
  
  public String gettableName() {  
      return tablename;  
  }  
  public void settableName(String tablename) {  
      this.tablename = tablename;  
  }
}