import React, { useState } from 'react';

function RideTimebar() {
    const [time, setTime] = useState("");
    const [q, setQ] = useState("");
    const [meridiem, setMeridiem] = useState("AM");

    const handleMeridiemChange = (e) => {
        setMeridiem(e.target.value);
    }

    return (
        <div className="search" 
        style={{ display: 'flex', justifyContent: 'start', width: '820px', borderRadius: '20px', padding: '10px' }}>
            <input
                type="text"
                placeholder="Time of Ride, ex: 8:30"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{
                    borderRadius: '20px',
                    padding: '10px',
                    width: '100%', // reduced width to make space for the dropdown
                    marginRight: '10px' // add some space between input and dropdown
                  }}
            />
            <select 
                value={meridiem} 
                onChange={handleMeridiemChange}
                style={{ 
                    borderRadius: '20px', 
                    width: '15%', 
                    border: '2px solid #aaa', // add a border
                    height: '80%' // make the height equal to the input field
                 }}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
    );
}

export default RideTimebar;
