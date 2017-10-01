const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

var calculator = require('./public/js/calculator');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// parse application/json
app.use(bodyParser.json())

const uri = 'mongodb://localhost/testJson'
const option = { useMongoClient: true};
mongoose.connect(uri, option);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function(err){
    console.log('There is a problem connecting to database');
});

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const nutritionalSchema = new Schema({
    "food_name": {type: String},
    "protein": {type: String, default: "0"},
    "fat": {type: String, default: "0"},
    "saturated_fat": {type: String, default: "0"},
    "carbohydrate": {type: String, default: "0"},
    "energy_kcal": {type: String, default: "0"},
    "energy_kj": {type: String, default: "0"},
    "sugars": {type: String, default: "0"},
    "fibre": {type: String, default: "0"}
});

const Nutri = mongoose.model('nutritionalvalues', nutritionalSchema);

var ingredientsList = [];
var quantity = [];

app.get('/', (req, res) => {
    var data = {};
    res.render('index', {data});
});

app.post('/', urlencodedParser, (req, res) => {
    //console.log(req.body);
    let search = req.body.ingredient;
    Nutri.find({ $text: {$search:search}}, (err, data) => {
        if (err) res.render('index')
        res.render('index', {data});
    });
});

app.get('/ingredient/:id', (req, res) => {
    //var id = req.params.id;
    const query = {_id: ObjectID(req.params.id)}
    Nutri.findById(query, (err, result) => {
        if (err) throw err
        ingredientsList.push(result);
        console.log(ingredientsList);
        res.render('ingredient', {ingredientsList});
    });
      
});

app.get('/ingredient', (req, res) => {
    res.render('ingredient', {ingredientsList});
});

app.post('/ingredient', urlencodedParser, (req, res, next) => {   
    quantity = req.body.size ;
    var nutrition = calculator.nutriCal(ingredientsList, quantity);
    var refIntakes = calculator.referenceIntakesCal(nutrition)
    var data = {
        ingredientsList: ingredientsList,
        //If there is one ingredient, quantity is string
        quantity: (typeof quantity === 'string') ? quantity = quantity.split() : quantity = quantity, 
        // quantity: quantity,
        nutrition: nutrition,
        refIntakes
    };
    console.log(ingredientsList);
    console.log(quantity);
    console.log(quantity.length);
    console.log(typeof quantity);
    console.log(nutrition);
    console.log(refIntakes);
    res.render('recipe', {data});
    // Reset recipe
    ingredientsList = [];
    quantity = [];
});

app.listen(3000, () => console.log('Server is running on port 3000...'));

