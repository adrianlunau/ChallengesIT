const express = require("express");
const router = express.Router();

const routesUser = require("./routesUser");
const routesCompany = require("./routesCompany");


router.use(routesUser);
router.use(routesCompany);

module.exports = router;