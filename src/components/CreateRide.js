import React, { useState } from 'react';
import "./CreateRide.css"
import Modal from "./Modal"
import CardStack from "./CardStack"

function CreateRide() {
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        height: '100vh', // Adjust this value based on your requirements
        paddingRight: '20px' // Optional: add some right padding for spacing
      }}>
        <CardStack />
      </div>
      <div className="ModalButton" style={{
        position: 'absolute',
        top: '50px',
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