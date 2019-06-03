const http=require('http');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data


const path=require('path');
const port=8080;

var modelVar=require("./models/db");
var db=mongoose.connect('mongodb://localhost:27017/maddemo',{useNewUrlParser:true});

app.listen(port,() =>{
console.log("server listening the port "+port);
});


//Loading index page
app.get('/', function(req, res) 
	{
    	res.sendFile(path.join(__dirname + '/index.html'));
        app.use(express.static(path.join(__dirname, 'public')));//loading other files via public folder
	});  


//-------Create/Add value-------
app.post('/api/addValue', function(req, res) {
    	console.log("In server api");
    	console.log("values:" + req.body);

    	var modelVarObj = new modelVar();
    	modelVarObj.productname=req.body.item;
    	
        // create a todo, information comes from AJAX request from Angular
        modelVarObj.save((err)=>{
      		res.send(modelVarObj);
     	 	console.log("ADDED");
		});
});


//-------Read/Show value-------
app.get('/api/showData', function(req, res) {
        modelVar.find(function(err, data) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            console.log(data);
            res.json(data); // return all items in JSON format
        });
    });


//-------Update value-------
app.post('/api/updateValue',function(req,res){
    console.log("In Server Update");
    console.log("Old value:" + req.body.oldproductname);
    console.log("Old value:" + req.body.newproductname);

    modelVar.update( {"productname": req.body.oldproductname },{ $set:{"productname": req.body.newproductname} },function (err, docs) {
                    if(err)
                        {
                            res.status(500).json(err);
                        }
                    else if(docs)
                        {
                            console.log(docs);
                            console.log("Updated successfully");
                            res.status(200).json(docs);
                        }
    }); 
});


//-------Delete/Remove value-------
app.post('/api/removeValue',function(req,res){
	console.log("In Server Remove");
	console.log("values:" + req.body.productname);

    modelVar.remove( {"productname": req.body.productname },function (err, docs) {
                    if(err)
                        {
                            res.status(500).json(err);
                        }
                    else if(docs)
                        {
                            console.log(docs);
                            console.log("Deleted successfully");
                            res.status(200).json(docs);
                        }
    });	
});