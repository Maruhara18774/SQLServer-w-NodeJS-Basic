const express = require('express');
const router = express.Router();

const controller = require("../controllers/UserController")

/*
router.get("/",(req,res)=>{
    res.send("User route running")
})
*/
// Code in MVC pattern 
router.get("/",controller.get)

module.exports = router;