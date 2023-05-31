import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = "parthivn";
        const response = await axios.get('http://localhost:8000/user-data', { params: { username } });
        // Rest of your code...
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
              <td>{userData.moneySaved}</td>
            </tr>
            <tr>
              <td>
                <strong>Carbon Saved:</strong>
              </td>
              <td>{userData.carbonSaved + " kg CO2"}</td>
            </tr>
            <tr>
              <td>
                <strong>Number of Rides:</strong>
              </td>
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

const RideHistory = ({}) => {
  const [rideData, setRideData] = useState(null);

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        const username = "parthivn"; // Replace with your current username
        const response = await axios.get('http://localhost:8000/get-rides-for-user', { params: { username } });
        setRideData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
  console.log(pastRides);

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
                        <button style={{ marginRight: '10px' }}>Update Ride</button>
                        <button>Leave Ride</button>
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

const App = ({username, logout}) => {
  return (
    <div className="container">
      <div className="flex-container">
        <Profile username={username} />
        <RideHistory username={username}/>
      </div>
      <div>
        <button onClick={() => logout(null)}>Logout</button>
      </div>
    </div>
  );
};

export default App;
