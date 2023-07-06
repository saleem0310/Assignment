//importing express,mongoose,database,colors,dotenv

const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');
const colors = require('colors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');

//configure env
dotenv.config();

//database config
db();

//rest obj
const app = express();

//middlewares
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

//rest api
app.get('/', (request, response) => {
  response.send('Hello backend');
});

//PORT
const PORT = process.env.PORT;

//run listen
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`.bgGreen.white);
});
