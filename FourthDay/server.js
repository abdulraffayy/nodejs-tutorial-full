require('dotenv').config();

const express = require('express');
const connectDB = require('./dbconnection/db.js');
const bodyParser = require('body-parser');
const PersonRoutes = require('./routes/personroutes.js');
const MenuItemRoutes = require("./routes/menuitemsroutes.js")

const app = express();
// we dont add this line on before updation
app.use(express.json());
// end updation 

connectDB();

app.use("/person", PersonRoutes)
app.use("/menuitem", MenuItemRoutes)

app.use(bodyParser.json());

const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => {
    res.send('Hello from Express Server!');
});









app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
