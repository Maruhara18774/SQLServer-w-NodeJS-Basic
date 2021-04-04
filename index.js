
const express = require('express');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const mssql = require('mssql');
const config = {

    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    // This para depend on port of your db in docker
    port: 1400,
    options: {
        // Every Azure need it true
        encrypt: true,
        // Just don't make app warn you when it run
        enableArithAbort: true
    }

}

//mssql.connect(config);


const userRoute = require("./routes/User");
app.use("/user", userRoute)

app.listen(PORT, (req, res) => {
    console.log("Running at " + PORT);
    // Link: https://www.youtube.com/watch?v=kaktnpaUYPM
    var connectSql = new mssql.ConnectionPool(config);
    connectSql.connect(function(err){
        if(err) throw err;
        var request = new mssql.Request(connectSql);
        request.query("SELECT * FROM BOOK",function(err,recordList){
            if(err) throw err;
            else console.log(recordList);
            connectSql.close();
        })
    })


    console.log("End")
    /* Sample code of mssql npm
    async () => {
        try {
            // make sure that any items are correctly URL encoded in the connection string
            let pool = await mssql.connect(config);
            console.log("Running DB commands")
            request.query("SELECT * FROM BOOK").then(result => console.dir(result))
        } catch (err) {
            // ... error checks
            console.log("Error connection")
        }
    }
    */
})