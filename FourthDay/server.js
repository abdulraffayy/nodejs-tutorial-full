require('dotenv').config();

const express = require('express');
const connectDB = require('./dbconnection/db.js');
const bodyParser = require('body-parser');
const Person = require("./models/person.js");

const app = express();


connectDB();

// second menu item models will exported it know 

const MenuItem = require   ("./models/menuitems.js")

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello from Express Server!');
});

// post api we can use it 

app.post("/person", async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);
        const response = await newPerson.save();

        console.log(response);
        res.status(200).json(response);
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// end it 


// get method started 

app.get ('/person',async (req, res) => {
    try{
 const data = await Person.find()
res.send(data);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})
// end get method 



// get menu items we will created know 


app.post("/menuitem", async (req, res) => {
    try {
        const rafay = req.body
        const newMenu = new MenuItem(rafay)
        const response = await newMenu.save()
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.get("/menuitems", async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.json(data);  // Send the fetched data as a response
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
