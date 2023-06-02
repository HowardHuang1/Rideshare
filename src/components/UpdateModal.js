import React, { useState } from "react";
import "./Modal.css"
import { RiCloseLine } from "react-icons/ri";
import Form from './Form'
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios"

function Modal({ setIsOpen }) {
    const [pickupLocation, setPickupLocation] = useState();
    const [destination, setDestination] = useState();
    const [rideDate, setRideDate] = useState();
    const [rideTime, setRideTime] = useState();

    const postData = (e) => {
        axios.post('/localhost:8000/update-ride', {
            locationFrom: pickupLocation,
            locationTo: destination,
            date: rideDate,
            time: rideTime
        }).then(res => console.log('Posting data', res)).catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        console.log('Click registered');
        setPickupLocation(pickupLocation);
        setDestination(destination);
        setRideDate(rideDate);
        setRideTime(rideTime);
        postData();
        setIsOpen(false);
    }

    return(
        <div>
            {/* <div className="darkBG centered" onClick={() => setIsOpen(false)}> */}
            <div className="darkBG centered">
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
                            <input type="text" value={pickupLocation} placeholder="Pickup Location" />
                            <i class="fa fa-search fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                        <div class="inputWithIcon">
                            <input type="text" value={destination} placeholder="Destination" />
                            <i class="fa fa-map fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                        <div class="inputWithIcon">
                            <input type="text" value={rideDate} placeholder="Date of Ride" />
                            <i class="fa fa-calendar fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                        <div class="inputWithIcon">
                            <input type="text" value={rideTime} placeholder="Time of Ride" />
                            <i class="fa fa-spinner fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                        <div class="inputWithIcon">
                            <input type="text" value={rideTime} placeholder="Number of Riders" />
                            <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="deleteButton" onClick={() => handleSubmit()}>
                                Update Ride
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