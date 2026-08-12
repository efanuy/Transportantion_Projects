var myData = {
  labels : ["12","13","14","15","16","17","18","19","20","21","22","23","24"],
  datasets : [
    {
      fillColor : "rgba(220,220,220,0)",
      strokeColor : "rgba(220,220,220,0)",
      pointColor : "rgba(220,220,220,0)",
      pointStrokeColor : "#fff",
      data : [65,59,90,81,56,55,415]
    },
    {
      fillColor : "rgba(90,190,90,.5)",
      strokeColor : "rgba(90,190,90,1)",
      pointColor : "rgba(90,190,90,1)",
      pointStrokeColor : "#fff",
      data : ["47","90","124","133","142","151","229","301","310","344","384","414",""]
    }
  ]
}

new Chart(document.getElementById("canvas").getContext("2d")).Line(myData)