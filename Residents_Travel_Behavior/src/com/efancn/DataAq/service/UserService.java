package com.efancn.DataAq.service;

import java.util.List;  
import java.util.Map;  
import com.efancn.DataAq.domain.User;  
  
public interface UserService {  
      public List<User> getAll();  
      public User getUser(User user);  
      public int delete(int id);  
      public int update(User user);  
      public int add(User user);  
      public List<User> find(Map<String,Object> map);  
      public Long getTotal(Map<String,Object> map);  
      public User getUserById(int id);  
}