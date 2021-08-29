const express = require('express'); //Express server
const app = express(); //Calling express
const port = 3000; //The port express runs on, change to whatever
const path = require('path'); //provides utilities for working with file and directory paths
const mongoose = require('mongoose'); //If using a mongodb, this is the mongoose package.
const ejsMate = require('ejs-mate'); //Helps with ejs layouts and whatnot
const methodOverride = require('method-override'); //Overrides express stuff so you can use patch req's
const Test = require('./models/model.js') //This is how you call the schema models, so now in this file you can run commands 
//like .find() on this.

//Lines 9-16 are all MongoDB stuff, so if you're not using mongo, adjust accordingly
//If ran right now it'll make a db called 'dbnamehere', and there'll be a collection inside called 'tests'
//This is because of the test schema defined in models/model.js
mongoose.connect('mongodb://localhost:27017/dbnamehere') //Input a db name here for mongo

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!')
})
//Make sure you actually have the mongo db running or else it won't work obviously
//So if your app crashes after like 20 seconds, that's why

//Telling Express to use EJS as the engine, as well as setting the directory name
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//This is to override methods so you can use delete/put/patch req's with express
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride('_method'))

//Lines 30-38 are for test directories, the first one is for home while the last one is just a test dir.
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/test', (req, res) => {
    res.render('test') /*You don't need to do views/test since views is defined as the dirname earlier, 
    although if you were to use the boilerplate for example you would have to do layouts/boilerplate 
    (no ejs ending needed since that engine was defined earlier also) */
})


app.get('*', (req,res) => {
    res.render('404 err')
    //There are much better ways of doing this, this is just again a simple layout.
})

//This opens the connection basically
app.listen(port, () => {
    console.log(`Connection opened on Port ${port}`)
})