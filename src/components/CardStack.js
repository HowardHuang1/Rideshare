import React, { useState, useEffect } from "react";
import { VStack, StackDivider, Box } from '@chakra-ui/react'
import RideCard from "./RideCard"
import "./CardStack.css"
import axios from "axios";




function CardStack({ setMapRideID, locationFromSearchParam, locationToSearchParam, dateSearchParam, timeSearchParam, AMSearchParam }) {
    const [rideData, setRideData] = useState(null);

    useEffect(() => {
        const fetchRideData = async () => {
            try {
                console.log("in the try")
                const response = await axios.get(
                    "http://localhost:8000/search-ride", {
                        locationFrom: locationFromSearchParam, 
                        locationTo: locationToSearchParam, 
                        date: dateSearchParam, 
                        time: timeSearchParam, 
                        AM: AMSearchParam, 
                        open: true
                    }
                );
                setRideData(response.data);
                console.log("happened?")
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchRideData();
    }, [locationFromSearchParam, locationToSearchParam, dateSearchParam, timeSearchParam, AMSearchParam]);

    
    const rideArray = [];
    if (rideData) {
        rideData.forEach((ride) => {
            rideArray.push(
                <RideCard
                    key={ride._id} // Add a unique key prop for each item in the array
                    rideID={ride._id}
                    date={ride.date}
                    locationFrom={ride.locationFrom}
                    locationTo={ride.locationTo}
                    duration={ride.durationInTraffic}
                    price={ride.price}
                    numRiders={ride.numRidersAllowed}
                    setMapRideID={setMapRideID}
                />
            );
        });
    }

    return (
        <div className="container" style={{ flexGrow: "1" }}>
            <div className="cardStack">
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    align='stretch'
                >
                {rideArray} {/* Render the rideArray components */}
                </VStack>
            </div>
        </div>
    );
}

export default CardStack;
