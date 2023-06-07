import React, { useState } from "react";
import "./ContinueModal.css";
import { RiCloseLine } from "react-icons/ri";
import "font-awesome/css/font-awesome.min.css";
import CreateRideModal from './CreateRideModal'
import axios from "axios";
import { set } from "mongoose";

function ContinueModal({ 
  setIsOn, 
  data,
  setMark,
  mark,
  setJoinRideID,
  joinRideID,
  setDisplayID,
  displayID,
  setMapRideID,
  setlocationFromSearchParam,
  setlocationToSearchParam,
  setdateSearchParam,
  settimeSearchParam,
  setAMSearchParam,
}) {
  const username = data[0];
  const dateOfRide = data[1];
  const rideTime = data[2];
  const AM = data[3];
  const pickupLocation = data[4];
  const destination = data[5];
  const numRiders = data[6];

  const createData = async (e) => {
    try {
      const response = await axios.post("http://localhost:8000/create-ride", {
        // default username
        // username: username,
        // rideID: rideId,
        // time: rideTime, // time is missing
        // AM: "false", // default am pm
        // numRidersAllowed: numRiders, // default numRiders
        username: username,
        date: dateOfRide,
        time: rideTime,
        AM: AM,
        locationFrom: pickupLocation,
        locationTo: destination,
        numRidersAllowed: numRiders,
        search: false,
      });
      console.log(response);
      if (response.status === 200) {
        setMark(response.data._id);
        setDisplayID(response.data._id);
        setJoinRideID([...joinRideID, response.data._id]);
        setMapRideID(response.data._id);
      }
    } catch (error) {
      console.error("Error creating ride: ", error);
      alert(error.message);
    }
    console.log(username);
    console.log(dateOfRide);
    console.log(rideTime);
    console.log(pickupLocation);
    console.log(destination);
    console.log(numRiders);
    console.log(AM);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault(); // To prevent page reload on form submission
    console.log("Click registered");
    await createData();
    // await callSetState();
    setIsOn(false);
    // onSubmit();
  };

  const handleSearchSubmit = async (e) => {
    console.log("Click registered");
    setlocationFromSearchParam(pickupLocation);
    setlocationToSearchParam(destination);
    setdateSearchParam(dateOfRide);
    settimeSearchParam(rideTime);
    setAMSearchParam("false");
    setIsOn(false);
    // onSubmit();
  };

  return (
    <div>
      <div className="darkBG centered">
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="title">Alert</h5>
            </div>
            <button className="closeButton" onClick={handleSearchSubmit}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className="modalContent">
              There are similar rides existing! You can search for these at the previous step, or continue creating a ride below.
            </div>
            <div className="modalContent">
              <button className="deleteButton" onClick={handleCreateSubmit}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default ContinueModal;
