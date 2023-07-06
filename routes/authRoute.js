const express = require('express');
const {
  registerController,
  loginController,
  homePageController,
} = require('../controllers/authController');
const { requireSignIn } = require('../middlewares/authmiddleware');

//router object
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', loginController);

//HOME || METHOD GET
router.get('/home', requireSignIn, homePageController);

module.exports = router;
