<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="echarts.min.js"></script>
	<script src="echarts-gl.min.js"></script>
	<script type="text/javascript"
	src="js/jquery-3.2.1.min.js"></script>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 1000px;height:600px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
		var url = '${pageContext.request.contextPath}/GetAllDataServlet_bar3d';
$.getJSON(url).done(function(json) {
        // 指定图表的配置项和数据
var hours = ['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时'];
var days = ['2月26日', '2月27日', '2月28日'];
var data = new Array();
data.push(json.data00);data.push(json.data01);data.push(json.data02);data.push(json.data03);data.push(json.data04);data.push(json.data05);
data.push(json.data06);data.push(json.data07);data.push(json.data08);data.push(json.data09);data.push(json.data010);data.push(json.data011);
data.push(json.data012);data.push(json.data013);data.push(json.data014);data.push(json.data015);data.push(json.data016);data.push(json.data017);
data.push(json.data018);data.push(json.data019);data.push(json.data020);data.push(json.data021);data.push(json.data022);data.push(json.data023);

data.push(json.data10);data.push(json.data11);data.push(json.data12);data.push(json.data13);data.push(json.data14);data.push(json.data15);
data.push(json.data16);data.push(json.data17);data.push(json.data18);data.push(json.data19);data.push(json.data110);data.push(json.data111);
data.push(json.data112);data.push(json.data113);data.push(json.data114);data.push(json.data115);data.push(json.data116);data.push(json.data117);
data.push(json.data118);data.push(json.data119);data.push(json.data120);data.push(json.data121);data.push(json.data122);data.push(json.data123);

data.push(json.data20);data.push(json.data21);data.push(json.data22);data.push(json.data23);data.push(json.data24);data.push(json.data25);
data.push(json.data26);data.push(json.data27);data.push(json.data28);data.push(json.data29);data.push(json.data210);data.push(json.data211);
data.push(json.data212);data.push(json.data213);data.push(json.data214);data.push(json.data215);data.push(json.data216);data.push(json.data217);
data.push(json.data218);data.push(json.data219);data.push(json.data220);data.push(json.data221);data.push(json.data222);data.push(json.data223);
console.log(data);

option = {
	backgroundColor: 'rgba(255, 255, 255, 1)',
    tooltip: {},
    visualMap: {
        max: 120,
        inRange: {
            color: ['#23A00D', '#20920C', '#24A50D', '#28B80F', '#2CCB10', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
    },
    xAxis3D: {
        type: 'category',
        data: hours
    },
    yAxis3D: {
        type: 'category',
        data: days
    },
    zAxis3D: {
        type: 'value'
    },
    grid3D: {
        boxWidth: 200,
        boxDepth: 80,
        light: {
            main: {
                intensity: 1.2
            },
            ambient: {
                intensity: 0.3
            }
        }
    },
    series: [{
        type: 'bar3D',
        data: data.map(function (item) {
            return {
                value: [item[1], item[0], item[2]]
            }
        }),
        shading: 'color',

        label: {
            show: false,
            textStyle: {
                fontSize: 16,
                borderWidth: 1
            }
        },
        
        itemStyle: {
            opacity: 0.4
        },

        emphasis: {
            label: {
                textStyle: {
                    fontSize: 20,
                    color: '#900'
                }
            },
            itemStyle: {
                color: '#900'
            }
        }
    }]
}
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
})
    </script>
</body>
</html>