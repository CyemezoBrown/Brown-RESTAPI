import express from 'express';
import bodyParser from 'body-parser';
import posts from './routes/posts.routes';
import mongoose from 'mongoose'


let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api', posts)

const port = process.env.PORT || 3005;
app.listen(
    port,
    console.log('server started - 3005'),
);
 export default app
