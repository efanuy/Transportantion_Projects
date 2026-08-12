var myData = {
  labels : ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
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
      data : ["",""]
    }
  ]
}

new Chart(document.getElementById("canvas").getContext("2d")).Line(myData)