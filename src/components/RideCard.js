import React from 'react';
import { Card, Text, Image, Stack, Heading, Button, CardBody, CardFooter } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { processDate } from "./PrettyDate";
import axios from "axios"

function RideCard( { username, rideID, date, locationFrom, locationTo, duration, price, numRiders, setMapRideID } ) {
    const renderMap = () => {
        // pass in the rideID which is the only argument required for the map api call
        // this sets the setMapRideID useState() function in the parent CreateRide.js component
        console.log(rideID)
        setMapRideID(rideID)
    };

    const RideStatement = () => {
        if(numRiders == 4){
            return "Newer cars with extra legroom. Capacity of 4.";
        }
        if(numRiders == 6){
            return "Large vehicles for big groups. Capacity of 6.";
        }
        return null;
    };

    const RideTitle = () => {
        if(numRiders == 4){
            return "UberX";
        }
        if(numRiders == 6){
            return "UberXL";
        }
        return null;
    };

    const RideImage = () => {
        if(numRiders == 4){
            return "https://cdn.geekwire.com/wp-content/uploads/2017/04/uberx.png"
        }
        if(numRiders == 6){
            return "https://projectgolfau.com/wp-content/uploads/2020/09/UberXL1.jpg";
        }
        return null;
    };

    const priceNice = () => {
        const numPrice = Number(price)
        return numPrice.toFixed(2);
    }

    const bookRide = async () => {
        await axios.post('http://localhost:8000/join-ride',{
            username:username,
            rideID: rideID
        }).then(res => console.log('Posting data', res)).catch(err => console.log(err))      
    }


    const joinColor = () => {
        return 'red'

    }

    return(
        <ChakraProvider>
            <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            >
                
            <Image
            htmlHeight='200px'
            htmlWidth='350px'
            objectFit='contain'
            src={RideImage()}
            alt='Uber Image'
            style={{
                maxwidth: "100%",
                maxheight: "100%",
                /* Add any other styles specific to the Image component */
            }}
            />
        
            <Stack>
                <CardBody>
                <Heading size='md'>{RideTitle()}</Heading>
                <Text py='2'>
                    Date: { processDate(date) }
                    <br />
                    Location From: { locationFrom }
                    <br />
                    Location To: { locationTo }
                    <br />
                    ETA: {duration} minutes
                </Text>
                <Text py='0'>
                    {RideStatement()}
                </Text>
                </CardBody>
                <CardFooter>
                <Button variant='solid' colorScheme={joinColor()} onClick={bookRide}>
                    Book Ride
                </Button>
                <Button variant='solid' colorScheme='red' onClick={renderMap}>
                    Display Map
                </Button>
                </CardFooter>
            </Stack>
                <Heading fontSize='3xl' marginTop='30px' marginRight='30px'>${ priceNice() }</Heading>
            </Card>
        </ChakraProvider>
    );
}

export default RideCard;