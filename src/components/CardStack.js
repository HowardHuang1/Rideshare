import React, { useState, useEffect } from "react";
import { VStack, StackDivider, Box } from '@chakra-ui/react'
import RideCard from "./RideCard"
import "./CardStack.css"
import Searchbar from "./Ride Filters/Searchbar"
import axios from "axios";
import RideSelector from "./RideSelector";
import Locationbar from "./Ride Filters/Locationbar";
import Destinationbar from "./Ride Filters/Destinationbar";
import RideDatebar from "./Ride Filters/RideDatebar";
import RideTimebar from "./Ride Filters/RideTimebar";
import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu";

function CardStack() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:8000/get-rides-for-user');
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error('Error fetching ride data: ', error)
            }
        }
        fetchData();
    }, []);

    // if (data === null) {
    //     return <div>Loading...</div>;
    // }

    // try {
    //     const response = await axios.post('/localhost:8000/create-ride', {
    //       username: 'parthivn',
    //       date: '09/25/2024',
    //       time: '12:00',
    //       AM: false,
    //       locationFrom: 'UCLA',
    //       locationTo: 'LAX',
    //       numRidersAllowed: '4'
    //     });
      
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }

    return(
        <div className="container" style ={{flexGrow: "1",}}>
            {/* <Searchbar />
            <Locationbar />
            <Destinationbar />
            <RideDatebar />
            <RideTimebar />
            <RideSelector />
            <div className="cardstacksearch">
                    <button className="searchButton" >
                        Search
                    </button>
            </div> */}
            <div className="cardStack">
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    align='stretch'
                >
                {/* <RideCard date={response.date} locationFrom={response.locationFrom} locationTo={response.locationTo} durationInTraffic={response.durationInTraffic} price={response.price} numRidersAllowed={response.numRidersAllowed} /> */}
                <RideCard date={5/21/2023} locationFrom={"SF"} locationTo={"LAX"} duration={7} price={500} numRiders={4} />
                {/* <RideCard date={data.date} locationFrom={data.locationFrom} locationTo={data.locationTo} duration={data.durationInTraffic} price={data.price} numRiders={data.numRidersAllowed}/> */}
                <RideCard />
                </VStack>
            </div>
        </div>
    );
}

export default CardStack;