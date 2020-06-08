import puppeteer from "puppeteer";

async function webScreenshot( websiteURL ) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto( websiteURL );
    const imagePath = `${ websiteURL.substring(8) }.png`;
    await page.screenshot({ path: imagePath });

    await browser.close();

    return imagePath;
}

export default webScreenshot;