const axios = require("axios");
const express = require("express");
const {
  body,
  validationResult,
  ValidationError,
} = require("express-validator");
const google_api_key = "";

const getPlaceInfo = async (location) => {
  try {
    const information = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=formatted_address,place_id&key=${google_api_key}`
    );
    const address = information.data.candidates[0]?.formatted_address;
    const place_id = information.data.candidates[0]?.place_id;
    return { address: address, place_id: place_id }; // return undefined if couldn't find address
  } catch (error) {
    console.log("Error: ", error.message);
    return undefined;
  }
};

const dateTimeValidator = (date, time, AM) => {
  let dateArray = date.split("/").map((x) => parseInt(x));
  let timeArray = time.split(":").map((x) => parseInt(x));
  dateArray[0] = dateArray[0] - 1;
  if (
    dateArray.length !== 3 ||
    dateArray[0] > 12 ||
    dateArray[1] > 31 ||
    dateArray[2] < 2023 ||
    dateArray[0] < 0 ||
    dateArray[1] < 0 ||
    dateArray[2] < 0
  ) {
    return undefined;
  } else if (
    timeArray.length !== 2 ||
    timeArray[0] > 12 ||
    timeArray[1] > 59 ||
    timeArray[0] < 0 ||
    timeArray[1] < 0
  ) {
    return undefined;
  }
  if (!AM) {
    if (timeArray[0] !== 12) timeArray[0] += 12;
  }

  let dateObj = new Date(
    dateArray[2],
    dateArray[0],
    dateArray[1],
    timeArray[0],
    timeArray[1]
  );
  if (isNaN(dateObj)) {
    return null;
  }
  return dateObj;
};

const getDistanceAndDuration = async (
  place_1_address,
  place_2_address,
  dateObj
) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          origins: place_1_address,
          destinations: place_2_address,
          mode: "driving",
          units: "imperial",
          departure_time: dateObj.getTime() / 1000,
          key: google_api_key,
        },
      }
    );

    if (place_1_address === place_2_address) {
      return { distance: 0, durationInTraffic: 0, trafficMultiplier: 0 };
    }

    let distance = parseInt(response.data.rows[0].elements[0].distance.text);
    let durationInTraffic = parseInt(
      response.data.rows[0].elements[0].duration_in_traffic.text
    );
    console.log(`Distance: ${distance}`);
    console.log(`Duration: ${durationInTraffic}`);
    //default time code
    const dateObj1PM = new Date("November 17, 2028 21:00:00");
    const response1PM = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          origins: place_1_address,
          destinations: place_2_address,
          mode: "driving",
          units: "imperial",
          departure_time: dateObj1PM.getTime() / 1000,
          key: google_api_key,
        },
      }
    );
    const durationInTraffic1PM = parseInt(
      response1PM.data.rows[0].elements[0].duration_in_traffic.text
    );

    console.log(`Duration2: ${durationInTraffic1PM}`);
    if (durationInTraffic < distance) {
      durationInTraffic = parseInt(distance * 1.1 + Math.random() * 2);
    }
    let trafficMultiplier = durationInTraffic / durationInTraffic1PM;
    if (trafficMultiplier > 2) {
      trafficMultiplier = 2;
    } else if (trafficMultiplier < 0.8) {
      trafficMultiplier = 0.8;
    }

    return { distance, durationInTraffic, trafficMultiplier };
  } catch (error) {
    console.error("Error:", error.message);
    return undefined;
  }
};

const getLatLong = async (address) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: google_api_key,
        },
      }
    );
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    return { lat: lat, lng: lng };
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = {
  getPlaceInfo,
  dateTimeValidator,
  getDistanceAndDuration,
  getLatLong,
};
