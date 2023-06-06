import React from "react";
import {
  Card,
  Text,
  Image,
  Stack,
  Heading,
  Button,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { processDate } from "./PrettyDate";
import axios from "axios";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

function RideCard({
  username,
  rideID,
  date,
  locationFrom,
  locationTo,
  duration,
  price,
  numRiders,
  setMapRideID,
  displayColor,
  joinColor,
  setMark,
  mark,
  setJoinRideID,
  setDisplayID,
  displayID,
  joinRideID,
  nr,
  garb,
  setGarb,
}) {
  const renderMap = () => {
    // pass in the rideID which is the only argument required for the map api call
    // this sets the setMapRideID useState() function in the parent CreateRide.js component
    console.log(rideID);
    setMapRideID(rideID);
    setDisplayID(rideID);
  };

  const RideStatement = () => {
    if (numRiders == 4) {
      return "Newer cars with extra legroom. Capacity of 4.";
    }
    if (numRiders == 6) {
      return "Large vehicles for big groups. Capacity of 6.";
    }
    return null;
  };

  const RideTitle = () => {
    if (numRiders == 4) {
      return "UberX";
    }
    if (numRiders == 6) {
      return "UberXL";
    }
    return null;
  };

  const RideImage = () => {
    if (numRiders == 4) {
      return "https://cdn.geekwire.com/wp-content/uploads/2017/04/uberx.png";
    }
    if (numRiders == 6) {
      return "https://projectgolfau.com/wp-content/uploads/2020/09/UberXL1.jpg";
    }
    return null;
  };

  const priceNice = () => {
    const numPrice = Number(price);
    return numPrice.toFixed(2);
  };

  const bookRide = async () => {
    try {
      const res = await axios.post("http://localhost:8000/join-ride", {
        username: username,
        rideID: rideID,
      });
      // if res is not false, then set joinRideID to the rideID
      if (res.data) {
        setJoinRideID([...joinRideID, rideID]);
        setGarb(garb + 1);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <ChakraProvider>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          htmlHeight="200px"
          htmlWidth="350px"
          objectFit="contain"
          src={RideImage()}
          alt="Uber Image"
          style={{
            maxwidth: "100%",
            maxheight: "100%",
            /* Add any other styles specific to the Image component */
          }}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{RideTitle()}</Heading>
            <Text py="2">
              Date: {processDate(date)}
              <br />
              Location From: {locationFrom}
              <br />
              Location To: {locationTo}
              <br />
              Ride Duration: {duration} minutes
            </Text>
            {[0, ...Array(numRiders - 1)].map((_, index) => (
              <PermIdentityIcon
                key={index}
                style={{
                  color:
                    index === 0 ? "red" : index + 1 <= nr ? "red" : "green",
                }}
              />
            ))}
            <Text py="0">{RideStatement()}</Text>
          </CardBody>
          <CardFooter>
            <Button variant="solid" colorScheme={joinColor} onClick={bookRide}>
              Book Ride
            </Button>
            <Button
              variant="solid"
              colorScheme={displayColor}
              onClick={renderMap}
            >
              Display Map
            </Button>
          </CardFooter>
        </Stack>
        <Heading fontSize="3xl" marginTop="30px" marginRight="30px">
          ${priceNice()}
        </Heading>
      </Card>
    </ChakraProvider>
  );
}

export default RideCard;
