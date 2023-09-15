const http = require('http');
const { chromium } = require('playwright');

http.createServer(async function (req, res) {
    try {
        // Launch a Playwright browser instance
        const browser = await chromium.launch();

        // Create a new page
        const page = await browser.newPage();

        // Navigate to Google's homepage
        await page.goto('https://www.google.com');

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
    } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error: ' + error.message);
    }
}).listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port', process.env.PORT || 3000);
});
