import React, { useState } from 'react';
import "./CreateRide.css"
import Modal from "./Modal"
import RideCard from "./RideCard"

function CreateRide() {
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div className="container">
      <button className="openModalButton" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <RideCard />
    </div>
  )
};

export default CreateRide;