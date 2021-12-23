import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRoutes from './routes/posts.js'
import dotenv from 'dotenv';

const app = express();
dotenv.config()
app.use(cors());

app.use(bodyparser.json({limit: "30mb", extended: true}));
app.use(bodyparser.urlencoded({limit: "30mb", extended: true}));
app.use('/posts', postsRoutes)

app.get('/', (req, res) => {
    res.send("Hello to Snapshot API");
})

const PORT =  process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err)=> console.log(err.message))


// mongoose.set('useFindAndModify', false);