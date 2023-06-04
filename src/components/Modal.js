import React, { useState } from "react";
import "./Modal.css"
import { RiCloseLine } from "react-icons/ri";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios"

const username = localStorage.getItem('username'); 

function Modal({ setIsOpen, rideID }) {
    const [pickupLocation, setPickupLocation] = useState();
    const [destination, setDestination] = useState();
    const [rideTime, setRideTime] = useState();
    const [numRiders, setNumRiders] = useState();
    const [AM, setAmPm] = useState("AM");

    const postData = async (e) => {
        console.log("postData is hit")
        console.log(rideTime)
        console.log(numRiders)
        console.log(username)
        console.log(rideID)
        // await axios.put('http://localhost:8000/update-ride', {
        //     // default username
        //     username: username,
        //     rideID: "ds",
        //     time: rideTime, // time is missing
        //     AM: "false", // default am pm
        //     numRidersAllowed: numRiders, // default numRiders
        // }).then(res => console.log('Posting data', res)).catch(err => console.log(err))
    }

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

    const handleSubmit = (e) => {
        e.preventDefault(); // To prevent page reload on form submission
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
                        <form onSubmit={handleSubmit}>
                            <div class="inputWithIcon2">
                                <input type="text" name="rideTime" value={rideTime} placeholder="Time of Ride, ex: 8:30" onChange={handleInputChange}/>
                                <select style={{ borderRadius: '20px', width: '20%', border: '2px solid #aaa', height: '80%'}} onChange={e => handleInputChange(e, 'amPm')}>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                                <i class="fa fa-spinner fa-lg fa-fw" aria-hidden="true"></i>
                            </div>
                            <div class="inputWithIcon">
                                <input type="text" name="numRiders" value={numRiders} placeholder="Number of Riders, ex: 5" onChange={handleInputChange}/>
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