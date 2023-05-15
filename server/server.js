const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");

/* other imported files: */
const services = require("./services.js");
const algorithm = require("./algorithm.js");

// algorithm.tripListMaker(hotels,restaurants,attractions,budget,num_days)

dotenv.config();

// enable access to all origins
app.use(cors());

// allows for req.body to get Axios POST data
app.use(express.json());

main().catch((err) => console.log(err));
