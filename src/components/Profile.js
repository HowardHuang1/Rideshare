import React, { useState } from 'react';
import "./Profile.css"

// Display personal information here

const Profile = (props) => {
    const {name, username, balance} = props;

    return (
        <div className= 'container'>
            <h2>Profile Information</h2>
            <p>Name: {name}</p>
            <p>Username: {username}</p>
            <p>Balance: {balance}</p>
        </div>
    );
}

// Display previous rides here

const RideHistory = () => {
    const rides = [
        {
            start: "starting point",
            end: "ending point",
            payment: "$payment"
        }
    ];

    return (
        <div className= 'container'>
            <h2>Ride History</h2>
            {rides.map(ride => (
                <div key={ride.id}>
                    <p>Start: {ride.start}</p>
                    <p>End: {ride.end}</p>
                    <p>Payment: {ride.payment}</p>
                </div>
            ))}
        </div>
    )
}