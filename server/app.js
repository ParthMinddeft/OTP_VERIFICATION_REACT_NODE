require("dotenv").config()
const express = require("express")
const app = express();
const cors = require("cors");
require('./db/connection')
const router = require('./Routes/router');
const port = 4002;

//middleware
app.use(express.json());
app.use(cors());
app.use(router)

app.listen(port,() => {
    console.log('server started')
})