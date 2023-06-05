import React, { useState } from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { set } from "mongoose";

const username = localStorage.getItem("username");

function Modal({ setIsOpen, rideid, onSubmit, setRideData }) {
  console.log("rideid: " + setRideData);
  const [pickupLocation, setPickupLocation] = useState();
  const [destination, setDestination] = useState();
  const [rideTime, setRideTime] = useState();
  const [numRiders, setNumRiders] = useState();
  const [isAM, setIsAM] = useState(false); // Initialize AM field as false
  const rideId = rideid;

  const putData = async (e) => {
    await axios
      .put("http://localhost:8000/update-ride", {
        // default username
        username: username,
        rideID: rideId,
        time: rideTime, // time is missing
        AM: isAM, // Set AM field as boolean
        numRidersAllowed: numRiders, // default numRiders
      })
      .then((res) => console.log("Posting data", res))
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("handling input");

    if (name === "rideTime") {
      setRideTime(value);
      console.log("rideTime: " + value);
    } else if (name === "numRiders") {
      setNumRiders(value);
      console.log("numRiders: " + value);
    }
  };

  const callSetState = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/get-rides-for-user",
        { params: { username } }
      );
      setRideData(response.data);
      console.log("SET RIDE DATA");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // To prevent page reload on form submission
    console.log("Click registered");
    await putData();
    await callSetState();
    setIsOpen(false);
    onSubmit();
  };

  const handleAMChange = (e) => {
    const selectedValue = e.target.value;
    setIsAM(selectedValue !== "PM"); // Set isAM to true if selected value is "AM", otherwise set it to false
  };
  
  

  return (
    <div>
      {/* <div className="darkBG centered" onClick={() => setIsOpen(false)}> */}
      <div className="darkBG centered">
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="title">Update Your Ride</h5>
            </div>
            <button className="closeButton" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className="modalContent">
              <form onSubmit={handleSubmit}>
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
                    onChange={handleAMChange} // Call handleAMChange on change
                  >
                    <option>AM/PM</option>
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
                    <button className="deleteButton" type="submit">
                      Update Ride
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

export default Modal;
