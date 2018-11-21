var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();


//begin - logger middleware
var logger = function(req, res, next){
    console.log('Page requested...');
    next();
}
app.use(logger);
//end - logger middleware



//begin - ejs middleware
//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//end - ejs middleware
 


//begin - bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//end - bodyParser middleware


//begin - middleware for static folder
//Set static path
app.use(express.static(path.join(__dirname, 'public')));
//end - middleware for static folder


//create json object
var people = [
    {
        name:'Bill',
        country:'US'
    },
    {
        name:'Tom',
        country:'India'
    }
]


//Route handler
app.get('/', function(req, res){
    //res.send('hello');
    //res.json(people);
    res.render('index');//for ejs
})

app.listen(3000, function(){
    console.log('server started on port 3000...')
})