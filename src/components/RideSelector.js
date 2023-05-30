import React, { useState } from 'react';
import './RideSelector.css';

const RideSelector = () => {
    const [rideStatus, setRideStatus] = useState("");

    const handleChange = (event) => {
        setRideStatus(event.target.value);
    }

    return (
        <div>
            <select className="ride-selector" value={rideStatus} onChange={handleChange}>
                <option value="">Open or Closed Rides</option>
                <option value="open">Open Rides</option>
                <option value="closed">Closed Rides</option>
                
            </select>
        </div>
    );
}

export default RideSelector;
