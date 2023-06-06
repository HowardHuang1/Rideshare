import React, { useState, useEffect } from "react";
import { VStack, StackDivider, Box } from "@chakra-ui/react";
import RideCard from "./RideCard";
import "./CardStack.css";
import axios from "axios";

function CardStack({
  username,
  setMapRideID,
  locationFromSearchParam,
  locationToSearchParam,
  dateSearchParam,
  timeSearchParam,
  AMSearchParam,
  mark,
  setMark,
  setJoinRideID,
  setDisplayID,
  displayID,
  joinRideID,
  garb,
  setGarb,
}) {
  const [rideData, setRideData] = useState(null);

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        console.log("in the try time is: " + timeSearchParam);
        const response = await axios.get("http://localhost:8000/search-ride", {
          params: {
            locationFrom: locationFromSearchParam,
            locationTo: locationToSearchParam,
            date: dateSearchParam,
            time: timeSearchParam,
            AM: AMSearchParam,
            open: true,
          },
        });
        setRideData(response.data);
        console.log(rideData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchRideData();
  }, [
    locationFromSearchParam,
    locationToSearchParam,
    dateSearchParam,
    timeSearchParam,
    AMSearchParam,
    mark,
    joinRideID,
  ]);

  const rideArray = [];
  let rideDataCopy = null;
  if (rideData) {
    rideDataCopy = [...rideData];
    // make the ride with the id of mark the first element in the array
    for (let i = 0; i < rideDataCopy.length; i++) {
      if (rideDataCopy[i]._id == mark) {
        const temp = rideDataCopy[i];
        rideDataCopy[i] = rideDataCopy[0];
        rideDataCopy[0] = temp;
        break;
      }
    }
  }

  if (rideDataCopy) {
    rideDataCopy.forEach((ride) => {
      let displayColor = "red";
      let joinColor = "red";
      if (joinRideID.includes(ride._id)) {
        joinColor = "gray";
      }
      if (ride.usernames.length >= ride.numRidersAllowed) {
        joinColor = "gray";
      }
      if (ride.usernames.includes(username)) {
        joinColor = "gray";
      }
      if (ride._id == displayID) {
        displayColor = "gray";
      }
      console.log("ride ul: " + ride.usernames.length);
      rideArray.push(
        <RideCard
          username={username}
          key={ride._id} // Add a unique key prop for each item in the array
          rideID={ride._id}
          date={ride.date}
          locationFrom={ride.locationFrom}
          locationTo={ride.locationTo}
          duration={ride.durationInTraffic}
          price={ride.price}
          numRiders={ride.numRidersAllowed}
          setMapRideID={setMapRideID}
          displayColor={displayColor}
          joinColor={joinColor}
          setMark={setMark}
          setJoinRideID={setJoinRideID}
          setDisplayID={setDisplayID}
          displayID={displayID}
          joinRideID={joinRideID}
          nr={ride.usernames.length}
          garb={garb}
          setGarb={setGarb}
        />
      );
    });
  }

  return (
    <div className="container" style={{ flexGrow: "1" }}>
      <div className="cardStack">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {rideArray} {/* Render the rideArray components */}
        </VStack>
      </div>
    </div>
  );
}

export default CardStack;
