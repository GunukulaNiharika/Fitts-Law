const express= require('express')
var bodyParser = require('body-parser');
const path = require('path')
const dotenv = require('dotenv');

dotenv.config();
console.log(`Your port is ${process.env.PORT}`);

const app = express()

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

// middleware
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use(express.static('public'))
app.use(express.json());
app.set('views', __dirname + '/views');

app.listen(process.env.PORT);
app.get('/', (req,res)=> res.redirect('/fitts'));
app.get('/fitts',(req,res)=>res.render('fitts'));
app.get('/graphs',(req,res)=>res.render('graphs'));