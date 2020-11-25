import express from 'express';
import bodyParser from 'body-parser';
import postRouter from './Routes/postRoutes.js'
import posts from './routes/posts.routes';



let app = express();

app.use('/api', posts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api', postRouter)

const port = process.env.PORT;
app.listen(
    port,
    console.log('server started - 3005'),
);
 export default app
