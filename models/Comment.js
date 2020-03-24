const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new Schema({
  responce_description: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  actual_date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('comments', commentsSchema);
