const express = require("express");
const Model = require("../models/modelUser");
const routerUser = express.Router();


routerUser.post("/users", async (req, res) => {
    
    const data = new Model({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        company: req.body.company
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

routerUser.get("/users", async (req, res) => {
    try {
        const data = await Model.find()
        .populate("company");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

routerUser.get("/users/:id", async (req, res) => {
    try {
        const data = await Model.findById(req.params.id)
        .populate("company")
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

routerUser.put("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new : true };
        const data = await Model.findByIdAndUpdate(
            id, 
            updatedData, 
            options
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

routerUser.delete("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


module.exports = routerUser;