import React from "react";
import "./HeroSection.css";
import RedirectingButton from "./RedirectingButton";

const HeroSection = () => {
  return (
    <div classname="hompage-content">
      <div className="hero-container">
        <h1 class="red-text">Welcome to BruinCruisin</h1>
        <p>Create or find carpools with fellow Bruins in an instant!</p>
      </div>
      <div className="left-half">
        <h2 class="light-red-text" id="underlineText">
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
        <img
          src="https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:m}wnEzzypUsEgE]jBEf@AzAErBElAIj@Mh@Wt@mDpJ_@n@_@b@KLo@t@]j@KXLHP?TB^JXP|AvAtApAfB|AdAr@x@f@RB\TB@rDjBdA\VBj@JPJbAJbALvD^b@LTJl@d@b@j@Zn@HTNt@Hj@TrBF|@LtDPzFLxBZvDdApIp@rFp@nGVvDJxCFrER\AtDCxIEzMC|LMz`@GbQ?|BChB?pGCfKCvHAbD@tE@jEF`EN|HLnDBxAJdBb@jHt@vJlB|V~@dMXtENtFR`K\tRRvLLdIJxHT|MRjLDvBJzBHvEZxPJzF\tSh@pWVvNF~D?dBIvFMxCOxBi@pFoA~JsDjXiEx\_AfHMzAG|@GpC@rBHzAT~B\`C^hBX`AZ|@x@dBvIdQfBpDrDnHxBnEbDtGhFjKt@lBj@jBh@tB\vB^dDJpBD|BC`CGzBwAh^e@nLgA|WSzBQ|Ae@bCw@~CoB~HYzAa@|COlBIlC?lP@xK@~J@nG?hDOl@CdCIjCOlEQ|D?b@DtANzA`@jBh@|A~@|At@|@l@f@r@d@|@b@jA\z@Lt@DvAAjAM`AWn@Wn@[bAu@`EyD^_@fCmBDa@z@k@pA_AbEwCbDcCtRqNlXcSr_@wXvl@ec@`h@o_@tSkOjRmNtTiPdj@ga@zAkAv@w@bAqAV_@ZEJE`@q@bAoBp@sAZm@X_@p@i@n@Ut@QnAYtAMf@G~B@?j@@fD@`DAdD@nHAl@C`@`@DzATnDl@\FTIpCh@hBVhHlApIxAtDh@`AL~BPnBJRFVHxBD`LDtJBpHFjTAvL?`E@nAAp@?lAR|@HvA?rASdACdAADHHFRFz@Nd@Nf@X`@\^h@N^HZJfA^nCDZR`BL\R\TTRJNBP@PFTB`ABFBNBf@Bn@BxCChDBFBLF?dA?tABz@@X&key=AIzaSyDErGxdZK14gqrGZG0TXDnqooOgOQVGGyY"
          alt="Left Image"
        />
        <img
          src="https://g.foolcdn.com/editorial/images/718807/growth-stock-chart.jpg"
          alt="Left Image"
        />
      </div>
      <div className="right-half">
        <h2 class="light-red-text" id="underlineText">
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
