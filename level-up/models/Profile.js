const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = mongoose.Schema({
  user:[{
    type: Schema.Types.ObjectId,
    ref:'user'
  }],
  company:{
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type:  [String]
  },
  interests: {
    type:  [String]
  },
  achieves: {
    type: String
  },
  social:{
    telegram: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date:{
    type: Date,
    default: Date.now
  }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema);