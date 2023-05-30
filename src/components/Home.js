import React from 'react';
import Tesla from '../Tesla.jpeg'
import RedirectingButton from './RedirectingButton';
import "./Home.css";
import HeroSection from './HeroSection';

function Home() {
  const backgroundImageStyle = {
    backgroundImage: ``,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  };
  
  return( 
    <div className="home" >
      <HeroSection />
      <div className="photo">
        <RedirectingButton id="hi" destination={"/createRide"} value={"Create a ride"} />
      </div>
    </div>
  );
};



export default Home;