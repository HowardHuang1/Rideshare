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
const generalMultiplier = 1.1;
const halfMile = 1 / 35; // 0.5 miles in latlng degrees

/* other imported files: */

const services = require("./services.js");
const scraper = require("./scraper.js");
const email = require("./email.js");

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

const optimizedRideSchema = new mongoose.Schema({
  addressFrom: {
    type: String,
    required: true,
  },
  addressTo: {
    type: String,
    required: true,
  },
  alternateTo: {
    type: String,
    required: true,
  },
  alternateFrom: {
    type: String,
    required: true,
  },
  price4: {
    type: Number,
    required: true,
  },
  price6: {
    type: Number,
    required: true,
  },
});

const OptimizedRide = mongoose.model("OptimizedRide", optimizedRideSchema);

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
  distance: {
    type: Number,
    required: true,
  },
  durationInTraffic: {
    type: Number,
    required: true,
  },
  trafficMultiplier: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numRidersAllowed: {
    type: Number,
    required: true,
  },
  optimizedAddressFrom: {
    type: String,
    required: false,
  },
  optimizedAddressTo: {
    type: String,
    required: false,
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
  emailAddress: {
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
      return res.status(404).json({ errors: errors.array() });
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
      emailAddress: email,
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
    console.log(req);
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
  const { username } = req.query;
  const user = await User.findOne({ username: username });
  if (user) {
    const moneySavedfunc = async (username) => {
      let totalMoney = 0;
      const rides = await Ride.find({ usernames: username });
      if (!rides) {
        return 0;
      }
      for (let i = 0; i < rides.length; i++) {
        totalMoney += Math.abs(rides[i].price) / rides[i].usernames.length;
        // if (rides[i].price < 12) {
        //   rides[i].price = parseInt(Math.random() * 10 + 8);
        //   rides[i].save();
        // }
        // formula asssumes 25 mpg and 8.887 kg/gallon consumption
        // output in kg CO2
      }
      return totalMoney;
    };

    const carbonSavedfunc = async (username) => {
      //calculate pounds of carbon dioxide
      let totalCarbon = 0;
      const rides = await Ride.find({ usernames: username });
      if (!rides) {
        return 0;
      }
      for (let i = 0; i < rides.length; i++) {
        totalCarbon +=
          rides[i].distance * 0.3548 * (rides[i].usernames.length - 1);
        // formula asssumes 25 mpg and 8.887 kg/gallon consumption
        // output in kg CO2
      }
      return totalCarbon;
    };

    const numRidesfunc = async (username) => {
      const rides = await Ride.find({ usernames: username });
      const filteredRides = rides.filter((ride) => {
        return ride.usernames.includes(username);
      });
      return filteredRides.length;
    };

    const moneySaved = await moneySavedfunc(username);
    const carbonSaved = await carbonSavedfunc(username);
    const numRides = await numRidesfunc(username);

    res.send({
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      username: user.username,
      moneySaved: moneySaved,
      carbonSaved: carbonSaved,
      numRides: numRides,
    });
  } else {
    res.send(null);
  }
});

app.post("/create-ride", async (req, res) => {
  console.log("create-ride working");
  let {
    username,
    date,
    time,
    AM,
    locationFrom,
    locationTo,
    numRidersAllowed,
    search,
  } = req.body;
  // {"username": "john doe", "date": "09/15/2023", "time": "12:15", "AM": false, "locationFrom": "UCLA", "locationTo": "LAX", "numRidersAllowed": "3"}
  if (search) {
    const timeparam = 15;
    const distparam = 0.5;
    const { locationFrom, locationTo, date, time, AM } = req.body;
    const open = true;
    const foundRides = await Ride.find({}); // store rides in local variable
    const dateObj = services.dateTimeValidator(date, time, AM);

    if (
      locationFrom == undefined ||
      locationTo == undefined ||
      dateObj == undefined ||
      time == undefined ||
      AM == undefined ||
      open == undefined
    ) {
      const foundRides = await Ride.find({});
      if (foundRides) {
        res.send(foundRides); // found rides
      } else {
        res.send(null); // no rides in database
      }
    }

    let fromPlaceInfo = await services.getPlaceInfo(locationFrom);
    let toPlaceInfo = await services.getPlaceInfo(locationTo);

    if (fromPlaceInfo.address == undefined) {
      res.status(404).json({ error: "Invalid from location" });
      // const error = new ValidationError("Invalid from location");
      // return res.status(400).json({ errors: error.array() });
    } else if (toPlaceInfo.address == undefined) {
      res.status(404).json({ error: "Invalid to location" });
      // const error = new ValidationError("Invalid destination");
      // return res.status(400).json({ errors: error.array() });
    }

    let foundRidesFiltered = [];
    for (const ride of foundRides) {
      let cond = true;
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
          ((diff < timeparam && diff >= 0) || (diff > -timeparam && diff <= 0));
      }
      // rides only distparam apart
      const response = await services.getDistanceAndDuration(
        fromPlaceInfo.address,
        ride.addressFrom,
        dateObj
      );
      console.log(response.distance);
      cond = cond && response.distance <= distparam;

      if (cond) {
        foundRidesFiltered.push(ride);
      }
    }
    if (foundRidesFiltered.length > 0) {
      return res.send(
        "There are similar rides existing, would you like to continue creating?"
      );
    }
  }

  console.log("pickupLocation: " + locationFrom);
  console.log("destination: " + locationTo);
  console.log("date: " + date);
  console.log("time: " + time);
  console.log("AM: " + AM);
  console.log("numRiders: " + numRidersAllowed);
  const foundUser = await User.findOne({ username: username });
  if (!foundUser) {
    return res.send(null); // user not found
  }
  const dateObj = services.dateTimeValidator(date, time, AM);
  if (dateObj == null) {
    return res.status(404).json({ error: "invalid date or date" });
    // const error = new ValidationError("Invalid date or time");
    // return res.status(400).json({ errors: error.array() });
  }

  let fromPlaceInfo = await services.getPlaceInfo(locationFrom);
  let toPlaceInfo = await services.getPlaceInfo(locationTo);

  if (fromPlaceInfo.address == undefined) {
    return res.status(404).json({ error: "invalid from location" });
    // const error = new ValidationError("Invalid from location");
    // return res.status(400).json({ errors: error.array() });
  } else if (toPlaceInfo.address == undefined) {
    return res.status(404).json({ error: "invalid to location" });
    // const error = new ValidationError("Invalid destination");
    // return res.status(400).json({ errors: error.array() });
  }

  let { distance, durationInTraffic, trafficMultiplier } =
    await services.getDistanceAndDuration(
      fromPlaceInfo.address,
      toPlaceInfo.address,
      dateObj
    );
  console.log(distance, durationInTraffic, trafficMultiplier);

  if (distance > 200) {
    return res.json({ error: "Trouble fetching distance" });
    // const error = new ValidationError("Distance is too long");
    // return res.status(400).json({ errors: error.array() });
  }

  if (distance == undefined) {
    return res.json({ error: "Trouble fetching distance" });
    // const error = new ValidationError("Trouble fetching distance");
    // return res.status(400).json({ errors: error.array() });
  } else if (durationInTraffic == undefined) {
    return res.json({ error: "Trouble fetching duration" });
    // const error = new ValidationError("Trouble fetching duration");
    // return res.status(400).json({ errors: error.array() });
  } else if (trafficMultiplier == NaN) {
    return res.json({ error: "Trouble fetching traffic" });
    // const error = new ValidationError("Trouble fetching traffic");
    // return res.status(400).json({ errors: error.array() });
  }

  const numRidersAllowedint = parseInt(numRidersAllowed);
  if (numRidersAllowedint != 4 && numRidersAllowedint != 6) {
    return res.json({ error: "There must be either 4 or 6 riders" });
    // const error = new ValidationError("There must either 4 or 6 riders");
    // return res.status(400).json({ errors: error.array() });
  }

  let price; // for testing purposes
  if (durationInTraffic < 12) {
    price = 12;
  } else {
    price = durationInTraffic;
  }
  if (trafficMultiplier < 0.7) {
    trafficMultiplier = 0.7;
  }

  price = price * trafficMultiplier * generalMultiplier;

  console.log(fromPlaceInfo);
  const newRide = new Ride({
    usernames: [username],
    date: dateObj,
    locationFrom: locationFrom,
    locationTo: locationTo,
    addressFrom: fromPlaceInfo.address,
    addressTo: toPlaceInfo.address,
    idFrom: fromPlaceInfo.place_id,
    idTo: toPlaceInfo.place_id,
    distance: distance,
    durationInTraffic: durationInTraffic,
    trafficMultiplier: trafficMultiplier,
    price: price,
    numRidersAllowed: numRidersAllowed,
    optimizedAddressFrom: fromPlaceInfo.address,
    optimizedAddressTo: toPlaceInfo.address,
  });

  try {
    await newRide.save();
    res.send(newRide);
  } catch (error) {
    res.send(error);
  }

  let bestAvailablePrice;
  try {
    bestAvailablePrice = await scraper.scrapeFareValues(
      fromPlaceInfo.address,
      toPlaceInfo.address,
      numRidersAllowed
    );
  } catch (error) {
    console.log("Error: ", error.message);
    try {
      bestAvailablePrice = await scraper.scrapeFareValues(
        fromPlaceInfo.address,
        toPlaceInfo.address,
        numRidersAllowed
      );
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  if (bestAvailablePrice) {
    if (bestAvailablePrice < 0.5 * price) {
      bestAvailablePrice = 0.5 * price;
    }
    bestAvailablePrice =
      bestAvailablePrice * trafficMultiplier * generalMultiplier;
  } else {
    bestAvailablePrice = price;
  }

  let potentialOptimizedRide;
  try {
    const allRides = await OptimizedRide.find({});
    //console.log(allRides);
    const { lat: latFrom, lng: lngFrom } = await services.getLatLong(
      newRide.addressFrom
    );
    const { lat: latTo, lng: lngTo } = await services.getLatLong(
      newRide.addressTo
    );

    for (let i = 0; i < allRides.length; i++) {
      try {
        const { lat: latAltFrom, lng: lngAltFrom } = await services.getLatLong(
          allRides[i].alternateFrom
        );
        const { lat: latAltTo, lng: lngAltTo } = await services.getLatLong(
          allRides[i].alternateTo
        );
        if (
          latAltFrom == undefined ||
          latAltTo == undefined ||
          latFrom == undefined ||
          latTo == undefined
        ) {
          continue;
        } else if (
          (Math.abs(latAltFrom - latFrom) < halfMile &&
            Math.abs(latAltTo - latTo) < halfMile &&
            Math.abs(lngAltFrom - lngFrom) < halfMile &&
            Math.abs(lngAltTo - lngTo) < halfMile) ||
          (Math.abs(latAltFrom - latTo) < halfMile &&
            Math.abs(latAltTo - latFrom) < halfMile &&
            Math.abs(lngAltFrom - lngTo) < halfMile &&
            Math.abs(lngAltTo - lngFrom) < halfMile)
        ) {
          if (
            (allRides[i].price4 < bestAvailablePrice &&
              numRidersAllowed == 4) ||
            (allRides[i].price6 < bestAvailablePrice && numRidersAllowed == 6)
          )
            potentialOptimizedRide = allRides[i];
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }

  let por_price;
  if (potentialOptimizedRide) {
    if (numRidersAllowed == 4) {
      por_price = potentialOptimizedRide.price4;
    } else {
      por_price = potentialOptimizedRide.price6;
    }
  }

  // send email to user
  if (!por_price) {
    await email.createEmailSender(
      foundUser.emailAddress,
      foundUser.fullName,
      locationFrom,
      locationTo,
      dateObj,
      bestAvailablePrice
    );
  } else {
    await email.createEmailSenderWithPOR(
      foundUser.emailAddress,
      foundUser.fullName,
      locationFrom,
      locationTo,
      dateObj,
      bestAvailablePrice,
      potentialOptimizedRide.alternateFrom,
      potentialOptimizedRide.alternateTo,
      por_price
    );
  }
});

app.post("/join-ride", async (req, res) => {
  const { username, rideID } = req.body;
  const foundRide = await Ride.findOne({ _id: rideID });
  if (foundRide) {
    if (
      foundRide.usernames.length < foundRide.numRidersAllowed &&
      !foundRide.usernames.includes(username)
    ) {
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
    if (index !== -1) {
      foundRide.usernames.splice(index, 1);
      if (foundRide.usernames.length === 0) {
        await foundRide.deleteOne();
      } else {
        await foundRide.save();
      }
      res.send(true); // successfully left ride
    } else {
      res.send(false); // user not in ride
    }
  } else {
    res.send(null); // couldn't find ride
  }
});

app.get("/get-rides-for-user", async (req, res) => {
  const { username } = req.query;
  const foundRides = await Ride.find({ usernames: username });
  if (foundRides.length > 0) {
    res.send(foundRides); // found rides for that user
  } else {
    res.send(null); // couldn't find rides for that user
  }
});

// app.get("/get-rides-for-user", async (req, res) => {
//   const { username } = req.body;
//   const foundRides = await Ride.find({ usernames: username });
//   if (foundRides) {
//     res.send(foundRides); // found rides for that user
//   } else {
//     res.send(null); // couldn't find rides for that user
//   }
// });

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
    // user can be any user in the ride
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.json({ error: "Invalid username" });
      // const error = new ValidationError("Invalid username");
      // return res.status(400).json({ errors: error.array() });
    }

    const foundRide = await Ride.findOne({ _id: rideID });
    if (foundRide.usernames[0] != username) {
      return res.json({ error: "Only ride creator can update the ride" });
    }
    if (foundRide) {
      let timeArray = time.split(":").map((x) => parseInt(x));
      if (
        timeArray.length !== 2 ||
        timeArray[0] > 12 ||
        timeArray[1] > 59 ||
        timeArray[0] < 0 ||
        timeArray[1] < 0
      ) {
        return res.json({ error: "Invalid Time" });
        // const error = new ValidationError("Invalid time");
        // return res.status(400).json({ errors: error.array() });
      }
      if (!AM && timeArray[0] !== 12) timeArray[0] += 12;
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
      if (
        foundRide.usernames.length > numRidersAllowed ||
        (numRidersAllowed != 4 && numRidersAllowed != 6)
      ) {
        return res.json({ error: "Invalid number of riders" });
      }
      foundRide.numRidersAllowed = numRidersAllowed;

      await foundRide.save();
    } else {
      res.send(null); // couldn't find ride
    }

    res.send(true); // successfully updated ride

    let bestAvailablePrice;
    try {
      bestAvailablePrice = await scraper.scrapeFareValues(
        foundRide.addressFrom,
        foundRide.addressTo,
        foundRide.numRidersAllowed
      );
    } catch (error) {
      console.log("Error: ", error.message);
    }

    if (bestAvailablePrice) {
      bestAvailablePrice =
        bestAvailablePrice * foundRide.trafficMultiplier * generalMultiplier;
      foundRide.price = bestAvailablePrice;
      try {
        await foundRide.save();
      } catch (error) {
        console.log("Error: ", error.message);
      }
    } else {
      bestAvailablePrice = foundRide.price;
    }

    let emailsFromUsernames = [];
    for (let i = 0; i < foundRide.usernames.length; i++) {
      emailsFromUsernames.push(
        await User.findOne({ username: foundRide.usernames[i] }).emailAddress
      );
    }
    await email.updateEmailSender(
      emailsFromUsernames,
      foundRide.usernames,
      foundRide.locationFrom,
      foundRide.locationTo,
      foundRide.date
    );
  }
);

app.get("/search-ride", async (req, res) => {
  console.log("Search is called");
  const timeparam = 15;
  const distparam = 0.5;
  const { locationFrom, locationTo, date, time, AM, open } = req.query;
  const foundRides = await Ride.find({}); // store rides in local variable
  console.log("In Search time: " + time);

  if (
    locationFrom == undefined ||
    locationTo == undefined ||
    time == undefined ||
    AM == undefined ||
    open == undefined
  ) {
    const foundRides = await Ride.find({});
    if (foundRides) {
      res.send(foundRides); // found rides
    } else {
      res.send(null); // no rides in database
    }
    return;
  }

  const dateObj = services.dateTimeValidator(date, time, AM);
  let fromPlaceInfo = await services.getPlaceInfo(locationFrom);
  let toPlaceInfo = await services.getPlaceInfo(locationTo);

  if (fromPlaceInfo.address == undefined) {
    res.json({ error: "Invalid from location" });
    // const error = new ValidationError("Invalid from location");
    // return res.status(400).json({ errors: error.array() });
  } else if (toPlaceInfo.address == undefined) {
    res.json({ error: "Invalid to location" });
    // const error = new ValidationError("Invalid destination");
    // return res.status(400).json({ errors: error.array() });
  }

  let foundRidesFiltered = [];
  for (const ride of foundRides) {
    let cond = true;
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
        ((diff < timeparam && diff >= 0) || (diff > -timeparam && diff <= 0));
    }
    // rides only distparam apart
    const response = await services.getDistanceAndDuration(
      fromPlaceInfo.address,
      ride.addressFrom,
      dateObj
    );
    console.log(response.distance);
    cond = cond && response.distance <= distparam;

    if (cond) {
      foundRidesFiltered.push(ride);
    }
  }
  return res.send(foundRidesFiltered);
});

app.get("/get-ride-image", async (req, res) => {
  const { rideID } = req.query;
  const foundRide = await Ride.findOne({ _id: rideID });
  if (!foundRide) {
    return res.json({ error: "Invalid Ride ID" });
    // const error = new ValidationError("Invalid Ride ID");
    // return res.status(400).json({ errors: error.array() });
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
  const mapImageURL = `https://maps.googleapis.com/maps/api/staticmap?size=530x640&markers=color:red%7Clabel:S%7C${encodeURIComponent(
    foundRide.addressFrom
  )}&markers=color:red%7Clabel:D%7C${encodeURIComponent(
    foundRide.addressTo
  )}&path=enc:${overviewPolyline}&key=${google_api_key}`;
  res.send(mapImageURL);
});

app.delete("/delete-database", async (req, res) => {
  await Ride.deleteMany({});
  await User.deleteMany({});
  res.send(true);
});

app.get("/get-optimized-ride", async (req, res) => {
  const { rideID } = req.body;
  let ride = await Ride.findOne({ _id: rideID });
  console.log(ride);
  if (!ride) {
    return res.status(404).json({ error: "Invalid Ride ID" });
  }
  try {
    const allRides = await OptimizedRide.find({});
    let potentialOptimizedRide;
    for (let i = 0; i < allRides.length; i++) {
      try {
        const { lat: latAltFrom, lng: lngAltFrom } = await services.getLatLong(
          allRides[i].alternateFrom
        );
        const { lat: latAltTo, lng: lngAltTo } = await services.getLatLong(
          allRides[i].alternateTo
        );
        const { lat: latFrom, lng: lngFrom } = await services.getLatLong(
          ride.addressFrom
        );
        const { lat: latTo, lng: lngTo } = await services.getLatLong(
          ride.addressTo
        );
        if (
          latAltFrom == undefined ||
          latAltTo == undefined ||
          latFrom == undefined ||
          latTo == undefined
        ) {
          continue;
        } else if (
          (Math.abs(latAltFrom - latFrom) < halfMile &&
            Math.abs(latAltTo - latTo < halfMile) &&
            Math.abs(lngAltFrom - lngFrom < halfMile) &&
            Math.abs(lngAltTo - lngTo < halfMile)) ||
          (Math.abs(latAltFrom - latTo < halfMile) &&
            Math.abs(latAltTo - latFrom < halfMile) &&
            Math.abs(lngAltFrom - lngTo < halfMile) &&
            Math.abs(lngAltTo - lngFrom < halfMile))
        ) {
          potentialOptimizedRide = allRides[i];
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
    if (potentialOptimizedRide) {
      res.send(potentialOptimizedRide);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

app.listen(8000, function (req, res) {
  console.log("Listening on port 8000");
});
