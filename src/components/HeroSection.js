import React, {useState} from 'react';
import "./HeroSection.css";
import RedirectingButton from "./RedirectingButton";

const HeroSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="homepage-content">
        <div className="section hero-container">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to BruinCruisin</h1>
            <p className="hero-subtext">Create or find carpools with fellow Bruins in an instant!</p>
            <div className="HomeButton">
            <a href="/createRide">
                <button id="ButtonToCreate" onClick={() => setIsOpen(true)}>
                Click here to Get Started!
                </button>
            </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.ctfassets.net/q8mvene1wzq4/4IBwnsnQGhWotLFtcMYJXG/76595507c8a64e686b85a8cdce605cd8/rdr_hero_pp.jpg?w=1000&q=60&fm=webp"
              alt="Hero Image"
            />
          </div>
        </div>
      <div className="section light-gray-background">
        <div className="left-half">
        <div className="left-image">
          <img
            src={process.env.PUBLIC_URL + '/CreateRideSS.png'}
            alt="Left Image"
          />
        </div>
        </div>
        <div className="right-half">
          <h2 className="light-red-text">
            Steps for searching/creating a ride
          </h2>
          <div className="steps">
          <ol>
            <li>
              Decide what you want your ride to be. You can choose the pick-up
              location, destination, time, and number of riders.
            </li>
            <li>
              Next, we'll let you know if there's a similar ride that other
              BruinCruisin users are taking at this time.
            </li>
            <li>
              If a similar ride exists, go ahead and join to save money and
              reduce carbon emissions!
            </li>
            <li>
              If we don't have a similar ride for you, go ahead and click create
              so that other users may join your ride.
            </li>
            <li>
              Either way, you'll receive an email shortly after confirming your
              ride with the price for it!
            </li>
          </ol>
        </div>
        </div>
      </div>
      <div className="section">
        <div className="left-half">
          <h2 className="light-red-text">
            Accessing Profile Page
          </h2>
          <div className="profile">
          <ol>
            <li>
              Your profile page contains all of your personal information,
              especially including your rides
            </li>
            <li>
              Here, you'll be able to see your upcoming rides. You can update
              the time if you created it or leave the ride if you would like.
            </li>
            <li>
              You'll also be able to see your previous rides if you ever want to
              take a look back to where you've been.
            </li>
            <li>
              Lastly, here you can see some pretty cool pieces of information,
              such as how much money and carbon you've saved!
            </li>
          </ol>
        </div>
        </div>
        <div className="right-half">
        <div className="right-image">
          <img
            src={process.env.PUBLIC_URL + '/ProfileSS.png'}
            alt="Right Image"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

