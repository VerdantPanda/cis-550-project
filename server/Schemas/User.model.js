const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    songs: {type: String, default: 'defaultSong1'},
    joinedDate: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
