const puppeteer = require("puppeteer");

async function scrapeUberFare() {
  // Launch a headless browser
  const browser = await puppeteer.launch();

  try {
    // Create a new page instance
    const page = await browser.newPage();

    // Navigate to uberfarefinder.com
    await page.goto("https://www.uberfarefinder.com/");

    // Enter the start location
    await page.type(
      "#enter-location",
      "1450 Tarpon Street, Foster City, CA 94404"
    );

    // Enter the end location
    await page.type(
      "#enter-end-location",
      "506 N Delaware St, San Mateo, CA 94401"
    );

    // Submit the form
    await page.click("#submit");

    // Wait for the fare information to load
    await page.waitForSelector(".uf-section.estimate");

    // Extract the fare information
    const fareInfo = await page.evaluate(() => {
      const fareElement = document.querySelector(".uf-section.estimate .num");

      return fareElement ? fareElement.textContent : null;
    });

    // Print the fare information
    console.log("Uber fare:", fareInfo);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// Call the function to initiate the scraping
scrapeUberFare();
