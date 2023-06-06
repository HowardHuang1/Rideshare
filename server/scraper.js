const puppeteer = require("puppeteer");

async function scrapeFareValues(location1, location2, numRidersAllowed) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://ride.guru/estimate/${location1}/${location2}#fare-comparison`,
      { waitUntil: "networkidle2" }
    );

    const delay = 2000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    await page.click("li.ng-scope.is-active a"); // click the "sedan button"

    const delay2 = 1000;
    await new Promise((resolve) => setTimeout(resolve, delay2));

    // Get the rendered HTML content of the page
    const htmlContent = await page.content();
    //console.log(htmlContent);
    const lines = htmlContent.split("\n");
    const ilines = lines.filter((line) => line.includes("fare ng-binding"));
    console.log(ilines);
    const fare = parseInt(ilines[0].split(">")[1].split("<")[0].substring(1));
    console.log("fare: ", fare);
    if (numRidersAllowed == 6) {
      return Math.floor(fare * 1.4);
    }
    return fare;

    // fs.writeFileSync("rg.html", htmlContent);
    // console.log(`Webpage downloaded and saved as rg.html`);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

module.exports = { scrapeFareValues };
