const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

//var foodName = require('./public/js/controller');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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

app.get('/', (req, res) => {
    let search = req.query.ingredient;
    let result = [] ;
    if (!search) {
        res.render('index', {result});
    } else {    
        Nutri.find({ $text: {$search:search}}, (err, result) => {
            if (err) res.render('index')
            res.render('index', {result:result});
        });
    }  
});

app.get('/ingredient/:id', (req, res) => {
    //var id = req.params.id;
    const query = {_id: ObjectID(req.params.id)}
    Nutri.findById(query, (err, result) => {
        if (err) throw err
        ingredientsList.push(result);
        console.log(ingredientsList.length);
        res.render('ingredient', {ingredientsList});
    });
    
});

app.listen(3000, () => console.log('Server is running on port 3000...'));

