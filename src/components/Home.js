import React, {useState} from 'react';
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
  
  const [isOpen, setIsOpen] = useState(false);

  return( 
    <div className="home">
      <HeroSection />
      <div className="photo">
      </div>
      <div>
        <a href="/createRide">
          <button id="ButtonToCreate" onClick={() => setIsOpen(true)}>
           Click here to Get Started!
          </button>
        </a>
      </div>
    </div>
  );


};



export default Home;