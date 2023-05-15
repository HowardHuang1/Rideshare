const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");

/* other imported files: */

// algorithm.tripListMaker(hotels,restaurants,attractions,budget,num_days)

dotenv.config();

// enable access to all origins
app.use(cors());

// allows for req.body to get Axios POST data
app.use(express.json());

main().catch((err) => console.log(err));

// connect to mongoDB database
async function main() {
  // local connection string: "mongodb://127.0.0.1:27017/trips_db"
  mongoose.connect(
    "mongodb+srv://cs35l:eggert@easyrideone.0gqx4ay.mongodb.net/rides_db?retryWrites=true&w=majority"
  );
}

/* ***************** SCHEMAS AND MODELS ***************** */

const rideSchema = new mongoose.Schema({
  usernames: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  locationFrom: {
    type: String,
    required: true,
  },
  locationTo: {
    type: String,
    required: true,
  },
  numRidersAllowed: {
    type: Number,
    required: true,
  },
});

const Ride = mongoose.model("Ride", rideSchema);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    // handle email validation in API endpoint
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

/* ***************** API ENDPOINTS ***************** */

// test home route
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// create user
app.post("/create-user", async (req, res) => {
  // get username and password from req.body
  const { username, password, fullNam, email } = req.body;

  console.log(username, password, fullName, email);

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const newUser = new User({
    username,
    password: hashedPassword,
    fullName,
    email,
  });

  if (username == "" || password == "" || fullName == "" || email == "") {
    const error = "Please fill out all fields";
    res.send(error);
    return;
  } else if (password.length < 3) {
    const error = "Password must be at least 3 characters";
    res.send(error);
  } else if (!fullName.includes(" ")) {
    const error = "Please enter your full name";
    res.send(error);
  } else if (!validator.isEmail(email)) {
    const error = "Please enter a valid email";
    res.send(error);
  }

  // save new user to database
  try {
    let foundUser = await User.findOne({ username: username });
    if (foundUser == null) {
      try {
        await newUser.save();
        res.send(true);
      } catch (error) {
        res.send(error);
      }
    } else {
      res.send(false);
    }
  } catch (error) {
    res.send(error);
  }
});
