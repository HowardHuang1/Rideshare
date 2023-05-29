import React from "react";
import "./Modal.css"
import { RiCloseLine } from "react-icons/ri";
import Form from './Form'
import 'font-awesome/css/font-awesome.min.css';

function Modal({ setIsOpen }) {
    return(
        <div>
            <div className="darkBG centered" onClick={() => setIsOpen(false)}>
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="title">Create Your Ride</h5>
                    </div>
                    <button className="closeButton" onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className="modalContent">
                        <div class="inputWithIcon">
                            <input type="text" placeholder="Pickup Location" />
                            <i class="fa fa-search fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                        <div class="inputWithIcon">
                            <input type="text" placeholder="Destination" />
                            <i class="fa fa-map fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                        <div class="inputWithIcon">
                            <input type="text" placeholder="Date of Ride" />
                            <i class="fa fa-calendar fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                        <div class="inputWithIcon">
                            <input type="text" placeholder="Time of Ride" />
                            <i class="fa fa-spinner fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="deleteButton" onClick={() => setIsOpen(false)}>
                                Create Ride
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Modal;