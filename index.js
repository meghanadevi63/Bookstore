import express from 'express';
import {mongoDBURL, PORT} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


const app = express();
//Middlware for parsing request body
app.use(express.json());
//option1: to allow all origins with default of cord(*)

app.use(cors());

//option2:to allow custom origins
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))


app.get('/',(req,res)=>{
    console.log(req);
     return res.status(234).send('Welcome to mern stack');
});

//Middleware for books route


app.use('/books',booksRoute);





mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`)
   });
})
.catch((err)=>{
    console.log('Error connecting to MongoDB',err);
});