import React from 'react';
import Tesla from '../Tesla.jpeg'
import RedirectingButton from './RedirectingButton';
import "./Home.css";

function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url(${Tesla})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  };
  
  return( 
    <div className="container" style={backgroundImageStyle}>
      <div className="photo">
        <RedirectingButton id="hi" destination={"/createRide"} value={"Create a ride"} />
      </div>
    </div>
  );
};



export default Home;