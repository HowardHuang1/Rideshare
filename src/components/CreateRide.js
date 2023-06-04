import React, { useState } from 'react';
import "./CreateRide.css"
import Modal from "./Modal"
import CardStack from "./CardStack"
import axios from "axios"

//TODO: Need to make am PM button
//TODO: Need to add dropdown menu for number of riders (2 options: 4 or 6)
function CreateRide() {
  const [isOpen, setIsOpen] = useState(false);

  const fetchMap = async(e) => {
    await axios.get("http://localhost:8000/get-ride-image", {
      rideID: "647652eb719dc5143d88c399"
    }).then(res => console.log(res.data)).catch(err => console.log(err))
  }

  fetchMap();

  return(
    <div>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        height: '100vh', // Adjust this value based on your requirements
        paddingRight: '20px', // Optional: add some right padding for spacing
        paddingTop: "100px",
      }}>
        <CardStack />
      </div>
      <div className="ModalButton" style={{
        position: 'absolute',
        top: '55px',
        left: '50px'
      }}>
        <button className="openModalButton" onClick={() => setIsOpen(true)}>
          Create New Ride
        </button>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </div>
    </div>
  )
};

export default CreateRide;