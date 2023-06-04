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
    <div className="jesus">
      <div className="ModalButton"
      style={{
        flex: '1 1 50%',
      }}> 
        <button className="openModalButton" onClick={() => setIsOpen(true)}>
          Create New Ride
        </button>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </div>
      
      <div className="stylish" style={{
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh', // Adjust this value based on your requirements
        padding: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
        flex: "1 1 50%",
      }}>
        <CardStack />
      </div>

    </div>
  )
};

export default CreateRide;