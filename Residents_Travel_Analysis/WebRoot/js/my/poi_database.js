function sqlPOI(){
	$("#formPOI").form("submit", {  
        url : "user/sqlPOI.do",  
        onSubmit : function() { 
            return $(this).form("validate");  
        },  
        success : function(result) {
        	$("#comboboxPoi").combobox({  
      		  url:"user/sqlPOI.do",//获取数据  
      		  // 向服务器请求的模式   
      		  method : "post",  
      		  valueField: 'POI_NAME',  
      		  textField: 'POI_NAME',
      		  onLoadSuccess: function () {
      		  	var data =  $("#comboboxPoi").combobox("getData");
      		  	if (data.length > 0) {
      		       $('#comboboxPoi').combobox('select', data[0].POI_NAME);
      		       $.messager.alert("连接成功", "POI点数据加载成功！请选择要查看的POI点");
      		    }
      		    else{
      		    	$.messager.alert("连接失败", "POI点数据加载失败！请检查数据库后重试");
      		    }
      		    
      		  }   
      		  })
      		  	return "true";
        }
    
    });
	
}

//获取POI点下拉列表框中的名称，赋值给java中的全局变量POI，在之后执行calendar1.jsp时把POI的值传到数据库
function calendar1_POI(){
	$("#formPOI").form("submit", {  
        url : "user/calendar1_POI.do",  
        onSubmit : function() { 
            if ($("#comboboxPoi").combobox("getValue") == "") {
                $.messager.alert("系统提示", "请先选择数据库");  
                return false;  
            }
            return $(this).form("validate");  
        },  
        success : function(result) {
      		  	return "true";
        }
    
    });
	
}

function calendar2_POI(){
	$("#formPOI").form("submit", {  
        url : "user/calendar2_POI.do",  
        onSubmit : function() { 
            if ($("#comboboxPoi").combobox("getValue") == "") {
                $.messager.alert("系统提示", "请先选择数据库");  
                return false;  
            }
            return $(this).form("validate");  
        },  
        success : function(result) {
      		  	return "true";
        }
    
    });
	
}

function bar3d_POI(){
	$("#formPOI").form("submit", {  
        url : "user/bar3d_POI.do",  
        onSubmit : function() { 
            if ($("#comboboxPoi").combobox("getValue") == "") {
                $.messager.alert("系统提示", "请先选择数据库");  
                return false;  
            }
            return $(this).form("validate");  
        },  
        success : function(result) {
      		  	return "true";
        }
    
    });
	
}