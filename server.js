import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
//NODEMON
const app = express()
//logs requests 
import morgan from "morgan";
import connectDB from './db/connect.js';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';

// Routers
import stratRouter from './routes/stratRouter.js'

//Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';


app.use(express.json())

//Use Morgan if in development mode
if (process.env.NODE_ENV === 'development'){ 
    app.use(morgan('dev'))
}

app.use('/api/v1/strats', stratRouter)

app.use('*', (req, res) => {
  res.status(404).json({msg: 'not found'})
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100;

const start = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
      });
    } catch (error) {
      console.log(error);
      process.exit(1)
    }
  };
  
  start();

