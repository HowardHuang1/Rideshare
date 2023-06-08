import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import UpdateModal from "./UpdateModal";
import { processDate } from "./PrettyDate";
import NoUpdateModal from "./NoUpdateModal";

const username = localStorage.getItem("username");

const Profile = ({ username }) => {
  console.log(username);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user-data", {
          params: { username },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <h2 style={{ textAlign: 'center' }}>Profile Information</h2>
      {userData ? (
        <table className="profile-table">
          <tbody>
            <tr>
              <td>
                <strong>Full Name:</strong>
              </td>
              <td>{userData.fullName}</td>
            </tr>
            <tr>
              <td>
                <strong>Email:</strong>
              </td>
              <td>{userData.emailAddress}</td>
            </tr>
            <tr>
              <td>
                <strong>Username:</strong>
              </td>
              <td>{userData.username}</td>
            </tr>
            <tr>
              <td>
                <strong>Money Saved:</strong>
              </td>
              <td>{"$" + parseInt(userData.moneySaved)}</td>
            </tr>
            <tr>
              <td>
                <strong>Carbon Saved:</strong>
              </td>
              <td>{parseInt(userData.carbonSaved)} kg CO2</td>
            </tr>
            <tr>
              <td>
                <strong>Number of Rides:</strong>
              </td>
              <td>{parseInt(userData.numRides)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const RideHistory = ({ username }) => {
  const [rideData, setRideData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRideID, setSelectedRideID] = useState(null);
  // const [time, setTime] = useState(null);
  const [numRiders, setNumRiders] = useState(null);

  const leaveRide = async (username, rideID) => {
    try {
      const response = await axios.post("http://localhost:8000/leave-ride", {
        username: username,
        rideID: rideID,
      });
      if (response.status === 200) {
        setRideData((prevRideData) =>
          prevRideData.filter((ride) => ride._id !== rideID)
        );
      }
    } catch (error) {
      console.error("Error leaving ride:", error);
    }
  };

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/get-rides-for-user",
          { params: { username } }
        );
        setRideData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchRideData();
  }, []);

  const existingRides = [];
  const pastRides = [];
  const current = new Date();

  if (rideData) {
    rideData.forEach((ride) => {
      if (current < new Date(ride.date)) {
        existingRides.push(ride);
      } else {
        pastRides.push(ride);
      }
    });
  }

  const handleSubmit = () => {
    <App />;
  };

  return (
    <div className="ride-history-container">
      <h2 style={{ textAlign: 'center' }}>Ride History</h2>
      <div className="tables-container">
        {rideData && (
          <div className="ride-history-table">
            <h3>Existing Rides</h3>
            <table>
              <tbody>
                {existingRides.map((ride) => (
                  <React.Fragment key={ride._id}>
                    <tr>
                      <td>
                        <strong>Start:</strong>
                      </td>
                      <td>{ride.locationFrom}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>End:</strong>
                      </td>
                      <td>{ride.locationTo}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Date:</strong>
                      </td>
                      <td>{processDate(ride.date)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="button-group">
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setSelectedRideID(ride._id);
                              // setTime(ride.date);
                              setNumRiders(ride.numRiders);
                            }}
                          >
                            Update Ride
                          </button>
                          {isOpen && (
                            (
                            username !== ride.usernames[0])
                            ?
                            <NoUpdateModal
                              setIsOpen={setIsOpen}
                            />
                            :

                            <UpdateModal
                              setIsOpen={setIsOpen}
                              rideid={selectedRideID}
                              onSubmit={handleSubmit}
                              setRideData={setRideData}
                            />
                          )}
                          {/* <button className="action-button" onClick={handleShowModal}>Update Ride</button> */}
                          <button
                            className="action-button"
                            onClick={() => leaveRide(username, ride._id)}
                          >
                            Leave Ride
                          </button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {rideData && (
          <div className="ride-history-table">
            <h3>Past Rides</h3>
            {pastRides.map((ride) => (
              <table key={ride._id}>
                <tbody>
                  <tr>
                    <td>
                      <strong>Start:</strong>
                    </td>
                    <td>{ride.locationFrom}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>End:</strong>
                    </td>
                    <td>{ride.locationTo}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date:</strong>
                    </td>
                    <td>{processDate(ride.date)}</td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const App = ({ username, logout }) => {
  return (
    <div className="container-2" 
    // style={{
    //   paddingTop: "120px"
    // }}
    >
      <div className="flex-container">
        <Profile username={username} />
        <RideHistory username={username} />
      </div>
      <div>
        <button className="logout-button" onClick={() => logout(null)}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default App;
