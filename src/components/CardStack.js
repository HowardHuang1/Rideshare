import React, { useState, useEffect } from "react";
import { VStack, StackDivider, Box } from '@chakra-ui/react'
import RideCard from "./RideCard"
import "./CardStack.css"
import axios from "axios";

function CardStack({ setMapRideID }) {
    const [rideData, setRideData] = useState(null);

    useEffect(() => {
        const fetchRideData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/search-ride",
                );
                setRideData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchRideData();
    }, []);

    const rideArray = [];
    if (rideData) {
        rideData.forEach((ride) => {
            rideArray.push(
                <RideCard
                    key={ride.rideID} // Add a unique key prop for each item in the array
                    rideID={ride.rideID}
                    date={ride.date}
                    locationFrom={ride.locationFrom}
                    locationTo={ride.locationTo}
                    duration={ride.duration}
                    price={ride.price}
                    numRiders={ride.numRiders}
                    setMapRideID={setMapRideID}
                />
            );
            console.log(ride.rideID)
        });
    }
    console.log(rideArray);

    return (
        <div className="container" style={{ flexGrow: "1" }}>
            <div className="cardStack">
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    align='stretch'
                >
                {/* <RideCard date={response.date} locationFrom={response.locationFrom} locationTo={response.locationTo} durationInTraffic={response.durationInTraffic} price={response.price} numRidersAllowed={response.numRidersAllowed} /> */}
                <RideCard rideID={"647d4745bc13f30b012e0627"} date={5/21/2023} locationFrom={"SF"} locationTo={"LAX"} duration={7} price={500} numRiders={4} setMapRideID={setMapRideID}/>
                {/* <RideCard rideID={data._id} date={data.date} locationFrom={data.locationFrom} locationTo={data.locationTo} duration={data.durationInTraffic} price={data.price} numRiders={data.numRidersAllowed}/> */}
                <RideCard rideID={"647652eb719dc5143d88c399"} setMapRideID={setMapRideID}/>

                {rideArray} {/* Render the rideArray components */}
                    {/* <point /> */}
                    {/* <RideCard
                        rideID={"647652eb719dc5143d88c399"}
                        date={5 / 21 / 2023}
                        locationFrom={"SF"}
                        locationTo={"LAX"}
                        duration={7}
                        price={500}
                        numRiders={4}
                        setMap={setMap}
                    /> */}
                </VStack>
            </div>
        </div>
    );
}

export default CardStack;
