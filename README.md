# Bruin Cruisin

Bruin Cruisin is an application for coordinating carpools and ridesharing on college campus. It supports functionality for creating, joining, and leaving rides and runs price prediction algorithms on actual ridesharing platforms like Uber. The application also displays the path based on the ride selected as well as parameters like pickup and dropoff locations, date and time, number of riders, and the price of the ride. The profile page also displays the ride history for the user.

The app primarily consists of a React frontend, Node.js backend, and a MongoDB database. We also use puppeteer to webscrape for live ride prices.

# How To Use

To clone and run this application, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/HowardHuang1/Ridshare.git
# Go into the repository
$ cd Rideshare
# Install dependencies
$ npm install
# Run the server
$ cd server
$ npm start
# Run the web app
$ npm start
```

Packages and presets will be loaded automatically from `package.json`.

This will fully render the Bruin Cruisin website's login page. After you login, Bruin Cruisin will load a page displaying active rides. The user can then open the modal to create a new ride or search for existing rides to join.
