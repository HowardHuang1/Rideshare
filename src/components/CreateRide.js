import React, { useState, useEffect } from "react";
import "./CreateRide.css";
import Modal from "./UpdateModal";
import CreateRideModal from "./CreateRideModal";
import CardStack from "./CardStack";
import axios from "axios";

//TODO: Need to make am PM button
//TODO: Need to add dropdown menu for number of riders (2 options: 4 or 6)
function CreateRide({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const [map, setMap] = useState();
  const [mapRideID, setMapRideID] = useState("647652eb719dc5143d88c399");
  const [mark, setMark] = useState(1);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/get-ride-image",
          {
            params: {
              // rideID: "647652eb719dc5143d88c399"
              rideID: mapRideID,
              // replace this parameter later with rideID: mapRideID
              // which changes based on which ride card was selected
              // to render a different map for each ride
            },
          }
        );
        setMap(response.data);
        console.log(response.data);
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

  const imageURL = "https://i.ibb.co/6JQjLbV/Default-Blur-Image.jpg";

  const [locationFromSearchParam, setlocationFromSearchParam] = useState();
  const [locationToSearchParam, setlocationToSearchParam] = useState();
  const [dateSearchParam, setdateSearchParam] = useState();
  const [timeSearchParam, settimeSearchParam] = useState();
  const [AMSearchParam, setAMSearchParam] = useState();

  return (
    <div className="create-ride-interface">
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
        />
      </div>

      <div
        className="ModalButton"
        style={{
          flex: "1 1 50%",
          backgroundImage: `url(${imageURL})`,
          // backgroundImage: `url(${map})`
        }}
      >
        {/* <img src="https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:m}wnEzzypUsEgE]jBEf@AzAErBElAIj@Mh@Wt@mDpJ_@n@_@b@KLo@t@]j@KXLHP?TB^JXP|AvAtApAfB|AdAr@x@f@RB\TB@rDjBdA\VBj@JXEH@p@DrAFvCLfBLhE\fBLLAz@FlADj@@fADlBH@?JIP@nAJr@F`CPpDJlA@nAAzCKfPg@rA?fAD`CTj@J`@JfA`@hAf@hFtCnJfFdDvAhDpAvC|AlHdEvDtB|@f@pAh@pBr@vA`@nDr@tC\pCP|CDdJB~QEnUErNCzHOlNi@jHSzEOnCGnCCtEArCFvBDvDFbDF`DBbBARGT?tBChJGrMI|DBpEPnFVnEJrH@xM?fh@@fSAtQHvHDjKBjSGbFChDOxCYnDa@bLuAjJiAzAO~AKjCCdBDlEXdIh@bBFjBB|CF~C@tD@rGBlJBnEFhDLdCL^`@NBnBV|En@zAP~@JZLnAP`BRdBVr@Tl@\j@f@d@l@^v@^rAJbAD~BB`GD~EF`IRnF\lHFbBBxC?JTl@?h@@|EDbBJlCPfCNbBn@hFnChSzE`^xAxKn@`Gd@tHRzHBdEGnUAlKAlAAzOLxIH~CZpOl@tVVzJD|DKzDIxASzBg@lD]`B[tA[bAm@fBuA~C_BpC}A`CcK|OwCvEiBzCgDtG_BpDuAlDs@~By@|CeAlFW~Ac@`DUbCIvAGtACfD@bA@tAJfCPpBThBd@bCx@vDhD`PbA|EpClMzAnHd@hCZrBLrALrBHpBDhC?dLAhB?pC?pB?xDCrDKbC[fDQxASzAc@pCOlAWrB_@rCUjCIlBE|BBxGDlABpBBjCBbCA~CWrKAnAIlEI|CM^Ej@MlBOzBKxCAfIOpASl@[n@q@t@}@j@a@Lk@PyD?wB?mKAmC?cUFkNCsJGmA?HjBE`FE`IC`D?tADrA?@&key=AIzaSyDErGxdZK14gqrGZG0TXDnqooOgOQVGGyY"
          alt="map"
        /> */}
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
          />
        )}
        <img
          src={map}
          alt="map"
          style={{ height: "100vh" }}
          // style={{ width: '100%', height: 'auto' }}
        />
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
  );
}

export default CreateRide;
