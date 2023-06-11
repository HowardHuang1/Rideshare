# Bruin Cruisin

Bruin Cruisin is an application for coordinating carpools and ridesharing on college campus. It supports functionality for creating, joining, and leaving rides and runs price prediction algorithms on actual ridesharing platforms like Uber. The application also displays the path based on the ride selected as well as parameters like pickup and dropoff locations, date and time, number of riders, and the price of the ride. The profile page also displays the ride history for the user.

The app primarily consists of a React frontend, Node.js backend, and a MongoDB database. We also use puppeteer to webscrape for live ride prices.

![UI](https://github.com/HowardHuang1/Rideshare/blob/main/BruinCruisin%20UI.png)

# Creating API Key

You will need to create a an API key. Here are steps for doing that
1) Go to the Google Cloud Platform Console and sign in or create a new account if you don't have one.
2) Create a new project, or select an existing one, and navigate to the API Library.
3) Enable the Google Maps JavaScript API, Geolocation API, Distance API, Static Maps API, Directions API, and Place API. Then, generate an API key by going to the Credentials page and then click Create credentials > API key. 
4)Follow the commented instructions later for implementing the api key

To clone and run this application, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/HowardHuang1/Ridshare.git
# Go into the repository
$ cd Rideshare
# Install dependencies
$ npm install
# Run the web app
$ npm start
# In a different terminal, run the server
$ cd server
# 4)Replace the value of google_api_key with your api key in both server.js #and services.js
$ npm start
```

Packages and presets will be loaded automatically from `package.json`.

This will fully render the Bruin Cruisin website's sign up page. After you create an account and login, navigate to the home page by clicking the button in the top left corner called "Home". This page contains specific instructions on how to use the app to create rides, search for rides, etc.

# Troubleshooting

1) MongoDB connection error: 'Mongo server selection error': If you see this error after some time, it may be related to the network connection between your computer and the MongoDB cluster. Try disconnecting and reconnecting to your Wi-Fi. If that doesn't work, on macOS, go to System Preferences > Network, select your Wi-Fi on the left sidebar, remove it using the "-" sign, and then recreate the Wi-Fi connection using the "+" sign (you may need to reconfigure your old settings). Restart both the Rideshare and server terminals, and the error should be resolved.

2)Google Maps API error: 'InvalidKeyMapError': If you see this error, it indicates that the Google Maps API key you provided is invalid or not authorized for the specific APIs used in Bruin Cruisin. To troubleshoot this issue, ensure that you have enabled the correct APIs (Google Maps JavaScript API, Geolocation API, Distance Matrix API, Static Maps API, Directions API, and Places API) in the Google Cloud Platform Console. Also, double-check that you have copied and pasted the API key correctly into the server.js and services.js files. If the issue persists, regenerate a new API key and update it in the application files. Note that you may have to set up billing in order for this to work.

3) Dependency installation error: 'Module not found': If you encounter this error when running the application, it indicates that a required module or dependency is missing or not installed properly. To troubleshoot this issue, run the following commands
```bash
$ cd Rideshare
$ npm install
$ cd server
$ npm install
```
Please make sure to restart both Rideshare and server in separate terminals using the 'npm start' command.