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
    const [numRiders, setNumRiders] = useState();

    const postData = async (e) => {
        await axios.post('http://localhost:8000/create-ride', {
            // default username
            username: "parthivn",
            date: rideDate,
            time: rideTime, // time is missing
            AM: "false", // default am pm
            locationFrom: pickupLocation,
            locationTo: destination,
            numRidersAllowed: numRiders, // default numRiders
        }).then(res => console.log('Posting data', res)).catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        console.log("handling input")
        setPickupLocation(pickupLocation);
        console.log("pickupLocation: " + pickupLocation)
        setDestination(destination);
        console.log("destination: " + destination)
        setRideDate(rideDate);
        console.log("rideDate: " + rideDate)
        setRideTime(rideTime);
        console.log("rideTime: " + rideTime)
        setNumRiders(numRiders);
        console.log("numRiders: " + numRiders)
    }

    const handleSubmit = (e) => {
        console.log('Click registered');
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
                        {/* <div> */}
                            {/* <form onSubmit={handleSubmit}>
                                <input type="text" value={pickupLocation} placeholder="Pickup Location" onChange={handleInputChange} />
                                <input type="text" value={destination} placeholder="Destination" onChange={handleInputChange} />
                                <input type="text" value={rideDate} placeholder="Date of Ride" onChange={handleInputChange} />
                                <input type="text" value={rideTime} placeholder="Time of Ride" onChange={handleInputChange} />
                                <input type="text" value={numRiders} placeholder="Number of Riders" onChange={handleInputChange} />
                                <button type="submit">Submit</button>
                            </form>
                        </div> */}
                        <form onSubmit={handleSubmit}>
                            <div class="inputWithIcon">
                                <input type="text" value={pickupLocation} placeholder="Pickup Location" onChange={handleInputChange}/>
                                <i class="fa fa-search fa-lg fa-fw" aria-hidden="true"></i>
                            </div>
                            <div class="inputWithIcon">
                                <input type="text" value={destination} placeholder="Destination" onChange={handleInputChange}/>
                                <i class="fa fa-map fa-lg fa-fw" aria-hidden="true"></i>
                            </div>
                            <div class="inputWithIcon">
                                <input type="text" value={rideDate} placeholder="Date of Ride" onChange={handleInputChange}/>
                                <i class="fa fa-calendar fa-lg fa-fw" aria-hidden="true"></i>
                            </div>
                            <div class="inputWithIcon">
                                <input type="text" value={rideTime} placeholder="Time of Ride" onChange={handleInputChange}/>
                                <i class="fa fa-spinner fa-lg fa-fw" aria-hidden="true"></i>
                            </div>
                            <div class="inputWithIcon">
                                <input type="text" value={numRiders} placeholder="Number of Riders" onChange={handleInputChange}/>
                                <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
                            </div>
                            <div className="modalActions">
                                <div className="actionsContainer">
                                    <button className="deleteButton" type="submit">
                                        Create Ride
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