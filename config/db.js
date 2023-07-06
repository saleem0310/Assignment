const mongoose = require('mongoose');
const colors = require('colors');

const URI =
  'mongodb+srv://saleem137:saleem138@cluster0.fpdputx.mongodb.net/facebookdb?retryWrites=true&w=majority';

const connectDb = async () => {
  try {
    await mongoose.connect(URI, () => {
      console.log(`db is connected`.bgMagenta.white);
    });
  } catch (error) {
    console.log(`error in db ${error}`);
  }
};

module.exports = connectDb;
