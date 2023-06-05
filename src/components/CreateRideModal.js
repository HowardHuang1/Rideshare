import React, { useState } from "react";
import "./CreateRideModal.css";
import { RiCloseLine } from "react-icons/ri";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import CardStack from "./CardStack";

// const username = localStorage.getItem("username");

function CreateRideModal({ username, setIsOpen, rideid, onSubmit, setlocationFromSearchParam, setlocationToSearchParam, timeSearchParam, settimeSearchParam, setdateSearchParam, setAMSearchParam }) {
  // console.log("rideid: " + setRideData);
  const [pickupLocation, setPickupLocation] = useState();
  const [destination, setDestination] = useState();
  const [rideTime, setRideTime] = useState();
  const [numRiders, setNumRiders] = useState();
  const [dateOfRide, setDateOfRide] = useState();
  const [AM, setAmPm] = useState("AM");
  const [search, setSearch] = useState(false);
  const rideId = rideid;

  const createData = async (e) => {
    await axios
      .post("http://localhost:8000/create-ride", {
        // default username
        // username: username,
        // rideID: rideId,
        // time: rideTime, // time is missing
        // AM: "false", // default am pm
        // numRidersAllowed: numRiders, // default numRiders
        username: username,
        date: dateOfRide,
        time: rideTime,
        AM: "false",
        locationFrom: pickupLocation,
        locationTo: destination,
        numRidersAllowed: numRiders,
        search: false,
      })
      .then((res) => console.log("Posting data", res))
      .catch((err) => console.log(err));
    console.log(username);
    console.log(dateOfRide);
    console.log(rideTime);
    console.log(pickupLocation);
    console.log(destination);
    console.log(numRiders);

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rideTime") {
      setRideTime(value);
    } else if (name === "numRiders") {
      setNumRiders(value);
    } else if (name === "pickupLocation"){
      setPickupLocation(value);
    } else if (name === "destination"){
      setDestination(value);
    } else if (name === "dateOfRide"){
      setDateOfRide(value);
    }
  };

  // const callSetState = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8000/get-rides-for-user",
  //       { params: { username } }
  //     );
  //     setRideData(response.data);
  //     console.log("SET RIDE DATA");
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  const handleSearchSubmit = async (e) => {
    console.log("Click registered");
    setlocationFromSearchParam(pickupLocation);
    setlocationToSearchParam(destination);
    setdateSearchParam(dateOfRide);
    settimeSearchParam(rideTime);
    setAMSearchParam("false")
    setIsOpen(false);
    // onSubmit();
  };

  
  const handleCreateSubmit = async (e) => {
    e.preventDefault(); // To prevent page reload on form submission
    console.log("Click registered");
    await createData();
    // await callSetState();
    setIsOpen(false);
    // onSubmit();
  };

  return (
    <div>
      {/* <div className="darkBG centered" onClick={() => setIsOpen(false)}> */}
      <div className="darkBG centered">
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="title">Find Your Ride</h5>
            </div>
            <button className="closeButton" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className="modalContent">
              <form>
                <div class="inputWithIcon">
                  <input
                    type="text"
                    name="pickupLocation"
                    value={pickupLocation}
                    placeholder="Pickup Location, ex: De Neve Plaza"
                    onChange={handleInputChange}
                  />
                  <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
                </div>
                <div class="inputWithIcon">
                  <input
                    type="text"
                    name="destination"
                    value={destination}
                    placeholder="Destination, Ex: LAX International Airport"
                    onChange={handleInputChange}
                  />
                  <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
                </div>
                <div class="inputWithIcon">
                  <input
                    type="text"
                    name="dateOfRide"
                    value={dateOfRide}
                    placeholder="Date of Ride: Ex 06/05/2023"
                    onChange={handleInputChange}
                  />
                  <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
                </div>
                <div class="inputWithIcon2">
                  <input
                    type="text"
                    name="rideTime"
                    value={rideTime}
                    placeholder="Time of Ride, ex: 8:30"
                    onChange={handleInputChange}
                  />
                  <select
                    style={{
                      borderRadius: "20px",
                      width: "20%",
                      border: "2px solid #aaa",
                      height: "80%",
                    }}
                    onChange={(e) => handleInputChange(e, "amPm")}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <i class="fa fa-spinner fa-lg fa-fw" aria-hidden="true"></i>
                </div>
                <div class="inputWithIcon">
                  <input
                    type="text"
                    name="numRiders"
                    value={numRiders}
                    placeholder="Number of Riders, only 4 or 6"
                    onChange={handleInputChange}
                  />
                  <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
                </div>
                <div className="modalActions">
                  <div className="actionsContainer">
                    <button className="deleteButton" type="submit" onClick={handleCreateSubmit}>
                      Create Ride
                    </button>
                    <button className="deleteButton" type="submit" onClick={handleSearchSubmit}>
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRideModal;