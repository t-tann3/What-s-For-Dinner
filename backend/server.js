import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/user.route.js';
import MealRouter from './routes/meal.route.js'
import router from './routes/authRoutes.js';
import dbConnect from './config/mongoose.config.js';

dotenv.config();

const app = express();
app.use(express.json(), cors({ origin: 'http://localhost:5173', credentials:true}));
app.use(cookieParser());
app.use('/api', router);
app.use('/api', UserRouter);
app.use('/api', MealRouter);
const PORT = process.env.PORT;
dbConnect();


app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

