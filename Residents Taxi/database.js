/*var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zhou920306',
    database: 'taxi',
    port: 3306
});
conn.connect();

var selectSQL = 'select lng from taxi';

conn.query(selectSQL, function (err2, rows) {
            if (err2) console.log(err2);

            console.log("SELECT ==> ");
            for (var i in rows) {
                console.log(rows[i]);
            }
}*/

var express = require('express');    //加载express模块
var app = express();
var port = process.env.PORT || 3000 ; //监听的端口
app.use(express.static(__dirname + './public'));
app.use(function (req , res){
  res.sendfile('./public/taxi.html')
});

app.listen(port,function(){
console.log('TechNode is on port' + port + '!' ) 
});

