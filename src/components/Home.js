import React from 'react';
import Tesla from '../Tesla.jpeg'

function Home() {
  return( 
    <div className="container">
      <div className="bannerImage">
        <img src={Tesla} alt="tesla" />
      </div>
    </div>
  );
};

export default Home;