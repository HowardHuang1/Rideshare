import React, { useState } from "react";
import "./CreateRideModal.css";
import { RiCloseLine } from "react-icons/ri";
import "font-awesome/css/font-awesome.min.css";

function SuccessModal({
    setCreatedRide,
}){

    return (
        <div>
        {/* <div className="darkBG centered" onClick={() => setIsOpen(false)}> */}
        <div className="darkBG centered">
            <div className="centered">
            <div className="modal" style={{ height: "120px" }}>
                <div className="modalHeader">
                <h5 className="title">Ride Created!</h5>
                </div>
                <button className="closeButton" onClick={() => setCreatedRide(false)}>
                <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <div className="modalContent">
                    <p>View ride in profile</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default SuccessModal;
