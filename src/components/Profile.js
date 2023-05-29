import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('localhost:8000/user-data');
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
              <td>{userData.email}</td>
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
              <td>{userData.carbonSaved}</td>
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
  /*return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <table className="profile-table">
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{name}</td>
          </tr>
          <tr>
            <td><strong>Username:</strong></td>
            <td>{username}</td>
          </tr>
          <tr>
            <td><strong>Number of Rides:</strong></td>
            <td>{num_rides}</td>
          </tr>
          <tr>
            <td><strong>Money Saved:</strong></td>
            <td>{money_saved}</td>
          </tr>
          <tr>
            <td><strong>Carbon Saved:</strong></td>
            <td>{carbon_saved}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  */

const RideHistory = () => {
    const existingRides = [
      {
        id: 1,
        start: 'starting point',
        end: 'ending point',
        payment: '$payment'
      }
    ];
  
    const pastRides = [
      {
        id: 2,
        start: 'past starting point',
        end: 'past ending point',
        payment: '$past payment'
      }
    ];
  
    return (
      <div className="ride-history-container">
        <h2>Ride History</h2>
        <div className="tables-container">
          <div className="ride-history-table">
            <h3>Existing Rides</h3>
            <table>
              <tbody>
                {existingRides.map((ride) => (
                  <React.Fragment key={ride.id}>
                    <tr>
                      <td><strong>Start:</strong></td>
                      <td>{ride.start}</td>
                    </tr>
                    <tr>
                      <td><strong>End:</strong></td>
                      <td>{ride.end}</td>
                    </tr>
                    <tr>
                      <td><strong>Payment:</strong></td>
                      <td>{ride.payment}</td>
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
          <div className="ride-history-table">
            <h3>Past Rides</h3>
            <table>
              <tbody>
                {pastRides.map((ride) => (
                  <React.Fragment key={ride.id}>
                    <tr>
                      <td><strong>Start:</strong></td>
                      <td>{ride.start}</td>
                    </tr>
                    <tr>
                      <td><strong>End:</strong></td>
                      <td>{ride.end}</td>
                    </tr>
                    <tr>
                      <td><strong>Payment:</strong></td>
                      <td>{ride.payment}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

const App = () => {
  /*const profileData = {
    name: 'Satvik Nair',
    username: 'satvikn',
    num_rides: 100,
    money_saved: '$100',
    carbon_saved: '2 diamonds worth'
  };
  */

  return (
    <div className="container">
      <div className="flex-container">
        <Profile /*{...profileData}*/ />
        <RideHistory />
      </div>
      <div>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default App;
