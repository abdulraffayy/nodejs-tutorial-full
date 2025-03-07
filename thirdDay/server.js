const express = require('express');

app = express();

app.get ("/", (req, res) =>{
    res.send('Hello, World!');
})


app.get ("/rafay", (req, res) =>{
    res.send('Hello, Rafay How Are You Man  !');
})


app.get ("/detail", (req, res) =>{
    res.send({
        name: "Rafay",
        age: 28,
        city: "New York",
        country: "USA",
        hobbies: ["Reading", "Traveling", "Coding"]
    });
})
app.listen(3000, () => console.log('Server is running on port 3000...'));