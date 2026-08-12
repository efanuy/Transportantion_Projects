<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="echarts.min.js"></script>
    <script type="text/javascript"
	src="js/jquery-3.2.1.min.js"></script>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 945px;height:600px;"></div>
    <script type="text/javascript">
        // 1.基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
		var url = '${pageContext.request.contextPath}/GetAllDataServlet_bar1';//获得销量、营业额、x轴的数据
		
        // 2.从json中指定图表的配置项和数据
        $.getJSON(url).done(function(json) {
       		/*var xAxisData = ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"];
			var data1 = [21122,12928,9120,6878,6996,7106,8398,16797,24924,32468,37924,46423,48884,48243,44787,45059,46365,47980,43503,37509,31739,26273,18248,15003];
			var data2 = [19464,11003,7669,6062,6195,6009,9636,23758,31022,37224,41339,41139,42415,42810,44082,38807,42590,37905,39295,33532,29742,24311,18415,14003];
			var data3 = [17083,9082,6894,5596,5822,5699,8146,21496,29507,36327,37718,40128,42885,39681,41471,37393,42409,44024,42552,34513,31874,25962,20742,13562];
			*/
			var xAxisData = ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"];
			var data1 = json.data1;
			var data2 = json.data2;
			var data3 = json.data3;
			
			option = {
				 backgroundColor: 'rgba(255, 255, 255, 1)',
				textStyle: {
						color: 'rgba(0, 0, 0, 1)'
					},
				
				title: {
					text: '',
				},
				legend: {
					/*data: ['白云区','观山湖区','花溪区','开阳县','南明区','清镇市','市经济开发区','乌当区','息烽县','修文县','云岩区'],*/
					data: ['2月26日','2月27日','2月28日'],
					align: 'left',
					textStyle: {
						color: 'rgba(0, 0, 0, 1)'
					}
					
				},
				tooltip: {},
				xAxis: {
					name:"时间",
					data: xAxisData,
					silent: false,
					splitLine: {
						show: false
					}
				},
				yAxis: {
					name:"开阳县用户数"
				},
				series: [{
					name: '2月26日',
					type: 'bar',
					data: data1,
					animationDelay: function (idx) {
						return idx * 10;
					}
				}, {
					name: '2月27日',
					type: 'bar',
					data: data2,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '2月28日',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}
				
				],
				animationEasing: 'elasticOut',
				animationDelayUpdate: function (idx) {
					return idx * 5;
				}
			};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        })
    </script>
</body>
</html>