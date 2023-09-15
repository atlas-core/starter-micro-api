const http = require('http');
const { chromium } = require('playwright');

http.createServer(async function (req, res) {
    // Launch a Playwright browser instance
    const browser = await chromium.launch();

    // Create a new page
    const page = await browser.newPage();

    // Navigate to a webpage
    await page.goto('https://example.com');

    // Take a screenshot of the page
    const screenshot = await page.screenshot();

    // Close the Playwright browser
    await browser.close();

    // Set the response headers
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshot.length
    });

    // Send the screenshot as the response
    res.end(screenshot);
}).listen(process.env.PORT || 3000);
