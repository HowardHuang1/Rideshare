const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");
const {
  body,
  validationResult,
  ValidationError,
} = require("express-validator");

const google_api_key = "AIzaSyDErGxdZK14gqrGZG0TXDnqooOgOQVGGyY";

/* other imported files: */

const services = require("./services.js");

// algorithm.tripListMaker(hotels,restaurants,attractions,budget,num_days)

dotenv.config();

// enable access to all origins
app.use(cors());

// allows for req.body to get Axios POST data
app.use(express.json());

main().catch((err) => console.log(err));

// connect to mongoDB database
async function main() {
  await mongoose.connect(
    "mongodb+srv://rohil:pass@cluster0.j9oshqr.mongodb.net/rides_db?retryWrites=true&w=majority"
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
  addressFrom: {
    type: String,
    required: true,
  },
  addressTo: {
    type: String,
    required: true,
  },
  idFrom: {
    type: String,
    required: true,
  },
  idTo: {
    type: String,
    required: true,
  },
  numRidersAllowed: {
    type: Number,
    required: true,
  },
});

const Ride = mongoose.model("Ride", rideSchema);

// creates a collection called rides

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
          res.send(error); // error saving user
        }
      } else {
        res.send(false); // user already exists
      }
    } catch (error) {
      res.send(error); // error finding user
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.send(true); // found user and correct password
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
    // res.send({user.fullName, user.email, user.username, moneySaved: moneySaved(user)}, numRides: numRides(user)});
    res.send({
      fullName: user.fullName,
      email: user.email,
      username: user.username,
    });
  } else {
    res.send(null);
  }
});

app.post("/create-ride", async (req, res) => {
  const {
    username,
    date,
    time,
    AM,
    locationFrom,
    locationTo,
    numRidersAllowed,
  } = req.body;
  // {"username": "john doe", "date": "09/15/2023", "time": "12:15", "AM": false, "locationFrom": "UCLA", "locationTo": "LAX", "numRidersAllowed": "3"}
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    res.send(null); // user not found
  }
  const dateObj = services.dateTimeValidator(date, time, AM);

  fromPlaceInfo = await getPlaceInfo(locationFrom);
  toPlaceInfo = await getPlaceInfo(locationTo);

  if (fromPlaceInfo.address == undefined) {
    const error = new ValidationError("Invalid from location");
    return res.status(400).json({ errors: error.array() });
  } else if (toPlaceInfo.address == undefined) {
    const error = new ValidationError("Invalid destination");
    return res.status(400).json({ errors: error.array() });
  }

  numRidersAllowed = parseInt(numRidersAllowed);
  if (numRidersAllowed < 2 || numRidersAllowed > 6) {
    const error = new ValidationError(
      "There must be between 2 and 6 riders allowed"
    );
    return res.status(400).json({ errors: error.array() });
  }

  const newRide = new Ride({
    usernames: [username],
    date: dateObj,
    locationFrom: locationFrom,
    locationTo: locationTo,
    addressFrom: fromPlaceInfo.placeID,
    addressTo: toPlaceInfo.placeID,
    idFrom: fromPlaceInfo.id,
    idTo: toPlaceInfo.id,
    numRidersAllowed: numRidersAllowed,
  });

  try {
    await newRide.save();
    res.send(newRide);
  } catch (error) {
    res.send(error);
  }
});

app.post("/join-ride", async (req, res) => {
  const { username, rideID } = req.body;
  const foundRide = await Ride.findOne({ _id: rideID });
  if (foundRide) {
    if (foundRide.usernames.length < foundRide.numRidersAllowed) {
      foundRide.usernames.push(username);
      await foundRide.save();
      res.send(true); // successfully joined ride
    } else {
      res.send(false); // ride is full
    }
  } else {
    res.send(null); // couldn't find ride
  }
});

app.post("/leave-ride", async (req, res) => {
  const { username, rideID } = req.body;
  const foundRide = await Ride.findOne({ _id: rideID });
  if (foundRide) {
    const index = foundRide.usernames.indexOf(username);
    if (index != -1) {
      foundRide.usernames.splice(index, 1);
      await foundRide.save();
      res.send(true); // successfully left ride
    } else {
      res.send(false); // user not in ride
    }
  } else {
    res.send(null); // couldn't find ride
  }
});

app.post("/get-rides-for-user", async (req, res) => {
  const { username } = req.body;
  const foundRides = await Ride.find({ usernames: username });
  if (foundRides) {
    res.send(foundRides); // found rides for that user
  } else {
    res.send(null); // couldn't find rides for that user
  }
});

app.post("/get-all-rides", async (req, res) => {
  const foundRides = await Ride.find({});
  if (foundRides) {
    res.send(foundRides); // found rides
  } else {
    res.send(null); // no rides in database
  }
});

app.put(
  "/update-ride",
  [
    body("numRidersAllowed")
      .isLength({ min: 2, max: 6 })
      .withMessage("Please allow at least 2 riders"),
    body("rideID").isLength({ min: 1 }).withMessage("Please provide a ride ID"),
  ],
  async (req, res) => {
    const { username, rideID, time, AM, numRidersAllowed } = req.body;
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      const error = new ValidationError("Invalid username");
      return res.status(400).json({ errors: error.array() });
    }
    const foundRide = await Ride.findOne({ _id: rideID });
    if (foundRide) {
      let timeArray = time.split(":").map((x) => parseInt(x));
      if (
        timeArray.length != 2 ||
        timeArray[0] > 12 ||
        timeArray[1] > 59 ||
        timeArray[0] < 0 ||
        timeArray[1] < 0
      ) {
        const error = new ValidationError("Invalid time");
        return res.status(400).json({ errors: error.array() });
      }
      if (!AM && timeArray[0] != 12) timeArray[0] += 12;
      const foundDate = foundRide.date.getDate();
      const foundMonth = foundRide.date.getMonth();
      const foundYear = foundRide.date.getFullYear();
      const newDate = new Date(
        foundYear,
        foundMonth,
        foundDate,
        timeArray[0],
        timeArray[1]
      );
      foundRide.date = newDate;
      await foundRide.save();
    } else {
      res.send(null); // couldn't find ride
    }

    if (numRidersAllowed) {
      if (foundRide.usernames.length > numRidersAllowed) {
        const error = new ValidationError(
          "There are more riders already in the ride than the new limit"
        );
        return res.status(400).json({ errors: error.array() });
      }
      foundRide.numRidersAllowed = numRidersAllowed;
      await foundRide.save();
    } else {
      res.send(null); // couldn't find ride
    }
    res.send(true); // successfully updated ride
  }
);

app.delete("/leave-ride", async (req, res) => {
  const { username, rideID } = req.body;
  const foundRide = await Ride.findOne({ _id: rideID });
  if (foundRide) {
    const index = foundRide.usernames.indexOf(username);
    if (index != -1) {
      foundRide.usernames.splice(index, 1);
      if (foundRide.usernames.length === 0) {
        // write code for delete ride if no one is in it
        await foundRide.deleteOne();
      } else {
        await foundRide.save();
      }
      res.send(true); // successfully left ride or deleted ride
    } else {
      res.send(false); // user not in ride
    }
  } else {
    res.send(null); // couldn't find ride
  }
});

app.get("/search-ride", async (req, res) => {
  const timeparam = 15;
  const distparam = 0.5;
  const { locationFrom, locationTo, date, time, AM, open } = req.body;
  const foundRides = await Ride.find({}); // store rides in local variable
  const dateObj = services.dateTimeValidator(date, time, AM);

  let fromPlaceInfo;
  let toPlaceInfo;
  if (fromPlaceInfo.address == undefined) {
    fromPlaceInfo = await getPlaceInfo(locationFrom);
  }
  if (fromPlaceInfo.address == undefined) {
    toPlaceInfo = await getPlaceInfo(locationTo);
  }

  if (fromPlaceInfo.address == undefined) {
    const error = new ValidationError("Invalid from location");
    return res.status(400).json({ errors: error.array() });
  } else if (toPlaceInfo.address == undefined) {
    const error = new ValidationError("Invalid destination");
    return res.status(400).json({ errors: error.array() });
  }

  let foundRidesFiltered = foundRides.filter((ride) => {
    cond = true;
    cond = cond && ride.addressFrom == fromPlaceInfo.address;
    cond = cond && ride.addressTo == toPlaceInfo.address;
    // check if ride is already filled, if open is specified
    if (open) {
      cond = cond && ride.usernames.length != ride.numRidersAllowed;
    }
    // rides only timeparam min apart
    if (req.body.date != undefined) {
      var diff = (dateObj.getTime() - ride.date.getTime()) / 60000;
      cond =
        cond &&
        ((diff < timeparam && diff > 0) || (diff > -timeparam && diff < 0));
    }
    // rides only distparam apart
    const dist = services.getDistance(fromPlaceInfo.address, ride.addressFrom);
    cond = cond && dist <= distparam;
    return cond;
  });
  return res.send(foundRidesFiltered);
});

app.get("/get-ride-image", async (req, res) => {
  const { rideID } = req.body;
  const foundRide = await Ride.findOne({ _id: rideID });
  if (!foundRide) {
    const error = new ValidationError("Invalid Ride ID");
    return res.status(400).json({ errors: error.array() });
  }

  // Make a request to the Directions API
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/directions/json",
    {
      params: {
        origin: foundRide.addressFrom,
        destination: foundRide.addressTo,
        key: google_api_key,
      },
    }
  );

  // Extract route coordinates from the response
  const route = response.data.routes[0];
  const overviewPolyline = route.overview_polyline.points;

  // Generate the static map image URL with the driving route
  const mapImageURL = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${overviewPolyline}&key=${google_api_key}`;
  res.send(mapImageURL);
});

app.listen(8000, function (req, res) {
  console.log("Listening on port 8000");
});
