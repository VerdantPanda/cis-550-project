// Create user to store in database
const User = require('../Schemas/User.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config();

// /user
function createUser(req, res) {
  console.log('REQ BODY:');
  console.log(req.body);

  bcrypt
    .hash(req.body.password, saltRounds)
    .then(async (hashedPW) => {
      const newUser = new User({
        username: req.body.username,
        password: hashedPW,
      });

      const errOccured = false;
      let mongoObj = {};
      try {
        mongoObj = await newUser.save();
      } catch (err) {
        console.log(err);
        errOccured = true;
      }
      if (errOccured) {
        res.json(`Error: ${err}`).status(500);
        console.log(`Error adding user: ${err}`);
      } else {
        res
          .json({
            username: mongoObj.name,
            userid: mongoObj.id,
            favSongs: mongoObj.songs ?? '',
          })
          .status(200);
        console.log(`User \'${req.body.username}\' added!`);
      }
    })
    .catch((err) => {
      console.log(`Error at bcrypt: ${err}`);
    });
}

// /login
function loginUser(req, res) {
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username }, async (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        console.log('User does not exist');
        res.status(404).json({ msg: 'User does not exist' });
      } else {
        console.log('User exist');
        bcrypt
          .compare(password, user.password)
          .then(async (result) => {
            if (result) {
              // Successful login
              res
                .json({
                  username: user.username,
                  userid: user.id,
                  favSongs: user.songs,
                })
                .status(200);
            } else {
              console.log('Incorrect Password');
              res.status(401).json({
                msg: 'Incorrect Password',
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } else {
    res.status(400).json({
      msg: 'username or password missing',
    });
  }
}

async function setSongs(req, res) {
  const err = false;
  const userid = req.body.userid;
  const songsStringList = req.body.songs;

  try {
    await User.findOneAndUpdate({ id: userid }, { songs: songsStringList });
  } catch (error) {
    console.log(error);
    err = true;
  }
  if (!err) {
    console.log(`User ${userid} successfully updated song list`);
    res
      .status(200)
      .json({ msg: `User ${userid} successfully updated song list` });
  } else {
    res.status(400);
  }
}

function getSongs(req, res) {
  const userid = req.body.userid;

  User.findOne({ id: userid }, async (err, user) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      console.log('User does not exist');
      res.status(404).json({ msg: 'User does not exist' });
    } else {
      console.log('User exist');
      res
        .json({
          favSongs: user.songs,
        })
        .status(200);
    }
  });
}

module.exports = {
  createUser,
  loginUser,
  setSongs,
  getSongs,
};
