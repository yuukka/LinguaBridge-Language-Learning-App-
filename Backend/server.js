const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');


const authRouter = require('./controllers/auth');
const userRouter = require('./controllers/user');
const wordRouter = require('./controllers/word');
const questionRouter = require('./controllers/question');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/word', wordRouter);
app.use('/question', questionRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});
