import fs from 'fs';

function imageAsBase64(imagePath) {
    const base64Image = fs.readFileSync(imagePath, 'base64');
    return base64Image;
}

export default imageAsBase64;