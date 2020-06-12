import express from "express"
import bodyParser from "body-parser"
import webScreenshot from "./apis/webScreenshot"
import NodeCache from "node-cache"

const app = express();
const port = 8080;
const cache = new NodeCache({ stdTTL: 60});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const cachedImage = cache.get(req.body.url);
    if (cachedImage) {
        cache.ttl( req.body.url, 60); // refresh time for cache
        res.status(200).send(cachedImage.base64Image);
    } else {
        webScreenshot(req.body.url).then( (base64Image) => {
            res.status(200).send(base64Image);
            const image = { base64Image: base64Image };
            cache.set( req.body.url, image );
        }).catch( (err) => {
            console.log(err);
            res.status(500).send('Internal Server Error') 
        });
    }
});


app.listen(port, () => console.log(`app listening on ${port}`))