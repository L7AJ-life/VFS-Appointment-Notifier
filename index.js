const puppeteer = require('puppeteer');
const config = require("./config.json");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto('https://row4.vfsglobal.com/NetherlandsAppointment/Account/RegisteredLogin?q=shSA0YnE4pLF9Xzwon/x/GAZMwphNakm2hstnNbT9MeeIMxQ284VVU8CmQHTuVDj6RdcTCMqElpit5BM4ux0VE1qp9briBHUp2f3a3FAZaU=');

  // Login Page
  await page.waitForSelector("#mat-input-0");
  await page.type("#mat-input-0", config.contact.mveglobal@gmail.com);
  await page.type("#mat-input-1", config.0123456789As!);
  await page.click("button.mat-button-base");
  await page.waitForNavigation();

  // Home Page
  const bookButtonXPath = "//button/span[contains(text(), 'Start New Booking')]";
  await page.waitForXPath(bookButtonXPath);
  await page.waitForTimeout(10000);
  let buttons = await page.$x(bookButtonXPath);
  await buttons[0].click();

  await page.waitForNavigation();

  //Apoitment Details Page
  await page.click("#mat-select-0");
  await page.click("#mat-option-2"); // Vancouver

  await page.click("#mat-select-4");
  await page.click("#mat-option-5"); // Short-Term Visa

  await page.waitForNavigation();
  let alerts = await page.$("div.alert");
  let alertText = alerts[0].innerText;

  console.log(alertText);

  await browser.close();
})();