import React, { useState, useEffect } from "react";
import "./CreateRide.css";
import Modal from "./UpdateModal";
import CreateRideModal from "./CreateRideModal";
import CardStack from "./CardStack";
import axios from "axios";
import ContinueModal from "./ContinueModal";
import SuccessModal from "./SuccessModal";

//TODO: Need to make am PM button
//TODO: Need to add dropdown menu for number of riders (2 options: 4 or 6)
function CreateRide({ username }) {
  const blurmap = "https://i.ibb.co/6JQjLbV/Default-Blur-Image.jpg";
  const [isOpen, setIsOpen] = useState(false);
  const [map, setMap] = useState(blurmap);
  const [mapRideID, setMapRideID] = useState(null);
  const [mark, setMark] = useState("");
  const [joinRideID, setJoinRideID] = useState([]);
  const [displayRideID, setDisplayID] = useState("");
  const [garb, setGarb] = useState(5);
  const [isOn, setIsOn] = useState(false);
  const [data, setData] = useState([]);
  const [createdRide, setCreatedRide] = useState(false);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        if (mapRideID == null) {
          setMap(blurmap);
        } else {
          const response = await axios.get(
            "http://localhost:8000/get-ride-image",
            {
              params: {
                rideID: mapRideID,
              },
            }
          );
          setMap(response.data || blurmap);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching map: ", error);
      }
    };
    fetchMap();
  }, [mapRideID]);

  // const fetchMap = async(e) => {
  //   await axios.get("http://localhost:8000/get-ride-image", {
  //     rideID: "647652eb719dc5143d88c399"
  //   }).then(res => console.log(res.data)).catch(err => console.log(err))
  // }

  // fetchMap();

  const [locationFromSearchParam, setlocationFromSearchParam] = useState();
  const [locationToSearchParam, setlocationToSearchParam] = useState();
  const [dateSearchParam, setdateSearchParam] = useState();
  const [timeSearchParam, settimeSearchParam] = useState();
  const [AMSearchParam, setAMSearchParam] = useState();

  return (
    <div className="create-ride-interface" style={{ display: "flex" }}>
      <div
        className="rides"
        style={{
          flexDirection: "column",
          alignItems: "center",
          height: "100vh", // Adjust this value based on your requirements
          // padding: "20px",
          // paddingTop: "20px",
          // paddingBottom: "20px",
          flex: "1 1 50%",
          width: "50vh",
        }}
      >
        <CardStack
          username={username}
          setMapRideID={setMapRideID}
          locationFromSearchParam={locationFromSearchParam}
          locationToSearchParam={locationToSearchParam}
          dateSearchParam={dateSearchParam}
          timeSearchParam={timeSearchParam}
          AMSearchParam={AMSearchParam}
          mark={mark}
          setMark={setMark}
          setJoinRideID={setJoinRideID}
          setDisplayID={setDisplayID}
          displayID={displayRideID}
          joinRideID={joinRideID}
          garb={garb}
          setGarb={setGarb}
        />
      </div>

      <div
        className="ModalButton"
        style={{
          flex: "1 1 50%",
          width: "50vh",
        }}
      >
        <button
          className="openModalButton"
          style={{
            position: "absolute",
            top: "8%",
            left: "55.5%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
          onClick={() => setIsOpen(true)}
        >
          Create/Search Rides
        </button>
        {isOpen && (
          <CreateRideModal
            setIsOpen={setIsOpen}
            username={username}
            setlocationFromSearchParam={setlocationFromSearchParam}
            setlocationToSearchParam={setlocationToSearchParam}
            setdateSearchParam={setdateSearchParam}
            timeSearchParam={timeSearchParam}
            settimeSearchParam={settimeSearchParam}
            setAMSearchParam={setAMSearchParam}
            setMark={setMark}
            mark={mark}
            displayID={displayRideID}
            joinRideID={joinRideID}
            setJoinRideID={setJoinRideID}
            setDisplayID={setDisplayID}
            setMapRideID={setMapRideID}
            setIsOn={setIsOn}
            setData={setData}
            setCreatedRide={setCreatedRide}
          />
        )}
        {isOn && (
          <ContinueModal 
            setIsOn={setIsOn} 
            data={data}
            setMark={setMark}
            mark={mark}
            displayID={displayRideID}
            joinRideID={joinRideID}
            setJoinRideID={setJoinRideID}
            setDisplayID={setDisplayID}
            setMapRideID={setMapRideID}
            setCreatedRide={setCreatedRide}
            setlocationFromSearchParam={setlocationFromSearchParam}
            setlocationToSearchParam={setlocationToSearchParam}
            setdateSearchParam={setdateSearchParam}
            settimeSearchParam={settimeSearchParam}
            setAMSearchParam={setAMSearchParam}
          />
        )}
        {createdRide && (
          <SuccessModal 
            setCreatedRide={setCreatedRide}
          />
        )}

        <img src={map ? map : blurmap} style={{ height: "100vh" }} />
      </div>
    </div>
  );
}

export default CreateRide;
