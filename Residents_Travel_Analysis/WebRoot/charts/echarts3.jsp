<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<!-- 引入 ECharts 文件 -->
<script src="js/echarts3/echarts.common.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/jquery-3.2.1.min.js"></script>
</head>

<body>
	<div>Echarts3示例</div>
	<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
	<div id="main" style="width: 600px; height: 400px;"></div>
	<script type="text/javascript">
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		/*var monthUrl = '${pageContext.request.contextPath}/GetMonthServlet';//横轴的数据
		var salesUrl = '${pageContext.request.contextPath}/GetSalesVolumeServlet';//销量
		var bussinessUrl = '${pageContext.request.contextPath}/GetBusinessVolumeServlet';//营业额*/
		var url = '${pageContext.request.contextPath}/GetAllDataServlet';//获得销量、营业额、x轴的数据
		$.getJSON(url).done(function(json) {//向url请求数据，如果成功，将数据放到json
			// 2.从json中获得数据
			salesVolume = json.salesVolume;//销量
			bussinessVolume = json.bussinessVolume;//营业额
			months = json.months;//月份

			// 3.配置option
			var option = {
				title : {
					text : 'ECharts 入门示例'
				},
				tooltip : {},
				legend : {
					data : [ '销量' ],
					data : [ '营业额' ]
				},
				xAxis : {
					data : months
				},
				yAxis : {},
				series : [ {
					name : '销量',
					type : 'bar',
					data : salesVolume2
				}, {
					name : '营业额',
					type : 'line',
					data : bussinessVolume2
				} ],
				toolbox : {
					show : true,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				}
			}
			myChart.setOption(option);
		})
	</script>

</body>

</html>