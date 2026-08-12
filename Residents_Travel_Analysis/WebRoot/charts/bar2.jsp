<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="echarts.min.js"></script>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 945px;height:600px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
		var url = '${pageContext.request.contextPath}/GetAllDataServlet_bar2';

        // 指定图表的配置项和数据
        var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
    xAxisData.push('类目' + i);
    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
}

var xAxisData = ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"];
			var data1 = [3741,2299,1566,1268,1257,1271,1430,3891,4397,5786,6662,8110,8741,8582,7949,8096,8137,8582,7731,6682,5610,4689,3297,2751];
			var data2 = [4745,2859,2025,1480,1570,1532,1854,3765,5462,7211,8214,10308,10806,10578,10013,9737,10061,10551,9732,8368,7033,5703,4147,3338];
			var data3 = [16067,9915,6805,5210,5365,5398,6273,12583,18862,24897,28539,35232,37405,36607,34090,34426,35184,36644,33075,28851,24309,20001,13845,11307];
			var data4 = [21122,12928,9120,6878,6996,7106,8398,16797,24924,32468,37924,46423,48884,48243,44787,45059,46365,47980,43503,37509,31739,26273,18248,15003];
			var data5 = [1397,818,596,484,461,464,539,1090,1589,2101,2421,3114,3249,3081,2940,2945,3091,3173,2911,2434,2073,1647,1187,1036];
			var data6 = [13996,8495,6206,4617,4624,4707,5654,11270,16494,21518,25192,30828,32908,31860,29931,29639,30402,31912,28800,25183,21221,17503,12071,9943];
			var data7 = [1077,635,438,305,351,374,415,796,1151,1596,1900,2304,2415,2319,2185,2222,2200,2384,2120,1830,1604,1293,854,727];
			var data8 = [9706,5972,4160,3168,3241,3194,3824,7500,11391,15038,17416,21519,22828,22291,20705,20609,21468,21881,20015,17368,14486,11852,8419,6980];
			var data9 = [6423,3816,2659,2092,2089,2175,2460,5095,7458,9890,11398,14037,14866,14374,13712,13518,13989,14488,13088,11543,9565,7954,5687,4509];
			var data10 = [9718,6040,4182,3225,3393,3303,3958,7679,11403,15073,17659,21716,22816,22272,20758,20915,21668,22195,20146,17709,14993,12165,8380,7018];
			var data11 = [9718,6040,4182,3225,3393,3303,3958,7679,11403,15073,17659,21716,22816,22272,20758,20915,21668,22195,20146,17709,14993,12165,8380,7018];

			option = {
				 backgroundColor: 'rgba(255, 255, 255, 1)',
				textStyle: {
						color: 'rgba(0, 0, 0, 1)'
					},
				
				title: {
					text: '',
				},
				legend: {
					data: ['白云区','观山湖区','花溪区','开阳县','南明区','清镇市','市经济开发区','乌当区','息烽县','修文县','云岩区'],
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
					name:"2月26日用户数"
				},
				series: [{
					name: '白云区',
					type: 'bar',
					data: data1,
					animationDelay: function (idx) {
						return idx * 10;
					}
				}, {
					name: '观山湖区',
					type: 'bar',
					data: data2,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '花溪区',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '开阳县',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '南明区',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '清镇市',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '市经济开发区',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '乌当区',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '息烽县',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '修文县',
					type: 'bar',
					data: data3,
					animationDelay: function (idx) {
						return idx * 10 + 100;
					}
				}, {
					name: '云岩区',
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
    </script>
</body>
</html>