package com.efancn.DataAq;

import org.junit.Test;  
import org.springframework.context.ApplicationContext;  
import org.springframework.context.support.ClassPathXmlApplicationContext;  
  
import com.efancn.DataAq.domain.User;  
import com.efancn.DataAq.service.UserService;  
  
public class TestSpring {  
    @Test  
    public void TestUserService() throws Exception{  
        @SuppressWarnings("resource")  
        ApplicationContext ac=new ClassPathXmlApplicationContext("applicationContext.xml");  
        UserService us=(UserService) ac.getBean("userService");  
        User user=new User();  
        user.setAge(1);  
        user.setUserName("zhangsan");  
        user.setPassword("123456");  
        user.setTrueName("张三");  
        us.add(user);  
    }  
} 
