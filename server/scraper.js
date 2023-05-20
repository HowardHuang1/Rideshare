const puppeteer = require("puppeteer");

async function scrapeFareValues(location1, location2, numRidersAllowed) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://ride.guru/estimate/${location1}/${location2}#fare-comparison`
    );

    // Wait for the elements to be rendered on the page
    await page.waitForSelector(".fare.ng-binding");

    // Extract the values of all matching elements
    const fareValues = await page.$$eval(".fare.ng-binding", (elements) =>
      elements.map((element) => element.textContent)
    );

    const filteredList = fareValues.filter((value) => {
      return !value.includes("\n");
    });
    console.log(filteredList);
    await browser.close();
    if (numRidersAllowed == 4) return parseInt(filteredList[1]);
    else return parseInt(filteredList[3]);
  } catch (error) {
    console.error("Error:", error);
    return -1;
  }
}

module.exports = { scrapeFareValues };
