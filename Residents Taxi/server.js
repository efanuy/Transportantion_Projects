var fs = require('fs'),
express = require('express'),
app = express(), 
polyline = require('polyline'),
sqlite3 = require("sqlite3");



var port = process.env.PORT || 3000;    // set our port

var db = new sqlite3.Database('kmdb');

var summary = [];


var featureCollection = {
  type:"FeatureCollection",
  features:[]
};

var featureCollection2 = {
  type:"FeatureCollection",
  features:[]
};

var router = express.Router();
var router2 = express.Router();

app.use(express.static(__dirname + '/public'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


router.get('/taxi.json', function(req, res, next) {
	console.log("ok");
  var getname = "select name from `taxi` order by random() limit 1";

  db.serialize(function() {
    db.each(getname, function(err, result) {  //pick a medallion at random
      console.log("Getting trips for name " + result.name);
      if (err) { console.log(err); }
      getRows(result.name,function(rows){ //get all rows for our medallion
        createGeojson(rows,function(geojson){ //convert polylines to geojson
          console.log("Sending Results");
          res.json(geojson); //send the response
        });
      });  
    });
  });
});

app.use('/', router);

app.listen(port);
console.log('Listening on port ' + port);


//functions
function getRows(name,callback) {
  var statement = "select * from 'taxi' where name = '" + name + "'";

  summary = [];

  db.serialize(function() {
    db.each(statement, function(err, result) {
      if (err) { console.log(err); }

      summary.push(result);
    },function(){
      console.log(summary.length + " rows found for this name");
      callback(summary);
    });
  });


}


function createGeojson(rawData,callback){

  featureCollection.features = [];

  for(var i=0;i<rawData.length;i++) {

    var feature = {
      type:"Feature",
      properties:{},
    }

    
    feature.properties.lng = rawData[i].lng;
    feature.properties.lat = rawData[i].lat;
	feature.properties.hasfare = true;

featureCollection.features.push(feature);
}

callback(featureCollection);

}