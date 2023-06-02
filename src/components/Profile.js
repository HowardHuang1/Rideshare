import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './Profile.css';
import './Modal'

const username = "parthivn";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user-data', { params: { username } });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      {userData ? (
        <table className="profile-table">
          <tbody>
            <tr>
              <td><strong>Full Name:</strong></td>
              <td>{userData.fullName}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{userData.emailAddress}</td>
            </tr>
            <tr>
              <td><strong>Username:</strong></td>
              <td>{userData.username}</td>
            </tr>
            <tr>
              <td><strong>Money Saved:</strong></td>
              <td>{userData.moneySaved}</td>
            </tr>
            <tr>
              <td><strong>Carbon Saved:</strong></td>
              <td>{userData.carbonSaved} kg CO2</td>
            </tr>
            <tr>
              <td><strong>Number of Rides:</strong></td>
              <td>{userData.numRides}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const RideHistory = () => {
  const [rideData, setRideData] = useState(null);
  const [time, setTime] = useState('');
  const [numRiders, setNumRiders] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        const username = "parthivn";
        const response = await axios.get('http://localhost:8000/get-rides-for-user', { params: { username } });
        setRideData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchRideData();
  }, []);

  const handleUpdateRide = async (rideID, time, numRiders) => {
    try {
      const response = await axios.post('http://localhost:8000/update-ride', {rideID: rideID, time: time, numRidersAllowed: numRiders });
    } catch (error) {
      console.error('Error updating ride:', error);
    }

    handleCloseModal();
  };

  const leaveRide = async (username, rideID) => {
    try {
      const response = await axios.post('http://localhost:8000/leave-ride', {username: username, rideID: rideID});
      if (response.status === 200) {
        setRideData(prevRideData => prevRideData.filter(ride => ride._id !== rideID));
      }
    } catch (error) {
      console.error('Error leaving ride:', error);
    }
  };
  

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

  return (
    <div className="ride-history-container">
      <h2>Ride History</h2>
      <div className="tables-container">
        {rideData && (
          <div className="ride-history-table">
            <h3>Existing Rides</h3>
            <table>
              <tbody>
                {existingRides.map((ride) => (
                  <React.Fragment key={ride._id}>
                    <tr>
                      <td><strong>Start:</strong></td>
                      <td>{ride.locationFrom}</td>
                    </tr>
                    <tr>
                      <td><strong>End:</strong></td>
                      <td>{ride.locationTo}</td>
                    </tr>
                    <tr>
                      <td><strong>Date:</strong></td>
                      <td>{ride.date}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="button-group">
                        <button className="openModalButton" onClick={() => setIsOpen(true)}>
                          Create New Ride
                        </button>
                        {isOpen && <Modal setIsOpen={setIsOpen} />}
                          {/* <button className="action-button" onClick={handleShowModal}>Update Ride</button> */}
                          <button className="action-button" onClick={() => leaveRide(username, ride._id)}>Leave Ride</button>
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
            <table>
              <tbody>
                {pastRides.map((ride) => (
                  <React.Fragment key={ride._id}>
                    <tr>
                      <td><strong>Start:</strong></td>
                      <td>{ride.locationFrom}</td>
                    </tr>
                    <tr>
                      <td><strong>End:</strong></td>
                      <td>{ride.locationTo}</td>
                    </tr>
                    <tr>
                      <td><strong>Date:</strong></td>
                      <td>{ride.date}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const App = ({ username, logout }) => {
  return (
    <div className="container">
      <div className="flex-container">
        <Profile />
        <RideHistory />
      </div>
      <div>
        <button className="logout-button" onClick={() => logout(null)}>Logout</button>
      </div>
    </div>
  );
};

export default App;
