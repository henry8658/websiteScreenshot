import express from "express"
import bodyParser from "body-parser"
import webScreenshot from "./apis/webScreenshot"
import imageAsBase64 from "./apis/imageAsBase64"

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const filePath = webScreenshot(req.body.url);
    filePath.then( url => imageAsBase64(url) ).then(
        base64Image => res.status(200).send(base64Image)
    );
});


app.listen(port, () => console.log(`app listening on ${port}`))