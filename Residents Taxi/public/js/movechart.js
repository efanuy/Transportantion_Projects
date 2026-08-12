var xstep=0.79; // 移动步长，此参数越小，移动越平滑，最小值为1
var delay_time=1000; // 每步的时间间隔，此参数越小，移动速度越快
//以下部分请勿随意改动
var YY=0;  
var ns6=document.getElementById&&!document.all?1:0 //判断浏览器类型是否是NS6
	


function reloc1(){
YY=YY+xstep


if (ns6){ //如果是NS6
//document.getElementById("floatpoint").style.left=XX
document.getElementById("timeline").style.left=YY+"px"
document.getElementById("rectangle").style.left=YY+"px"

}
}
function onad(){
 //设定浮动层为可见
loopfunc(); //开始主循环，以不断改变浮动层位置
}
function loopfunc(){
reloc1(); //调整浮动层位置
setTimeout('loopfunc()',delay_time); //设定下一次调整的延时
}