const express = require("express");
const Model = require("../models/modelCompany");
const routerCompany = express.Router();

// Método POST para la creación de datos en la BD.
routerCompany.post("/companies", async (req, res) => {
    const data = new Model({
        name: req.body.name
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Método GET para la obtención de todos los datos de la BD.
routerCompany.get("/companies", async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Método GET para la obtención de un dato de la BD.
routerCompany.get("/companies/:id", async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Método PUT(PATCH) para la actualización de un dato de la BD.
routerCompany.put("/companies/:id", async (req, res) => {
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

// Método DELETE para la eliminación de un dato de la BD.
routerCompany.delete("/companies/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


module.exports = routerCompany;