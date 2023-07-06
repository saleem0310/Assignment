const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  facebookfooter: {
    type: String,
  },
});

module.exports = mongoose.model('footer', footerSchema);
