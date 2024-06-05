const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");


//middleware

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//routes

//register and login routes
app.use("/auth", require("./routes/Authentication"));


// Dashboard route

app.use("/dashboard", require("./routes/Dashboard"));


app.listen(5000, ()=>{
    
    console.log("server is running on port 5000");
});