var express = require("express");
var app = express();
var http = require('http').Server(app);
var request = require("request");
var io = require('socket.io')(http);

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("Home");
});

app.post("/",function(req,res){
	var query = req.query.search;
	var url = "http://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID=49332846259075865691dcc5d79a4b3c";
	request(url,function(error,response,body){
		if(!error && response.statusCode == 200){
			var results = JSON.parse(body);
			res.render("result",{data:results});
		}else{
			console.log(error);
			console.log(response);
			console.log(body);
			res.end("ERROR");
		}
	});
});

io.on('connection',function(socket){
	console.log("a user connected");
	socket.on('disconnect',function(){
		console.log('user disconnected');
	});
	socket.on('locChange',function(latLng){
		var lat = latLng.lat;
		var lon = latLng.lng;
		var url = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&APPID=49332846259075865691dcc5d79a4b3c";

		request(url,function(error,response,body){
			if(!error && response.statusCode == 200){
				var result = JSON.parse(body);
				io.emit('newLoc',result);
			}else{
				console.log(error);
			}
		});
	});
});

http.listen(5000,function(){
	console.log("App running on localhost:5000");
});


