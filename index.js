var express = require("express");
var app = express();
var request = require("request");

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("Home");
});

app.get("/weather",function(req,res){
	var query = req.query.search;
	var url = "http://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID=49332846259075865691dcc5d79a4b3c";
	request(url,function(error,response,body){
		if(!error && response.statusCode == 200){
			var results = JSON.parse(body);
			res.render("result",{data:results});
		}else{
			console.log(error);
			res.end("ERROR");
		}
	});
});

app.get("/forcast",function(req,res){
	res.render("forcast");
})

app.get("/result",function(req,res){
	var query = req.query.search;
	var url = "http://api.openweathermap.org/data/2.5/forecast?q="+query+"&APPID=49332846259075865691dcc5d79a4b3c";
	request(url,function(error,response,body){
		if(!error && response.statusCode == 200){
			var result = JSON.parse(body);
			res.render("forcastResult",{data:result});
		}
	});
});

app.listen(5000,function(){
	console.log("App running on localhost:5000");
});


