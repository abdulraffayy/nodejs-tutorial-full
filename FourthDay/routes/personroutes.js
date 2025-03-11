const express = require("express");
const Person = require("../models/person")

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, age, work, email, address, salary } = req.body;

        // Validate required fields
        if (!name || !age || !work || !email || !address || !salary) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate `work` field (must be 'chef', 'waiter', or 'manager')
        if (!['chef', 'waiter', 'manager'].includes(work)) {
            return res.status(400).json({ error: "Invalid work type" });
        }

        // Validate address fields
        if (!address.street || !address.city || !address.state || !address.zip) {
            return res.status(400).json({ error: "Complete address is required" });
        }

        const newPerson = new Person(req.body);
        const response = await newPerson.save();

        console.log(response);
        res.status(200).json(response);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});



router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})



router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType === "chef" || workType === "manager" || workType === "waiter") {
            const dataFetching = await Person.find({});
            console.log("Response Fetched");

            res.status(200).json(dataFetching);
        } else {
            return res.status(400).send("Invalid Work Type");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});



router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).send("Person not found");
        }

        console.log("Data Updated Successfully");
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;  
        
        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }

        const response = await Person.deleteOne({ _id: id });  

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Data Deleted Successfully");
        res.status(200).json({ message: "Person deleted successfully", response });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});


module.exports = router