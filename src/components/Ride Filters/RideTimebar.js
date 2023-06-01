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
                placeholder="Time of Ride"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{
                    borderRadius: '20px',
                    padding: '10px',
                    width: '800px'
                  }}
            />
            <select 
                value={meridiem} 
                onChange={handleMeridiemChange}
                style={{ borderRadius: '20px', width: '20%', border: '2px'}}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
    );
}

export default RideTimebar;
