const axios = require("axios");
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

module.exports = { getPlaceInfo };
