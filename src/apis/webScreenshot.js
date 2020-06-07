import puppeteer from "puppeteer";

async function webScreenshot(websiteURL) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(websiteURL);
    await page.screenshot({path: `${websiteURL.substring(8)}.png`});

    await browser.close();
}

export default webScreenshot;