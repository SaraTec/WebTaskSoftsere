const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
  imgURL: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  postContent: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('news', newsSchema);
