const puppeteer = require('puppeteer');

const registerUser = async (browser, email, password, username) => {
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle2' });

    await page.type('#formBasicEmail', email);
    await page.type('#formBasicPassword', password);
    await page.type('#formBasicUsername', username);
    await page.click('#register-button');


    console.log(`User registered successfully: ${email}`);
  } catch (error) {
    console.error(`Failed to register user: ${email}. Error: ${error.message}`);
  } finally {
    await page.waitForTimeout(2000)
    await page.close();
  }
};

const main = async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });

  const userRegistrations = [
    { email: '2@gmail.com', password: 'password', username: '1' },
    { email: '2@gmail.com', password: 'password', username: '1' },
    { email: '2@gmail.com', password: 'password', username: '1' },
  ];

  const registrationPromises = userRegistrations.map(userData =>
    registerUser(browser, userData.email, userData.password, userData.username)
  );

  await Promise.all(registrationPromises);

};

main().catch(console.error);