import React, { useState } from 'react'

function Destinationbar() {
    const [q, setQ] = useState("");

    return(
        <div className="search">
            <input
                type="text"
                placeholder="Destination"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{
                    borderRadius: '20px',
                    padding: '10px',
                    width: '800px'
                  }}
            />
        </div>
    );
}



export default Destinationbar;