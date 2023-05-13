import React from 'react';
import Tesla from '../Tesla.jpeg'
import RedirectingButton from './RedirectingButton';

function Home() {
  return( 
    <div className="container">
      <div className="bannerImage">
        <img src={Tesla} alt="tesla" />
      </div>
      <div className="photo">
        <RedirectingButton destination={"/createRide"} value={"Create a ride"} />
      </div>
    </div>
  );
};



export default Home;