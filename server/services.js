const axios = require("axios");
const express = require("express");
const google_api_key = "AIzaSyDErGxdZK14gqrGZG0TXDnqooOgOQVGGyY";

const getPlaceInfo = async (location) => {
  try {
    const information = await axios.get(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=formatted_address,place_id&key=${google_api_key}"
    );
    const address = information.data.candidates[0]?.formatted_address;
    const place_id = information.data.candidates[0]?.place_id;
    return { address: address, place_id: place_id }; // return undefined if couldn't find address
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

const dateTimeValidator = (dateArray, timeArray, AM) => {
  dateArray = date.split("/").map((x) => parseInt(x));
  timeArray = time.split(":").map((x) => parseInt(x));

  if (
    dateArray.length != 3 ||
    dateArray[0] > 12 ||
    dateArray[1] > 31 ||
    dateArray[2] < 2023 ||
    dateArray[0] < 0 ||
    dateArray[1] < 0 ||
    dateArray[2] < 0
  ) {
    const error = new ValidationError("Invalid date");
    return res.status(400).json({ errors: error.array() });
  } else if (
    timeArray.length != 2 ||
    timeArray[0] > 12 ||
    timeArray[1] > 59 ||
    timeArray[0] < 0 ||
    timeArray[1] < 0
  ) {
    const error = new ValidationError("Invalid time");
    return res.status(400).json({ errors: error.array() });
  }
  if (!AM) {
    if (timeArray[0] != 12) timeArray[0] += 12;
  }

  dateObj = new Date(
    dateArray[2],
    dateArray[0],
    dateArray[1],
    timeArray[0],
    timeArray[1]
  );
  if (isNaN(dateObj)) {
    const error = new ValidationError("Invalid date");
    return res.status(400).json({ errors: error.array() });
  }
  return dateObj;
};

module.exports = { getPlaceInfo, dateTimeValidator };
