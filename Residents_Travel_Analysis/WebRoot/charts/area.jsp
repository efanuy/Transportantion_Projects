<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="echarts.min.js"></script>
	<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 945px;height:600px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
		var url = '${pageContext.request.contextPath}/GetAllDataServlet_area';
        // 指定图表的配置项和数据
        
		$.getJSON(url).done(function(json) {
		
		var data1 = json.data1;
		var data2 = json.data2;
		var data3 = json.data3;
			
		option = {
		backgroundColor: 'rgba(255, 255, 255, 1)',
		title: {
					text: '白云区',
				},
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['2月26日','2月27日','2月28日']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'2月26日',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:data1
        },
        {
            name:'2月27日',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:data2
        },
        {
            name:'2月28日',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:data3
        }
        
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
})
    </script>
</body>
</html>