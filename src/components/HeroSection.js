import React from 'react';
import './HeroSection.css';
import RedirectingButton from './RedirectingButton';

const HeroSection = () => {
    return (
        <div className="hero">
            <h1 className="hero-title">Welcome to BruinCruisin</h1>
            <p className="hero-subtext">Create or find carpools with fellow Bruins in an instant!</p>
            <RedirectingButton id="hi" destination={"/createRide"} value={"Create a ride"} />
        </div>
    );
}

export default HeroSection;