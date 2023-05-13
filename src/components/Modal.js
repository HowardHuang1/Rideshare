import React from "react";
import "./Modal.css"
import { RiCloseLine } from "react-icons/ri";
import Form from './Form'

function Modal({ setIsOpen }) {
    return(
        <div>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="title">Create Ride</h5>
                    </div>
                    <button className="closeButton" onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className="modalContent">
                        <h5>Pickup Location</h5>
                        <Form />
                        <h5>Destination</h5>
                        <Form />
                        <h5>Date of Ride</h5>
                        <Form />
                        <h5>Time of Ride</h5>
                        <Form />
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="deleteButton" onClick={() => setIsOpen(false)}>
                                Create Ride
                            </button>
                            <button
                                className="cancelButton"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;