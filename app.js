const Express = require("express");
const Mongoose = require('mongoose');

var request = require('request');
var bodyParser = require('body-parser');

var app = new Express();

app.set('view engine','ejs');

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

Mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-ucvz5.mongodb.net/employeedb?retryWrites=true&w=majority");

const EmployeeModel= Mongoose.model("eregister",{
    ename:String,
    eaddress:String,
    egender:String,
    edob:String,
    eemail:String,
    euname:String,
    epass:String,
    ecpass:String
});

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/register',(req,res)=>{
    res.render('register');
});

app.post('/readlogin',(req,res)=>{
    var items=req.body;
    res.render('readlogin',{item:items});
    //res.send(req.body);
});

app.post('/readregister',(req,res)=>{
    var items=req.body;
    res.render('readregister',{item:items});
    //res.send(req.body);
});

app.post('/employeeregister',(req,res)=>{
    //var items=req.body;
    //res.render('read',{item:items});

    var employee = new EmployeeModel(req.body);
    var result = employee.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('Employee Successfully Inserted')</script><script>window.location.href='/register'</script>");
        }
    });

});

app.get('/loginAPI',(req,res)=>{
    var item1 = req.query.euname;
    var item2 = req.query.epass;
    var result = EmployeeModel.find({$and:[{euname:item1},{epass:item2}]},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
        
    })
})

const APIurl = "https://thebookshlf2.herokuapp.com/loginAPI"

app.post('/employeelogin',(req,res)=>{
    var item1 = req.body.euname;
    var item2 = req.body.epass;

    request(APIurl+"/?euname="+item1+"&&epass="+item2,(error,response,body)=>{
        //var data = JSON.parse(body);

        if(req.body.euname===item1 && req.body.epass===item2)
        {
            res.send("<script>alert('Login Successfull')</script><script>window.location.href='/login'</script>");
        }
        else
        {
            res.send("<script>alert('Login UnSuccessfull')</script><script>window.location.href='/login'</script>");
        }
    });
});

app.get('/employeeall',(req,res)=>{

    var result = EmployeeModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIurl2 = "https://thebookshlf2.herokuapp.com/employeeall";

app.get('/view',(req,res)=>{

    request(APIurl2,(error,response,body)=>{
        var data = JSON.parse(body);
        res.render('view',{data:data});
    });
});

app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});

