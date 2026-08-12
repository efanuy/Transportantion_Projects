var a=0,b=0,c=0,dlucheng=0,e=0,f=12,g=0; 
var t,i=0,j=1,k=0,s=0;
var tt=1000,ttt,th,ts;
var upt = 45000,upts=0;
var ct = 1000;
var st = 1000;

var hs1=3,hs2;
var tc5,tc6;

var times_up = new Array(0,0,55000,101000,221000,270000,307000,377000,486000,700000,850000)
var times = new Array(1000,45000,88000,202000,252000,295000,360000,450000,676000,833000,1245000,1296875,1348750,1400625,1452500,1504375,1556250,1608125,1660000,1711875,1763750,1815625,1867500,1919375,1971250);
var fare = new Array(0,18,13,16,14,10,19,16,9,9,33,20,25,72,9,16,9,9,9,9,9,13,9,12,9);
var distance = new Array(0,8,4.7,6.8,5.7,3.2,8.3,6.5,1.8,1.6,14,8.8,11.1,28.5,2.4,6.7,0.3,2.3,2.2,0.17,0.15,5.2,2.6,4.2,0.08);
var customer = new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
var pup = new Array(1000,70000,122000,270000,320000,356000,425000,536000,750000,880000,896000);
/*function timedCount1() 
{ 
document.getElementById('txt1').value=a 
a=fare[j]; 
t=setTimeout("timedCount1()",upt);
upt=times_up[j+1]-times_up[j];
j++;
}*/

var date = new Date();
var hour = date.getHours();
var min = date.getMinutes();

function timedCount1() 
{ 
document.getElementById('txt1').value=a 
a=fare[j]; 
t=setTimeout("timedCount1()",upt);
upt=times[j+2]-times[j+1];
j++;
}

function timedCount2() 
{ 
document.getElementById('txt2').value=b 
b+=fare[i]; 
t=setTimeout("timedCount2()",tt);
tt=times[i+1]-times[i];
i++;
}

function timedCount3() 
{ 
document.getElementById('txt3').value=c 
c+=customer[k];
t=setTimeout("timedCount3()",ct);
ct=times[k+1]-times[k];
k++;
} 

function timedCount4() 
{ 
document.getElementById('txtlucheng').value=dlucheng;
dlucheng+=distance[s]; 
t=setTimeout("timedCount4()",st);
st=times[s+1]-times[s];
s++;
} 

function timedCountMin() 
{ 
document.getElementById('txtMin').value=e 
if(e<59)
	e=e+1;
else if(e==59)
	e=0;
ttt=setTimeout("timedCountMin()",3285) 
} 

function timedCountHour() 
{ 
document.getElementById('txtHour').value=f 
if(f<23)
	f=f+1;
else if(f==23)
	f=0;
th=setTimeout("timedCountHour()",197100) 	
} 


var ptsnum=2,time=5000;
var dpoints = new Array();

/*function timedCountSecond() 
{ 
document.getElementById('txtSecond').value=g
g=g+1
ts=setTimeout("timedCountSecond()",1000) 	
} */

function stopCount() 
{ 
clearTimeout(t) 
} 