import express from "express"
import bodyParser from "body-parser"
import webScreenshot from "./apis/webScreenshot"

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    webScreenshot(req.body.url);
    res.status(200).send('successful screenshot');
});


app.listen(port, () => console.log(`app listening on ${port}`))