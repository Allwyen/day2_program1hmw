const Express = require("express");
var bodyParser = require('body-parser');
var app = new Express();

app.set('view engine','ejs');

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});