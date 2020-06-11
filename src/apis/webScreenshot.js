import puppeteer from "puppeteer";
import sharp from "sharp"

async function webScreenshot( websiteURL ) {
    const browser = await puppeteer.launch({ 
        defaultViewport: {width: 1920, height: 1280}
    });
    const page = await browser.newPage();
   
    try {
        await page.goto( websiteURL );
    } catch {
        throw new Error("This site can't be reached");
    }

    const screenshot = await page.screenshot({ encoding: true });

    const base64Image = await sharp(screenshot).resize({
         width: 800,
         height:600,
         fit: 'fill'
    }).toBuffer();

    await browser.close();

    return base64Image.toString('base64');
}

export default webScreenshot;