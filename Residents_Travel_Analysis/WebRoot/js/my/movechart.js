var xstep=40; // 移动步长，此参数越小，移动越平滑，最小值为1
var delay_time=5000; // 每步的时间间隔，此参数越小，移动速度越快

//以下部分请勿随意改动
var YY=0;  
var FLAG = 1;

function reloc1(){	//实现改变时间轴位置
	YY=YY+xstep
	document.getElementById("timeline").style.left=YY+"px"
}

function tstart(){	//开始
	
	if(FLAG == 1){	//开始主循环，以不断改变浮动层位置
		
		if(YY <= 1840){
			reloc1(); //调整浮动层位置
			setTimeout('tstart()',delay_time); //设定下一次调整的延时
		}
		else{
			document.getElementById("timeline").style.left=0;
			document.getElementById("rectangle").style.left=0;
			YY=0;FLAG=-1;
		}
	}
	
	if(FLAG == 0){	//暂停后开始
		FLAG = 1;
	}
	

}

function tpause(){ //暂停
	FLAG = 0;
}

function tstop(){	//停止
	document.getElementById("timeline").style.left=0;
	document.getElementById("rectangle").style.left=0;
	YY=0;FLAG=-1;
}