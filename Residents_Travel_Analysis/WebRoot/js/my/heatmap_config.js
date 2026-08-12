if (!isSupportCanvas()) {
        alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
    }
    //详细的参数,可以查看heatmap.js的文档 http://www.patrick-wied.at/static/heatmapjs/docs.html
    //参数说明如下:
    /* visible 热力图是否显示,默认为true
     * opacity 热力图的透明度,分别对应heatmap.js的minOpacity和maxOpacity
     * radius 势力图的每个点的半径大小   
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *	{
     .2:'rgb(0, 255, 255)',
     .5:'rgb(0, 110, 255)',
     .8:'rgb(100, 0, 255)'
     }
     其中 key 表示插值的位置, 0-1 
     value 为颜色值 
     */
    var heatmap;
    map.plugin(["AMap.Heatmap"], function() {
        //初始化heatmap对象
        heatmap = new AMap.Heatmap(map, {
            radius: 38, //给定半径
            opacity: [0, 0.65]
            ,gradient:{
             0.7: 'rgb(0, 255, 0)',
			 0.8: 'rgb(0, 255, 0)',
			 0.85: '#ffea00',
             0.9: '#ffea00',
             1.0: 'red'
             }
        });
        //设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
            data: points0b,
            max: 8
        });
    });
    //判断浏览区是否支持canvas
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
	
	//计时器功能
	var num=2,time=2000;
	var NOTE;
	
var heatmapData = new Array();
function switchp (p){
	switch(p){
			case 1:
				heatmapData = [];
				heatmapData = heatmapData.concat(points0b);
				break;
			case 2:
				heatmapData = [];
				heatmapData = heatmapData.concat(points1a);
				break;
			case 3:
				heatmapData = [];
				heatmapData = heatmapData.concat(points1b);
				break;
			case 4:
				heatmapData = [];
				heatmapData = heatmapData.concat(points2a);
				break;
				
			case 5:
				heatmapData = [];
				heatmapData = heatmapData.concat(points2b);
				break;
			case 6:
				heatmapData = [];
				heatmapData = heatmapData.concat(points3a);
				break;
			case 7:
				heatmapData = [];
				heatmapData = heatmapData.concat(points3b);
				break;
			case 8:
				heatmapData = [];
				heatmapData = heatmapData.concat(points4a);
				break;
			
			case 9:
				heatmapData = [];
				heatmapData = heatmapData.concat(points4b);
				break;
			case 10:
				heatmapData = [];
				heatmapData = heatmapData.concat(points5a);
				break;
			case 11:
				heatmapData = [];
				heatmapData = heatmapData.concat(points5b);
				break;
			case 12:
				heatmapData = [];
				heatmapData = heatmapData.concat(points6a);
				break;
			
			case 13:
				heatmapData = [];
				heatmapData = heatmapData.concat(points6b);
				break;
			case 14:
				heatmapData = [];
				heatmapData = heatmapData.concat(points7a);
				break;
			case 15:
				heatmapData = [];
				heatmapData = heatmapData.concat(points7b);
				break;
			case 16:
				heatmapData = [];
				heatmapData = heatmapData.concat(points8a);
				break;
			
			case 17:
				heatmapData = [];
				heatmapData = heatmapData.concat(points8b);
				break;
			case 18:
				heatmapData = [];
				heatmapData = heatmapData.concat(points9a);
				break;
			case 19:
				heatmapData = [];
				heatmapData = heatmapData.concat(points9b);
				break;
			case 20:
				heatmapData = [];
				heatmapData = heatmapData.concat(points10a);
				break;
				
			case 21:
				heatmapData = [];
				heatmapData = heatmapData.concat(points10b);
				break;
			case 22:
				heatmapData = [];
				heatmapData = heatmapData.concat(points11a);
				break;
			case 23:
				heatmapData = [];
				heatmapData = heatmapData.concat(points11b);
				break;
			case 24:
				heatmapData = [];
				heatmapData = heatmapData.concat(points12a);
				break;
				
			case 25:
				heatmapData = [];
				heatmapData = heatmapData.concat(points12b);
				break;
			case 26:
				heatmapData = [];
				heatmapData = heatmapData.concat(points13a);
				break;
			case 27:
				heatmapData = [];
				heatmapData = heatmapData.concat(points13b);
				break;
			case 28:
				heatmapData = [];
				heatmapData = heatmapData.concat(points14a);
				break;
				
			case 29:
				heatmapData = [];
				heatmapData = heatmapData.concat(points14b);
				break;
			case 30:
				heatmapData = [];
				heatmapData = heatmapData.concat(points15a);
				break;
			case 31:
				heatmapData = [];
				heatmapData = heatmapData.concat(points15b);
				break;
			case 32:
				heatmapData = [];
				heatmapData = heatmapData.concat(points16a);
				break;
				
			case 33:
				heatmapData = [];
				heatmapData = heatmapData.concat(points16b);
				break;
			case 34:
				heatmapData = [];
				heatmapData = heatmapData.concat(points17a);
				break;
			case 35:
				heatmapData = [];
				heatmapData = heatmapData.concat(points17b);
				break;
			case 36:
				heatmapData = [];
				heatmapData = heatmapData.concat(points18a);
				break;
				
			case 37:
				heatmapData = [];
				heatmapData = heatmapData.concat(points18b);
				break;
			case 38:
				heatmapData = [];
				heatmapData = heatmapData.concat(points19a);
				break;
			case 39:
				heatmapData = [];
				heatmapData = heatmapData.concat(points19b);
				break;
			case 40:
				heatmapData = [];
				heatmapData = heatmapData.concat(points20a);
				break;
				
			case 41:
				heatmapData = [];
				heatmapData = heatmapData.concat(points20b);
				break;
			case 42:
				heatmapData = [];
				heatmapData = heatmapData.concat(points21a);
				break;
			case 43:
				heatmapData = [];
				heatmapData = heatmapData.concat(points21b);
				break;
			case 44:
				heatmapData = [];
				heatmapData = heatmapData.concat(points22a);
				break;
				
			case 45:
				heatmapData = [];
				heatmapData = heatmapData.concat(points22b);
				break;
			case 46:
				heatmapData = [];
				heatmapData = heatmapData.concat(points23a);
				break;
			case 47:
				heatmapData = [];
				heatmapData = heatmapData.concat(points23b);
				break;
			case 48:
				heatmapData = [];
				heatmapData = heatmapData.concat(points24a);
				break;
			
			default:
				console.log("casede");
				
		}
	}
	
function hotchange(){
	heatmap.hide();
	switchp(num);
	heatmap.setDataSet({data: heatmapData,max: 8});	
	heatmap.show();
}
	
function timedCount(){
	if(NOTE == 1 && num <= 48){
		hotchange();
		setTimeout("timedCount()",time);
		num++;
	}
	if(NOTE == -1){
			num=2;
			time=5000;
		}
		
	if(NOTE == 0){
		console.log("note:0");
	}
	
}


//绑定事件

$(".select_city").select2();
$(".region_sel").select2();

mapget("play").onclick = function(){
	FLAG = 1; //movechart.js中的FLAG
	NOTE = 1;
	setTimeout("tstart()",5000);
	setTimeout("timedCount()",5000);
	mapget("pause").style.display='block';
	mapget("stop").style.display='block';
	mapget("play").style.display='none';
}
mapget("stop").onclick = function(){
    tstop();
	NOTE = -1;
	timedCount();
	mapget("play").style.display='block';
	mapget("pause").style.display='none';
	mapget("stop").style.display='none';
}
mapget("pause").onclick = function(){
    tpause();
	NOTE = 0;
	mapget("pause").style.display='none';
	mapget("stop").style.display='none';
	mapget("play").style.display='block';
}

mapget("eye").onclick = function(){
    heatmap.show();
}

mapget("eye-slash").onclick = function(){
    heatmap.hide();
}

mapget("maprefresh").onclick = function(){
	if(mapget("mapsel").selectedIndex == 0)
		window.location.href = 'index.html';
	if(mapget("mapsel").selectedIndex == 1)
		window.location.href = 'transportation.html';
	if(mapget("mapsel").selectedIndex == 2)
		window.location.href = 'satellite.html';
	if(mapget("mapsel").selectedIndex == 3)
		window.location.href = '3d.html';
}

function chart_sel(){
							if(mapget("chart_sel").selectedIndex==0){
								document.getElementById("table0").style.display = "block";
								document.getElementById("table2").style.display = "none";
							}
							
							if(mapget("chart_sel").selectedIndex==1){
								document.getElementById("table0").style.display = "none";
								document.getElementById("table2").style.display = "block";
							}
}

function chart_sel2(){
							if(mapget("chart_sel2").selectedIndex==0){
								document.getElementById("table3").style.display = "block";
								document.getElementById("table5").style.display = "none";
							}
							
							if(mapget("chart_sel2").selectedIndex==1){
								document.getElementById("table3").style.display = "none";
								document.getElementById("table5").style.display = "block";
							}
}


function fun_chart_sel_poi(){
							if(mapget("chart_sel_poi").selectedIndex==0){
								document.getElementById("table0_poi").style.display = "block";
								document.getElementById("table1_poi").style.display = "none";
							}
							
							if(mapget("chart_sel_poi").selectedIndex==1){
								document.getElementById("table0_poi").style.display = "none";
								document.getElementById("table1_poi").style.display = "block";
							}
}

function fun_chart_sel_poi2(){
							if(mapget("chart_sel_poi2").selectedIndex==0){
								document.getElementById("table3_poi").style.display = "block";
								document.getElementById("table4_poi").style.display = "none";
							}
							
							if(mapget("chart_sel_poi2").selectedIndex==1){
								document.getElementById("table3_poi").style.display = "none";
								document.getElementById("table4_poi").style.display = "block";
							}
}

function modesel(){
	if(mapget("modesel").selectedIndex==0)
		mapget("th_chart2").style.display='none';
	if(mapget("modesel").selectedIndex==1)
		mapget("th_chart2").style.display='block';
}

function fun_modesel_poi(){
	if(mapget("modesel_poi").selectedIndex==0)
		mapget("th_chart2_poi").style.display='none';
	if(mapget("modesel_poi").selectedIndex==1)
		mapget("th_chart2_poi").style.display='block';
}

mapget("show_charts").onclick = function(){
	if(mapget("modesel").selectedIndex==0)
		mapget("div-charts1").style.display='block';
	if(mapget("modesel").selectedIndex==1)
		mapget("div-charts2").style.display='block';
	
}

mapget("show_charts_poi").onclick = function(){
	if(mapget("modesel_poi").selectedIndex==0)
		mapget("div-charts1").style.display='block';
	if(mapget("modesel_poi").selectedIndex==1)
		mapget("div-charts2").style.display='block';
	
}

/***框架操作***/
var iframe1 = document.getElementById('iframe1');
var iframe2_1 = document.getElementById('iframe2_1');
var iframe2_2 = document.getElementById('iframe2_2');

//流量分析
mapget("bar-button").onclick = function(){
	if(document.getElementById("modesel").selectedIndex==0){
		iframe1.src="charts/bar1.jsp";
		console.log("iframe1.src");
	}
		
	if(document.getElementById("modesel").selectedIndex==1){
		iframe2_1.src="charts/bar1.jsp";
		console.log("iframe2_1.src");
	}
		
	
}

mapget("bar-button2").onclick = function(){
	if(mapget("modesel").selectedIndex==0)
		iframe1.src="charts/bar2.jsp";
	if(mapget("modesel").selectedIndex==1)
		iframe2_1.src="charts/bar2.jsp";
	
}

mapget("area-button").onclick = function(){
	if(mapget("modesel").selectedIndex==0)
		iframe1.src="charts/area.jsp";
	if(mapget("modesel").selectedIndex==1)
		iframe2_1.src="charts/area.jsp";
	
}

mapget("bar-button4").onclick = function(){
		iframe2_2.src="charts/bar1.jsp";
	
}

mapget("bar-button5").onclick = function(){
		iframe2_2.src="charts/bar2.jsp";
	
}

mapget("area-button2").onclick = function(){
		iframe2_2.src="charts/area.jsp";
	
}

//poi与聚类分析分析
mapget("bar-button3").onclick = function(){
	if(mapget("modesel_poi").selectedIndex==0){
		bar3d_POI();//见poi_database.js
		iframe1.src="charts/bar3d.jsp";
	}
		
	if(mapget("modesel_poi").selectedIndex==1){
		bar3d_POI();//见poi_database.js
		iframe2_1.src="charts/bar3d.jsp";
	}
		
	
}

mapget("calendar-button1").onclick = function(){
	if(mapget("modesel_poi").selectedIndex==0){
		calendar1_POI(); //见poi_database.js
		iframe1.src="charts/calendar1.jsp";
	}
		
	if(mapget("modesel_poi").selectedIndex==1){
		calendar1_POI();//见poi_database.js
		iframe2_1.src="charts/calendar1.jsp";
	}
		
}

mapget("calendar-button2").onclick = function(){
	if(mapget("modesel_poi").selectedIndex==0){
		calendar2_POI();//见poi_database.js
		iframe1.src="charts/calendar2.jsp";
	}
		
	if(mapget("modesel_poi").selectedIndex==1){
		calendar2_POI();//见poi_database.js
		iframe2_1.src="charts/calendar2.jsp";
	}
		
}


mapget("bar-button6").onclick = function(){
		bar3d_POI();//见poi_database.js
		iframe2_2.src="charts/bar3d.jsp";
}

mapget("calendar-button3").onclick = function(){
		calendar1_POI();//见poi_database.js
		iframe2_2.src="charts/calendar1.jsp";
}

mapget("calendar-button4").onclick = function(){
		calendar2_POI();//见poi_database.js
		iframe2_2.src="charts/calendar2.jsp";
}

//流动性分析
mapget("set4-button").onclick = function(){
	iframe1.src="charts/hexiantu/index.html";
	mapget("div-charts1").style.display='block';
	alert("热力图加载完成！可点击时间轴上的播放按钮播放热力图"); 
}

//城市热点区域
mapget("set5-button").onclick = function(){
	window.location.href="clusters.html";
}

//关闭按钮
mapget("close-button1").onclick = function(){
	mapget("div-charts1").style.display='none';
}

mapget("close-btn2").onclick = function(){
	mapget("div-charts2").style.display='none';
}

mapget("close-button3").onclick = function(){
	
}

function mapget(element){
    return document.getElementById(element);
}

window.onload=function(){
heatmap.hide();

}