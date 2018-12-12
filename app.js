var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); 
var expressValidator = require('express-validator');

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

 
//begin - validator
app.use(expressValidator()); 
//end - validator




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

var users = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Smith',
        email: 'aosrij@oi.com'
    },
    {
        id: 2,
        first_name: 'Jill',
        last_name: 'Doe',
        email: 'fert@gyue.com'
    }
]


//Route handler
app.get('/', function(req, res){
    //res.send('hello');
    //res.json(people);
    res.render('index',{
        title:'Customers',
        users:users
    });//for ejs
})


//Route handler
app.post('/users/add', function(req, res){
    req.checkBody('first_name', 'First name is required.').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log('errors');
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
        }
        console.log('yes!');
    }

    console.log(newUser);
})

 



app.listen(3000, function(){
    console.log('server started on port 3000...')
})