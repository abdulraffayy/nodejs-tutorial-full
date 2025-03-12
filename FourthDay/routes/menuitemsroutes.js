const express = require ("express");
const router = express.Router() 
const MenuItem = require("../models/menuitems")
const passport = require("../auth");

router.post("/", async (req, res) => {
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

const LocalAuthMiddleware = passport.authenticate("local", { session: false })
router.get("/",LocalAuthMiddleware,  async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.json(data);  
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


module.exports = router;