const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");
const { body, validationResult } = require("express-validator");

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
app.post(
  "/create-user",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters"),
    body("fullName")
      .isLength({ min: 3 })
      .withMessage("Please enter your full name"),
    body("email").isEmail().withMessage("Please enter a valid email"),
  ],
  async (req, res) => {
    // send validation errors if any
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //extract user info from request body
    const { username, password, fullName, email } = req.body;

    // log user info
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
  }
);

app.post(
  "/login",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters"),
  ],
  async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.send(true);
      } else {
        res.send(false); // found user but incorrect password
      }
    } else {
      res.send(null); // couldn't find user
    }
  }
);

app.get("/user-data", async (req, res) => {
  const { username } = req.body;
  const user = User.findOne({ username: username });
  if (user) {
    console.log("The user is ", user);
    // res.send(user.fullName, user.email, user.username, moneySaved(user));
    res.send(user.fullName, user.email, user.username);
  } else {
    res.send(null);
  }
});
