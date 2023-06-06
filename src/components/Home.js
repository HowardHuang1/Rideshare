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
    </div>
  );


};



export default Home;