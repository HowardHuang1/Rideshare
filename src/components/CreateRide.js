import React, { useState, useEffect } from 'react';
import "./CreateRide.css"
import Modal from "./Modal"
import CreateRideModal from './CreateRideModal';
import CardStack from "./CardStack"
import axios from "axios"

//TODO: Need to make am PM button
//TODO: Need to add dropdown menu for number of riders (2 options: 4 or 6)
function CreateRide({username}) {
  const [isOpen, setIsOpen] = useState(false);
  const [map, setMap] = useState();
  const [mapRideID, setMapRideID] = useState();

  useEffect(() => {
    const fetchMap = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get-ride-image',{
              params:{
                rideID: "647652eb719dc5143d88c399"
                // replace this parameter later with rideID: mapRideID
                // which changes based on which ride card was selected 
                // to render a different map for each ride
              }
            });
            setMap(response.data);
        } catch (error) {
            console.error('Error fetching map: ', error)
        }
    }
    fetchMap();
  }, []);

  // const fetchMap = async(e) => {
  //   await axios.get("http://localhost:8000/get-ride-image", {
  //     rideID: "647652eb719dc5143d88c399"
  //   }).then(res => console.log(res.data)).catch(err => console.log(err))
  // }

  // fetchMap();

  const imageURL = "https://i.ibb.co/6JQjLbV/Default-Blur-Image.jpg"
  return(
    <div className="create-ride-interface">
      <div className="rides" style={{
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh', // Adjust this value based on your requirements
        // padding: "20px",
        // paddingTop: "20px",
        // paddingBottom: "20px",
        flex: "1 1 50%",
      }}>
        <CardStack setMap={setMapRideID}/>
      </div>

      <div className="ModalButton"
      style={{
        flex: '1 1 50%',
        backgroundImage: `url(${imageURL})`
      }}> 
        <button className="openModalButton" onClick={() => setIsOpen(true)}>
          Create New Ride
        </button>
        {isOpen && <CreateRideModal setIsOpen={setIsOpen} username={username}/>}
      </div>
      
      {/* <div className="rides" style={{
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh', // Adjust this value based on your requirements
        padding: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
        flex: "1 1 50%",
      }}>
        <CardStack setMap={setMapRideID}/>
      </div> */}

    </div>
  )
};

export default CreateRide;