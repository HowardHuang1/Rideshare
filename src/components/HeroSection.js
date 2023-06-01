import React from "react";
import "./HeroSection.css";
import RedirectingButton from "./RedirectingButton";

const HeroSection = () => {
  return (
    <div>
      <div className="hero-container">
        <h1>Welcome to BruinCruisin</h1>
        <p>Create or find carpools with fellow Bruins in an instant!</p>
      </div>
      <div className="left-half">
        <h2>Steps for searching/creating a ride</h2>
        <div className="steps">
          <ol>
            <li>abc </li>
            <li>def</li>
            <li>ghi</li>
            <li>fda</li>
          </ol>
        </div>
        <img
          src="https://g.foolcdn.com/editorial/images/718807/growth-stock-chart.jpg"
          alt="Left Image"
        />
        <img
          src="https://g.foolcdn.com/editorial/images/718807/growth-stock-chart.jpg"
          alt="Left Image"
        />
      </div>
      <div className="right-half">
        <h2>Accessing Profile Page</h2>
        <div className="profile">
          <ol>
            <li>daf</li>
            <li>dfa.</li>
            <li>dfas</li>
          </ol>
        </div>
        <img
          src="https://g.foolcdn.com/editorial/images/718807/growth-stock-chart.jpg"
          alt="Left Image"
        />
        <img
          src="https://g.foolcdn.com/editorial/images/718807/growth-stock-chart.jpg"
          alt="Left Image"
        />
      </div>
    </div>
  );
};

export default HeroSection;
