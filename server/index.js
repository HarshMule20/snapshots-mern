import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRoutes from './routes/posts.js'


const app = express();
app.use(cors());

app.use(bodyparser.json({limit: "30mb", extended: true}));
app.use(bodyparser.urlencoded({limit: "30mb", extended: true}));
app.use('/posts', postsRoutes)

const CONNECT_URL = "mongodb+srv://harshmule:harshmule123@cluster0.s2qh3.mongodb.net/Snapshots?retryWrites=true&w=majority"
const PORT =  process.env.PORT || 5000;

mongoose.connect(CONNECT_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err)=> console.log(err.message))


// mongoose.set('useFindAndModify', false);