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
import cookieParser from 'cookie-parser';

// Routers
import stratRouter from './routes/stratRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRotuer.js'

//Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js'


app.use(express.json())
app.use(cookieParser())

//Use Morgan if in development mode
if (process.env.NODE_ENV === 'development'){ 
    app.use(morgan('dev'))
}


app.get('/api/v1/test', (req,res) =>{
  res.json({msg: 'test route'})
})


app.use('/api/v1/strats',authenticateUser, stratRouter)
app.use('/api/v1/users' ,authenticateUser, userRouter )
app.use('/api/v1/auth' , authRouter )

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

