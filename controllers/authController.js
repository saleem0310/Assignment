const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const footerModel = require('../models/footerModel');

const registerController = async (request, response) => {
  try {
    const { firstName, surName, mobile, email, password, dateOfBirth, gender } =
      request.body;
    //validations
    if (!firstName) {
      return response.send({ error: 'Name is Required' });
    }
    if (!surName) {
      return response.send({ error: 'surName is Required' });
    }
    if (!mobile) {
      return response.send({ error: 'mobile number is Required' });
    }
    if (!email) {
      return response.send({ error: 'email is Required' });
    }
    if (!password) {
      return response.send({ error: 'password is Required' });
    }
    if (!dateOfBirth) {
      return response.send({ error: 'dateOfBirth is required' });
    }
    if (!gender) {
      return response.send({ error: 'gender is required' });
    }
    //check user
    const existingUser = await userModel.findOne({ email });

    //existing user
    if (existingUser) {
      return response.status(200).send({
        success: true,
        message: 'Already registered please Login',
      });
    }

    //registerUser
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      firstName,
      surName,
      mobile,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
    }).save();
    response.status(201).send({
      success: true,
      message: 'user Registered successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: 'Error in Registration',
      error,
    });
  }
};

const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    //validation
    if (!email || !password) {
      return response.status(404).send({
        success: false,
        message: 'Invalid email or password',
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(404).send({
        success: false,
        message: 'Email not registered',
      });
    }

    const match = comparePassword(password, user.password);
    if (!match) {
      return response.status(200).send({
        success: false,
        message: 'Invalid Password',
      });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, process.env.jwtsecret, {
      expiresIn: '1d',
    });
    response.status(200).send({
      success: true,
      message: 'login successfully',
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    });
  }
};

const homePageController = async (request, response) => {
  footerModel.find((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
};

exports.registerController = registerController;
exports.loginController = loginController;
exports.homePageController = homePageController;
