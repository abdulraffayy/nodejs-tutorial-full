require('dotenv').config();

const express = require('express');
const connectDB = require('./dbconnection/db.js');
const bodyParser = require('body-parser');
const PersonRoutes = require('./routes/personroutes.js');
const MenuItemRoutes = require("./routes/menuitemsroutes.js")
const passport = require('./auth.js');


const app = express();
// we dont add this line on before updation
app.use(express.json());
// end updation 



// this authentication initiliaz know 
app.use(passport.initialize());

// end authentication

connectDB();


// middle ware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made To ${req.originalUrl}`);
    next();
};
// end middle ware 


app.use("/person", PersonRoutes)
app.use("/menuitem", MenuItemRoutes)

app.use(bodyParser.json());

const PORT = process.env.PORT || 2000;


app.get('/hello', (req, res) => {
    res.send('Hello from Express Server!');
});



// middleware use in full app is this 
app.use(logRequest);
//end its usage


app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
