import puppeteer from "puppeteer"

async function webScreenshot( websiteURL ) {
    try {
        const browser = await puppeteer.connect({ 
            browserWSEndpoint: 'ws://browserless:3000'
        });

        const page = await browser.newPage();
        const start = Date.now();
        try {
            await page.goto( websiteURL, {
                timeout: 25000,
                waitUntil: 'networkidle2'
            });
        } catch {
            throw new Error("This site can't be reached");
        }
        console.log('Took', Date.now() - start, 'ms');

        const screenshot = await page.screenshot({ encoding: "base64" }); 

        browser.close();

        return screenshot;
    } catch(e) { 
        if (browser) browser.close();
    }
}

export default webScreenshot;