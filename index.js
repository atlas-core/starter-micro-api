let playwright;
let chromium;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // Running on AWS Lambda.
  chromium = require('chrome-aws-lambda');
  playwright = require('playwright-aws-lambda'); // Playwright with AWS Lambda support
} else {
  // Running locally.
  playwright = require('playwright');
}

exports.handler = async (event, context) => {
  let browser = null;
  try {
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      browser = await playwright.chromium.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
      });
    } else {
      browser = await playwright.chromium.launch();
    }

    const page = await browser.newPage();
    await page.goto('https://google.com');
    // Your scraping or automation logic here

    return {
      statusCode: 200,
      body: 'Scraping completed successfully.',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
