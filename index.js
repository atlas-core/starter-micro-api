const http = require('http');
const puppeteer = require('puppeteer');

http.createServer(async function (req, res) {
    // Create a Puppeteer browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to a webpage
    await page.goto('https://example.com');

    // Take a screenshot of the page
    const screenshot = await page.screenshot();

    // Close the Puppeteer browser
    await browser.close();

    // Set the response headers
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshot.length
    });

    // Send the screenshot as the response
    res.end(screenshot);
}).listen(process.env.PORT || 3000);
